<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/stores';

	// 공지사항 데이터 (실제로는 API에서 가져올 데이터)
	const notices = [
		{
			id: 1,
			title: "마인드코딩 PTI:CODE 검사 서비스 오픈 안내",
			content: `
				<p>안녕하세요. 마인드코딩입니다.</p>
				
				<p>마인드코딩의 핵심 서비스인 PTI:CODE 검사가 정식으로 오픈되었습니다.</p>
				
				<h3>PTI:CODE 검사란?</h3>
				<p>PTI:CODE는 개인의 심리재능을 정밀하게 진단하여 맞춤형 성장 전략을 제시하는 혁신적인 검사 도구입니다. 이 검사를 통해 다음과 같은 정보를 얻을 수 있습니다:</p>
				
				<ul>
					<li><strong>심리기질 분석:</strong> 개인의 타고난 성향과 특성 파악</li>
					<li><strong>심리기능 진단:</strong> 인지, 감정, 행동 패턴 분석</li>
					<li><strong>심리재능 발견:</strong> 숨겨진 강점과 잠재력 발굴</li>
					<li><strong>성장 로드맵:</strong> 개인 맞춤형 발전 방향 제시</li>
				</ul>
				
				<h3>서비스 특징</h3>
				<p>PTI:CODE 검사는 다음과 같은 특징을 가지고 있습니다:</p>
				
				<ul>
					<li>과학적 근거에 기반한 정확한 진단</li>
					<li>개인별 맞춤형 결과 해석</li>
					<li>전문가 상담을 통한 심화 분석</li>
					<li>실생활 적용 가능한 구체적 가이드</li>
				</ul>
				
				<h3>이용 방법</h3>
				<ol>
					<li>홈페이지에서 검사 신청</li>
					<li>온라인 검사 진행 (약 30-40분)</li>
					<li>전문가 분석 및 결과 해석</li>
					<li>개인별 맞춤 상담 제공</li>
				</ol>
				
				<p>더 자세한 내용은 고객센터(02-1234-5678)로 문의해주시기 바랍니다.</p>
				
				<p>감사합니다.</p>
			`,
			category: "service",
			date: "2024-01-15",
			views: 1250,
			important: true,
			author: "마인드코딩"
		},
		{
			id: 2,
			title: "2024년 1분기 자격과정 수강생 모집 공고",
			content: `
				<p>마인드코딩 자격과정 수강생을 모집합니다.</p>
				
				<h3>모집 과정</h3>
				
				<h4>1. PTI:CODE 코치 과정</h4>
				<ul>
					<li><strong>대상:</strong> 상담·코칭 입문자, 교사, 학부모, 교육 관련 종사자</li>
					<li><strong>기간:</strong> 2024년 2월 1일 ~ 3월 31일 (8주)</li>
					<li><strong>수강료:</strong> 500,000원</li>
					<li><strong>정원:</strong> 20명</li>
				</ul>
				
				<h4>2. PTI:학습·진로 프로 과정</h4>
				<ul>
					<li><strong>대상:</strong> 코치과정 이수자</li>
					<li><strong>기간:</strong> 2024년 2월 15일 ~ 4월 15일 (8주)</li>
					<li><strong>수강료:</strong> 800,000원</li>
					<li><strong>정원:</strong> 15명</li>
				</ul>
				
				<h4>3. PTI:관계·소통 프로 과정</h4>
				<ul>
					<li><strong>대상:</strong> 코치과정 이수자</li>
					<li><strong>기간:</strong> 2024년 3월 1일 ~ 4월 30일 (8주)</li>
					<li><strong>수강료:</strong> 800,000원</li>
					<li><strong>정원:</strong> 15명</li>
				</ul>
				
				<h3>신청 방법</h3>
				<ol>
					<li>홈페이지에서 온라인 신청</li>
					<li>서류 심사 (이력서, 자기소개서)</li>
					<li>면접 심사</li>
					<li>최종 합격자 발표</li>
				</ol>
				
				<h3>신청 기간</h3>
				<p>2024년 1월 10일 ~ 1월 25일 (16일간)</p>
				
				<h3>혜택</h3>
				<ul>
					<li>공식 자격증 발급</li>
					<li>전문가 네트워크 참여</li>
					<li>지속적인 교육 기회</li>
					<li>실무 현장 지원</li>
				</ul>
				
				<p>자세한 내용은 홈페이지 또는 고객센터로 문의해주시기 바랍니다.</p>
			`,
			category: "education",
			date: "2024-01-10",
			views: 890,
			important: true,
			author: "마인드코딩 교육팀"
		},
		{
			id: 3,
			title: "온라인 상담 서비스 확대 운영 안내",
			content: `
				<p>고객 편의를 위해 온라인 화상 상담 서비스를 확대 운영합니다.</p>
				
				<h3>서비스 개요</h3>
				<p>전국 어디서나 편리하게 상담을 받으실 수 있도록 온라인 화상 상담 서비스를 확대 운영합니다.</p>
				
				<h3>운영 시간</h3>
				<ul>
					<li>평일: 오전 9시 ~ 오후 6시</li>
					<li>토요일: 오전 9시 ~ 오후 1시</li>
					<li>일요일 및 공휴일: 휴무</li>
				</ul>
				
				<h3>상담 유형</h3>
				<ol>
					<li>PTI:CODE 검사 결과 해석 상담</li>
					<li>개인 맞춤형 성장 전략 상담</li>
					<li>학습·진로 상담</li>
					<li>관계·소통 상담</li>
					<li>비즈니스 코칭</li>
				</ol>
				
				<h3>이용 방법</h3>
				<ol>
					<li>홈페이지에서 온라인 상담 신청</li>
					<li>상담 일정 조율 (전화 또는 이메일)</li>
					<li>화상 상담 진행 (Zoom, Teams 등)</li>
					<li>상담 결과 및 후속 관리</li>
				</ol>
				
				<h3>준비사항</h3>
				<ul>
					<li>안정적인 인터넷 연결</li>
					<li>웹캠 및 마이크가 있는 PC 또는 모바일 기기</li>
					<li>조용한 상담 환경</li>
				</ul>
				
				<h3>상담료</h3>
				<ul>
					<li>1회 상담 (60분): 100,000원</li>
					<li>패키지 상담 (3회): 250,000원</li>
					<li>패키지 상담 (5회): 400,000원</li>
				</ul>
				
				<p>문의: 고객센터 02-1234-5678</p>
			`,
			category: "service",
			date: "2024-01-08",
			views: 650,
			important: false,
			author: "마인드코딩 상담팀"
		}
	];

	// URL에서 ID 가져오기
	const noticeId = parseInt($page.params.id || '0');
	const notice = notices.find(n => n.id === noticeId);

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('ko-KR', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		});
	};

	const formatViews = (views) => {
		return views.toLocaleString();
	};
</script>

<svelte:head>
	<title>{notice ? notice.title : '공지사항'} - 마인드코딩</title>
	<meta name="description" content={notice ? notice.content.replace(/<[^>]*>/g, '').substring(0, 150) : '마인드코딩 공지사항'} />
</svelte:head>

<Header />

<main class="notice-detail-page">
	{#if notice}
		<!-- Breadcrumb -->
		<section class="breadcrumb-section">
			<div class="container">
				<nav class="breadcrumb">
					<a href="/">홈</a>
					<span class="separator">></span>
					<a href="/notice">공지사항</a>
					<span class="separator">></span>
					<span class="current">상세보기</span>
				</nav>
			</div>
		</section>

		<!-- Notice Detail -->
		<section class="notice-detail-section">
			<div class="container">
				<article class="notice-detail">
					<!-- Notice Header -->
					<header class="notice-header">
						<div class="notice-title-wrapper">
							{#if notice.important}
								<span class="important-badge">중요</span>
							{/if}
							<h1 class="notice-title">{notice.title}</h1>
						</div>
						<div class="notice-meta">
							<div class="meta-item">
								<span class="meta-label">작성자:</span>
								<span class="meta-value">{notice.author}</span>
							</div>
							<div class="meta-item">
								<span class="meta-label">작성일:</span>
								<span class="meta-value">{formatDate(notice.date)}</span>
							</div>
							<div class="meta-item">
								<span class="meta-label">조회수:</span>
								<span class="meta-value">{formatViews(notice.views)}</span>
							</div>
						</div>
					</header>

					<!-- Notice Content -->
					<div class="notice-content">
						{@html notice.content}
					</div>

					<!-- Notice Footer -->
					<footer class="notice-footer">
						<div class="notice-actions">
							<a href="/notice" class="btn-secondary">목록으로</a>
							<button class="btn-primary" onclick={() => window.print()}>인쇄</button>
						</div>
					</footer>
				</article>

				<!-- Related Notices -->
				<section class="related-notices">
					<h2>관련 공지사항</h2>
					<div class="related-list">
						{#each notices.filter(n => n.category === notice.category && n.id !== notice.id).slice(0, 3) as relatedNotice}
							<div class="related-item">
								<a href="/notice/{relatedNotice.id}">
									<h3>{relatedNotice.title}</h3>
									<span class="related-date">{formatDate(relatedNotice.date)}</span>
								</a>
							</div>
						{/each}
					</div>
				</section>
			</div>
		</section>
	{:else}
		<!-- Not Found -->
		<section class="not-found-section">
			<div class="container">
				<div class="not-found-content">
					<h1>공지사항을 찾을 수 없습니다</h1>
					<p>요청하신 공지사항이 존재하지 않거나 삭제되었습니다.</p>
					<a href="/notice" class="btn-primary">공지사항 목록으로</a>
				</div>
			</div>
		</section>
	{/if}
</main>

<Footer />

<style>
	.notice-detail-page {
		margin-top: 70px;
	}

	.breadcrumb-section {
		padding: 20px 0;
		background: #f8f9fa;
		border-bottom: 1px solid #e9ecef;
	}

	.container {
		max-width: 1000px;
		margin: 0 auto;
		padding: 0 20px;
	}

	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 0.9rem;
		color: #666;
	}

	.breadcrumb a {
		color: #666;
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.breadcrumb a:hover {
		color: #28a745;
	}

	.separator {
		color: #ccc;
	}

	.current {
		color: #333;
		font-weight: 500;
	}

	.notice-detail-section {
		padding: 60px 0;
		background: #fff;
	}

	.notice-detail {
		background: #fff;
		border: 1px solid #e9ecef;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}

	.notice-header {
		padding: 40px;
		border-bottom: 1px solid #e9ecef;
		background: #f8f9fa;
	}

	.notice-title-wrapper {
		display: flex;
		align-items: center;
		gap: 20px;
		margin-bottom: 20px;
	}

	.important-badge {
		background: #dc3545;
		color: #fff;
		padding: 6px 16px;
		border-radius: 16px;
		font-size: 0.9rem;
		font-weight: 600;
		white-space: nowrap;
	}

	.notice-title {
		font-size: 2rem;
		font-weight: 700;
		color: #333;
		margin: 0;
		line-height: 1.4;
	}

	.notice-meta {
		display: flex;
		gap: 30px;
		flex-wrap: wrap;
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.meta-label {
		color: #666;
		font-weight: 500;
	}

	.meta-value {
		color: #333;
		font-weight: 600;
	}

	.notice-content {
		padding: 40px;
		line-height: 1.8;
		color: #333;
	}

	.notice-content h3 {
		font-size: 1.5rem;
		font-weight: 600;
		color: #333;
		margin: 30px 0 15px 0;
		padding-bottom: 10px;
		border-bottom: 2px solid #28a745;
	}

	.notice-content h4 {
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
		margin: 25px 0 10px 0;
	}

	.notice-content p {
		margin: 0 0 15px 0;
	}

	.notice-content ul,
	.notice-content ol {
		margin: 0 0 15px 0;
		padding-left: 25px;
	}

	.notice-content li {
		margin-bottom: 8px;
	}

	.notice-content strong {
		font-weight: 600;
		color: #333;
	}

	.notice-footer {
		padding: 30px 40px;
		border-top: 1px solid #e9ecef;
		background: #f8f9fa;
	}

	.notice-actions {
		display: flex;
		gap: 15px;
		justify-content: center;
	}

	.btn-primary,
	.btn-secondary {
		padding: 12px 30px;
		border-radius: 6px;
		text-decoration: none;
		font-weight: 600;
		font-size: 1rem;
		transition: all 0.3s ease;
		border: none;
		cursor: pointer;
	}

	.btn-primary {
		background: #28a745;
		color: #fff;
	}

	.btn-primary:hover {
		background: #20c997;
		transform: translateY(-2px);
	}

	.btn-secondary {
		background: #6c757d;
		color: #fff;
	}

	.btn-secondary:hover {
		background: #5a6268;
		transform: translateY(-2px);
	}

	.related-notices {
		margin-top: 60px;
	}

	.related-notices h2 {
		font-size: 1.8rem;
		font-weight: 700;
		color: #333;
		margin: 0 0 30px 0;
		padding-bottom: 15px;
		border-bottom: 2px solid #28a745;
	}

	.related-list {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	.related-item {
		background: #fff;
		border: 1px solid #e9ecef;
		border-radius: 8px;
		overflow: hidden;
		transition: all 0.3s ease;
	}

	.related-item:hover {
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
		transform: translateY(-2px);
	}

	.related-item a {
		display: block;
		padding: 20px;
		text-decoration: none;
		color: inherit;
	}

	.related-item h3 {
		font-size: 1.1rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 10px 0;
		line-height: 1.4;
	}

	.related-item h3:hover {
		color: #28a745;
	}

	.related-date {
		font-size: 0.9rem;
		color: #666;
	}

	.not-found-section {
		padding: 100px 0;
		background: #fff;
		text-align: center;
	}

	.not-found-content h1 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #333;
		margin: 0 0 20px 0;
	}

	.not-found-content p {
		font-size: 1.2rem;
		color: #666;
		margin: 0 0 40px 0;
	}

	/* Print Styles */
	@media print {
		.notice-detail-page {
			margin-top: 0;
		}

		.breadcrumb-section,
		.notice-footer,
		.related-notices {
			display: none;
		}

		.notice-detail {
			box-shadow: none;
			border: none;
		}

		.notice-header {
			background: #fff;
		}
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.notice-title {
			font-size: 1.5rem;
		}

		.notice-title-wrapper {
			flex-direction: column;
			align-items: flex-start;
			gap: 15px;
		}

		.notice-meta {
			flex-direction: column;
			gap: 15px;
		}

		.notice-header,
		.notice-content,
		.notice-footer {
			padding: 25px 20px;
		}

		.notice-actions {
			flex-direction: column;
		}

		.container {
			padding: 0 15px;
		}
	}
</style>
