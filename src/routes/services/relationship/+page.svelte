<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ___prjConst from '$prj/prjConst.js';
</script>

<svelte:head>
	<title>관계소통 서비스 - 마인드코딩 | PTI:CODE 기반 소통 & 협력 프로그램</title>
	<meta name="description" content="PTI:CODE를 활용한 관계 패턴 분석과 맞춤형 소통 전략, 협력 프로그램을 통해 건강한 인간관계와 효과적인 소통을 지원합니다." />
</svelte:head>

<Header />

<main class="relationship-page">
	<!-- Hero Section -->
	<section class="hero-section">
		<div class="container">
			<div class="hero-content">
				<h1 class="hero-title">관계소통</h1>
				<p class="hero-subtitle">PTI:CODE 기반 소통 & 협력 프로그램</p>
				<p class="hero-description">
					개인과 그룹의 심리재능을 기반으로 한 맞춤형 소통 전략과<br>
					협력 프로그램을 통해 건강한 인간관계를 구축합니다.
				</p>
			</div>
		</div>
	</section>

	<!-- Service Overview -->
	<section class="service-overview">
		<div class="container">
			<div class="overview-grid">
				<div class="overview-card">
					<div class="overview-icon">👨‍👩‍👧‍👦</div>
					<h3>학부모</h3>
					<p>부모·자녀 소통</p>
				</div>
				<div class="overview-card">
					<div class="overview-icon">💕</div>
					<h3>성인</h3>
					<p>신혼부부·연애·재회 상담</p>
				</div>
				<div class="overview-card">
					<div class="overview-icon">🏢</div>
					<h3>조직/기업</h3>
					<p>팀빌딩 프로그램</p>
				</div>
				<div class="overview-card">
					<div class="overview-icon">🤝</div>
					<h3>워크숍</h3>
					<p>소통·협력 프로그램</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Service Details -->
	<section class="service-details">
		<div class="container">
			<!-- 학부모 -->
			<div class="service-section">
				<div class="service-header">
					<div class="service-icon">👨‍👩‍👧‍👦</div>
					<h2>학부모: 부모·자녀 소통</h2>
				</div>
				<div class="service-content">
					<div class="detail-grid">
						<div class="detail-card">
							<h4>대상</h4>
							<p>자녀와의 관계에서 갈등·오해·소통 단절을 경험하는 학부모</p>
						</div>
						<div class="detail-card">
							<h4>내용</h4>
							<p>자녀의 기질과 심리재능을 기반으로, 효과적인 대화법과 양육 소통 전략을 제시</p>
						</div>
						<div class="detail-card">
							<h4>방법</h4>
							<ul>
								<li>부모·자녀 PTI:CODE 비교 진단</li>
								<li>부모·자녀 대화 유형 분석</li>
								<li>맞춤형 코칭 및 실습</li>
								<li>가정 내 실천 과제 제안</li>
							</ul>
						</div>
						<div class="detail-card">
							<h4>기대효과</h4>
							<ul>
								<li>부모·자녀 간 갈등 감소</li>
								<li>상호 이해 증진</li>
								<li>안정적 애착 관계 형성</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<!-- 성인 -->
			<div class="service-section">
				<div class="service-header">
					<div class="service-icon">💕</div>
					<h2>성인: 신혼부부·연애·재회 상담</h2>
				</div>
				<div class="service-content">
					<div class="detail-grid">
						<div class="detail-card">
							<h4>대상</h4>
							<p>연인·부부 관계에서 이해와 소통이 필요한 성인</p>
						</div>
						<div class="detail-card">
							<h4>내용</h4>
							<p>서로의 기질 차이를 이해하고, 건강한 소통 방식과 갈등 해결 전략을 제공</p>
						</div>
						<div class="detail-card">
							<h4>방법</h4>
							<ul>
								<li>PTI:CODE 커플 매칭 검사</li>
								<li>관계 패턴 분석</li>
								<li>1:1 혹은 커플 상담 코칭</li>
								<li>상황별 소통 훈련 & 감정 표현 실습</li>
							</ul>
						</div>
						<div class="detail-card">
							<h4>기대효과</h4>
							<ul>
								<li>신뢰와 공감 회복</li>
								<li>갈등 해결 능력 향상</li>
								<li>관계 지속 가능성 강화</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<!-- 조직/기업 -->
			<div class="service-section">
				<div class="service-header">
					<div class="service-icon">🏢</div>
					<h2>조직/기업: 팀빌딩 프로그램</h2>
				</div>
				<div class="service-content">
					<div class="detail-grid">
						<div class="detail-card">
							<h4>대상</h4>
							<p>조직 내 협력과 성과를 높이고자 하는 기업·기관·단체</p>
						</div>
						<div class="detail-card">
							<h4>내용</h4>
							<p>구성원의 심리재능을 기반으로 역할을 배분하고, 팀워크·리더십·협력 역량을 강화</p>
						</div>
						<div class="detail-card">
							<h4>방법</h4>
							<ul>
								<li>조직 구성원 PTI:CODE 진단</li>
								<li>팀 성향 매트릭스 분석</li>
								<li>협업 시뮬레이션 & 그룹 액티비티</li>
								<li>성과·피드백 세션</li>
							</ul>
						</div>
						<div class="detail-card">
							<h4>기대효과</h4>
							<ul>
								<li>조직 내 신뢰 구축</li>
								<li>협업 효율성 증대</li>
								<li>팀 성과 및 몰입도 향상</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<!-- 워크숍 -->
			<div class="service-section">
				<div class="service-header">
					<div class="service-icon">🤝</div>
					<h2>워크숍: 소통·협력 프로그램</h2>
				</div>
				<div class="service-content">
					<div class="detail-grid">
						<div class="detail-card">
							<h4>대상</h4>
							<p>학교, 기관, 기업, 지역 커뮤니티 등 다양한 그룹</p>
						</div>
						<div class="detail-card">
							<h4>내용</h4>
							<p>공감적 대화, 협력적 문제 해결, 관계 스트레스 완화 훈련</p>
						</div>
						<div class="detail-card">
							<h4>방법</h4>
							<ul>
								<li>그룹 워크숍(2~8시간)</li>
								<li>대화 훈련·롤플레잉·케이스 스터디</li>
								<li>피드백 순환 구조</li>
								<li>실천 루틴 제시</li>
							</ul>
						</div>
						<div class="detail-card">
							<h4>기대효과</h4>
							<ul>
								<li>원활한 의사소통 능력 향상</li>
								<li>협력 기반 문제해결력 강화</li>
								<li>긍정적 관계 경험 확산</li>
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
				<h2>관계소통 서비스로 시작하세요</h2>
				<p>PTI:CODE 진단을 통해 당신만의 소통 스타일을 발견하고, 건강한 인간관계를 구축해보세요.</p>
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
	.relationship-page {
		margin-top: 70px;
	}

	.hero-section {
		background: linear-gradient(135deg, #fd7e14 0%, #e8590c 100%);
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
		border-left: 4px solid #fd7e14;
	}

	.detail-card :global(h4) {
		font-size: 1.2rem;
		font-weight: 600;
		color: #fd7e14;
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
		background: linear-gradient(135deg, #fd7e14 0%, #e8590c 100%);
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
		color: #fd7e14;
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
		color: #fd7e14;
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
