<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>진로 캠프 - 마인드코딩 | PTI:CODE 기반 진로 탐색 프로그램</title>
	<meta name="description" content="PTI:CODE 기반 진로 캠프로 개인의 재능과 적성을 발견하고 미래 진로를 설계해보세요. 체계적인 진로 탐색과 설계 과정을 제공합니다." />
</svelte:head>

<Header />

<main class="career-camp-page">
	<!-- Hero Section -->
	<section class="hero-section">
		<div class="container">
			<div class="hero-content">
				<h1 class="hero-title">진로 캠프</h1>
				<p class="hero-subtitle">PTI:CODE 기반 진로 탐색 프로그램</p>
				<p class="hero-description">
					개인의 재능과 적성을 발견하고<br>
					미래 진로를 설계해보세요.
				</p>
			</div>
		</div>
	</section>

	<!-- Program Overview -->
	<section class="overview-section">
		<div class="container">
			<div class="overview-content">
				<h2>진로 캠프란?</h2>
				<p>
					진로 캠프는 PTI:CODE 검사를 통해 개인의 심리재능과 성향을 분석하고, 
					이를 바탕으로 적합한 진로 분야를 탐색하고 설계하는 집중 프로그램입니다. 
					단순한 직업 소개가 아닌, 개인의 타고난 재능과 성향에 맞는 진로 로드맵을 
					체계적으로 구축하는 맞춤형 진로 설계 서비스입니다.
				</p>
			</div>
		</div>
	</section>

	<!-- Program Features -->
	<section class="features-section">
		<div class="container">
			<h2>프로그램 특징</h2>
			<div class="features-grid">
				<div class="feature-card">
					<div class="feature-icon">🎯</div>
					<h3>개인별 재능 분석</h3>
					<p>PTI:CODE 검사를 통해 개인의 강점, 관심사, 성향을 종합적으로 분석합니다.</p>
				</div>
				<div class="feature-card">
					<div class="feature-icon">🗺️</div>
					<h3>진로 분야 탐색</h3>
					<p>분석 결과를 바탕으로 개인에게 적합한 다양한 진로 분야를 탐색합니다.</p>
				</div>
				<div class="feature-card">
					<div class="feature-icon">📋</div>
					<h3>구체적 진로 설계</h3>
					<p>선택한 진로 분야에 대한 구체적인 로드맵과 실행 계획을 수립합니다.</p>
				</div>
				<div class="feature-card">
					<div class="feature-icon">🚀</div>
					<h3>실행 지원</h3>
					<p>설계된 진로 계획의 실행을 위한 구체적인 가이드와 지원을 제공합니다.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Target Audience -->
	<section class="target-section">
		<div class="container">
			<h2>대상</h2>
			<div class="target-grid">
				<div class="target-card">
					<h3>중학생</h3>
					<ul>
						<li>고등학교 진학 계획</li>
						<li>진로 분야 탐색</li>
						<li>기본적인 진로 인식</li>
					</ul>
				</div>
				<div class="target-card">
					<h3>고등학생</h3>
					<ul>
						<li>대학 전공 선택</li>
						<li>구체적 진로 목표 설정</li>
						<li>입시 전략 수립</li>
					</ul>
				</div>
				<div class="target-card">
					<h3>대학생</h3>
					<ul>
						<li>전공과 진로 연결</li>
						<li>취업 준비 전략</li>
						<li>장기적 커리어 설계</li>
					</ul>
				</div>
				<div class="target-card">
					<h3>직장인</h3>
					<ul>
						<li>커리어 전환</li>
						<li>직업 만족도 향상</li>
						<li>새로운 도전 준비</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<!-- Program Structure -->
	<section class="structure-section">
		<div class="container">
			<h2>프로그램 구성</h2>
			<div class="structure-timeline">
				<div class="timeline-item">
					<div class="timeline-number">1</div>
					<div class="timeline-content">
						<h3>재능 및 성향 분석</h3>
						<p>PTI:CODE 검사 실시 및 개인별 재능, 성향, 관심사 분석</p>
						<span class="timeline-duration">1일</span>
					</div>
				</div>
				<div class="timeline-item">
					<div class="timeline-number">2</div>
					<div class="timeline-content">
						<h3>진로 분야 탐색</h3>
						<p>분석 결과를 바탕으로 적합한 진로 분야 발굴 및 탐색</p>
						<span class="timeline-duration">1일</span>
					</div>
				</div>
				<div class="timeline-item">
					<div class="timeline-number">3</div>
					<div class="timeline-content">
						<h3>진로 설계 및 계획</h3>
						<p>선택한 진로 분야에 대한 구체적인 로드맵 및 실행 계획 수립</p>
						<span class="timeline-duration">2일</span>
					</div>
				</div>
				<div class="timeline-item">
					<div class="timeline-number">4</div>
					<div class="timeline-content">
						<h3>실행 가이드 제공</h3>
						<p>설계된 진로 계획의 실행을 위한 구체적인 가이드 및 지원 방안 제시</p>
						<span class="timeline-duration">1일</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Career Areas -->
	<section class="career-areas-section">
		<div class="container">
			<h2>탐색 가능한 진로 분야</h2>
			<div class="career-grid">
				<div class="career-category">
					<h3>인문·사회 분야</h3>
					<ul>
						<li>언어·문학</li>
						<li>역사·철학</li>
						<li>심리학</li>
						<li>사회학</li>
						<li>정치·외교</li>
					</ul>
				</div>
				<div class="career-category">
					<h3>자연·공학 분야</h3>
					<ul>
						<li>수학·통계</li>
						<li>물리·화학</li>
						<li>생물·의학</li>
						<li>컴퓨터·IT</li>
						<li>공학·기술</li>
					</ul>
				</div>
				<div class="career-category">
					<h3>예술·디자인 분야</h3>
					<ul>
						<li>미술·조형</li>
						<li>음악·공연</li>
						<li>디자인</li>
						<li>영상·방송</li>
						<li>게임·애니메이션</li>
					</ul>
				</div>
				<div class="career-category">
					<h3>비즈니스 분야</h3>
					<ul>
						<li>경영·경제</li>
						<li>마케팅</li>
						<li>금융·회계</li>
						<li>컨설팅</li>
						<li>창업·사업</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<!-- Benefits -->
	<section class="benefits-section">
		<div class="container">
			<h2>기대 효과</h2>
			<div class="benefits-grid">
				<div class="benefit-item">
					<h3>명확한 진로 방향</h3>
					<p>개인의 재능과 성향에 맞는 구체적이고 명확한 진로 방향을 제시합니다.</p>
				</div>
				<div class="benefit-item">
					<h3>자신감 향상</h3>
					<p>개인의 강점을 인식하고 활용할 수 있는 진로를 찾아 자신감이 향상됩니다.</p>
				</div>
				<div class="benefit-item">
					<h3>효율적인 준비</h3>
					<p>목표가 명확해져 진로 준비 과정이 더욱 효율적이고 체계적이 됩니다.</p>
				</div>
				<div class="benefit-item">
					<h3>지속적인 동기</h3>
					<p>개인의 성향에 맞는 진로로 지속적인 동기와 만족감을 얻을 수 있습니다.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Success Stories -->
	<section class="stories-section">
		<div class="container">
			<h2>성공 사례</h2>
			<div class="stories-grid">
				<div class="story-card">
					<div class="story-content">
						<p>"PTI:CODE 검사를 통해 제가 수학과 과학에 강한 재능을 가지고 있다는 것을 알게 되었습니다. 이를 바탕으로 공학 분야로 진로를 설정하고, 현재는 원하는 대학의 공학과에 진학했습니다."</p>
					</div>
					<div class="story-author">
						<strong>김○○</strong> - 고등학교 3학년
					</div>
				</div>
				<div class="story-card">
					<div class="story-content">
						<p>"진로 캠프를 통해 제가 사람들과 소통하는 것을 좋아하고 리더십이 있다는 것을 발견했습니다. 이를 바탕으로 경영학과로 진로를 변경하고, 현재는 마케팅 분야에서 일하고 있습니다."</p>
					</div>
					<div class="story-author">
						<strong>이○○</strong> - 대학생
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="cta-section">
		<div class="container">
			<div class="cta-content">
				<h2>진로 캠프에 참여하세요</h2>
				<p>개인의 재능을 발견하고 미래 진로를 설계해보세요.</p>
				<div class="cta-buttons">
					<a href="/contact" class="btn-primary">상담 신청</a>
					<a href="/services/pti-code" class="btn-secondary">PTI:CODE 검사 알아보기</a>
				</div>
			</div>
		</div>
	</section>
</main>

<Footer />

<style>
	.career-camp-page {
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

	.overview-section {
		padding: 80px 0;
		background: #fff;
	}

	.overview-content {
		max-width: 800px;
		margin: 0 auto;
		text-align: center;
	}

	.overview-content h2 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #333;
		margin: 0 0 30px 0;
	}

	.overview-content p {
		font-size: 1.2rem;
		line-height: 1.8;
		color: #555;
	}

	.features-section {
		padding: 80px 0;
		background: #f8f9fa;
	}

	.features-section h2 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #333;
		text-align: center;
		margin: 0 0 60px 0;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 30px;
	}

	.feature-card {
		background: #fff;
		padding: 40px 30px;
		border-radius: 12px;
		text-align: center;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
	}

	.feature-card:hover {
		transform: translateY(-5px);
	}

	.feature-icon {
		font-size: 3rem;
		margin-bottom: 20px;
	}

	.feature-card h3 {
		font-size: 1.5rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 15px 0;
	}

	.feature-card p {
		color: #666;
		line-height: 1.6;
	}

	.target-section {
		padding: 80px 0;
		background: #fff;
	}

	.target-section h2 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #333;
		text-align: center;
		margin: 0 0 60px 0;
	}

	.target-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 30px;
	}

	.target-card {
		background: #f8f9fa;
		padding: 30px;
		border-radius: 12px;
		border-left: 4px solid #28a745;
	}

	.target-card h3 {
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 20px 0;
	}

	.target-card ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.target-card li {
		padding: 8px 0;
		color: #555;
		position: relative;
		padding-left: 20px;
	}

	.target-card li::before {
		content: "✓";
		position: absolute;
		left: 0;
		color: #28a745;
		font-weight: bold;
	}

	.structure-section {
		padding: 80px 0;
		background: #f8f9fa;
	}

	.structure-section h2 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #333;
		text-align: center;
		margin: 0 0 60px 0;
	}

	.structure-timeline {
		max-width: 800px;
		margin: 0 auto;
	}

	.timeline-item {
		display: flex;
		align-items: center;
		margin-bottom: 40px;
		background: #fff;
		padding: 30px;
		border-radius: 12px;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
	}

	.timeline-number {
		width: 60px;
		height: 60px;
		background: #28a745;
		color: #fff;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		font-weight: 700;
		margin-right: 30px;
		flex-shrink: 0;
	}

	.timeline-content {
		flex: 1;
	}

	.timeline-content h3 {
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 10px 0;
	}

	.timeline-content p {
		color: #555;
		margin: 0 0 10px 0;
	}

	.timeline-duration {
		background: #e9ecef;
		color: #666;
		padding: 4px 12px;
		border-radius: 12px;
		font-size: 0.9rem;
		font-weight: 500;
	}

	.career-areas-section {
		padding: 80px 0;
		background: #fff;
	}

	.career-areas-section h2 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #333;
		text-align: center;
		margin: 0 0 60px 0;
	}

	.career-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 30px;
	}

	.career-category {
		background: #f8f9fa;
		padding: 30px;
		border-radius: 12px;
		border-top: 4px solid #28a745;
	}

	.career-category h3 {
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 20px 0;
	}

	.career-category ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.career-category li {
		padding: 6px 0;
		color: #555;
		position: relative;
		padding-left: 15px;
	}

	.career-category li::before {
		content: "•";
		position: absolute;
		left: 0;
		color: #28a745;
		font-weight: bold;
	}

	.benefits-section {
		padding: 80px 0;
		background: #f8f9fa;
	}

	.benefits-section h2 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #333;
		text-align: center;
		margin: 0 0 60px 0;
	}

	.benefits-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 30px;
	}

	.benefit-item {
		text-align: center;
		padding: 30px;
		background: #fff;
		border-radius: 12px;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
	}

	.benefit-item h3 {
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 15px 0;
	}

	.benefit-item p {
		color: #555;
		line-height: 1.6;
	}

	.stories-section {
		padding: 80px 0;
		background: #fff;
	}

	.stories-section h2 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #333;
		text-align: center;
		margin: 0 0 60px 0;
	}

	.stories-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 30px;
	}

	.story-card {
		background: #f8f9fa;
		padding: 30px;
		border-radius: 12px;
		border-left: 4px solid #28a745;
	}

	.story-content p {
		font-style: italic;
		color: #555;
		line-height: 1.6;
		margin: 0 0 20px 0;
	}

	.story-author {
		color: #666;
		font-size: 0.9rem;
	}

	.cta-section {
		padding: 80px 0;
		background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
		color: #fff;
		text-align: center;
	}

	.cta-content h2 {
		font-size: 2.5rem;
		font-weight: 700;
		margin: 0 0 20px 0;
	}

	.cta-content p {
		font-size: 1.2rem;
		margin: 0 0 40px 0;
		opacity: 0.9;
	}

	.cta-buttons {
		display: flex;
		gap: 20px;
		justify-content: center;
		flex-wrap: wrap;
	}

	.btn-primary,
	.btn-secondary {
		padding: 15px 30px;
		border-radius: 25px;
		text-decoration: none;
		font-weight: 600;
		font-size: 1.1rem;
		transition: all 0.3s ease;
	}

	.btn-primary {
		background: #fff;
		color: #28a745;
	}

	.btn-primary:hover {
		background: #f8f9fa;
		transform: translateY(-2px);
	}

	.btn-secondary {
		background: transparent;
		color: #fff;
		border: 2px solid #fff;
	}

	.btn-secondary:hover {
		background: #fff;
		color: #28a745;
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

		.overview-content h2,
		.features-section h2,
		.target-section h2,
		.structure-section h2,
		.career-areas-section h2,
		.benefits-section h2,
		.stories-section h2,
		.cta-content h2 {
			font-size: 2rem;
		}

		.timeline-item {
			flex-direction: column;
			text-align: center;
		}

		.timeline-number {
			margin-right: 0;
			margin-bottom: 20px;
		}

		.stories-grid {
			grid-template-columns: 1fr;
		}

		.cta-buttons {
			flex-direction: column;
			align-items: center;
		}

	}
</style>
