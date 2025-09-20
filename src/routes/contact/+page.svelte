<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import KakaoChannel from '$lib/components/KakaoChannel.svelte';
	import ___prjConst from '$prj/prjConst';
</script>

<svelte:head>
	<title>Contact - 마인드코딩 | 상담 및 문의</title>
	<meta name="description" content="마인드코딩에 문의하세요. PTI:CODE 검사, 상담, 코칭 등 모든 서비스에 대한 상담을 받으실 수 있습니다." />
</svelte:head>

<Header />

<main class="contact-page">
	<!-- Hero Section -->
	<section class="hero-section">
		<div class="container">
			<div class="hero-content">
				<h1 class="hero-title">Contact</h1>
				<p class="hero-subtitle">상담 및 문의</p>
				<p class="hero-description">
					PTI:CODE 검사, 상담, 코칭 등 모든 서비스에 대한<br>
					상담을 받으실 수 있습니다.
				</p>
			</div>
		</div>
	</section>

	<!-- Contact Info -->
	<section class="contact-info">
		<div class="container">
			<div class="contact-grid">
				<div class="contact-card primary-card">
					<div class="contact-icon">📞</div>
					<h3>전화 상담</h3>
					<p>평일 09:00 - 18:00<br><small>가장 빠른 상담 방법</small></p>
					<a href="tel:{___prjConst.COMPANY.COUNSELING_TEL}" class="contact-link phone-link">{___prjConst.COMPANY.COUNSELING_TEL}</a>
				</div>
				<div class="contact-card">
					<div class="contact-icon">📧</div>
					<h3>이메일 문의</h3>
					<p>24시간 접수 가능</p>
					<a href="mailto:{___prjConst.COMPANY.EMAIL}" class="contact-link">{___prjConst.COMPANY.EMAIL}</a>
				</div>
				<div class="contact-card">
					<div class="contact-icon">📱</div>
					<h3>카카오톡 채널</h3>
					<p>공지사항 및 소식 확인</p>
					<div class="kakao-channel-wrapper">
						<a href="http://pf.kakao.com/_xeznUn" target="_blank" class="kakao-direct-link">
							채널 구독하기
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Contact Form -->
	<!-- <section class="contact-form-section">
		<div class="container">
			<div class="form-container">
				<div class="form-header">
					<h2>온라인 상담 신청</h2>
					<p>아래 양식을 작성해주시면 빠른 시일 내에 연락드리겠습니다.</p>
				</div>
				
				<form class="contact-form">
					<div class="form-group">
						<label for="name">이름 *</label>
						<input type="text" id="name" name="name" required>
					</div>
					
					<div class="form-group">
						<label for="phone">연락처 *</label>
						<input type="tel" id="phone" name="phone" required>
					</div>
					
					<div class="form-group">
						<label for="email">이메일 *</label>
						<input type="email" id="email" name="email" required>
					</div>
					
					<div class="form-group">
						<label for="service">관심 서비스</label>
						<select id="service" name="service">
							<option value="">선택해주세요</option>
							<option value="pti-code">PTI:CODE 검사</option>
							<option value="psychological">심리재능 코칭</option>
							<option value="learning-career">학습진로 컨설팅</option>
							<option value="relationship">관계소통 상담</option>
							<option value="business">비즈니스 컨설팅</option>
							<option value="certification">자격과정</option>
							<option value="other">기타</option>
						</select>
					</div>
					
					<div class="form-group">
						<label for="target">상담 대상</label>
						<select id="target" name="target">
							<option value="">선택해주세요</option>
							<option value="infant">영유아</option>
							<option value="child">아동·청소년</option>
							<option value="parent">학부모</option>
							<option value="adult">성인</option>
							<option value="jobseeker">취준생</option>
							<option value="employee">직장인</option>
							<option value="entrepreneur">창업가</option>
							<option value="company">기업</option>
						</select>
					</div>
					
					<div class="form-group">
						<label for="message">문의 내용 *</label>
						<textarea id="message" name="message" rows="5" required placeholder="상담받고 싶은 내용을 자세히 적어주세요."></textarea>
					</div>
					
					<div class="form-group checkbox-group">
						<label class="checkbox-label">
							<input type="checkbox" name="privacy" required>
							<span class="checkmark"></span>
							개인정보 수집 및 이용에 동의합니다. *
						</label>
					</div>
					
					<button type="submit" class="submit-btn">상담 신청하기</button>
				</form>
			</div>
		</div>
	</section> -->

	<!-- FAQ Section -->
	<section class="faq-section">
		<div class="container">
			<div class="section-header">
				<h2>자주 묻는 질문</h2>
			</div>
			<div class="faq-list">
				<div class="faq-item">
					<div class="faq-question">
						<h3>PTI:CODE 검사는 어떻게 진행되나요?</h3>
						<span class="faq-icon">+</span>
					</div>
					<div class="faq-answer">
						<p>PTI:CODE 검사는 온라인으로 진행되며, 약 30-40분 정도 소요됩니다. 검사 완료 후 전문가가 결과를 분석하여 상담을 통해 맞춤형 성장 전략을 제시합니다.</p>
					</div>
				</div>
				
				<div class="faq-item">
					<div class="faq-question">
						<h3>상담은 어디서 받을 수 있나요?</h3>
						<span class="faq-icon">+</span>
					</div>
					<div class="faq-answer">
						<p>온라인 화상 상담과 오프라인 대면 상담 모두 가능합니다. 고객의 편의에 따라 선택하실 수 있습니다.</p>
					</div>
				</div>
				
				<div class="faq-item">
					<div class="faq-question">
						<h3>검사 결과는 언제 받을 수 있나요?</h3>
						<span class="faq-icon">+</span>
					</div>
					<div class="faq-answer">
						<p>검사 완료 후 3-5일 내에 결과를 제공하며, 상담을 통해 자세한 해석과 활용 방안을 안내드립니다.</p>
					</div>
				</div>
				
				<div class="faq-item">
					<div class="faq-question">
						<h3>자격과정 수강 조건이 있나요?</h3>
						<span class="faq-icon">+</span>
					</div>
					<div class="faq-answer">
						<p>코치 과정은 누구나 수강 가능하며, 프로 과정은 코치 과정 이수자가, 마스터 과정은 프로 과정 이수자 중 선발됩니다.</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>

<Footer />

<style>
	.contact-page {
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

	.contact-info {
		padding: 80px 0;
		background: #f8f9fa;
	}

	.contact-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 30px;
	}

	.contact-card {
		background: #fff;
		padding: 40px 30px;
		border-radius: 16px;
		text-align: center;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
	}

	.contact-card:hover {
		transform: translateY(-5px);
	}

	.primary-card {
		border: 2px solid #007bff;
		position: relative;
	}

	.primary-card::before {
		content: "추천";
		position: absolute;
		top: -10px;
		right: 20px;
		background: #007bff;
		color: white;
		padding: 5px 15px;
		border-radius: 20px;
		font-size: 12px;
		font-weight: 600;
	}

	.phone-link {
		background: #007bff;
		color: white !important;
		padding: 10px 20px;
		border-radius: 8px;
		display: inline-block;
		text-decoration: none;
		font-weight: 600;
		transition: all 0.3s ease;
	}

	.phone-link:hover {
		background: #0056b3;
		transform: scale(1.05);
		text-decoration: none;
		color: white !important;
	}

	.contact-icon {
		font-size: 3rem;
		margin-bottom: 20px;
	}

	.contact-card h3 {
		font-size: 1.5rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 10px 0;
	}

	.contact-card p {
		color: #666;
		margin: 0 0 15px 0;
	}

	.contact-link {
		color: #007bff;
		text-decoration: none;
		font-weight: 600;
		font-size: 1.1rem;
	}

	.contact-link:hover {
		text-decoration: underline;
	}

	.kakao-channel-wrapper {
		margin-top: 10px;
	}

	.kakao-channel-wrapper :global(.kakao-channel-btn) {
		width: 100%;
		justify-content: center;
	}

	.kakao-direct-link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 12px 20px;
		background: #FEE500;
		color: #3C1E1E;
		text-decoration: none;
		border-radius: 8px;
		font-weight: 600;
		font-size: 16px;
		transition: all 0.3s ease;
		border: none;
		cursor: pointer;
	}

	.kakao-direct-link:hover {
		background: #FFD700;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(254, 229, 0, 0.3);
		text-decoration: none;
		color: #3C1E1E;
	}

	.kakao-direct-link:before {
		content: "💬";
		margin-right: 8px;
		font-size: 18px;
	}

	.contact-form-section {
		padding: 80px 0;
		background: #fff;
	}

	.form-container {
		max-width: 800px;
		margin: 0 auto;
	}

	.form-header {
		text-align: center;
		margin-bottom: 50px;
	}

	.form-header h2 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #333;
		margin: 0 0 15px 0;
	}

	.form-header p {
		font-size: 1.1rem;
		color: #666;
		margin: 0;
	}

	.contact-form {
		background: #f8f9fa;
		padding: 40px;
		border-radius: 16px;
	}

	.form-group {
		margin-bottom: 25px;
	}

	.form-group label {
		display: block;
		font-weight: 600;
		color: #333;
		margin-bottom: 8px;
	}

	.form-group input,
	.form-group select,
	.form-group textarea {
		width: 100%;
		padding: 12px 15px;
		border: 2px solid #e9ecef;
		border-radius: 8px;
		font-size: 1rem;
		transition: border-color 0.3s ease;
	}

	.form-group input:focus,
	.form-group select:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: #007bff;
	}

	.form-group textarea {
		resize: vertical;
		min-height: 120px;
	}

	.checkbox-group {
		display: flex;
		align-items: center;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		cursor: pointer;
		font-size: 0.95rem;
	}

	.checkbox-label input[type="checkbox"] {
		width: auto;
		margin-right: 10px;
	}

	.submit-btn {
		width: 100%;
		padding: 15px;
		background: #007bff;
		color: #fff;
		border: none;
		border-radius: 8px;
		font-size: 1.1rem;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.3s ease;
	}

	.submit-btn:hover {
		background: #0056b3;
	}

	.faq-section {
		padding: 80px 0;
		background: #f8f9fa;
	}

	.section-header {
		text-align: center;
		margin-bottom: 50px;
	}

	.section-header h2 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #333;
		margin: 0;
	}

	.faq-list {
		max-width: 800px;
		margin: 0 auto;
	}

	.faq-item {
		background: #fff;
		margin-bottom: 15px;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
	}

	.faq-question {
		padding: 25px 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
		transition: background 0.3s ease;
	}

	.faq-question:hover {
		background: #f8f9fa;
	}

	.faq-question h3 {
		font-size: 1.2rem;
		font-weight: 600;
		color: #333;
		margin: 0;
	}

	.faq-icon {
		font-size: 1.5rem;
		color: #007bff;
		font-weight: 700;
	}

	.faq-answer {
		padding: 0 30px 25px;
		color: #666;
		line-height: 1.6;
	}

	.faq-answer p {
		margin: 0;
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

		.contact-grid {
			grid-template-columns: 1fr;
		}

		.contact-form {
			padding: 30px 20px;
		}

		.faq-question {
			padding: 20px;
		}

		.faq-answer {
			padding: 0 20px 20px;
		}

	}
</style>
