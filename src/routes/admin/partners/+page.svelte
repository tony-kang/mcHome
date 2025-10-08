<script>
	import { onMount } from 'svelte';
	import ___prj from '$prj/prjMain';
	import ___const from '$prj/lib/i_const';
	import { goto } from '$app/navigation';
	import { ___formatDate } from '$prj/lib/i_telepasi';
	import AdminPageHeader from '$prj/C/admin/AdminPageHeader.svelte';

	let searchQuery = $state('');
	let currentPage = $state(1);
	const itemsPerPage = 20;

	let partners = $state([]);
	let filteredPartners = $state([]);
	let paginatedPartners = $state([]);
	let totalPages = $state(1);
	let loading = $state(true);

	// 필터링 및 페이지네이션
	function updatePartners() {
		let filtered = partners;

		// 검색어 필터링
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter(partner =>
				partner.biz_name?.toLowerCase().includes(query) ||
				partner.contact_name?.toLowerCase().includes(query) ||
				partner.contact_email?.toLowerCase().includes(query)
			);
		}

		filteredPartners = filtered;

		// 페이지네이션
		const start = (currentPage - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		paginatedPartners = filtered.slice(start, end);

		// 총 페이지 수 계산
		totalPages = Math.ceil(filtered.length / itemsPerPage);
	}

	$effect(() => {
		updatePartners();
	});

	const handleSearch = () => {
		currentPage = 1;
	};

	const handleAddPartner = () => {
		goto('/admin/partners/add');
	};

    onMount(async () => {
		try {
			const r = await ___prj.api.post('/s/partner', 'get.partner.list', null, null);
			if (r.data.result === ___const.OK) {
				partners = r.data.content || [];
			}
		} catch (error) {
			console.error('파트너 목록 로드 오류:', error);
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>파트너 관리 - 마인드코딩</title>
	<meta name="description" content="마인드코딩 파트너 관리 페이지" />
</svelte:head>
<main class="popup-page">
	<!-- Search and Filter Section -->
	<section class="search-filter-section">
		<div class="container">
			<AdminPageHeader title="파트너 관리" />
			<div class="search-filter-wrapper">
				<!-- Search Box -->
				<div class="search-box">
					<input
						type="text"
						placeholder="파트너명, 담당자명, 이메일로 검색..."
						bind:value={searchQuery}
						onkeydown={(e) => e.key === 'Enter' && handleSearch()}
					/>
					<button type="button" onclick={handleSearch}>검색</button>
				</div>
			</div>
		</div>
	</section>

	<section class="partners-list-section">
		<div class="container">
			{#if loading}
				<div class="loading">데이터를 불러오는 중...</div>
			{:else if paginatedPartners.length > 0}
				<div class="partners-table">
					<table>
						<thead>
							<tr>
								<th>번호</th>
								<th>파트너사명</th>
								<th>담당자</th>
								<th>연락처</th>
								<th>이메일</th>
								<th>상태</th>
								<th>등록일</th>
								<th>관리</th>
							</tr>
						</thead>
						<tbody>
							{#each paginatedPartners as partner, index}
								<tr>
									<td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
									<td class="partner-name">{partner.biz_name || '-'}</td>
									<td>{partner.contact_name || '-'}</td>
									<td>{partner.contact_phone || '-'}</td>
									<td>{partner.contact_email || '-'}</td>
									<td>
										<span class="status-badge" class:active={partner.status === 1}>
											{partner.status === 1 ? '활성' : '중지'}
										</span>
									</td>
									<td>{___formatDate(partner.created_at)}</td>
									<td>
										<button class="view-btn" onclick={() => goto(`/s/myPage/partner/media?id=${partner._user_id}`)}>
											매체
										</button>
										<button class="view-btn" onclick={() => goto(`/s/myPage/partner/traffic?id=${partner._user_id}`)}>
											트래픽
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

				<!-- Pagination -->
				{#if totalPages > 1}
					<div class="pagination">
						<button
							class="page-btn"
							disabled={currentPage === 1}
							onclick={() => currentPage = Math.max(1, currentPage - 1)}
						>
							이전
						</button>

						{#each Array.from({length: totalPages}, (_, i) => i + 1) as page}
							<button
								class="page-btn"
								class:active={currentPage === page}
								onclick={() => currentPage = page}
							>
								{page}
							</button>
						{/each}

						<button
							class="page-btn"
							disabled={currentPage === totalPages}
							onclick={() => currentPage = Math.min(totalPages, currentPage + 1)}
						>
							다음
						</button>
					</div>
				{/if}
			{:else}
				<div class="no-results">
					<p>등록된 파트너가 없습니다.</p>
				</div>
			{/if}
		</div>
	</section>
</main>

<style>
	.partners-page {
		margin-top: var(--header-height, 100px);
		min-height: calc(100vh - var(--header-height, 100px));
		background: #f8f9fa;
	}

	.partners-header {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: #fff;
		padding: 60px 0;
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.header-content h1 {
		font-size: 2.5rem;
		font-weight: 700;
		margin: 0;
	}

	.add-partner-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 24px;
		background: rgba(255, 255, 255, 0.2);
		color: white;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-radius: 12px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		backdrop-filter: blur(10px);
	}

	.add-partner-btn:hover {
		background: rgba(255, 255, 255, 0.3);
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
	}

	.btn-icon {
		font-size: 1.2rem;
	}

	.search-section {
		padding: 30px 0;
		background: #fff;
		border-bottom: 1px solid #e9ecef;
	}

	.search-box {
		display: flex;
		gap: 10px;
		max-width: 600px;
		margin: 0 auto;
	}

	.search-box input {
		flex: 1;
		padding: 12px 20px;
		border: 2px solid #e9ecef;
		border-radius: 8px;
		font-size: 1rem;
		transition: border-color 0.3s ease;
	}

	.search-box input:focus {
		outline: none;
		border-color: #667eea;
	}

	.search-box button {
		padding: 12px 30px;
		background: #667eea;
		color: #fff;
		border: none;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.3s ease;
	}

	.search-box button:hover {
		background: #764ba2;
	}

	.partners-list-section {
		padding: 40px 0;
	}

	.loading,
	.no-results {
		text-align: center;
		padding: 60px 20px;
		font-size: 1.1rem;
		color: #666;
	}

	.partners-table {
		background: #fff;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	thead {
		background: #f8f9fa;
	}

	th {
		padding: 16px;
		text-align: left;
		font-weight: 600;
		color: #333;
		border-bottom: 2px solid #e9ecef;
	}

	td {
		padding: 16px;
		border-bottom: 1px solid #e9ecef;
		color: #666;
	}

	tbody tr:hover {
		background: #f8f9fa;
	}

	.partner-name {
		font-weight: 600;
		color: #333;
	}

	.status-badge {
		display: inline-block;
		padding: 4px 12px;
		border-radius: 12px;
		font-size: 0.85rem;
		font-weight: 600;
		background: #dc3545;
		color: #fff;
	}

	.status-badge.active {
		background: #28a745;
	}

	.view-btn {
		padding: 6px 16px;
		background: #667eea;
		color: #fff;
		border: none;
		border-radius: 6px;
		font-size: 0.9rem;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.3s ease;
	}

	.view-btn:hover {
		background: #764ba2;
	}

	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
		margin-top: 40px;
	}

	.page-btn {
		padding: 10px 15px;
		background: #fff;
		color: #666;
		border: 1px solid #e9ecef;
		border-radius: 6px;
		font-size: 0.95rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
		min-width: 40px;
	}

	.page-btn:hover:not(:disabled) {
		background: #667eea;
		color: #fff;
		border-color: #667eea;
	}

	.page-btn.active {
		background: #667eea;
		color: #fff;
		border-color: #667eea;
	}

	.page-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.header-content {
			flex-direction: column;
			gap: 20px;
			text-align: center;
		}

		.header-content h1 {
			font-size: 2rem;
		}

		.search-box {
			flex-direction: column;
		}

		.partners-table {
			overflow-x: auto;
		}

		table {
			min-width: 800px;
		}

		.pagination {
			flex-wrap: wrap;
		}
	}
</style>
