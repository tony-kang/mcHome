<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import ___prj from '$prj/prjMain';
	import ___const from '$prj/lib/i_const';
	import { g_logedIn } from '$prj/prjStore';
	import PartnerSidebar from '$lib/components/PartnerSidebar.svelte';
	import '../partner-common.css';

	const apiName = '/s/partner';
	const partnerUserId = parseInt($page.params.id || 0);

    let userInfo = $state(null);
    let sidebarOpen = $state(false);

	let loading = $state(true);
	let submitting = $state(false);
	let list = $state([]);

	async function loadList() {
		loading = true;
		try {
			const r = await ___prj.api.post(apiName, 'get.partner.settled.list', null, { userId: partnerUserId });
			if (r.data.result === ___const.OK) {
				list = r.data.content || [];
			}
		} finally {
			loading = false;
		}
	}

	onMount(() => {
        if (___prj.user && $g_logedIn) {
            userInfo = ___prj.user;
            loadList();
        } else {
            window.location.href = '/s/signIn';
        }
    });
</script>

{#if (userInfo && userInfo.userType === 3) }
    <PartnerSidebar bind:isOpen={sidebarOpen} />
{/if}
<div class="partner-container">
	<div class="partner-page-header">
		<div class="partner-header-content">
			<h1 class="partner-title">정산 완료 내역</h1>
		</div>
	</div>

	<div class="partner-section">
		<h2 class="partner-section-title">정산 완료 목록</h2>
		{#if loading}
			<div class="partner-loading">불러오는 중...</div>
		{:else}
			{#if list.length === 0}
				<div class="partner-empty">정산 완료 내역이 없습니다.</div>
			{:else}
				<div class="partner-table-wrap">
					<table class="partner-table">
						<thead>
							<tr>
								<th class="text-left">정산일</th>
								<th class="text-center">정산 기간</th>
								<th class="text-center">정산 금액</th>
								<th class="text-center">수수료</th>
								<th class="text-center">실지급액</th>
								<th class="text-center">상태</th>
							</tr>
						</thead>
						<tbody>
							{#each list as row}
								<tr>
									<td class="text-left">{row.settlement_date || '-'}</td>
									<td class="text-center">{row.period || '-'}</td>
									<td class="text-center">{row.amount || '0원'}</td>
									<td class="text-center">{row.commission || '0원'}</td>
									<td class="text-center">{row.net_amount || '0원'}</td>
									<td class="text-center">
										<span class="text-green-600 font-semibold">정산완료</span>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		{/if}
	</div>
</div>

<!-- 공통 CSS는 partner-common.css에서 import -->
