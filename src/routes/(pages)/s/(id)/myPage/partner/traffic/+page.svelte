<script>
    import AdminPageHeader from '$src/prj/C/admin/AdminPageHeader.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import ___prj from '$prj/prjMain';
	import ___const from '$prj/lib/i_const';

    import { g_logedIn } from '$prj/prjStore';
	import PartnerSidebar from '$lib/components/PartnerSidebar.svelte';
    import AdminSidebar from '$lib/components/AdminSidebar.svelte';
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
			const r = await ___prj.api.post(apiName, 'get.partner.traffic.list', null, { partnerId: partnerUserId });
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

{#if ___prj.isAdmin || (userInfo && userInfo.userType === 3) }
	<div class="partner-container">
		<AdminPageHeader title="파트너 트래픽 관리" />

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
									<th class="text-center">날짜</th>
									{#if ___prj.isAdmin}
										<th class="text-center">파트너 아이디</th>
										<th class="text-center">매체</th>
									{/if}
									<th class="text-right">방문 수</th>
									<th class="text-right">방문자 수</th>
									<th class="text-right">문의글 수</th>
									<th class="text-right">수익</th>
								</tr>
							</thead>
							<tbody>
								{#each list as row}
									<tr>
										<td class="text-center">{row.visit_date.substring(0, 10) || '-'}</td>
										{#if ___prj.isAdmin}
											<td class="text-center">{row.partner_name || ''}</td>
											<td class="text-center">{row.partner_media || ''}</td>
										{/if}
										<td class="text-right">{row.visit_cnt || 0}</td>
										<td class="text-right">{row.visitor_cnt || 0}</td>
										<td class="text-right">{row.inquiry_cnt || 0}</td>
										<td class="text-right">{row.revenue || 0} 원</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{/if}
			{/if}
		</div>
	</div>
{/if}