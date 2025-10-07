<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ___const from "$prj/lib/i_const";
	import ___prjConst from '$prj/prjConst';
	import ___prj from '$prj/prjMain';
	import { goto } from '$app/navigation';
	import { ___decodeHtml, ___formatDate } from '$prj/lib/i_telepasi';

	import { onMount } from 'svelte';

	let selectedCategory = $state('all');
	let searchQuery = $state('');
	let currentPage = $state(1);

	let searchTitle = $state('');
	let searchContent = $state('');
	const itemsPerPage = 3;

	let notices = $state([]);

	const categories = [
		{ value: 'all', label: '전체' },
		{ value: 'service', label: '서비스' },
		{ value: 'education', label: '교육' },
		{ value: 'policy', label: '정책' },
		{ value: 'system', label: '시스템' },
		{ value: 'company', label: '회사' }
	];

	// 필터링된 공지사항
	let filteredNotices = $state([]);
	
	// 페이지네이션된 공지사항
	let paginatedNotices = $state([]);
	
	// 총 페이지 수
	let totalPages = $state(1);

	// 필터링 및 페이지네이션 로직
	function updateNotices() {
		let filtered = notices;
		
		// 카테고리 필터링
		if (selectedCategory !== 'all') {
			filtered = filtered.filter(notice => notice.category === selectedCategory);
		}
		
		// 검색어 필터링
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter(notice => 
				notice.title.toLowerCase().includes(query) || 
				notice.content.toLowerCase().includes(query)
			);
		}
		
		// 중요 공지사항을 먼저 정렬
		filtered = filtered.sort((a, b) => {
			if (a.important && !b.important) return -1;
			if (!a.important && b.important) return 1;
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		});
		
		filteredNotices = filtered;
		
		// 페이지네이션
		const start = (currentPage - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		paginatedNotices = filtered.slice(start, end);
		
		// 총 페이지 수 계산
		totalPages = Math.ceil(filtered.length / itemsPerPage);
	}

	// 초기 로드 및 상태 변경 시 업데이트
	$effect(() => {
		updateNotices();
	});

	const handleSearch = () => {
		currentPage = 1; // 검색 시 첫 페이지로 이동
	};

	const handleCategoryChange = (category) => {
		selectedCategory = category;
		currentPage = 1; // 카테고리 변경 시 첫 페이지로 이동
	};

	const handleWriteNotice = () => {
		goto('/admin/notice/write');
	};

	onMount(async () => {
		const _para = {
			sTitle: searchTitle,
			sContent: searchContent,
			page: 1,
			pageSize: 30,
			bbsId : 'notice'
		};
		const _data = null;
		const r = await ___prj.api.post(___const.API_BBS ,'get.post.list' ,_para ,_data);

		if (r.data.result === ___const.OK) {
			notices = r.data.content;
		}
	});
</script>

<svelte:head>
	<title>공지사항 - 마인드코딩</title>
	<meta name="description" content="마인드코딩의 공지사항을 확인하세요. 서비스 업데이트, 교육 과정, 정책 변경 등 중요한 소식을 전해드립니다." />
</svelte:head>

<Header />

<main class="notice-page">
	<!-- Hero Section -->
	<section class="hero-section">
		<div class="container">
			<div class="hero-content">
				<h1 class="hero-title">공지사항</h1>
				<p class="hero-subtitle">마인드코딩 소식</p>
				<p class="hero-description">
					서비스 업데이트, 교육 과정, 정책 변경 등<br>
					중요한 소식을 전해드립니다.
				</p>
				<!-- {#if ___prj.isAdmin}
					<div class="admin-actions">
						<button class="write-notice-btn" onclick={handleWriteNotice}>
							<span class="btn-icon">✏️</span>
							공지사항 작성
						</button>
					</div>
				{/if} -->
			</div>
		</div>
	</section>

	<!-- Search and Filter Section -->
	<section class="search-filter-section">
		<div class="container">
			<div class="search-filter-wrapper">
				<!-- Search Box -->
				<div class="search-box">
					<input 
						type="text" 
						placeholder="공지사항을 검색하세요..." 
						bind:value={searchQuery}
						onkeydown={(e) => e.key === 'Enter' && handleSearch()}
					/>
					<button type="button" onclick={handleSearch}>검색</button>
				</div>

				<!-- Category Filter -->
				<div class="category-filter">
					{#each categories as category}
						<button 
							class="category-btn" 
							class:active={selectedCategory === category.value}
							onclick={() => handleCategoryChange(category.value)}
						>
							{category.label}
						</button>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Notice List Section -->
	<section class="notice-list-section">
		<div class="container">
			<div class="notice-list">
				{#if paginatedNotices.length > 0}
					{#each paginatedNotices as notice}
						<article class="notice-item" class:important={notice.important}>
							<div class="notice-header">
								<div class="notice-title-wrapper">
									{#if notice.important}
										<span class="important-badge">중요</span>
									{/if}
									<h3 class="notice-title">
										<a href="/notice/{notice.id}">{notice.title}</a>
									</h3>
								</div>
								<div class="notice-meta">
									<span class="notice-date">{___formatDate(notice.reg_date)}</span>
									<span class="notice-views">조회 {notice.view_cnt}</span>
								</div>
							</div>
							<!-- <div class="notice-content fr-view">
								<p>{@html ___decodeHtml(notice.content)}</p>
							</div> -->
						</article>
					{/each}
				{:else}
					<div class="no-results">
						<p>검색 결과가 없습니다.</p>
					</div>
				{/if}
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
		</div>
	</section>
</main>

<Footer />

<style>
	.notice-page {
		margin-top: 70px;
	}

	.hero-section {
		background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
		color: #fff;
		padding: 100px 0;
		text-align: center;
	}


	.hero-title {
		font-size: 3.5rem;
		font-weight: 700;
		margin: 0 0 10px 0;
	}

	.hero-subtitle {
		font-size: 1.5rem;
		font-weight: 300;
		margin: 0 0 30px 0;
		opacity: 0.9;
	}

	.hero-description {
		font-size: 1.2rem;
		line-height: 1.8;
		max-width: 600px;
		margin: 0 auto;
		opacity: 0.95;
	}

	.admin-actions {
		margin-top: 30px;
	}

	.write-notice-btn {
		background: rgba(255, 255, 255, 0.2);
		color: white;
		border: 2px solid rgba(255, 255, 255, 0.3);
		padding: 15px 30px;
		border-radius: 50px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		display: inline-flex;
		align-items: center;
		gap: 10px;
		backdrop-filter: blur(10px);
	}

	.write-notice-btn:hover {
		background: rgba(255, 255, 255, 0.3);
		border-color: rgba(255, 255, 255, 0.5);
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
	}

	.btn-icon {
		font-size: 1.1rem;
	}

	.search-filter-section {
		padding: 40px 0;
		background: #f8f9fa;
		border-bottom: 1px solid #e9ecef;
	}

	.search-filter-wrapper {
		display: flex;
		flex-direction: column;
		gap: 30px;
	}

	.search-box {
		display: flex;
		gap: 10px;
		max-width: 500px;
		margin: 0 auto;
	}

	.search-box input {
		flex: 1;
		padding: 15px 20px;
		border: 2px solid #e9ecef;
		border-radius: 8px;
		font-size: 1rem;
		transition: border-color 0.3s ease;
	}

	.search-box input:focus {
		outline: none;
		border-color: #28a745;
	}

	.search-box button {
		padding: 15px 30px;
		background: #28a745;
		color: #fff;
		border: none;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.3s ease;
	}

	.search-box button:hover {
		background: #20c997;
	}

	.category-filter {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: 15px;
		max-width: 800px;
		margin: 0 auto;
	}

	.category-btn {
		padding: 12px 16px;
		background: #fff;
		color: #666;
		border: 1px solid #e9ecef;
		border-radius: 8px;
		font-size: 0.95rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
		text-align: center;
		white-space: nowrap;
	}

	.category-btn:hover,
	.category-btn.active {
		background: #28a745;
		color: #fff;
		border-color: #28a745;
	}

	.notice-list-section {
		padding: 60px 0;
		background: #fff;
	}

	.notice-list {
		display: flex;
		flex-direction: column;
		gap: 20px;
		margin-bottom: 50px;
	}

	.notice-item {
		background: #fff;
		border: 1px solid #e9ecef;
		border-radius: 12px;
		padding: 25px 30px;
		transition: all 0.3s ease;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
	}

	.notice-item:hover {
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		transform: translateY(-2px);
	}

	.notice-item.important {
		border-left: 4px solid #dc3545;
		background: #fff5f5;
	}

	.notice-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 15px;
	}

	.notice-title-wrapper {
		display: flex;
		align-items: center;
		gap: 15px;
		flex: 1;
	}

	.important-badge {
		background: #dc3545;
		color: #fff;
		padding: 4px 12px;
		border-radius: 12px;
		font-size: 0.8rem;
		font-weight: 600;
		white-space: nowrap;
	}

	.notice-title {
		margin: 0;
		flex: 1;
	}

	.notice-title a {
		color: #333;
		text-decoration: none;
		font-size: 1.3rem;
		font-weight: 600;
		transition: color 0.3s ease;
	}

	.notice-title a:hover {
		color: #28a745;
	}

	.notice-meta {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 5px;
		font-size: 0.9rem;
		color: #666;
		white-space: nowrap;
	}

	.notice-content {
		color: #555;
		line-height: 1.6;
	}

	.notice-content p {
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.no-results {
		text-align: center;
		padding: 60px 20px;
		color: #666;
		font-size: 1.1rem;
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
		background: #28a745;
		color: #fff;
		border-color: #28a745;
	}

	.page-btn.active {
		background: #28a745;
		color: #fff;
		border-color: #28a745;
	}

	.page-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.hero-title {
			font-size: 2.5rem;
		}

		.hero-subtitle {
			font-size: 1.2rem;
		}

		.hero-description {
			font-size: 1rem;
		}

		.write-notice-btn {
			padding: 12px 24px;
			font-size: 0.9rem;
		}

		.search-box {
			flex-direction: column;
		}

		.category-filter {
			grid-template-columns: repeat(6, 1fr);
			gap: 4px;
		}

		.category-btn {
			padding: 10px 12px;
			font-size: 0.9rem;
		}

		.notice-header {
			flex-direction: column;
			gap: 15px;
		}

		.notice-title-wrapper {
			flex-direction: column;
			align-items: flex-start;
			gap: 10px;
		}

		.notice-meta {
			align-items: flex-start;
			flex-direction: row;
			gap: 15px;
		}

		.notice-item {
			padding: 20px;
		}

		.notice-title a {
			font-size: 1.1rem;
		}

		.pagination {
			flex-wrap: wrap;
		}

	}
</style>