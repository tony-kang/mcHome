<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import ___prj from '$prj/prjMain';
	import ___const from '$prj/lib/i_const';
	import favicon from '$lib/assets/favicon.svg';

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
            profile_image: 'https://nimage.g-enews.com/phpwas/restmb_allidxmake.php?idx=5&simg=2020060618594303154b8488d322b9220692192.jpg',
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
	<title>{counselorData?.name || '상담사'} - 심리상담 전문가</title>
	<link rel="icon" href={favicon} />
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
	<meta name="description" content="심리검사, 학생상담 및 코칭 전문가" />
</svelte:head>

{#if loading}
	<div class="loading-t-container">
		<div class="loading-spinner"></div>
		<p>로딩 중...</p>
	</div>
{:else if counselorData}
	<!-- Hero Section -->
	<section class="hero-section">
		<div class="hero-overlay"></div>
		<div class="hero-content">
            <div class="t-container">
				<div class="profile-card">
					{#if counselorData.profile_image}
						<img src={counselorData.profile_image} alt={counselorData.name} class="profile-image" />
					{:else}
						<div class="profile-placeholder">
							<span class="profile-initial">{counselorData.name?.charAt(0) || 'C'}</span>
						</div>
					{/if}
					<h1 class="counselor-name">{counselorData.name || '상담사'}</h1>
					<p class="counselor-title">{counselorData.title || '심리상담 전문가'}</p>
					<div class="counselor-tags">
						<span class="tag">심리검사</span>
						<span class="tag">학생상담</span>
						<span class="tag">코칭</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- About Section -->
	<section class="about-section">
		<div class="t-container">
			<h2 class="section-title">전문 분야</h2>
			<div class="expertise-grid">
				<div class="expertise-card">
					<div class="expertise-icon">🧠</div>
					<h3>심리검사</h3>
					<p>다양한 심리검사를 통해 내면의 상태를 파악하고 이해합니다.</p>
				</div>
				<div class="expertise-card">
					<div class="expertise-icon">👨‍🎓</div>
					<h3>학생상담</h3>
					<p>학업, 진로, 대인관계 등 학생들의 고민을 함께 해결합니다.</p>
				</div>
				<div class="expertise-card">
					<div class="expertise-icon">🎯</div>
					<h3>코칭</h3>
					<p>목표 달성과 성장을 위한 체계적인 코칭을 제공합니다.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Services Section -->
	<section class="services-section">
		<div class="t-container">
			<h2 class="section-title">제공 서비스</h2>
			<div class="services-grid">
				<div class="service-card">
					<h3>개인 상담</h3>
					<p class="service-duration">50분 / 회</p>
					<ul class="service-features">
						<li>1:1 맞춤 상담</li>
						<li>심리검사 포함</li>
						<li>온/오프라인 가능</li>
					</ul>
					<button class="btn-primary" onclick={() => goto(`/${counselorId}/booking`)}>
						예약하기
					</button>
				</div>
				<div class="service-card featured">
					<div class="badge">추천</div>
					<h3>종합 심리검사</h3>
					<p class="service-duration">90분 / 회</p>
					<ul class="service-features">
						<li>다면적 심리검사</li>
						<li>상세 결과 해석</li>
						<li>맞춤 솔루션 제공</li>
					</ul>
					<button class="btn-primary" onclick={() => goto(`/${counselorId}/booking`)}>
						예약하기
					</button>
				</div>
				<div class="service-card">
					<h3>학생 코칭</h3>
					<p class="service-duration">60분 / 회</p>
					<ul class="service-features">
						<li>진로 탐색</li>
						<li>학습 전략</li>
						<li>동기부여</li>
					</ul>
					<button class="btn-primary" onclick={() => goto(`/${counselorId}/booking`)}>
						예약하기
					</button>
				</div>
			</div>
		</div>
	</section>

	<!-- Contact Section -->
	<section class="contact-section">
		<div class="t-container">
			<h2 class="section-title">상담 문의</h2>
			<div class="contact-info">
				{#if counselorData.email}
					<div class="contact-item">
						<span class="contact-icon">📧</span>
						<span class="contact-text">{counselorData.email}</span>
					</div>
				{/if}
				{#if counselorData.phone}
					<div class="contact-item">
						<span class="contact-icon">📞</span>
						<span class="contact-text">{counselorData.phone}</span>
					</div>
				{/if}
				<div class="contact-item">
					<span class="contact-icon">⏰</span>
					<span class="contact-text">평일 09:00 - 18:00</span>
				</div>
			</div>
			<button class="btn-booking" onclick={() => goto(`/${counselorId}/booking`)}>
				지금 예약하기
			</button>
		</div>
	</section>

{:else}
	<div class="error-t-container">
		<h1>상담사를 찾을 수 없습니다</h1>
		<p>요청하신 페이지가 존재하지 않습니다.</p>
		<button class="btn-primary" onclick={() => goto('/')}>홈으로 돌아가기</button>
	</div>
{/if}

<style>
	.hero-section {
		position: relative;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 100px 0 80px;
		color: white;
		overflow: hidden;
	}

	.hero-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"><path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="%23ffffff"></path></svg>') no-repeat bottom;
		background-size: cover;
		opacity: 0.1;
	}

	.hero-content {
		position: relative;
		z-index: 1;
	}

	.profile-card {
		text-align: center;
		animation: fadeInUp 0.8s ease;
	}

	.profile-image {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		border: 5px solid rgba(255, 255, 255, 0.3);
		object-fit: cover;
		margin-bottom: 20px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	}

	.profile-placeholder {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.2);
		border: 5px solid rgba(255, 255, 255, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 20px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	}

	.profile-initial {
		font-size: 4rem;
		font-weight: 700;
		color: white;
	}

	.counselor-name {
		font-size: 3rem;
		font-weight: 700;
		margin: 0 0 10px 0;
	}

	.counselor-title {
		font-size: 1.5rem;
		opacity: 0.9;
		margin: 0 0 20px 0;
	}

	.counselor-tags {
		display: flex;
		gap: 10px;
		justify-content: center;
		flex-wrap: wrap;
	}

	.tag {
		padding: 8px 20px;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 20px;
		font-size: 0.9rem;
		backdrop-filter: blur(10px);
	}


	.about-section {
		padding: 80px 0;
		background: #f8f9fa;
	}

	.expertise-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 30px;
	}

	.expertise-card {
		background: white;
		padding: 40px;
		border-radius: 16px;
		text-align: center;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.expertise-card:hover {
		transform: translateY(-10px);
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
	}

	.expertise-icon {
		font-size: 4rem;
		margin-bottom: 20px;
	}

	.expertise-card h3 {
		font-size: 1.5rem;
		margin: 0 0 15px 0;
		color: #333;
	}

	.expertise-card p {
		color: #666;
		line-height: 1.6;
	}

	.services-section {
		padding: 80px 0;
		background: white;
	}

	.services-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 30px;
	}

	.service-card {
		background: #f8f9fa;
		padding: 40px;
		border-radius: 16px;
		border: 2px solid transparent;
		transition: all 0.3s ease;
		position: relative;
	}

	.service-card.featured {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		transform: scale(1.05);
	}

	.service-card:hover {
		border-color: #667eea;
		transform: translateY(-5px);
	}

	.service-card.featured:hover {
		transform: scale(1.08) translateY(-5px);
	}

	.badge {
		position: absolute;
		top: 20px;
		right: 20px;
		background: rgba(255, 255, 255, 0.3);
		padding: 5px 15px;
		border-radius: 20px;
		font-size: 0.85rem;
		font-weight: 600;
	}

	.service-card h3 {
		font-size: 1.8rem;
		margin: 0 0 10px 0;
	}

	.service-duration {
		font-size: 1rem;
		opacity: 0.8;
		margin: 0 0 20px 0;
	}

	.service-features {
		list-style: none;
		padding: 0;
		margin: 0 0 30px 0;
	}

	.service-features li {
		padding: 10px 0;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	.service-card.featured .service-features li {
		border-bottom-color: rgba(255, 255, 255, 0.2);
	}

	.service-card .btn-primary {
		width: 100%;
	}

	.service-card.featured .btn-primary {
		background: white;
		color: #667eea;
	}

	.service-card.featured .btn-primary:hover {
		background: rgba(255, 255, 255, 0.9);
	}

	.contact-section {
		padding: 80px 0;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		text-align: center;
	}

	.contact-section .section-title {
		color: white;
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: 20px;
		max-width: 600px;
		margin: 0 auto 40px;
	}

	.contact-item {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 15px;
		font-size: 1.2rem;
	}

	.contact-icon {
		font-size: 1.5rem;
	}


	/* Responsive */
	@media (max-width: 768px) {
		.counselor-name {
			font-size: 2rem;
		}

		.counselor-title {
			font-size: 1.2rem;
		}

		.service-card.featured {
			transform: scale(1);
		}
	}
</style>