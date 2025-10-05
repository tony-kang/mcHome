<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import ___prj from '$prj/prjMain';
	import ___const from '$prj/lib/i_const';
	import '../partner-common.css';

	const apiName = '/s/partner';

	let isLoaded = $state(false);
	let submitting = $state(false);

	let {
        partnerInfo = null
    } = $props();

    let partner = $state(partnerInfo);

	function validate() {
		if (!partner.biz_name.trim()) {
			alert('파트너사명을 입력해 주세요.');
			return false;
		}
		if (partner.contact_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(partner.contact_email)) {
			alert('이메일 형식을 확인해 주세요.');
			return false;
		}
		return true;
	}

	async function handleSubmit(e) {
		e.preventDefault();
		if (!validate()) return;
		submitting = true;
		try {
            const pId = partner._user_id === 0 ? 0 : ___prj.user.id;
            const pCmd = pId === 0 ? 'new.partner' : 'update.partner';
			const r = await ___prj.api.post(apiName, pCmd, null, {
                _user_id: pId,
                ...partner
            });
			if (r.data.result === ___const.OK) {
				alert('저장되었습니다.');
			}
		} catch (err) {
			console.error('저장 오류', err);
			alert('저장 중 오류가 발생했습니다.');
		} finally {
			submitting = false;
		}
	}

	onMount(() => {
        console.log('onMount partner', $state.snapshot(partner));
        if (!partner) {
            partner = {
                _user_id: 0,
                biz_name: '',
                biz_reg_no: '',
                bank: '',
                bank_account: '',
                contact_name: '',
                contact_email: '',
                contact_phone: '',
                status: 1,
                memo: ''
                // _user_id: 0,
                // biz_name: '파트너-1',
                // biz_reg_no: '135-79-67890',
                // bank: '국민은행',
                // bank_account: '123456-01-789012',
                // contact_name: '홍길동',
                // contact_email: 'hong@gmail.com',
                // contact_phone: '010-1234-5678',
                // status: 1,
                // memo: '첫 파트너'
            };
        }
        isLoaded = true;
	});
</script>

{#if partner && isLoaded}
    <form onsubmit={handleSubmit} class="partner-form">
        <div class="partner-grid">
            <div class="partner-form-group">
                <label for="biz_name">파트너사명 *</label>
                <input id="biz_name" type="text" bind:value={partner.biz_name} placeholder="예) 마인드코딩 파트너" required />
            </div>

            <div class="partner-form-group">
                <label for="biz_reg_no">사업자등록번호</label>
                <input id="biz_reg_no" type="text" bind:value={partner.biz_reg_no} placeholder="예) 123-45-67890" />
            </div>

            <div class="partner-form-group">
                <label for="bank">은행명</label>
                <input id="bank" type="text" bind:value={partner.bank} placeholder="예) 국민은행" />
            </div>

            <div class="partner-form-group">
                <label for="bank_account">계좌번호</label>
                <input id="bank_account" type="text" bind:value={partner.bank_account} placeholder="예) 123456-01-789012" />
            </div>

            <div class="partner-form-group">
                <label for="contact_name">담당자명</label>
                <input id="contact_name" type="text" bind:value={partner.contact_name} />
            </div>

            <div class="partner-form-group">
                <label for="contact_email">담당자 이메일</label>
                <input id="contact_email" type="email" bind:value={partner.contact_email} />
            </div>

            <div class="partner-form-group">
                <label for="contact_phone">담당자 연락처</label>
                <input id="contact_phone" type="tel" bind:value={partner.contact_phone} />
            </div>

            <div class="partner-form-group">
                <label for="status">상태</label>
                <select id="status" bind:value={partner.status}>
                    <option value={1}>활성</option>
                    <option value={0}>중지</option>
                </select>
            </div>

            <div class="partner-form-group partner-form-group--full">
                <label for="memo">메모</label>
                <textarea id="memo" rows="4" bind:value={partner.memo} placeholder="메모를 입력하세요..."></textarea>
            </div>
        </div>

        <div class="partner-form-actions">
            <button type="submit" class="partner-btn-primary" disabled={submitting}>{submitting ? '저장 중...' : '저장'}</button>
        </div>
    </form>
{/if}
<!-- 공통 CSS는 partner-common.css에서 import -->

