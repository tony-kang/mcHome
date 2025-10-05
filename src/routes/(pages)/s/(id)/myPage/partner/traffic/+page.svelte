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
			const r = await ___prj.api.post(apiName, 'get.partner.traffic.list', null, { userId: partnerUserId });
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
			<h1 class="partner-title">파트너 트래픽 관리</h1>
		</div>
	</div>

	<div class="partner-section">
		<h2 class="partner-section-title">트래픽 통계</h2>
		{#if loading}
			<div class="partner-loading">불러오는 중...</div>
		{:else}
			{#if list.length === 0}
				<div class="partner-empty">트래픽 데이터가 없습니다.</div>
			{:else}
				<div class="partner-table-wrap">
					<table class="partner-table">
						<thead>
							<tr>
								<th class="text-left">날짜</th>
								<th class="text-center">방문자 수</th>
								<th class="text-center">페이지뷰</th>
								<th class="text-center">전환율</th>
								<th class="text-center">매출</th>
							</tr>
						</thead>
						<tbody>
							{#each list as row}
								<tr>
									<td class="text-left">{row.date || '-'}</td>
									<td class="text-center">{row.visitors || 0}</td>
									<td class="text-center">{row.pageviews || 0}</td>
									<td class="text-center">{row.conversion_rate || '0%'}</td>
									<td class="text-center">{row.revenue || '0원'}</td>
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
