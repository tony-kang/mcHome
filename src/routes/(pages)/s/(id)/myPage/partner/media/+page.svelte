<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import ___prj from '$prj/prjMain';
	import ___const from '$prj/lib/i_const';
	import ___prjConst from '$prj/prjConst';
	import ___encDec from '$prj/lib/i_encDec';

	// 기본 설정
	const apiName = '/s/partner';
	const partnerUserId = parseInt($page.params.id || 0);

	// 상태
	let loading = $state(true);
	let submitting = $state(false);
    let list = $state([]);
    let editingId = $state(null); // null이면 신규
    let openMenuKey = $state(null); // (기존) 셀 내 메뉴 키 - 사용 안 함

    // 포털 레이어용 상태
    let menuOpen = $state(false);
    let menuPos = $state({ x: 0, y: 0 });
    let menuRow = $state(null);

	let form = $state({
		media_code: '',
		media_name: '',
		media_url: '',
		category: '',
        counselor_code: '',
		is_active: 1
	});

	function resetForm() {
		editingId = null;
		form.media_code = '';
		form.media_name = '';
		form.media_url = '';
		form.category = '';
		form.counselor_code = '';
		form.is_active = 1;
	}

	function validate() {
		if (!form.media_code.trim()) {
			alert('매체 코드(media_code)를 입력해 주세요. 예: GOOGLE_ADS');
			return false;
		}
		if (!form.media_name.trim()) {
			alert('매체명(media_name)을 입력해 주세요.');
			return false;
		}
		return true;
	}

	async function loadList() {
        console.log('___prj.domain.origin',___prj.domain.origin);

		loading = true;
		try {
			// 파트너 NO 조회가 필요하면 서버에서 partnerUserId로 NO를 구해 내려주거나, 별도 API를 사용하세요.
			const r = await ___prj.api.post(apiName, 'get.partner.media.list', null, { userId: partnerUserId });
			if (r.data.result === ___const.OK) {
				list = r.data.content || [];
			}
		} finally {
			loading = false;
		}
	}

	async function submitForm(e) {
		e.preventDefault();
		if (!validate()) return;
		submitting = true;
		try {
			const r = await ___prj.api.post(apiName, 'save.partner.media', null, { 
                ...$state.snapshot(form) 
            });

			if (r.data.result === ___const.OK) {
				alert(editingId ? '수정되었습니다.' : '등록되었습니다.');
				await loadList();
				resetForm();
			}
		} catch (err) {
			console.error('저장 오류', err);
			alert('저장 중 오류가 발생했습니다.');
		} finally {
			submitting = false;
		}
	}

	function editRow(row) {
    openMenuKey = null;
		editingId = row.NO;
		form.media_code = row.media_code || '';
		form.media_name = row.media_name || '';
		form.media_url = row.media_url || '';
		form.category = row.category || '';
		form.counselor_code = row.counselor_code || '';
		form.is_active = typeof row.is_active === 'number' ? row.is_active : 1;
	}

	async function removeRow(row) {
		if (!confirm('삭제하시겠습니까?')) return;
		submitting = true;
		try {
			const r = await ___prj.api.post(apiName, 'delete.partner.media', null, { media_code: row.media_code });
			if (r.data.result === ___const.OK) {
				await loadList();
				resetForm();
			}
		} catch (err) {
			console.error('삭제 오류', err);
			alert('삭제 중 오류가 발생했습니다.');
		} finally {
			submitting = false;
		}
	}

    function makePartnerUrl(row) {
        // const plainText = "안녕하세요, Welcome to KBW 세계!";
        // const encText = ___encDec.telepasiEncrypt(plainText);
        // console.log('암호화:\n\t', encText);

        // const oriStr = ___encDec.telepasiDecrypt(encText);
        // console.log('복호화:', oriStr);

        const baseUrl = ___prjConst.HOMEPAGE_URL;
        const data = ___prj.user.id + '||' + row.media_code + '||' + row.counselor_code;
        const encodedData = ___encDec.telepasiEncrypt(data);
        const encodedPartnerUrl = `?pP=${encodedData}`;
        // console.log('데이터:', data);
        // console.log('암호화:', encodedData);
        // console.log('복호화:', ___encDec.telepasiDecrypt(encodedData));

        return baseUrl + encodedPartnerUrl;
    }

    async function copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            alert('URL이 클립보드에 복사되었습니다.');
        } catch (err) {
            // fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('URL이 클립보드에 복사되었습니다.');
        }
    }

	onMount(loadList);
</script>

<svelte:window onclick={() => { openMenuKey = null; menuOpen = false; }} />

<div class="partner-media-container">
	<div class="page-header">
		<div class="header-content">
			<h1 class="title">파트너 매체 관리</h1>
		</div>
	</div>

	<div class="section">
		<h2 class="section-title">{editingId ? '매체 수정' : '매체 등록'}</h2>
		<form class="media-form" onsubmit={submitForm}>
			<div class="grid">
				<div class="form-group">
					<label for="media_code">매체 코드 *</label>
					<input id="media_code" type="text" bind:value={form.media_code} placeholder="예) GOOGLE_ADS, META, NAVER" required />
				</div>
				<div class="form-group">
					<label for="media_name">매체명 *</label>
					<input id="media_name" type="text" bind:value={form.media_name} placeholder="예) 구글 광고" required />
				</div>
				<div class="form-group">
					<label for="media_url">매체 URL</label>
					<input id="media_url" type="text" bind:value={form.media_url} placeholder="예) https://ads.google.com" />
				</div>
				<div class="form-group">
					<label for="category">카테고리</label>
					<input id="category" type="text" bind:value={form.category} placeholder="예) ads, social, search, video" />
				</div>
                <div class="form-group">
					<label for="category">전문가코드</label>
					<input id="category" type="text" bind:value={form.counselor_code} placeholder="예) MC001" />
                    <div class="text-sm text-[#ff00ff] text-right">전문가님께 의뢰를 받은 경우 입력해 주세요.</div>
				</div>
				<div class="form-group">
					<label for="is_active">상태</label>
					<select id="is_active" bind:value={form.is_active}>
						<option value={1}>활성</option>
						<option value={0}>중지</option>
					</select>
				</div>
			</div>
			<div class="form-actions">
				<button type="button" class="btn-secondary" onclick={resetForm} disabled={submitting}>초기화</button>
				<button type="submit" class="btn-primary" disabled={submitting}>{submitting ? '저장 중...' : (editingId ? '수정 저장' : '저장')}</button>
			</div>
		</form>
	</div>

	<div class="section">
		<h2 class="section-title">매체 목록</h2>
		{#if loading}
			<div class="loading">불러오는 중...</div>
		{:else}
			{#if list.length === 0}
				<div class="empty">등록된 매체가 없습니다.</div>
			{:else}
				<div class="table-wrap">
					<table class="table">
						<thead>
							<tr>
								<th class="text-left w-[120px]">매체 코드</th>
								<th class="text-left w-[100px]">매체명</th>
								<th class="text-left">매체 URL</th>
                                <th class="text-left w-[400px]">파트너 URL</th>
								<th class="text-left w-[100px]">카테고리</th>
								<th class="text-center w-[60px]">상태</th>
								<th class="text-center w-[50px]">작업</th>
							</tr>
						</thead>
						<tbody>
							{#each list as row}
								<tr>
									<td class="text-left">{row.media_code}</td>
									<td class="text-left">{row.media_name}</td>
									<td class="text-left">
										{#if row.media_url}
											<a href={row.media_url} target="_blank" rel="noopener noreferrer">{row.media_url}</a>
										{:else}-{/if}
									</td>
									<td class="text-left">
										<div class="url-cell">
											<span class="url-text">{makePartnerUrl(row)}</span>
											<!-- svelte-ignore a11y_consider_explicit_label -->
											<button class="copy-btn" onclick={() => copyToClipboard(makePartnerUrl(row))} title="URL 복사">
												<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="currentColor"/>
												</svg>
											</button>
										</div>
									</td>
									<td class="text-left">{row.category || '-'}</td>
									<td class="text-center">{row.is_active ? '활성' : '중지'}</td>
                                    <td class="text-center">
                                        <div class="action-cell">
                                            <button class="icon-btn" aria-label="액션" onclick={(e) => {
                                                e.stopPropagation();
                                                const r = e.currentTarget.getBoundingClientRect();
                                                menuPos = { x: r.left, y: r.top };
                                                menuRow = row;
                                                menuOpen = !menuOpen;
                                            }}>💎</button>
                                        </div>
                                    </td>
								</tr>
							{/each}
						</tbody>
					</table>
                    <div class="text-md text-gray-500 bg-yellow-100 p-2 rounded-md text-center">파트너 URL을 복사해서 매체에 링크로 연결해 주세요.</div>
				</div>
			{/if}
		{/if}
	</div>
</div>

{#if menuOpen}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="menu-layer" role="menu" tabindex="-1" aria-label="컨텍스트 메뉴"
         style={`top:${menuPos.y}px;left:${menuPos.x}px`}
         onclick={(e) => e.stopPropagation()}>
        <button class="menu-item" onclick={() => { editRow(menuRow); menuOpen = false; }}>정보 수정</button>
        <hr class="menu-sep" />
        <button class="menu-item text-red-500" onclick={() => { removeRow(menuRow); menuOpen = false; }} disabled={submitting}>그룹 삭제</button>
    </div>
{/if}

<style>
	.partner-media-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
		background: #ffffff;
		min-height: 100vh;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	.page-header {
		margin-bottom: 24px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		border-radius: 16px;
		padding: 20px;
		box-shadow: 0 8px 32px rgba(102, 126, 234, 0.2);
	}
	.header-content { display: flex; align-items: center; justify-content: space-between; }
	.title { color: #fff; font-size: 1.6rem; font-weight: 700; margin: 0; }

	.section { background: #fff; border: 1px solid #eee; border-radius: 12px; padding: 20px; margin-bottom: 20px; }
	.section-title { font-size: 1.2rem; font-weight: 700; margin: 0 0 16px 0; }

	.media-form .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 24px; }
	.form-group { display: flex; flex-direction: column; gap: 8px; }
	.form-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 12px; }

	input[type="text"], select { width: 100%; padding: 12px 14px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95rem; transition: border-color 0.2s ease; }
	input:focus, select:focus { outline: none; border-color: #28a745; box-shadow: 0 0 0 3px rgba(40,167,69,0.1); }

    .form-group input, .form-group select {
        font-size: 16px;
        color: #0000ff;
    }

	.btn-primary { padding: 10px 16px; background: #28a745; color: #fff; border: none; border-radius: 6px; font-weight: 700; cursor: pointer; }
	.btn-primary:hover { background: #20c997; }
	.btn-secondary { padding: 10px 16px; background: #6c757d; color: #fff; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; }
	.btn-small { padding: 6px 10px; background: #6c757d; color: #fff; border: none; border-radius: 6px; cursor: pointer; margin-right: 6px; }
	.btn-danger { background: #dc3545; }

	/* 액션 아이콘 및 컨텍스트 메뉴 */
	.action-cell { position: relative; display: inline-block; }
	.icon-btn { background: transparent; border: none; cursor: pointer; font-size: 18px; line-height: 1; }
	.context-menu {
		position: absolute;
		left: -8px; /* 아이콘 왼쪽에 걸쳐 보이도록 */
		top: -4px;
		transform: translate(-100%, 0); /* 아이콘 왼쪽으로 붙임 */
		min-width: 140px;
		background: #fff;
		border: 1px solid #e5e7eb;
		border-radius: 8px;
		box-shadow: 0 10px 25px rgba(0,0,0,0.15);
		overflow: hidden;
		z-index: 10;
	}
	.menu-item { display: block; width: 100%; text-align: left; padding: 10px 12px; background: #fff; border: none; cursor: pointer; font-size: 15px; }
	.menu-item:hover { background: #f5f7fa; }
	.menu-item.danger { color: #dc3545; }
	.menu-sep { margin: 0; border: none; border-top: 1px dashed #8ea0c2; }

	/* URL 셀 스타일 */
	.url-cell {
		display: flex;
		align-items: center;
		gap: 8px;
		max-width: 100%;
	}
	.url-text {
		flex: 1;
		word-break: break-all;
		font-size: 0.9rem;
		color: #666;
	}
	.copy-btn {
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 4px;
		border-radius: 4px;
		color: #666;
		transition: all 0.2s ease;
		flex-shrink: 0;
	}
	.copy-btn:hover {
		background: #f5f5f5;
		color: #333;
	}

	/* fixed 포털 레이어 */
	.menu-layer {
		position: fixed;
		transform: translate(-100%, -6px);
		min-width: 140px;
		background: #fff;
		border: 1px solid #e5e7eb;
		border-radius: 4px;
		box-shadow: 0 5px 15px rgba(0,0,0,0.9);
		z-index: 9999;
	}

	.table-wrap { overflow-x: auto; }
	.table { width: 100%; border-collapse: collapse; }
	.table th, .table td { border-bottom: 1px solid #eee; text-align: left; padding: 10px 8px; font-size: 0.95rem; }

	.loading, .empty { text-align: center; color: #666; padding: 24px; }

	@media (max-width: 768px) {
		.media-form .grid { grid-template-columns: 1fr; }
	}
</style>

