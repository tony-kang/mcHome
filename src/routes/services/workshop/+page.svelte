<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>워크숍 - 마인드코딩 | PTI:CODE 기반 실습형 프로그램</title>
	<meta name="description" content="PTI:CODE 기반 워크숍으로 개인의 재능을 발견하고 실생활에 적용할 수 있는 실습형 프로그램을 경험해보세요." />
</svelte:head>

<Header />

<main class="workshop-page">
	<!-- Hero Section -->
	<section class="hero-section">
		<div class="container">
			<div class="hero-content">
				<h1 class="hero-title">워크숍</h1>
				<p class="hero-subtitle">PTI:CODE 기반 실습형 프로그램</p>
				<p class="hero-description">
					개인의 재능을 발견하고<br>
					실생활에 적용할 수 있는 실습형 프로그램
				</p>
			</div>
		</div>
	</section>

	<!-- Program Overview -->
	<section class="overview-section">
		<div class="container">
			<div class="overview-content">
				<h2>워크숍이란?</h2>
				<p>
					워크숍은 PTI:CODE 검사 결과를 바탕으로 개인의 재능과 성향을 이해하고, 
					이를 실생활에 적용할 수 있는 다양한 실습 활동을 통해 체험하는 프로그램입니다. 
					이론적 설명보다는 직접적인 체험과 실습을 통해 개인의 성장과 변화를 이끌어내는 
					인터랙티브한 학습 방식입니다.
				</p>
			</div>
		</div>
	</section>

	<!-- Workshop Types -->
	<section class="workshop-types-section">
		<div class="container">
			<h2>워크숍 유형</h2>
			<div class="workshop-grid">
				<div class="workshop-card">
					<div class="workshop-icon">🧠</div>
					<h3>재능 발견 워크숍</h3>
					<p>PTI:CODE 검사를 통해 개인의 숨겨진 재능을 발견하고 이를 인식하는 워크숍입니다.</p>
					<ul>
						<li>개인별 재능 분석</li>
						<li>강점 인식 활동</li>
						<li>재능 활용 방안 탐색</li>
					</ul>
					<div class="workshop-duration">2-3시간</div>
				</div>
				<div class="workshop-card">
					<div class="workshop-icon">💡</div>
					<h3>창의성 개발 워크숍</h3>
					<p>개인의 창의적 사고를 자극하고 새로운 아이디어를 발굴하는 워크숍입니다.</p>
					<ul>
						<li>창의적 사고 훈련</li>
						<li>아이디어 발굴 기법</li>
						<li>문제 해결 능력 향상</li>
					</ul>
					<div class="workshop-duration">3-4시간</div>
				</div>
				<div class="workshop-card">
					<div class="workshop-icon">🤝</div>
					<h3>소통 능력 향상 워크숍</h3>
					<p>개인의 소통 스타일을 파악하고 효과적인 소통 방법을 실습하는 워크숍입니다.</p>
					<ul>
						<li>소통 스타일 분석</li>
						<li>효과적 소통 기법</li>
						<li>갈등 해결 방법</li>
					</ul>
					<div class="workshop-duration">2-3시간</div>
				</div>
				<div class="workshop-card">
					<div class="workshop-icon">🎯</div>
					<h3>목표 설정 워크숍</h3>
					<p>개인의 성향에 맞는 목표 설정 방법을 배우고 실행 계획을 수립하는 워크숍입니다.</p>
					<ul>
						<li>개인별 목표 설정법</li>
						<li>실행 계획 수립</li>
						<li>동기 부여 방법</li>
					</ul>
					<div class="workshop-duration">2-3시간</div>
				</div>
				<div class="workshop-card">
					<div class="workshop-icon">⚡</div>
					<h3>스트레스 관리 워크숍</h3>
					<p>개인의 스트레스 패턴을 파악하고 효과적인 관리 방법을 실습하는 워크숍입니다.</p>
					<ul>
						<li>스트레스 패턴 분석</li>
						<li>관리 기법 실습</li>
						<li>심리적 안정감 향상</li>
					</ul>
					<div class="workshop-duration">2-3시간</div>
				</div>
				<div class="workshop-card">
					<div class="workshop-icon">🚀</div>
					<h3>리더십 개발 워크숍</h3>
					<p>개인의 리더십 스타일을 발견하고 효과적인 리더십을 발휘하는 방법을 배우는 워크숍입니다.</p>
					<ul>
						<li>리더십 스타일 분석</li>
						<li>팀워크 기법</li>
						<li>의사결정 능력 향상</li>
					</ul>
					<div class="workshop-duration">4-5시간</div>
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
					<h3>개인 참가자</h3>
					<ul>
						<li>자기계발에 관심 있는 성인</li>
						<li>새로운 도전을 준비하는 사람</li>
						<li>개인적 성장을 원하는 사람</li>
					</ul>
				</div>
				<div class="target-card">
					<h3>팀/조직</h3>
					<ul>
						<li>팀워크 향상을 원하는 기업</li>
						<li>조직 내 소통 개선이 필요한 팀</li>
						<li>창의적 사고가 필요한 조직</li>
					</ul>
				</div>
				<div class="target-card">
					<h3>교육기관</h3>
					<ul>
						<li>학생들의 재능 개발을 원하는 학교</li>
						<li>창의적 교육을 추구하는 교육기관</li>
						<li>진로 교육이 필요한 기관</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<!-- Workshop Process -->
	<section class="process-section">
		<div class="container">
			<h2>워크숍 진행 과정</h2>
			<div class="process-timeline">
				<div class="process-item">
					<div class="process-number">1</div>
					<div class="process-content">
						<h3>사전 준비</h3>
						<p>PTI:CODE 검사 실시 및 개인별 분석 결과 준비</p>
					</div>
				</div>
				<div class="process-item">
					<div class="process-number">2</div>
					<div class="process-content">
						<h3>워크숍 시작</h3>
						<p>참가자 소개 및 워크숍 목표 및 진행 방식 안내</p>
					</div>
				</div>
				<div class="process-item">
					<div class="process-number">3</div>
					<div class="process-content">
						<h3>개인별 분석 공유</h3>
						<p>PTI:CODE 검사 결과를 바탕으로 한 개인별 특성 분석 및 공유</p>
					</div>
				</div>
				<div class="process-item">
					<div class="process-number">4</div>
					<div class="process-content">
						<h3>실습 활동</h3>
						<p>개인의 특성에 맞는 다양한 실습 활동 및 체험</p>
					</div>
				</div>
				<div class="process-item">
					<div class="process-number">5</div>
					<div class="process-content">
						<h3>결과 정리</h3>
						<p>워크숍을 통해 얻은 인사이트 정리 및 실생활 적용 방안 논의</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Benefits -->
	<section class="benefits-section">
		<div class="container">
			<h2>워크숍의 장점</h2>
			<div class="benefits-grid">
				<div class="benefit-item">
					<h3>직접적 체험</h3>
					<p>이론적 설명보다는 직접적인 체험을 통해 개인의 변화를 이끌어냅니다.</p>
				</div>
				<div class="benefit-item">
					<h3>맞춤형 접근</h3>
					<p>개인의 PTI:CODE 결과를 바탕으로 한 맞춤형 워크숍을 제공합니다.</p>
				</div>
				<div class="benefit-item">
					<h3>즉시 적용 가능</h3>
					<p>워크숍에서 배운 내용을 실생활에 즉시 적용할 수 있습니다.</p>
				</div>
				<div class="benefit-item">
					<h3>상호작용</h3>
					<p>다른 참가자들과의 상호작용을 통해 새로운 관점을 얻을 수 있습니다.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Workshop Schedule -->
	<section class="schedule-section">
		<div class="container">
			<h2>워크숍 일정</h2>
			<div class="schedule-grid">
				<div class="schedule-card">
					<h3>정기 워크숍</h3>
					<div class="schedule-info">
						<p><strong>일정:</strong> 매월 둘째, 넷째 주 토요일</p>
						<p><strong>시간:</strong> 오후 2시 - 5시 (3시간)</p>
						<p><strong>장소:</strong> 마인드코딩 교육센터</p>
						<p><strong>정원:</strong> 15명</p>
					</div>
				</div>
				<div class="schedule-card">
					<h3>맞춤형 워크숍</h3>
					<div class="schedule-info">
											<p><strong>일정:</strong> 협의 후 결정</p>
						<p><strong>시간:</strong> 2-5시간 (워크숍 유형별)</p>
						<p><strong>장소:</strong> 협의 후 결정</p>
						<p><strong>정원:</strong> 10-30명</p>
					</div>
				</div>
				<div class="schedule-card">
					<h3>온라인 워크숍</h3>
					<div class="schedule-info">
						<p><strong>일정:</strong> 매주 화요일, 목요일</p>
						<p><strong>시간:</strong> 오후 7시 - 9시 (2시간)</p>
						<p><strong>장소:</strong> 온라인 (Zoom)</p>
						<p><strong>정원:</strong> 20명</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="cta-section">
		<div class="container">
			<div class="cta-content">
				<h2>워크숍에 참여하세요</h2>
				<p>개인의 재능을 발견하고 실생활에 적용할 수 있는 실습형 프로그램을 경험해보세요.</p>
				<div class="cta-buttons">
					<a href="/contact" class="btn-primary">워크숍 신청</a>
					<a href="/services/pti-code" class="btn-secondary">PTI:CODE 검사 알아보기</a>
				</div>
			</div>
		</div>
	</section>
</main>

<Footer />

<style>
	.workshop-page {
		margin-top: 70px;
	}

	.hero-section {
		background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%);
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

	.workshop-types-section {
		padding: 80px 0;
		background: #f8f9fa;
	}

	.workshop-types-section h2 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #333;
		text-align: center;
		margin: 0 0 60px 0;
	}

	.workshop-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 30px;
	}

	.workshop-card {
		background: #fff;
		padding: 30px;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
		position: relative;
	}

	.workshop-card:hover {
		transform: translateY(-5px);
	}

	.workshop-icon {
		font-size: 3rem;
		margin-bottom: 20px;
	}

	.workshop-card h3 {
		font-size: 1.5rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 15px 0;
	}

	.workshop-card p {
		color: #666;
		line-height: 1.6;
		margin: 0 0 20px 0;
	}

	.workshop-card ul {
		list-style: none;
		padding: 0;
		margin: 0 0 20px 0;
	}

	.workshop-card li {
		padding: 5px 0;
		color: #555;
		position: relative;
		padding-left: 20px;
	}

	.workshop-card li::before {
		content: "•";
		position: absolute;
		left: 0;
		color: #ffc107;
		font-weight: bold;
	}

	.workshop-duration {
		position: absolute;
		top: 20px;
		right: 20px;
		background: #ffc107;
		color: #333;
		padding: 5px 12px;
		border-radius: 12px;
		font-size: 0.9rem;
		font-weight: 600;
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
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 30px;
	}

	.target-card {
		background: #f8f9fa;
		padding: 30px;
		border-radius: 12px;
		border-left: 4px solid #ffc107;
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
		color: #ffc107;
		font-weight: bold;
	}

	.process-section {
		padding: 80px 0;
		background: #f8f9fa;
	}

	.process-section h2 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #333;
		text-align: center;
		margin: 0 0 60px 0;
	}

	.process-timeline {
		max-width: 800px;
		margin: 0 auto;
	}

	.process-item {
		display: flex;
		align-items: center;
		margin-bottom: 30px;
		background: #fff;
		padding: 25px;
		border-radius: 12px;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
	}

	.process-number {
		width: 50px;
		height: 50px;
		background: #ffc107;
		color: #333;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.2rem;
		font-weight: 700;
		margin-right: 25px;
		flex-shrink: 0;
	}

	.process-content h3 {
		font-size: 1.2rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 8px 0;
	}

	.process-content p {
		color: #555;
		margin: 0;
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
		background: #f8f9fa;
		border-radius: 12px;
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

	.schedule-section {
		padding: 80px 0;
		background: #f8f9fa;
	}

	.schedule-section h2 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #333;
		text-align: center;
		margin: 0 0 60px 0;
	}

	.schedule-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 30px;
	}

	.schedule-card {
		background: #fff;
		padding: 30px;
		border-radius: 12px;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
	}

	.schedule-card h3 {
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 20px 0;
	}

	.schedule-info p {
		margin: 0 0 10px 0;
		color: #555;
	}

	.cta-section {
		padding: 80px 0;
		background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%);
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
		color: #ffc107;
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
		color: #ffc107;
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
		.workshop-types-section h2,
		.target-section h2,
		.process-section h2,
		.benefits-section h2,
		.schedule-section h2,
		.cta-content h2 {
			font-size: 2rem;
		}

		.workshop-grid {
			grid-template-columns: 1fr;
		}

		.process-item {
			flex-direction: column;
			text-align: center;
		}

		.process-number {
			margin-right: 0;
			margin-bottom: 15px;
		}

		.cta-buttons {
			flex-direction: column;
			align-items: center;
		}

	}
</style>
