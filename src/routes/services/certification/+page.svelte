<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>자격과정 - 마인드코딩 | 코치·프로·마스터 과정</title>
	<meta name="description" content="PTI:CODE 기반 전문가 양성 과정. 코치, 프로, 마스터 단계별 자격과정으로 심리재능 전문가로 성장하세요." />
</svelte:head>

<Header />

<main class="certification-page">
	<!-- Hero Section -->
	<section class="hero-section">
		<div class="container">
			<div class="hero-content">
				<h1 class="hero-title">자격과정</h1>
				<p class="hero-subtitle">PTI:CODE 기반 전문가 양성</p>
				<p class="hero-description">
					코치, 프로, 마스터 단계별 자격과정으로<br>
					심리재능 전문가로 성장하세요.
				</p>
			</div>
		</div>
	</section>

	<!-- Certification Overview -->
	<section class="certification-overview">
		<div class="container">
			<div class="overview-content">
				<h2>단계별 전문가 양성 과정</h2>
				<p>
					마인드코딩의 자격과정은 PTI:CODE를 기반으로 한 체계적인 전문가 양성 프로그램입니다. 
					기본적인 코칭 역량부터 최고 수준의 재능경영 전문가까지 단계별로 성장할 수 있습니다.
				</p>
			</div>
		</div>
	</section>

	<!-- Certification Levels -->
	<section class="certification-levels">
		<div class="container">
			<div class="levels-grid">
				<!-- 코치 과정 -->
				<div class="level-card coach">
					<div class="level-header">
						<div class="level-icon">🎯</div>
						<h3>코치 과정</h3>
						<div class="level-badge">Level 1</div>
					</div>
					<div class="level-content">
						<div class="level-info">
							<h4>PTI:CODE 코치과정</h4>
							<div class="target-section">
								<h5>대상</h5>
								<ul>
									<li>상담·코칭 입문자</li>
									<li>교사, 학부모</li>
									<li>교육 관련 종사자</li>
									<li>조직 HR 담당자</li>
									<li>기업 교육 강사</li>
									<li>전문 코치</li>
									<li>진로·학습 컨설턴트</li>
									<li>1인 기업강사</li>
								</ul>
							</div>
							<div class="effect-section">
								<h5>기대효과</h5>
								<p>PTI:CODE를 기반으로 개인의 심리기질·재능을 진단하고, 1:1 맞춤 코칭을 진행할 수 있는 기본 역량을 습득</p>
							</div>
						</div>
						<div class="level-actions">
							<a href="/contact" class="btn-primary">과정 신청</a>
							<a href="#" class="btn-secondary">자세히 보기</a>
						</div>
					</div>
				</div>

				<!-- 프로 과정 -->
				<div class="level-card pro">
					<div class="level-header">
						<div class="level-icon">🚀</div>
						<h3>프로 과정</h3>
						<div class="level-badge">Level 2</div>
					</div>
					<div class="level-content">
						<div class="level-info">
							<h4>PTI:학습·진로 / PTI:관계·소통 / PTI:비즈니스 프로 과정</h4>
							<div class="target-section">
								<h5>대상</h5>
								<p>코치과정 이수자</p>
							</div>
							<div class="effect-section">
								<h5>기대효과</h5>
								<p>학습·진로, 관계·소통, 비즈니스 분야별 전문 코칭 능력을 개발하고, 실무 현장에서 적용 가능한 컨설팅 역량 확보</p>
							</div>
							<div class="specializations">
								<h5>전문 분야</h5>
								<div class="spec-tags">
									<span class="spec-tag">학습·진로</span>
									<span class="spec-tag">관계·소통</span>
									<span class="spec-tag">비즈니스</span>
								</div>
							</div>
						</div>
						<div class="level-actions">
							<a href="/contact" class="btn-primary">과정 신청</a>
							<a href="#" class="btn-secondary">자세히 보기</a>
						</div>
					</div>
				</div>

				<!-- 마스터 과정 -->
				<div class="level-card master">
					<div class="level-header">
						<div class="level-icon">👑</div>
						<h3>마스터 과정</h3>
						<div class="level-badge">Level 3</div>
					</div>
					<div class="level-content">
						<div class="level-info">
							<h4>재능경영 마스터</h4>
							<div class="target-section">
								<h5>대상</h5>
								<p>프로 중 선발</p>
							</div>
							<div class="effect-section">
								<h5>기대효과</h5>
								<p>개인·조직·사회 차원의 재능경영 철학과 리더십 코칭을 수행할 수 있는 최고 수준 전문가로 성장</p>
							</div>
							<div class="master-features">
								<h5>마스터 특별 혜택</h5>
								<ul>
									<li>재능경영 철학 심화 학습</li>
									<li>리더십 코칭 전문 역량</li>
									<li>조직 컨설팅 고급 기법</li>
									<li>사회적 영향력 확장</li>
								</ul>
							</div>
						</div>
						<div class="level-actions">
							<a href="/contact" class="btn-primary">과정 신청</a>
							<a href="#" class="btn-secondary">자세히 보기</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Process Section -->
	<section class="process-section">
		<div class="container">
			<div class="section-header">
				<h2>자격과정 진행 과정</h2>
			</div>
			<div class="process-timeline">
				<div class="process-step">
					<div class="step-number">1</div>
					<div class="step-content">
						<h3>코치 과정</h3>
						<p>PTI:CODE 기반 기본 코칭 역량 습득</p>
					</div>
				</div>
				<div class="process-arrow">→</div>
				<div class="process-step">
					<div class="step-number">2</div>
					<div class="step-content">
						<h3>프로 과정</h3>
						<p>분야별 전문 코칭 능력 개발</p>
					</div>
				</div>
				<div class="process-arrow">→</div>
				<div class="process-step">
					<div class="step-number">3</div>
					<div class="step-content">
						<h3>마스터 과정</h3>
						<p>재능경영 최고 전문가로 성장</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Benefits Section -->
	<section class="benefits-section">
		<div class="container">
			<div class="section-header">
				<h2>자격과정 수강 혜택</h2>
			</div>
			<div class="benefits-grid">
				<div class="benefit-card">
					<div class="benefit-icon">📜</div>
					<h3>공식 자격증</h3>
					<p>마인드코딩 공식 자격증 발급</p>
				</div>
				<div class="benefit-card">
					<div class="benefit-icon">👥</div>
					<h3>전문가 네트워크</h3>
					<p>동료 전문가들과의 네트워킹</p>
				</div>
				<div class="benefit-card">
					<div class="benefit-icon">🔄</div>
					<h3>지속적 교육</h3>
					<p>정기적인 업데이트 교육 제공</p>
				</div>
				<div class="benefit-card">
					<div class="benefit-icon">💼</div>
					<h3>실무 지원</h3>
					<p>실무 현장에서의 지속적 지원</p>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="cta-section">
		<div class="container">
			<div class="cta-content">
				<h2>전문가로 성장하세요</h2>
				<p>PTI:CODE 기반 자격과정으로 심리재능 전문가가 되어보세요.</p>
				<div class="cta-buttons">
					<a href="/contact" class="btn-primary">과정 신청하기</a>
					<a href="/services" class="btn-secondary">다른 서비스 보기</a>
				</div>
			</div>
		</div>
	</section>
</main>

<Footer />

<style>
	.certification-page {
		margin-top: 70px;
	}

	.hero-section {
		background: linear-gradient(135deg, #6f42c1 0%, #e83e8c 100%);
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

	.certification-overview {
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
		margin: 0;
	}

	.certification-levels {
		padding: 80px 0;
		background: #f8f9fa;
	}

	.levels-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 30px;
	}

	.level-card {
		background: #fff;
		border-radius: 20px;
		overflow: hidden;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.level-card:hover {
		transform: translateY(-10px);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
	}

	.level-header {
		padding: 30px;
		text-align: center;
		position: relative;
	}

	.level-card.coach .level-header {
		background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
		color: #fff;
	}

	.level-card.pro .level-header {
		background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
		color: #fff;
	}

	.level-card.master .level-header {
		background: linear-gradient(135deg, #6f42c1 0%, #e83e8c 100%);
		color: #fff;
	}

	.level-icon {
		font-size: 3rem;
		margin-bottom: 15px;
	}

	.level-header h3 {
		font-size: 1.8rem;
		font-weight: 700;
		margin: 0 0 10px 0;
	}

	.level-badge {
		position: absolute;
		top: 20px;
		right: 20px;
		background: rgba(255, 255, 255, 0.2);
		padding: 5px 15px;
		border-radius: 20px;
		font-size: 0.9rem;
		font-weight: 600;
	}

	.level-content {
		padding: 30px;
	}

	.level-info h4 {
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 20px 0;
	}

	.target-section,
	.effect-section,
	.specializations,
	.master-features {
		margin-bottom: 20px;
	}

	.target-section h5,
	.effect-section h5,
	.specializations h5,
	.master-features h5 {
		font-size: 1rem;
		font-weight: 600;
		color: #007bff;
		margin: 0 0 10px 0;
	}

	.target-section ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.target-section li {
		padding: 5px 0;
		color: #555;
		font-size: 0.95rem;
		border-bottom: 1px solid #eee;
	}

	.target-section li:last-child {
		border-bottom: none;
	}

	.effect-section p {
		color: #555;
		line-height: 1.6;
		margin: 0;
	}

	.spec-tags {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
	}

	.spec-tag {
		background: #e3f2fd;
		color: #1976d2;
		padding: 5px 12px;
		border-radius: 15px;
		font-size: 0.85rem;
		font-weight: 500;
	}

	.master-features ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.master-features li {
		padding: 5px 0;
		color: #555;
		font-size: 0.95rem;
		position: relative;
		padding-left: 20px;
	}

	.master-features li::before {
		content: "✓";
		position: absolute;
		left: 0;
		color: #28a745;
		font-weight: 700;
	}

	.level-actions {
		display: flex;
		gap: 15px;
		margin-top: 30px;
	}

	.btn-primary,
	.btn-secondary {
		flex: 1;
		padding: 12px 20px;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
		text-align: center;
		transition: all 0.3s ease;
	}

	.btn-primary {
		background: #007bff;
		color: #fff;
	}

	.btn-primary:hover {
		background: #0056b3;
		transform: translateY(-2px);
	}

	.btn-secondary {
		background: #f8f9fa;
		color: #333;
		border: 2px solid #e9ecef;
	}

	.btn-secondary:hover {
		background: #e9ecef;
	}

	.process-section {
		padding: 80px 0;
		background: #fff;
	}

	.section-header {
		text-align: center;
		margin-bottom: 60px;
	}

	.section-header h2 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #333;
		margin: 0;
	}

	.process-timeline {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 20px;
		flex-wrap: wrap;
	}

	.process-step {
		text-align: center;
		padding: 30px 20px;
		background: #f8f9fa;
		border-radius: 16px;
		min-width: 200px;
	}

	.step-number {
		width: 50px;
		height: 50px;
		background: #007bff;
		color: #fff;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.3rem;
		font-weight: 700;
		margin: 0 auto 15px;
	}

	.step-content h3 {
		font-size: 1.2rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 8px 0;
	}

	.step-content p {
		color: #666;
		margin: 0;
		font-size: 0.9rem;
	}

	.process-arrow {
		font-size: 1.5rem;
		color: #007bff;
		font-weight: 700;
	}

	.benefits-section {
		padding: 80px 0;
		background: #f8f9fa;
	}

	.benefits-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 30px;
	}

	.benefit-card {
		background: #fff;
		padding: 30px 20px;
		border-radius: 16px;
		text-align: center;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
	}

	.benefit-card:hover {
		transform: translateY(-5px);
	}

	.benefit-icon {
		font-size: 2.5rem;
		margin-bottom: 15px;
	}

	.benefit-card h3 {
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 10px 0;
	}

	.benefit-card p {
		color: #666;
		margin: 0;
	}

	.cta-section {
		padding: 80px 0;
		background: linear-gradient(135deg, #6f42c1 0%, #e83e8c 100%);
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
	}

	.cta-buttons .btn-primary,
	.cta-buttons .btn-secondary {
		padding: 15px 30px;
		border-radius: 25px;
		text-decoration: none;
		font-weight: 600;
		font-size: 1.1rem;
		transition: all 0.3s ease;
	}

	.cta-buttons .btn-primary {
		background: #fff;
		color: #6f42c1;
	}

	.cta-buttons .btn-primary:hover {
		background: #f8f9fa;
		transform: translateY(-2px);
	}

	.cta-buttons .btn-secondary {
		background: transparent;
		color: #fff;
		border: 2px solid #fff;
	}

	.cta-buttons .btn-secondary:hover {
		background: #fff;
		color: #6f42c1;
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

		.levels-grid {
			grid-template-columns: 1fr;
		}

		.process-timeline {
			flex-direction: column;
		}

		.process-arrow {
			transform: rotate(90deg);
		}

		.benefits-grid {
			grid-template-columns: 1fr;
		}

		.cta-buttons {
			flex-direction: column;
			align-items: center;
		}

	}
</style>
