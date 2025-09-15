<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>PTI:CODE - 마인드코딩 | 심리재능 진단 도구</title>
	<meta name="description" content="PTI:CODE는 개인의 심리기질·심리기능·심리재능을 종합적으로 진단하여 맞춤형 성장 전략을 제시하는 심리재능 진단 도구입니다." />
</svelte:head>

<Header />

<main class="pti-page">
	<!-- Hero Section -->
	<section class="hero-section">
		<div class="container">
			<div class="hero-content">
				<h1 class="hero-title">PTI:CODE</h1>
				<p class="hero-subtitle">Psychometric Talent Inventory</p>
				<p class="hero-description">
					개인이 타고난 심리기질·심리기능·심리재능을 종합적으로 진단하는<br>
					심리재능 진단 도구입니다.
				</p>
			</div>
		</div>
	</section>

	<!-- Introduction -->
	<section class="intro-section">
		<div class="container">
			<div class="intro-content">
				<h2>왜 PTI:CODE인가?</h2>
				<p>
					사람은 누구나 고유한 심리코드(Code)를 가지고 태어나며, PTI는 이 코드를 해석하여 
					학습, 진로, 관계, 비즈니스 등 삶의 전 영역에서 활용할 수 있는 맞춤형 성장 전략을 제시합니다.
				</p>
			</div>
		</div>
	</section>

	<!-- Target Groups -->
	<section class="targets-section">
		<div class="container">
			<div class="section-header">
				<h2>대상별 PTI:CODE 검사</h2>
			</div>
			
			<div class="targets-grid">
				<div class="target-card">
					<div class="target-icon">👶</div>
					<h3>영유아</h3>
					<div class="target-details">
						<h4>심리기질 행동특성 검사</h4>
						<h5>기대효과:</h5>
						<ul>
							<li>아이가 타고난 기질과 성향을 조기에 파악해 발달 단계에 맞는 양육 방향을 제시</li>
							<li>문제 행동(떼쓰기, 공격성, 과잉행동 등)의 원인을 이해하고 맞춤형 지도 방안을 마련</li>
							<li>정서 발달 상태를 확인하여 안정적인 애착 형성과 자기조절 능력을 돕기</li>
							<li>부모가 자녀의 심리·행동 특성을 객관적으로 이해함으로써 양육 스트레스와 갈등을 줄이기</li>
							<li>아이가 지닌 잠재 재능과 강점을 일찍 발견해 긍정적 성장의 기초를 세우기</li>
						</ul>
					</div>
				</div>

				<div class="target-card">
					<div class="target-icon">🎓</div>
					<h3>아동·청소년</h3>
					<div class="target-details">
						<h4>학습·진로·입시 전략 검사</h4>
						<h5>기대효과:</h5>
						<ul>
							<li>자녀의 타고난 기질과 학습 성향을 객관적으로 파악하여, 막연한 공부법이 아닌 자녀에게 맞는 학습 전략을 제시</li>
							<li>강점 과목과 취약 과목을 구체적으로 구분해, 학부모님이 자녀 학습 방향을 지도하는 데 실질적인 기준이 됨</li>
							<li>자녀의 흥미와 적성을 반영한 전공·계열 선택 로드맵을 제공하여, 중·장기적인 진로 고민을 덜어드림</li>
							<li>단순 성적 관리가 아니라 학생부, 비교과, 면접 준비까지 연계된 입시 전략을 세울 수 있도록 지원</li>
							<li>학습·진로·입시를 통합적으로 바라봄으로써, 자녀가 흔들리지 않고 꾸준히 성장할 수 있는 계획을 마련</li>
						</ul>
					</div>
				</div>

				<div class="target-card">
					<div class="target-icon">💼</div>
					<h3>취준생/직장인/창업가</h3>
					<div class="target-details">
						<h4>커리어·브랜딩·세일즈 관리 검사</h4>
						<h5>기대효과:</h5>
						<ul>
							<li>개인의 강점과 잠재 역량을 기반으로 최적의 커리어 방향을 설정할 수 있음</li>
							<li>직무 적합성과 역량 갭을 분석하여, 취업·승진·이직 준비 전략을 구체적으로 세울 수 있음</li>
							<li>본인의 특성과 강점을 살린 차별화된 자기 브랜딩을 완성할 수 있음</li>
							<li>직무·산업에 맞춘 세일즈 및 퍼포먼스 전략을 수립하여, 성과 창출 역량을 높일 수 있음</li>
							<li>취준생에게는 합격 가능성 강화, 직장인에게는 성과와 커리어 성장, 창업가에게는 브랜드 경쟁력 및 매출 향상</li>
						</ul>
					</div>
				</div>

				<div class="target-card">
					<div class="target-icon">👨‍👩‍👧‍👦</div>
					<h3>학부모</h3>
					<div class="target-details">
						<h4>양육·소통 검사</h4>
						<h5>기대효과:</h5>
						<ul>
							<li>자녀의 기질과 심리적 특성을 이해하여 자녀 맞춤형 양육 방향을 세울 수 있음</li>
							<li>부모-자녀 간의 소통 패턴을 진단해 갈등의 원인을 파악하고 개선 방안을 찾을 수 있음</li>
							<li>자녀 발달 단계에 적합한 효과적인 대화법과 지도 방법을 익힐 수 있음</li>
							<li>부모 자신의 양육 스타일을 객관적으로 돌아보고 불필요한 양육 스트레스를 줄일 수 있음</li>
							<li>건강한 부모-자녀 관계를 바탕으로 자녀의 정서 안정과 자존감 발달을 지원</li>
						</ul>
					</div>
				</div>

				<div class="target-card">
					<div class="target-icon">💕</div>
					<h3>성인</h3>
					<div class="target-details">
						<h4>부부,연예,재회 심리소통 검사</h4>
						<h5>기대효과:</h5>
						<ul>
							<li>서로의 심리기질과 소통 방식을 객관적으로 이해하여 불필요한 갈등을 줄임</li>
							<li>관계에서 반복되는 패턴(예: 대화 단절, 감정 폭발 등)을 파악하고 개선 방안을 찾음</li>
							<li>공감과 표현의 균형을 회복해 안정적이고 성숙한 관계를 만들어감</li>
							<li>재회 상담의 경우, 과거의 갈등 원인을 명확히 분석하고 새로운 관계 형성의 기초를 마련</li>
							<li>장기적으로는 신뢰·애착·친밀감을 강화하여 관계 지속 가능성을 높임</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Process Section -->
	<section class="process-section">
		<div class="container">
			<div class="section-header">
				<h2>PTI:CODE 검사 과정</h2>
			</div>
			<div class="process-steps">
				<div class="step">
					<div class="step-number">1</div>
					<h3>검사 신청</h3>
					<p>온라인 또는 전화로 검사 신청</p>
				</div>
				<div class="step">
					<div class="step-number">2</div>
					<h3>검사 실시</h3>
					<p>PTI:CODE 온라인 검사 진행</p>
				</div>
				<div class="step">
					<div class="step-number">3</div>
					<h3>결과 분석</h3>
					<p>전문가가 결과를 종합 분석</p>
				</div>
				<div class="step">
					<div class="step-number">4</div>
					<h3>상담 및 코칭</h3>
					<p>맞춤형 성장 전략 제시</p>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="cta-section">
		<div class="container">
			<div class="cta-content">
				<h2>PTI:CODE 검사로 시작하세요</h2>
				<p>당신만의 심리재능을 발견하고, 맞춤형 성장 전략을 받아보세요.</p>
				<div class="cta-buttons">
					<a href="/contact" class="btn-primary">검사 신청</a>
					<a href="/services" class="btn-secondary">다른 서비스 보기</a>
				</div>
			</div>
		</div>
	</section>
</main>

<Footer />

<style>
	.pti-page {
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
		max-width: 800px;
		margin: 0 auto;
		opacity: 0.95;
	}

	.intro-section {
		padding: 80px 0;
		background: #fff;
	}

	.intro-content {
		max-width: 800px;
		margin: 0 auto;
		text-align: center;
	}

	.intro-content h2 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #333;
		margin: 0 0 30px 0;
	}

	.intro-content p {
		font-size: 1.2rem;
		line-height: 1.8;
		color: #555;
		margin: 0;
	}

	.targets-section {
		padding: 80px 0;
		background: #f8f9fa;
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

	.targets-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 30px;
	}

	.target-card {
		background: #fff;
		border-radius: 16px;
		padding: 30px;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
	}

	.target-card:hover {
		transform: translateY(-5px);
	}

	.target-icon {
		font-size: 3rem;
		text-align: center;
		margin-bottom: 20px;
	}

	.target-card h3 {
		font-size: 1.5rem;
		font-weight: 600;
		color: #333;
		text-align: center;
		margin: 0 0 20px 0;
	}

	.target-details h4 {
		font-size: 1.2rem;
		font-weight: 600;
		color: #007bff;
		margin: 0 0 15px 0;
	}

	.target-details h5 {
		font-size: 1rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 10px 0;
	}

	.target-details ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.target-details li {
		padding: 8px 0;
		color: #555;
		font-size: 0.95rem;
		line-height: 1.6;
		border-bottom: 1px solid #eee;
	}

	.target-details li:last-child {
		border-bottom: none;
	}

	.process-section {
		padding: 80px 0;
		background: #fff;
	}

	.process-steps {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 30px;
	}

	.step {
		text-align: center;
		padding: 30px 20px;
	}

	.step-number {
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
		margin: 0 auto 20px;
	}

	.step h3 {
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 10px 0;
	}

	.step p {
		color: #666;
		margin: 0;
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

		.targets-grid {
			grid-template-columns: 1fr;
		}

		.process-steps {
			grid-template-columns: 1fr;
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
