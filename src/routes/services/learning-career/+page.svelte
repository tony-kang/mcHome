<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ___prjConst from '$prj/prjConst.js';
</script>

<svelte:head>
	<title>학습진로 서비스 - 마인드코딩 | PTI:CODE 기반 학습컨설팅 & 입시전략</title>
	<meta name="description" content="PTI:CODE를 활용한 학습 성향 분석과 맞춤형 학습컨설팅, 입시전략, 커리어 매니지먼트를 통해 개인의 학습과 진로 성장을 지원합니다." />
</svelte:head>

<Header />

<main class="learning-career-page">
	<!-- Hero Section -->
	<section class="hero-section">
		<div class="container">
			<div class="hero-content">
				<h1 class="hero-title">학습진로</h1>
				<p class="hero-subtitle">PTI:CODE 기반 학습컨설팅 & 입시전략</p>
				<p class="hero-description">
					개인의 학습 성향과 진로 적성을 정확히 진단하고,<br>
					맞춤형 학습 전략과 진로 설계를 통해 성장을 지원합니다.
				</p>
			</div>
		</div>
	</section>

	<!-- Service Overview -->
	<section class="service-overview">
		<div class="container">
			<div class="overview-grid">
				<div class="overview-card">
					<div class="overview-icon">📚</div>
					<h3>학습컨설팅</h3>
					<p>아동·청소년 맞춤형 학습 전략</p>
				</div>
				<div class="overview-card">
					<div class="overview-icon">🎯</div>
					<h3>입시컨설팅</h3>
					<p>체계적인 입시 준비 전략</p>
				</div>
				<div class="overview-card">
					<div class="overview-icon">💼</div>
					<h3>커리어 매니지먼트</h3>
					<p>취업준비생 맞춤형 커리어 설계</p>
				</div>
				<div class="overview-card">
					<div class="overview-icon">🏕️</div>
					<h3>학습 캠프</h3>
					<p>집중형 학습법 훈련 프로그램</p>
				</div>
				<div class="overview-card">
					<div class="overview-icon">🗺️</div>
					<h3>진로 캠프</h3>
					<p>진로 탐색 & 전공 결정 프로그램</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Service Details -->
	<section class="service-details">
		<div class="container">
			<!-- 학습컨설팅 -->
			<div class="service-section">
				<div class="service-header">
					<div class="service-icon">📚</div>
					<h2>아동·청소년: 학습컨설팅</h2>
				</div>
				<div class="service-content">
					<div class="detail-grid">
						<div class="detail-card">
							<h4>대상</h4>
							<p>초등~고등학생, 학습 동기·집중·시간관리·과목 전략이 필요한 학생</p>
						</div>
						<div class="detail-card">
							<h4>내용</h4>
							<p>학습 성향 분석(집중/기억/동기), 과목별 전략 설계, 시간관리·시험전략·루틴 구축, 부모와의 학습 커뮤니케이션 가이드</p>
						</div>
						<div class="detail-card">
							<h4>방법</h4>
							<ul>
								<li>PTI:CODE 학습 프로파일 + 성취 데이터(성적표/모의고사) 분석</li>
								<li>1:1 코칭(주 1회, 4~8주)</li>
								<li>과목별 미션/주간 플랜</li>
								<li>중간 점검 & 리포트</li>
							</ul>
						</div>
						<div class="detail-card">
							<h4>기대효과</h4>
							<ul>
								<li>자기주도 학습 루틴 정착</li>
								<li>과목별 취약점 보완·강점 강화</li>
								<li>시험 대비 체계 확보</li>
								<li>학습 스트레스 감소</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<!-- 입시컨설팅 -->
			<div class="service-section">
				<div class="service-header">
					<div class="service-icon">🎯</div>
					<h2>아동·청소년: 입시컨설팅</h2>
				</div>
				<div class="service-content">
					<div class="detail-grid">
						<div class="detail-card">
							<h4>대상</h4>
							<p>중3~고3, N수생(계열·전공 선택, 학생부/비교과·논술·면접 준비가 필요한 학생)</p>
						</div>
						<div class="detail-card">
							<h4>내용</h4>
							<p>전공 적합성·계열 매칭, 학생부 스토리라인 설계, 비교과/활동 포트폴리오 기획, 논술/면접 전략</p>
						</div>
						<div class="detail-card">
							<h4>방법</h4>
							<ul>
								<li>PTI:CODE 진로 적합 진단</li>
								<li>학생부·활동 분석</li>
								<li>목표 대학/전형 맵핑</li>
								<li>자소서/활동 기획 워크숍</li>
								<li>모의면접/피드백(4~12주 트랙)</li>
							</ul>
						</div>
						<div class="detail-card">
							<h4>기대효과</h4>
							<ul>
								<li>전형별 강점 극대화</li>
								<li>일관된 지원 스토리 구축</li>
								<li>합격 가능성 제고</li>
								<li>일정·준비물 관리 체계화</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<!-- 커리어 매니지먼트 -->
			<div class="service-section">
				<div class="service-header">
					<div class="service-icon">💼</div>
					<h2>취업준비생: 커리어 매니지먼트</h2>
				</div>
				<div class="service-content">
					<div class="detail-grid">
						<div class="detail-card">
							<h4>대상</h4>
							<p>대학생·취준생(직무 선택, 역량 포트폴리오, 면접 대비가 필요한 분)</p>
						</div>
						<div class="detail-card">
							<h4>내용</h4>
							<p>강점 기반 직무 매칭, 역량 갭 분석·보완 로드맵, 프로젝트/인턴 전략, 브랜딩(이력서·자기소개서·링크드인), 면접 퍼포먼스</p>
						</div>
						<div class="detail-card">
							<h4>방법</h4>
							<ul>
								<li>PTI:CODE × 직무 매트릭스 진단</li>
								<li>STAR 사례 도출 워크숍</li>
								<li>이력서/자소서 클리닉</li>
								<li>모의면접(영상 피드백)</li>
								<li>네트워킹·지원 일정 관리(4~8주)</li>
							</ul>
						</div>
						<div class="detail-card">
							<h4>기대효과</h4>
							<ul>
								<li>커리어 방향 명확화</li>
								<li>서류 통과율·면접 합격률 향상</li>
								<li>차별화된 개인 브랜딩</li>
								<li>지속 가능한 구직 루틴 구축</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<!-- 학습 캠프 -->
			<div class="service-section">
				<div class="service-header">
					<div class="service-icon">🏕️</div>
					<h2>캠프: 학습 캠프</h2>
				</div>
				<div class="service-content">
					<div class="detail-grid">
						<div class="detail-card">
							<h4>대상</h4>
							<p>초중고(학습 습관·동기 강화가 필요한 학생)</p>
						</div>
						<div class="detail-card">
							<h4>내용</h4>
							<p>핵심 학습법(집중·기억·문제풀이) 훈련, 시험전략 실습, 협업 프로젝트로 자기주도·책임감 강화</p>
						</div>
						<div class="detail-card">
							<h4>방법</h4>
							<ul>
								<li>2~3일 집중 또는 1주 코스</li>
								<li>RPM 이론·실습, RPM 실전 스터디 & 코칭</li>
								<li>PTI:CODE 기반 팀빌딩</li>
								<li>일일 피드백·루브릭</li>
								<li>최종 개인 학습플랜 발표</li>
							</ul>
						</div>
						<div class="detail-card">
							<h4>기대효과</h4>
							<ul>
								<li>즉시 적용 가능한 공부법 체득</li>
								<li>동기 상승</li>
								<li>실전 시험대응력 향상</li>
								<li>캠프 이후 4주 실행계획 확보</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<!-- 진로 캠프 -->
			<div class="service-section">
				<div class="service-header">
					<div class="service-icon">🗺️</div>
					<h2>캠프: 진로 캠프</h2>
				</div>
				<div class="service-content">
					<div class="detail-grid">
						<div class="detail-card">
							<h4>대상</h4>
							<p>중·고·대학생(진로 탐색·전공 결정·직무 이해가 필요한 학생)</p>
						</div>
						<div class="detail-card">
							<h4>내용</h4>
							<p>직무·산업 트렌드 탐색, 전공·진로 매칭, 현업 멘토링, 미니 프로젝트·포트폴리오 기획</p>
						</div>
						<div class="detail-card">
							<h4>방법</h4>
							<ul>
								<li>PTI:CODE 진로검사</li>
								<li>진로 매칭 워크숍</li>
								<li>멘토 토크/패널 Q&A</li>
								<li>팀 프로젝트</li>
								<li>포트폴리오 피드백 & 발표</li>
							</ul>
						</div>
						<div class="detail-card">
							<h4>기대효과</h4>
							<ul>
								<li>진로 확신도 상승</li>
								<li>지원 전략 구체화</li>
								<li>실전형 포트폴리오 초안 완성</li>
								<li>멘토·동료 네트워크 형성</li>
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
				<h2>학습진로 서비스로 시작하세요</h2>
				<p>PTI:CODE 진단을 통해 당신만의 학습 성향과 진로 적성을 발견하고, 맞춤형 전략으로 성장해보세요.</p>
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
	.learning-career-page {
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
		border-left: 4px solid #28a745;
	}

	.detail-card :global(h4) {
		font-size: 1.2rem;
		font-weight: 600;
		color: #28a745;
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
