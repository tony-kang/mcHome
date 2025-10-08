<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import ___prj from '$prj/prjMain';
	import ___const from '$prj/lib/i_const';

	const counselorId = $page.params.id;
	let counselorData = $state(null);
	let loading = $state(true);

	async function loadCounselorData() {
		try {
			const r = await ___prj.api.post('/s/system', 'get.special.template.config', null, {
				counselorId: counselorId
			});

			if (r.data.result === ___const.OK) {
				counselorData = r.data.content;
			}
		} catch (error) {
			console.error('상담사 정보 로드 오류:', error);
		} finally {
			loading = false;
		}

		counselorData = {
            name: '홍길동',
            title: '심리상담 전문가',
            profile_image: 'https://via.placeholder.com/150',
            email: 'hong@gmail.com',
            phone: '010-1234-5678'
        };
        loading = false;
	}

	onMount(() => {
		loadCounselorData();
	});
</script>

<svelte:head>
	<title>소개 - {counselorData?.name || '상담사'}</title>
</svelte:head>

{#if !loading && counselorData}
	<!-- Page Header -->
	<section class="page-header">
		<div class="t-container">
			<h1>전문가 소개</h1>
			<p>심리상담 및 코칭 전문가를 소개합니다</p>
		</div>
	</section>

	<!-- Profile Section -->
	<section class="profile-section">
		<div class="container">
			<div class="profile-content">
				<div class="profile-image-wrapper">
					{#if counselorData.profile_image}
						<img src={counselorData.profile_image} alt={counselorData.name} class="profile-image" />
					{:else}
						<div class="profile-placeholder">
							<span class="profile-initial">{counselorData.name?.charAt(0) || 'C'}</span>
						</div>
					{/if}
				</div>
				<div class="profile-info">
					<h2>{counselorData.name || '상담사'}</h2>
					<p class="title">{counselorData.title || '심리상담 전문가'}</p>
					<div class="intro">
						<p>
							안녕하세요. {counselorData.name || '상담사'}입니다.<br>
							심리검사, 학생상담, 코칭 분야에서 다년간의 경험을 쌓아왔습니다.<br>
							내담자 한 분 한 분의 이야기에 귀 기울이며, 함께 성장하는 것을 목표로 합니다.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Education & Career -->
	<section class="education-section">
		<div class="container">
			<div class="content-grid">
				<div class="content-card">
					<h3>학력</h3>
					<ul class="timeline">
						<li>
							<span class="year">2015</span>
							<span class="detail">○○대학교 심리학과 박사</span>
						</li>
						<li>
							<span class="year">2010</span>
							<span class="detail">○○대학교 심리학과 석사</span>
						</li>
						<li>
							<span class="year">2008</span>
							<span class="detail">○○대학교 심리학과 학사</span>
						</li>
					</ul>
				</div>

				<div class="content-card">
					<h3>자격증</h3>
					<ul class="certification-list">
						<li>임상심리전문가 1급</li>
						<li>청소년상담사 1급</li>
						<li>전문상담교사 자격증</li>
						<li>국제코칭연맹(ICF) 인증 코치</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<!-- Experience -->
	<section class="experience-section">
		<div class="container">
			<h2 class="section-title">경력</h2>
			<div class="experience-timeline">
				<div class="timeline-item">
					<div class="timeline-marker"></div>
					<div class="timeline-content">
						<h4>현재</h4>
						<p class="position">개인 심리상담소 운영</p>
						<p class="description">개인 및 청소년 대상 심리상담 및 코칭</p>
					</div>
				</div>
				<div class="timeline-item">
					<div class="timeline-marker"></div>
					<div class="timeline-content">
						<h4>2018 - 2023</h4>
						<p class="position">○○대학교 학생상담센터 선임상담사</p>
						<p class="description">대학생 심리상담 및 위기개입</p>
					</div>
				</div>
				<div class="timeline-item">
					<div class="timeline-marker"></div>
					<div class="timeline-content">
						<h4>2015 - 2018</h4>
						<p class="position">○○청소년상담복지센터 상담사</p>
						<p class="description">청소년 및 학부모 상담</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Specialties -->
	<section class="specialties-section">
		<div class="container">
			<h2 class="section-title">전문 분야</h2>
			<div class="specialties-grid">
				<div class="specialty-card">
					<div class="specialty-icon">🧠</div>
					<h3>심리검사</h3>
					<ul>
						<li>다면적 인성검사(MMPI)</li>
						<li>지능검사(K-WAIS)</li>
						<li>진로탐색검사</li>
						<li>학습유형검사</li>
					</ul>
				</div>
				<div class="specialty-card">
					<div class="specialty-icon">👨‍🎓</div>
					<h3>학생상담</h3>
					<ul>
						<li>학업 스트레스 관리</li>
						<li>진로 및 적성 상담</li>
						<li>대인관계 문제</li>
						<li>학교 부적응</li>
					</ul>
				</div>
				<div class="specialty-card">
					<div class="specialty-icon">🎯</div>
					<h3>코칭</h3>
					<ul>
						<li>목표 설정 및 달성</li>
						<li>동기부여 및 자기계발</li>
						<li>학습 전략 수립</li>
						<li>시간 관리</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="cta-section">
		<div class="container">
			<h2>상담이 필요하신가요?</h2>
			<p>언제든지 편하게 문의해주세요</p>
			<button class="btn-booking" onclick={() => goto(`/${counselorId}/booking`)}>
				상담 예약하기
			</button>
		</div>
	</section>

{/if}

<style>
	.t-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
	}

	.profile-section {
		padding: 80px 0;
		background: white;
	}

	.profile-content {
		display: grid;
		grid-template-columns: 300px 1fr;
		gap: 60px;
		align-items: start;
	}

	.profile-image-wrapper {
		position: sticky;
		top: 100px;
	}

	.profile-image {
		width: 100%;
		border-radius: 16px;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
	}

	.profile-placeholder {
		width: 100%;
		aspect-ratio: 1;
		border-radius: 16px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
	}

	.profile-initial {
		font-size: 6rem;
		font-weight: 700;
		color: white;
	}

	.profile-info h2 {
		font-size: 2.5rem;
		margin: 0 0 10px 0;
		color: #333;
	}

	.title {
		font-size: 1.3rem;
		color: #667eea;
		font-weight: 600;
		margin: 0 0 30px 0;
	}

	.intro {
		line-height: 1.8;
		color: #666;
		font-size: 1.1rem;
	}

	.education-section {
		padding: 80px 0;
		background: #f8f9fa;
	}

	.content-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 40px;
	}

	.content-card {
		background: white;
		padding: 40px;
		border-radius: 16px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
	}

	.content-card h3 {
		font-size: 1.8rem;
		margin: 0 0 30px 0;
		color: #333;
		border-bottom: 3px solid #667eea;
		padding-bottom: 15px;
	}

	.timeline {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.timeline li {
		display: flex;
		gap: 20px;
		padding: 15px 0;
		border-bottom: 1px solid #e9ecef;
	}

	.timeline li:last-child {
		border-bottom: none;
	}

	.year {
		font-weight: 700;
		color: #667eea;
		min-width: 60px;
	}

	.detail {
		color: #666;
	}

	.certification-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.certification-list li {
		padding: 15px 0;
		padding-left: 30px;
		position: relative;
		color: #666;
		border-bottom: 1px solid #e9ecef;
	}

	.certification-list li:last-child {
		border-bottom: none;
	}

	.certification-list li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: #667eea;
		font-weight: 700;
		font-size: 1.2rem;
	}

	.experience-section {
		padding: 80px 0;
		background: white;
	}


	.experience-timeline {
		max-width: 800px;
		margin: 0 auto;
		position: relative;
		padding-left: 40px;
	}

	.experience-timeline::before {
		content: '';
		position: absolute;
		left: 15px;
		top: 0;
		bottom: 0;
		width: 2px;
		background: #667eea;
	}

	.timeline-item {
		position: relative;
		margin-bottom: 40px;
	}

	.timeline-marker {
		position: absolute;
		left: -33px;
		top: 5px;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: #667eea;
		border: 4px solid white;
		box-shadow: 0 0 0 2px #667eea;
	}

	.timeline-content h4 {
		font-size: 1.2rem;
		color: #667eea;
		margin: 0 0 10px 0;
	}

	.position {
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 10px 0;
	}

	.description {
		color: #666;
		line-height: 1.6;
	}

	.specialties-section {
		padding: 80px 0;
		background: #f8f9fa;
	}

	.specialties-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 30px;
	}

	.specialty-card {
		background: white;
		padding: 40px;
		border-radius: 16px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
		text-align: center;
	}

	.specialty-icon {
		font-size: 4rem;
		margin-bottom: 20px;
	}

	.specialty-card h3 {
		font-size: 1.5rem;
		margin: 0 0 20px 0;
		color: #333;
	}

	.specialty-card ul {
		list-style: none;
		padding: 0;
		margin: 0;
		text-align: left;
	}

	.specialty-card li {
		padding: 10px 0;
		padding-left: 25px;
		position: relative;
		color: #666;
	}

	.specialty-card li::before {
		content: '•';
		position: absolute;
		left: 0;
		color: #667eea;
		font-size: 1.5rem;
	}

	.cta-section {
		padding: 80px 0;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		text-align: center;
	}

	.cta-section h2 {
		font-size: 2.5rem;
		margin: 0 0 15px 0;
	}

	.cta-section p {
		font-size: 1.3rem;
		margin: 0 0 40px 0;
		opacity: 0.9;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.profile-content {
			grid-template-columns: 1fr;
			gap: 30px;
		}

		.profile-image-wrapper {
			position: static;
			max-width: 250px;
			margin: 0 auto;
		}

		.content-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
