<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ___prjConst from '$prj/prjConst.js';
</script>

<svelte:head>
	<title>심리재능 서비스 - 마인드코딩 | PTI:CODE 기반 멘탈코칭 & 상담</title>
	<meta name="description" content="PTI:CODE를 활용한 심리재능 진단과 맞춤형 멘탈코칭, 상담 서비스를 통해 개인의 심리적 성장과 안정을 지원합니다." />
</svelte:head>

<Header />

<main class="psychological-page">
	<!-- Hero Section -->
	<section class="hero-section">
		<div class="container">
			<div class="hero-content">
				<h1 class="hero-title">심리재능</h1>
				<p class="hero-subtitle">PTI:CODE 기반 멘탈코칭 & 상담</p>
				<p class="hero-description">
					개인의 심리재능을 정확히 진단하고, 맞춤형 멘탈코칭과 상담을 통해<br>
					심리적 성장과 안정을 지원합니다.
				</p>
			</div>
		</div>
	</section>

	<!-- Service Overview -->
	<section class="service-overview">
		<div class="container">
			<div class="overview-grid">
				<div class="overview-card">
					<div class="overview-icon">👶</div>
					<h3>영유아</h3>
					<p>정서발달·행동수정 지원</p>
				</div>
				<div class="overview-card">
					<div class="overview-icon">🧒</div>
					<h3>아동·청소년</h3>
					<p>멘탈코칭 & 자기이해 상담</p>
				</div>
				<div class="overview-card">
					<div class="overview-icon">👨‍👩‍👧‍👦</div>
					<h3>학부모</h3>
					<p>부모·자녀 심리재능 코칭</p>
				</div>
				<div class="overview-card">
					<div class="overview-icon">👤</div>
					<h3>성인</h3>
					<p>자기이해 재능경영코칭</p>
				</div>
				<div class="overview-card">
					<div class="overview-icon">🎨</div>
					<h3>워크숍</h3>
					<p>마음회복 프로그램</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Service Details -->
	<section class="service-details">
		<div class="container">
			<!-- 영유아 -->
			<div class="service-section">
				<div class="service-header">
					<div class="service-icon">👶</div>
					<h2>영유아: 정서발달·행동수정 지원</h2>
				</div>
				<div class="service-content">
					<div class="detail-grid">
						<div class="detail-card">
							<h4>대상</h4>
							<p>발달 초기(만 2~6세)의 영유아</p>
						</div>
						<div class="detail-card">
							<h4>내용</h4>
							<p>놀이와 관찰을 통해 아이의 정서 상태와 행동 패턴을 파악하고, 부정적 행동을 줄이며 긍정적 습관을 형성할 수 있도록 지도합니다.</p>
						</div>
						<div class="detail-card">
							<h4>방법</h4>
							<ul>
								<li>PTI:CODE 유아용 검사</li>
								<li>부모 상담</li>
								<li>행동 분석(ABC 기법)</li>
								<li>감정 표현 훈련</li>
								<li>생활 루틴 조정</li>
							</ul>
						</div>
						<div class="detail-card">
							<h4>기대효과</h4>
							<ul>
								<li>정서 안정</li>
								<li>문제 행동 감소</li>
								<li>자기조절 능력 발달</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<!-- 아동·청소년 -->
			<div class="service-section">
				<div class="service-header">
					<div class="service-icon">🧒</div>
					<h2>아동·청소년: 멘탈코칭 & 자기이해 상담</h2>
				</div>
				<div class="service-content">
					<div class="detail-grid">
						<div class="detail-card">
							<h4>대상</h4>
							<p>초등~고등학생 청소년</p>
						</div>
						<div class="detail-card">
							<h4>내용</h4>
							<p>학습 스트레스, 시험 불안, 또래관계 문제 등 청소년기의 심리적 부담을 관리하고, 자기 이해를 돕는 상담 코칭을 제공합니다.</p>
						</div>
						<div class="detail-card">
							<h4>방법</h4>
							<ul>
								<li>PTI:CODE 검사</li>
								<li>1:1 멘탈코칭</li>
								<li>자기이해 상담</li>
								<li>학습·진로 동기 부여 프로그램</li>
							</ul>
						</div>
						<div class="detail-card">
							<h4>기대효과</h4>
							<ul>
								<li>자신감 회복</li>
								<li>학습·진로 방향성 강화</li>
								<li>긍정적 자기인식 형성</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<!-- 학부모 -->
			<div class="service-section">
				<div class="service-header">
					<div class="service-icon">👨‍👩‍👧‍👦</div>
					<h2>학부모: 부모·자녀 심리재능 코칭</h2>
				</div>
				<div class="service-content">
					<div class="detail-grid">
						<div class="detail-card">
							<h4>대상</h4>
							<p>자녀 양육 중인 학부모</p>
						</div>
						<div class="detail-card">
							<h4>내용</h4>
							<p>부모-자녀 간 소통 방식을 점검하고, 자녀의 심리기질에 맞는 양육 및 소통 방법을 제안합니다.</p>
						</div>
						<div class="detail-card">
							<h4>방법</h4>
							<ul>
								<li>부모·자녀 PTI:CODE 검사 비교</li>
								<li>심리재능 코칭 세션</li>
								<li>가족 대화 훈련</li>
								<li>부모 교육 워크숍</li>
							</ul>
						</div>
						<div class="detail-card">
							<h4>기대효과</h4>
							<ul>
								<li>양육 갈등 감소</li>
								<li>자녀 이해 증진</li>
								<li>건강한 가족관계 구축</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<!-- 성인 -->
			<div class="service-section">
				<div class="service-header">
					<div class="service-icon">👤</div>
					<h2>성인: 자기이해 재능경영코칭</h2>
				</div>
				<div class="service-content">
					<div class="detail-grid">
						<div class="detail-card">
							<h4>대상</h4>
							<p>대학생, 취준생, 직장인, 성인 전반</p>
						</div>
						<div class="detail-card">
							<h4>내용</h4>
							<p>자신의 기질과 재능을 정확히 이해하고, 커리어·인간관계·삶의 방향을 전략적으로 설계하도록 돕는 코칭</p>
						</div>
						<div class="detail-card">
							<h4>방법</h4>
							<ul>
								<li>PTI:CODE 검사</li>
								<li>자기이해 프로파일링</li>
								<li>커리어 매니지먼트 상담</li>
								<li>재능 기반 목표 설계</li>
							</ul>
						</div>
						<div class="detail-card">
							<h4>기대효과</h4>
							<ul>
								<li>자기 이해 심화</li>
								<li>커리어 방향 설정</li>
								<li>성과와 만족을 동시에 높이는 자기경영 능력 강화</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<!-- 워크숍 -->
			<div class="service-section">
				<div class="service-header">
					<div class="service-icon">🎨</div>
					<h2>워크숍: 마음회복 프로그램</h2>
				</div>
				<div class="service-content">
					<div class="detail-grid">
						<div class="detail-card">
							<h4>대상</h4>
							<p>청소년, 학부모, 직장인 등 다양한 그룹</p>
						</div>
						<div class="detail-card">
							<h4>내용</h4>
							<p>스트레스·무기력·정서적 소진에서 회복하도록 돕는 집단 프로그램</p>
						</div>
						<div class="detail-card">
							<h4>방법</h4>
							<ul>
								<li>심리회복 워크숍</li>
								<li>마음챙김 훈련</li>
								<li>표현예술 활동(글쓰기, 미술, 음악)</li>
								<li>그룹 대화 & 피드백 세션</li>
							</ul>
						</div>
						<div class="detail-card">
							<h4>기대효과</h4>
							<ul>
								<li>정서적 안정 회복</li>
								<li>긍정적 에너지 충전</li>
								<li>관계 속에서 함께 치유되는 경험</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="cta-section">
		<div class="container">
			<div class="cta-content">
				<h2>심리재능 서비스로 시작하세요</h2>
				<p>PTI:CODE 진단을 통해 당신만의 심리재능을 발견하고, 맞춤형 멘탈코칭으로 성장해보세요.</p>
				<div class="cta-buttons">
					<a href="/contact" class="btn-primary">상담 신청</a>
					<a href="tel:{___prjConst.COMPANY.COUNSELING_TEL}" class="btn-secondary">전화 상담 ( ☎ {___prjConst.COMPANY.COUNSELING_TEL} )</a>
					<a href="/services" class="btn-secondary">다른 서비스 보기</a>
				</div>
			</div>
		</div>
	</section>
</main>

<Footer />

<style>
	.psychological-page {
		margin-top: 70px;
	}

	.hero-section {
		background: linear-gradient(135deg, #6f42c1 0%, #563d7c 100%);
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

	.service-overview {
		padding: 80px 0;
		background: #f8f9fa;
	}

	.overview-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 30px;
	}

	.overview-card {
		background: #fff;
		padding: 30px 20px;
		border-radius: 16px;
		text-align: center;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
	}

	.overview-card:hover {
		transform: translateY(-5px);
	}

	.overview-icon {
		font-size: 3rem;
		margin-bottom: 15px;
	}

	.overview-card :global(h3) {
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 10px 0;
	}

	.overview-card :global(p) {
		color: #666;
		font-size: 0.95rem;
		margin: 0;
	}

	.service-details {
		padding: 80px 0;
		background: #fff;
	}

	.service-section {
		margin-bottom: 80px;
	}

	.service-section:last-child {
		margin-bottom: 0;
	}

	.service-header {
		display: flex;
		align-items: center;
		gap: 20px;
		margin-bottom: 40px;
		padding-bottom: 20px;
		border-bottom: 2px solid #f0f0f0;
	}

	.service-icon {
		font-size: 2.5rem;
	}

	.service-header :global(h2) {
		font-size: 2rem;
		font-weight: 700;
		color: #333;
		margin: 0;
	}

	.detail-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 30px;
	}

	.detail-card {
		background: #f8f9fa;
		padding: 25px;
		border-radius: 12px;
		border-left: 4px solid #6f42c1;
	}

	.detail-card :global(h4) {
		font-size: 1.2rem;
		font-weight: 600;
		color: #6f42c1;
		margin: 0 0 15px 0;
	}

	.detail-card :global(p) {
		color: #555;
		line-height: 1.6;
		margin: 0 0 10px 0;
	}

	.detail-card :global(ul) {
		margin: 0;
		padding-left: 20px;
	}

	.detail-card :global(li) {
		color: #555;
		margin-bottom: 8px;
		line-height: 1.5;
	}

	.cta-section {
		padding: 80px 0;
		background: linear-gradient(135deg, #6f42c1 0%, #563d7c 100%);
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
		color: #6f42c1;
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

		.overview-grid {
			grid-template-columns: 1fr;
		}

		.detail-grid {
			grid-template-columns: 1fr;
		}

		.service-header {
			flex-direction: column;
			text-align: center;
			gap: 15px;
		}

		.service-header :global(h2) {
			font-size: 1.5rem;
		}

		.cta-buttons {
			flex-direction: column;
			align-items: center;
		}
	}
</style>
