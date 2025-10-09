<script>
	let { complexData } = $props();
	
	let currentSlide = $state(0);
	const slides = [
		{ image: '/main/slide/main_slide_1.jpg', title: '프리미엄 라이프스타일', subtitle: '당신의 가치를 높이는 특별한 공간' },
		{ image: '/main/slide/main_slide_2.jpg', title: '최고의 입지', subtitle: '교통과 생활편의시설이 완벽한 곳' },
		{ image: '/main/slide/main_slide_3.jpg', title: '고품격 커뮤니티', subtitle: '풍요로운 여가와 휴식의 공간' }
	];

	let slideInterval;

	function startSlideShow() {
		slideInterval = setInterval(() => {
			currentSlide = (currentSlide + 1) % slides.length;
		}, 5000);
	}

	function stopSlideShow() {
		if (slideInterval) {
			clearInterval(slideInterval);
		}
	}

	function goToSlide(index) {
		currentSlide = index;
		stopSlideShow();
		startSlideShow();
	}

	// 컴포넌트 마운트 시 슬라이드쇼 시작
	$effect(() => {
		startSlideShow();
		return () => stopSlideShow();
	});
</script>

<section class="hero-section">
	<div class="hero-slider">
		{#each slides as slide, index}
			<div class="slide {currentSlide === index ? 'active' : ''}" style="background-image: url('{slide.image}')">
				<div class="slide-overlay"></div>
				<div class="slide-content">
					<div class="c-container-wide">
						<h1 class="hero-title fade-in-up">{complexData?.name || '센터스퀘어 발산 하이브 엘'}</h1>
						<p class="hero-slogan fade-in-up">{complexData?.slogan || '신분당선 탄다 · 센터스퀘어 발산 산다'}</p>
						<p class="hero-subtitle fade-in-up">{complexData?.subSlogan || slide.subtitle}</p>
						<div class="hero-buttons fade-in-up">
							<a href="/complex/{complexData?.id || 'demo'}/contact" class="c-btn c-btn-primary c-btn-large">
								분양문의
							</a>
							<a href="/complex/{complexData?.id || 'demo'}/units" class="c-btn c-btn-secondary c-btn-large">
								평면도 보기
							</a>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- 슬라이드 인디케이터 -->
	<div class="slide-indicators">
		{#each slides as slide, index}
			<button 
				class="indicator {currentSlide === index ? 'active' : ''}" 
				onclick={() => goToSlide(index)}
				aria-label="슬라이드 {index + 1}">
			</button>
		{/each}
	</div>

	<!-- 핵심 정보 카드 -->
	<div class="info-cards">
		<div class="c-container-wide">
			<div class="cards-grid">
				<div class="info-card">
					<div class="card-icon">🏢</div>
					<div class="card-content">
						<div class="card-title">36층 주거명작</div>
						<div class="card-desc">랜드마크 타워</div>
					</div>
				</div>
				<div class="info-card">
					<div class="card-icon">🏘️</div>
					<div class="card-content">
						<div class="card-title">715세대 대단지</div>
						<div class="card-desc">프리미엄 커뮤니티</div>
					</div>
				</div>
				<div class="info-card">
					<div class="card-icon">📐</div>
					<div class="card-content">
						<div class="card-title">84㎡ 단일평형</div>
						<div class="card-desc">완벽한 설계</div>
					</div>
				</div>
				<div class="info-card">
					<div class="card-icon">🎯</div>
					<div class="card-content">
						<div class="card-title">다양한 커뮤니티</div>
						<div class="card-desc">풍요로운 라이프</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.hero-section {
		position: relative;
		width: 100%;
		overflow: hidden;
		margin-top: 80px;
	}

	.hero-slider {
		position: relative;
		height: calc(100vh - 80px);
		min-height: 600px;
		max-height: 820px;
	}

	.slide {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
		opacity: 0;
		transition: opacity 1s ease-in-out;
	}

	.slide.active {
		opacity: 1;
	}

	.slide-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6));
	}

	.slide-content {
		position: relative;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		color: white;
		z-index: 1;
	}

	.hero-title {
		font-size: 3.5rem;
		font-weight: 700;
		margin: 0 0 20px 0;
		letter-spacing: -1px;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
		animation: fadeInUp 1s ease;
	}

	.hero-slogan {
		font-size: 1.8rem;
		font-weight: 600;
		margin: 0 0 15px 0;
		color: var(--secondary-color);
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
		animation: fadeInUp 1s ease 0.2s backwards;
	}

	.hero-subtitle {
		font-size: 1.3rem;
		margin: 0 0 40px 0;
		opacity: 0.95;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
		animation: fadeInUp 1s ease 0.4s backwards;
	}

	.hero-buttons {
		display: flex;
		gap: 20px;
		justify-content: center;
		flex-wrap: wrap;
		animation: fadeInUp 1s ease 0.6s backwards;
	}

	.slide-indicators {
		position: absolute;
		bottom: 120px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 12px;
		z-index: 2;
	}

	.indicator {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.5);
		border: 2px solid white;
		cursor: pointer;
		transition: all 0.3s ease;
		padding: 0;
	}

	.indicator:hover {
		background: rgba(255, 255, 255, 0.8);
	}

	.indicator.active {
		background: white;
		width: 36px;
		border-radius: 6px;
	}

	.info-cards {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 3;
	}

	.cards-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0;
		background: white;
		box-shadow: 0 -5px 30px rgba(0, 0, 0, 0.15);
	}

	.info-card {
		display: flex;
		align-items: center;
		gap: 20px;
		padding: 35px 30px;
		border-right: 1px solid var(--border-color);
		transition: all 0.3s ease;
	}

	.info-card:last-child {
		border-right: none;
	}

	.info-card:hover {
		background: var(--bg-light);
		transform: translateY(-5px);
	}

	.card-icon {
		font-size: 2.5rem;
		flex-shrink: 0;
	}

	.card-content {
		flex: 1;
	}

	.card-title {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--text-dark);
		margin-bottom: 5px;
	}

	.card-desc {
		font-size: 0.9rem;
		color: var(--text-gray);
	}

	/* 반응형 */
	@media (max-width: 1024px) {
		.hero-section {
			margin-top: 70px;
		}

		.hero-slider {
			height: calc(100vh - 70px);
		}

		.hero-title {
			font-size: 2.8rem;
		}

		.hero-slogan {
			font-size: 1.5rem;
		}

		.hero-subtitle {
			font-size: 1.1rem;
		}

		.cards-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.info-card {
			border-bottom: 1px solid var(--border-color);
		}

		.info-card:nth-child(2) {
			border-right: none;
		}

		.info-card:nth-child(3),
		.info-card:nth-child(4) {
			border-bottom: none;
		}
	}

	@media (max-width: 768px) {
		.hero-section {
			margin-top: 60px;
		}

		.hero-slider {
			height: calc(100vh - 60px);
			min-height: 500px;
			max-height: 700px;
		}

		.hero-title {
			font-size: 2rem;
		}

		.hero-slogan {
			font-size: 1.2rem;
		}

		.hero-subtitle {
			font-size: 1rem;
		}

		.hero-buttons {
			flex-direction: column;
			align-items: center;
		}

		.hero-buttons .c-btn {
			width: 100%;
			max-width: 300px;
		}

		.cards-grid {
			grid-template-columns: 1fr;
		}

		.info-card {
			border-right: none;
			border-bottom: 1px solid var(--border-color);
		}

		.info-card:last-child {
			border-bottom: none;
		}

		.slide-indicators {
			bottom: 140px;
		}
	}

	@media (max-width: 480px) {
		.hero-title {
			font-size: 1.6rem;
		}

		.hero-slogan {
			font-size: 1rem;
		}

		.hero-subtitle {
			font-size: 0.9rem;
			margin-bottom: 30px;
		}

		.info-card {
			padding: 25px 20px;
			gap: 15px;
		}

		.card-icon {
			font-size: 2rem;
		}

		.card-title {
			font-size: 1rem;
		}

		.card-desc {
			font-size: 0.85rem;
		}
	}
</style>

