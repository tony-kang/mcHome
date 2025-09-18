<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ___prjConst from '$prj/prjConst';

	let selectedCategory = $state('all');
	let searchQuery = $state('');
	let currentPage = $state(1);
	const itemsPerPage = 3;

	const notices = [
		{
			id: 1,
			title: "마인드코딩 PTI:CODE 검사 서비스 오픈 안내",
			content: `안녕하세요. 마인드코딩입니다.

마인드코딩의 핵심 서비스인 PTI:CODE 검사가 정식으로 오픈되었습니다. 

PTI:CODE는 개인의 심리재능을 정밀하게 진단하여 맞춤형 성장 전략을 제시하는 혁신적인 검사 도구입니다. 이 검사를 통해 다음과 같은 정보를 얻을 수 있습니다:

• 심리기질 분석: 개인의 타고난 성향과 특성 파악
• 심리기능 진단: 인지, 감정, 행동 패턴 분석  
• 심리재능 발견: 숨겨진 강점과 잠재력 발굴
• 성장 로드맵: 개인 맞춤형 발전 방향 제시

검사는 온라인으로 진행되며 약 30-40분 정도 소요됩니다. 검사 완료 후 전문가가 결과를 분석하여 상담을 통해 맞춤형 성장 전략을 제시합니다.

더 자세한 내용은 고객센터(${___prjConst.COMPANY.COUNSELING_TEL})로 문의해주시기 바랍니다.

감사합니다.`,
			category: "service",
			date: "2024-01-15",
			views: 1250,
			important: true
		},
		{
			id: 2,
			title: "2024년 1분기 자격과정 수강생 모집 공고",
			content: `마인드코딩 자격과정 수강생을 모집합니다.

■ 모집 과정

1. PTI:CODE 코치 과정
   - 대상: 상담·코칭 입문자, 교사, 학부모, 교육 관련 종사자
   - 기간: 2024년 2월 1일 ~ 3월 31일 (8주)
   - 수강료: 500,000원
   - 정원: 20명

2. PTI:학습·진로 프로 과정  
   - 대상: 코치과정 이수자
   - 기간: 2024년 2월 15일 ~ 4월 15일 (8주)
   - 수강료: 800,000원
   - 정원: 15명

3. PTI:관계·소통 프로 과정
   - 대상: 코치과정 이수자  
   - 기간: 2024년 3월 1일 ~ 4월 30일 (8주)
   - 수강료: 800,000원
   - 정원: 15명

■ 신청 방법
1. 홈페이지에서 온라인 신청
2. 서류 심사 (이력서, 자기소개서)
3. 면접 심사
4. 최종 합격자 발표

■ 신청 기간: 2024년 1월 10일 ~ 1월 25일 (16일간)

■ 혜택
- 공식 자격증 발급
- 전문가 네트워크 참여  
- 지속적인 교육 기회
- 실무 현장 지원

자세한 내용은 홈페이지 또는 고객센터로 문의해주시기 바랍니다.`,
			category: "education",
			date: "2024-01-10",
			views: 890,
			important: true
		},
		{
			id: 3,
			title: "온라인 상담 서비스 확대 운영 안내",
			content: `고객 편의를 위해 온라인 화상 상담 서비스를 확대 운영합니다.

■ 서비스 개요
전국 어디서나 편리하게 상담을 받으실 수 있도록 온라인 화상 상담 서비스를 확대 운영합니다.

■ 운영 시간
- 평일: 오전 9시 ~ 오후 6시
- 토요일: 오전 9시 ~ 오후 1시  
- 일요일 및 공휴일: 휴무

■ 상담 유형
1. PTI:CODE 검사 결과 해석 상담
2. 개인 맞춤형 성장 전략 상담
3. 학습·진로 상담
4. 관계·소통 상담
5. 비즈니스 코칭

■ 이용 방법
1. 홈페이지에서 온라인 상담 신청
2. 상담 일정 조율 (전화 또는 이메일)
3. 화상 상담 진행 (Zoom, Teams 등)
4. 상담 결과 및 후속 관리

■ 준비사항
- 안정적인 인터넷 연결
- 웹캠 및 마이크가 있는 PC 또는 모바일 기기
- 조용한 상담 환경

■ 상담료
- 1회 상담 (60분): 100,000원
- 패키지 상담 (3회): 250,000원
- 패키지 상담 (5회): 400,000원

문의: 고객센터 ${___prjConst.COMPANY.COUNSELING_TEL}`,
			category: "service",
			date: "2024-01-08",
			views: 650,
			important: false
		},
		{
			id: 4,
			title: "개인정보처리방침 개정 안내",
			content: "개인정보보호법 개정에 따라 개인정보처리방침이 변경되었습니다. 변경된 내용을 확인해주시기 바랍니다.",
			category: "policy",
			date: "2024-01-05",
			views: 420,
			important: false
		},
		{
			id: 5,
			title: "마인드코딩 웹사이트 리뉴얼 완료",
			content: "더 나은 서비스 제공을 위해 웹사이트를 전면 리뉴얼했습니다. 새로운 디자인과 기능으로 찾아뵙겠습니다.",
			category: "system",
			date: "2024-01-01",
			views: 1100,
			important: false
		},
		{
			id: 6,
			title: "연말연시 고객센터 운영시간 안내",
			content: "12월 30일부터 1월 2일까지 고객센터 운영이 중단됩니다. 긴급 문의는 이메일로 부탁드립니다.",
			category: "system",
			date: "2023-12-28",
			views: 380,
			important: false
		},
		{
			id: 7,
			title: "PTI:CODE 검사 결과 해석 가이드 업데이트",
			content: "더욱 정확하고 상세한 검사 결과 해석을 위한 가이드가 업데이트되었습니다. 기존 고객분들도 참고하시기 바랍니다.",
			category: "service",
			date: "2023-12-20",
			views: 720,
			important: false
		},
		{
			id: 8,
			title: "마인드코딩 연구소 설립 및 연구진 확대",
			content: "심리재능 연구의 전문성을 높이기 위해 마인드코딩 연구소를 설립하고 연구진을 확대했습니다.",
			category: "company",
			date: "2023-12-15",
			views: 560,
			important: false
		}
	];

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

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('ko-KR', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		});
	};

	const handleSearch = () => {
		currentPage = 1; // 검색 시 첫 페이지로 이동
	};

	const handleCategoryChange = (category) => {
		selectedCategory = category;
		currentPage = 1; // 카테고리 변경 시 첫 페이지로 이동
	};
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
									<span class="notice-date">{formatDate(notice.date)}</span>
									<span class="notice-views">조회 {notice.views}</span>
								</div>
							</div>
							<div class="notice-content">
								<p>{notice.content}</p>
							</div>
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