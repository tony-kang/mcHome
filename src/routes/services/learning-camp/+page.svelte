<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>학습 캠프 - 마인드코딩 | PTI:CODE 기반 맞춤형 학습 프로그램</title>
	<meta name="description" content="PTI:CODE 기반 학습 캠프로 개인의 학습 성향에 맞는 효과적인 학습 방법을 찾아보세요. 집중적이고 체계적인 학습 환경을 제공합니다." />
</svelte:head>

<Header />

<main class="learning-camp-page">
	<!-- Hero Section -->
	<section class="hero-section">
		<div class="container">
			<div class="hero-content">
				<h1 class="hero-title">학습 캠프</h1>
				<p class="hero-subtitle">PTI:CODE 기반 맞춤형 학습 프로그램</p>
				<p class="hero-description">
					개인의 학습 성향에 맞는<br>
					효과적인 학습 방법을 찾아보세요.
				</p>
			</div>
		</div>
	</section>

	<!-- Program Overview -->
	<section class="overview-section">
		<div class="container">
			<div class="overview-content">
				<h2>학습 캠프란?</h2>
				<p>
					학습 캠프는 PTI:CODE 검사를 통해 개인의 심리재능과 학습 성향을 파악한 후, 
					그에 맞는 최적의 학습 전략을 제시하고 실습하는 집중 프로그램입니다. 
					단순한 학습법 교육이 아닌, 개인의 타고난 재능을 기반으로 한 맞춤형 학습 솔루션을 제공합니다.
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
					<div class="feature-icon">🧠</div>
					<h3>개인별 학습 성향 분석</h3>
					<p>PTI:CODE 검사를 통해 개인의 인지 스타일, 집중 패턴, 기억 방식을 정밀 분석합니다.</p>
				</div>
				<div class="feature-card">
					<div class="feature-icon">📚</div>
					<h3>맞춤형 학습 전략</h3>
					<p>분석 결과를 바탕으로 개인에게 최적화된 학습 방법과 시간 관리 전략을 제시합니다.</p>
				</div>
				<div class="feature-card">
					<div class="feature-icon">🎯</div>
					<h3>목표 설정 및 실행</h3>
					<p>구체적이고 실현 가능한 학습 목표를 설정하고, 단계별 실행 계획을 수립합니다.</p>
				</div>
				<div class="feature-card">
					<div class="feature-icon">⚡</div>
					<h3>집중적 실습 환경</h3>
					<p>방해 요소가 없는 집중적인 환경에서 새로운 학습 방법을 체험하고 습관화합니다.</p>
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
					<h3>초등학생</h3>
					<ul>
						<li>기본 학습 습관 형성</li>
						<li>집중력 향상</li>
						<li>자기주도 학습 능력 개발</li>
					</ul>
				</div>
				<div class="target-card">
					<h3>중학생</h3>
					<ul>
						<li>효율적인 학습 방법 습득</li>
						<li>시험 대비 전략 수립</li>
						<li>학습 동기 부여</li>
					</ul>
				</div>
				<div class="target-card">
					<h3>고등학생</h3>
					<ul>
						<li>대입 준비 전략</li>
						<li>과목별 맞춤 학습법</li>
						<li>스트레스 관리</li>
					</ul>
				</div>
				<div class="target-card">
					<h3>성인 학습자</h3>
					<ul>
						<li>직장인 자기계발</li>
						<li>자격증 취득 전략</li>
						<li>평생학습 방법론</li>
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
						<h3>사전 검사 및 분석</h3>
						<p>PTI:CODE 검사 실시 및 개인별 학습 성향 분석</p>
						<span class="timeline-duration">1일</span>
					</div>
				</div>
				<div class="timeline-item">
					<div class="timeline-number">2</div>
					<div class="timeline-content">
						<h3>맞춤형 전략 수립</h3>
						<p>개인별 최적 학습 방법 및 시간표 설계</p>
						<span class="timeline-duration">1일</span>
					</div>
				</div>
				<div class="timeline-item">
					<div class="timeline-number">3</div>
					<div class="timeline-content">
						<h3>집중 실습</h3>
						<p>새로운 학습 방법 적용 및 습관화</p>
						<span class="timeline-duration">3-5일</span>
					</div>
				</div>
				<div class="timeline-item">
					<div class="timeline-number">4</div>
					<div class="timeline-content">
						<h3>성과 평가 및 개선</h3>
						<p>학습 효과 측정 및 전략 보완</p>
						<span class="timeline-duration">1일</span>
					</div>
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
					<h3>학습 효율성 향상</h3>
					<p>개인에게 맞는 학습 방법으로 동일한 시간에 더 많은 것을 학습할 수 있습니다.</p>
				</div>
				<div class="benefit-item">
					<h3>자기주도 학습 능력</h3>
					<p>스스로 학습 계획을 세우고 실행할 수 있는 능력이 향상됩니다.</p>
				</div>
				<div class="benefit-item">
					<h3>학습 동기 부여</h3>
					<p>개인의 강점을 활용한 학습으로 성취감과 자신감이 높아집니다.</p>
				</div>
				<div class="benefit-item">
					<h3>지속 가능한 습관</h3>
					<p>개인의 성향에 맞는 학습 습관이 형성되어 지속적으로 유지됩니다.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="cta-section">
		<div class="container">
			<div class="cta-content">
				<h2>학습 캠프에 참여하세요</h2>
				<p>개인의 학습 성향을 파악하고 최적의 학습 방법을 찾아보세요.</p>
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
	.learning-camp-page {
		margin-top: 70px;
	}

	.hero-section {
		background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
		color: #fff;
		padding: 100px 0;
		text-align: center;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
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
		border-left: 4px solid #007bff;
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
		color: #007bff;
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
		background: #007bff;
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

	.benefits-section {
		padding: 80px 0;
		background: #fff;
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

	.cta-section {
		padding: 80px 0;
		background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
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
		color: #007bff;
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
		color: #007bff;
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
		.benefits-section h2,
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

		.cta-buttons {
			flex-direction: column;
			align-items: center;
		}

		.container {
			padding: 0 15px;
		}
	}
</style>
