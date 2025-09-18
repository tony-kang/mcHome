<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Services - 마인드코딩 | PTI:CODE 기반 맞춤형 성장 서비스</title>
	<meta name="description" content="PTI:CODE 심리재능 진단부터 학습진로, 관계소통, 비즈니스까지 삶의 전 영역을 아우르는 마인드코딩의 종합 서비스를 만나보세요." />
</svelte:head>

<Header />

<main class="services-page">
	<!-- Hero Section -->
	<section class="hero-section">
		<div class="container">
			<div class="hero-content">
				<h1 class="hero-title">Services</h1>
				<p class="hero-subtitle">PTI:CODE 기반 맞춤형 성장 서비스</p>
				<p class="hero-description">
					개인의 심리재능을 진단하고, 학습·진로·관계·비즈니스 등<br>
					삶의 전 영역에서 활용할 수 있는 맞춤형 성장 전략을 제시합니다.
				</p>
			</div>
		</div>
	</section>

	<!-- Services Overview -->
	<section class="services-overview">
		<div class="container">
			<div class="services-grid">
				<div class="service-card">
					<div class="service-icon">🧠</div>
					<h3>PTI:CODE</h3>
					<p>심리재능 진단 도구</p>
					<a href="/services/pti-code" class="service-link">자세히 보기</a>
				</div>
				<div class="service-card">
					<div class="service-icon">💝</div>
					<h3>심리재능</h3>
					<p>멘탈코칭 & 상담</p>
					<a href="/services/psychological" class="service-link">자세히 보기</a>
				</div>
				<div class="service-card">
					<div class="service-icon">📚</div>
					<h3>학습진로</h3>
					<p>학습컨설팅 & 입시전략</p>
					<a href="/services/learning-career" class="service-link">자세히 보기</a>
				</div>
				<div class="service-card">
					<div class="service-icon">🤝</div>
					<h3>관계소통</h3>
					<p>소통 & 협력 프로그램</p>
					<a href="/services/relationship" class="service-link">자세히 보기</a>
				</div>
				<!-- <div class="service-card">
					<div class="service-icon">💼</div>
					<h3>비즈니스</h3>
					<p>커리어 & 조직 컨설팅</p>
					<a href="/services/business" class="service-link">자세히 보기</a>
				</div> -->
			</div>
		</div>
	</section>

	<!-- PTI:CODE Introduction -->
	<section class="pti-intro">
		<div class="container">
			<div class="section-header">
				<h2>PTI:CODE</h2>
				<p class="section-subtitle">Psychometric Talent Inventory</p>
			</div>
			<div class="pti-content">
				<div class="pti-description">
					<p>
						PTI(Psychometric Talent Inventory)는 개인이 타고난 심리기질·심리기능·심리재능을 종합적으로 진단하는 심리재능 진단 도구입니다.
					</p>
					<p>
						사람은 누구나 고유한 심리코드(CODE)를 가지고 태어나며, PTI는 이 코드를 해석하여 학습, 진로, 관계, 비즈니스 등 삶의 전 영역에서 활용할 수 있는 맞춤형 성장 전략을 제시합니다.
					</p>
				</div>
				<div class="pti-targets">
					<div class="target-group">
						<h4>영유아</h4>
						<p>심리기질 행동특성 검사</p>
					</div>
					<div class="target-group">
						<h4>아동·청소년</h4>
						<p>학습·진로·입시 전략 검사</p>
					</div>
					<div class="target-group">
						<h4>취준생/직장인/창업가</h4>
						<p>커리어·브랜딩·세일즈 관리 검사</p>
					</div>
					<div class="target-group">
						<h4>학부모</h4>
						<p>양육·소통 검사</p>
					</div>
					<div class="target-group">
						<h4>성인</h4>
						<p>부부,연예,재회 심리소통 검사</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Service Categories -->
	<section class="service-categories">
		<div class="container">
			<div class="categories-grid">
				<div class="category-card">
					<div class="category-header">
						<div class="category-icon">💝</div>
						<h3>심리재능</h3>
					</div>
					<div class="category-content">
						<ul>
							<li>영유아: 정서발달·행동수정 지원</li>
							<li>아동·청소년: 멘탈코칭 & 자기이해 상담</li>
							<li>학부모: 부모·자녀 심리재능 코칭</li>
							<li>성인: 자기이해 재능경영코칭</li>
							<li>워크숍: 마음회복 프로그램</li>
						</ul>
					</div>
				</div>

				<div class="category-card">
					<div class="category-header">
						<div class="category-icon">📚</div>
						<h3>학습진로</h3>
					</div>
					<div class="category-content">
						<ul>
							<li>아동·청소년: 학습컨설팅</li>
							<li>아동·청소년: 입시컨설팅</li>
							<li>취업준비생: 커리어 매니지먼트</li>
							<li>캠프: 학습 캠프</li>
							<li>캠프: 진로 캠프</li>
						</ul>
					</div>
				</div>

				<!-- <div class="category-card">
					<div class="category-header">
						<div class="category-icon">🤝</div>
						<h3>관계소통</h3>
					</div>
					<div class="category-content">
						<ul>
							<li>학부모: 부모·자녀 소통</li>
							<li>성인: 신혼부부·연애·재회 상담</li>
							<li>조직/기업: 팀빌딩 프로그램</li>
							<li>워크숍: 소통·협력 프로그램</li>
						</ul>
					</div>
				</div>

				<div class="category-card">
					<div class="category-header">
						<div class="category-icon">💼</div>
						<h3>비즈니스</h3>
					</div>
					<div class="category-content">
						<ul>
							<li>취준생: 취업역량 강화</li>
							<li>직장인: 성과·커리어 경영</li>
							<li>기업: 조직문화·리더십·세일즈 코칭</li>
							<li>창업: 1인기업 브랜딩·세일즈 코칭</li>
							<li>워크숍: 직무별 맞춤 성장 프로그램</li>
						</ul>
					</div>
				</div> -->

			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="cta-section">
		<div class="container">
			<div class="cta-content">
				<h2>맞춤형 성장 서비스를 시작하세요</h2>
				<p>PTI:CODE 진단을 통해 당신만의 심리재능을 발견하고, 삶의 전 영역에서 활용해보세요.</p>
				<div class="cta-buttons">
					<a href="/contact" class="btn-primary">상담 신청</a>
					<a href="/services/certification" class="btn-secondary">자격과정 보기</a>
					<a href="/about" class="btn-secondary">더 알아보기</a>
				</div>
			</div>
		</div>
	</section>
</main>

<Footer />

<style>
	/* CSS 모듈 방식 - 더 깔끔하고 유지보수하기 좋음 */
	.services-page {
		margin-top: 70px;
	}

	.hero-section {
		background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
		color: #fff;
		padding: 100px 0;
		text-align: center;
	}

	.hero-title {
		font-size: 3.5rem;
		font-weight: 700;
		margin: 0 0 20px 0;
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
		max-width: 800px;
		margin: 0 auto;
		opacity: 0.95;
	}

	.services-overview {
		padding: 80px 0;
		background: #f8f9fa;
	}

	.services-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 30px;
	}

	.service-card {
		background: #fff;
		padding: 40px 30px;
		border-radius: 16px;
		text-align: center;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.service-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
	}

	.service-icon {
		font-size: 3rem;
		margin-bottom: 20px;
	}

	.service-card :global(h3) {
		font-size: 1.5rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 10px 0;
	}

	.service-card :global(p) {
		color: #666;
		margin: 0 0 20px 0;
	}

	.service-link {
		display: inline-block;
		padding: 10px 20px;
		background: #007bff;
		color: #fff;
		text-decoration: none;
		border-radius: 25px;
		font-weight: 500;
		transition: background 0.3s ease;
	}

	.service-link:hover {
		background: #0056b3;
	}

	.pti-intro {
		padding: 80px 0;
		background: #fff;
	}

	.section-header {
		text-align: center;
		margin-bottom: 60px;
	}

	.section-header :global(h2) {
		font-size: 2.5rem;
		font-weight: 700;
		color: #333;
		margin: 0 0 10px 0;
	}

	.section-subtitle {
		font-size: 1.2rem;
		color: #666;
		margin: 0;
	}

	.pti-content {
		/* max-width: 1000px; */
		margin: 0 auto;
	}

	.pti-description {
		margin-bottom: 50px;
	}

	.pti-description :global(p) {
		font-size: 1.1rem;
		line-height: 1.8;
		color: #555;
		margin: 0 0 20px 0;
	}

	.pti-targets {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 20px;
	}

	.target-group {
		background: #f8f9fa;
		padding: 20px;
		border-radius: 12px;
		text-align: center;
		border: 1px solid #007bff;
		border-top: 4px solid #007bff;
	}

	.target-group :global(h4) {
		font-size: 1.1rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 8px 0;
	}

	.target-group :global(p) {
		font-size: 0.9rem;
		color: #666;
		margin: 0;
	}

	.service-categories {
		padding: 80px 0;
		background: #f8f9fa;
	}

	.categories-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 30px;
	}

	.category-card {
		background: #fff;
		border-radius: 16px;
		overflow: hidden;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
	}

	.category-card:hover {
		transform: translateY(-3px);
	}

	.category-header {
		background: #007bff;
		color: #fff;
		padding: 25px 30px;
		display: flex;
		align-items: center;
		gap: 15px;
	}

	.category-icon {
		font-size: 2rem;
	}

	.category-header :global(h3) {
		font-size: 1.3rem;
		font-weight: 600;
		margin: 0;
	}

	.category-content {
		padding: 30px;
	}

	.category-content :global(ul) {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.category-content :global(li) {
		padding: 8px 0;
		border-bottom: 1px solid #eee;
		color: #555;
		font-size: 0.95rem;
	}

	.category-content :global(li:last-child) {
		border-bottom: none;
	}

	.cta-section {
		padding: 80px 0;
		background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
		color: #fff;
		text-align: center;
	}

	.cta-content :global(h2) {
		font-size: 2.5rem;
		font-weight: 700;
		margin: 0 0 20px 0;
	}

	.cta-content :global(p) {
		font-size: 1.2rem;
		margin: 0 0 40px 0;
		opacity: 0.9;
	}

	.cta-buttons {
		display: flex;
		gap: 20px;
		justify-content: center;
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

		.services-grid {
			grid-template-columns: 1fr;
		}

		.categories-grid {
			grid-template-columns: 1fr;
		}

		.cta-buttons {
			flex-direction: column;
			align-items: center;
		}

	}
</style>
