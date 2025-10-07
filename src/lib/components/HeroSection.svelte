<script>
	let currentSlide = $state(0);
	
	const slides = [
		{
			guide: "Transforming your life , MINDCODING",
			title: "내 삶을 바꾸는 마음솔루션,<br>마인드코딩",
			description: "",
			image: "/main/slide/main_slide_1.jpg"
		},
		{
			guide: "내 마음의 성장지도",
			title: "심리재능CODE!",
			description: "",
			image: "/main/slide/main_slide_2.jpg"
		},
		{
			guide: "성적을넘어 가능성을열다",
			title: "학습진로CODE!",
			description: "",
			image: "/main/slide/main_slide_3.jpg"
		},
		{
			guide: "마음을 잇다, 사람을 잇다",
			title: "관계소통CODE!",
			description: "",
			image: "/main/slide/main_slide_4.jpg"
		},
		{
			guide: "나만의 성공방정식",
			title: "비즈니스CODE!",
			description: "",
			image: "/main/slide/main_slide_5.jpg"
		}
	];

	const nextSlide = () => {
		currentSlide = (currentSlide + 1) % slides.length;
	};

	const prevSlide = () => {
		currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
	};

	const goToSlide = (index) => {
		currentSlide = index;
	};

	// Auto slide
	setInterval(() => {
		//nextSlide();
	}, 5000);
</script>

<section class="hero-section">
	<div class="hero-slider">
		{#each slides as slide, index}
			<div class="slide" class:active={index === currentSlide}>
				<div class="slide-content">
					<div class="container">
						<div class="hero-text">
							<h1 class="guide-text">{@html slide.guide}</h1>
							<h2 class="hero-title">{@html slide.title}</h2>
							<p class="hero-description">{@html slide.description}</p>
						</div>
					</div>
				</div>
				<div class="slide-bg" style="background-image: url('{slide.image}')"></div>
			</div>
		{/each}
	</div>

	<!-- Navigation Arrows -->
	<button class="nav-arrow prev" onclick={prevSlide} aria-label="이전 슬라이드">
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	</button>
	<button class="nav-arrow next" onclick={nextSlide} aria-label="다음 슬라이드">
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	</button>

	<!-- Slide Indicators -->
	<div class="slide-indicators">
		{#each slides as _, index}
			<button 
				class="indicator" 
				class:active={index === currentSlide}
				onclick={() => goToSlide(index)}
				aria-label="슬라이드 {index + 1}로 이동"
			></button>
		{/each}
	</div>

	<!-- Slide Numbers -->
	<div class="slide-numbers">
		<span class="current">{currentSlide + 1}</span>
		<span class="total">{slides.length}</span>
	</div>
</section>

<style>
    .hero-section {
		position: relative;
		height: 70vh;
		overflow: hidden;
        margin-top: var(--header-height, 100px); /* Header height synced */
	}

	.hero-slider {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.slide {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		transition: opacity 1s ease-in-out;
	}

	.slide.active {
		opacity: 1;
	}

	.slide-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	.slide-bg::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
	}

	.slide-content {
		position: relative;
		z-index: 2;
		height: 100%;
		display: flex;
		margin-top: 270px;
		align-items: top;
	}


	.hero-text {
		color: #fff;
		max-width: 600px;
	}

	.guide-text {
		font-size: 1.5rem;
		font-weight: 700;
		margin: 0 0 25px 0;
		line-height: 1.2;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	}

	.hero-title {
		font-size: 2.8rem;
		font-weight: 700;
		line-height: 1.3;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	}

	.hero-description {
		font-size: 1.2rem;
		font-weight: 400;
		margin: 0;
		line-height: 1.5;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	}

	.nav-arrow {
		position: absolute;
		top: 10%;
		transform: translateY(-50%);
		background: rgba(255, 255, 255, 0.2);
		border: none;
		border-radius: 50%;
		width: 50px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		cursor: pointer;
		transition: all 0.3s ease;
		z-index: 3;
	}

	.nav-arrow:hover {
		background: rgba(255, 255, 255, 0.3);
		transform: translateY(-50%) scale(1.1);
	}

	.nav-arrow.prev {
		left: 30px;
	}

	.nav-arrow.next {
		right: 30px;
	}

	.slide-indicators {
		position: absolute;
		bottom: 30px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 10px;
		z-index: 3;
	}

	.indicator {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: 2px solid rgba(255, 255, 255, 0.5);
		background: transparent;
		cursor: pointer;
		transition: all 0.3s ease;
		padding: 0;
	}

	.indicator.active {
		background: #fff;
		border-color: #fff;
	}

	.indicator:hover {
		border-color: #fff;
		background: rgba(255, 255, 255, 0.5);
	}

	.slide-numbers {
		position: absolute;
		bottom: 30px;
		right: 30px;
		color: #fff;
		font-size: 1.2rem;
		font-weight: 500;
		z-index: 3;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	}

	.slide-numbers .current {
		font-size: 2rem;
		font-weight: 700;
	}

	.slide-numbers .total {
		opacity: 0.7;
		margin-left: 5px;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.hero-section {
			height: 80vh;
		}

		.slide-content {
			margin-top: 120px;
		}

		.guide-text {
			font-size: 1.2rem;
		}

		.hero-title {
			font-size: 2.3rem;
		}

		.hero-description {
			font-size: 1rem;
		}

		.nav-arrow {
			width: 40px;
			height: 40px;
		}

		.nav-arrow.prev {
			left: 15px;
		}

		.nav-arrow.next {
			right: 15px;
		}

		.slide-indicators {
			bottom: 20px;
		}

		.slide-numbers {
			bottom: 20px;
			right: 15px;
			font-size: 1rem;
		}

		.slide-numbers .current {
			font-size: 1.5rem;
		}
	}

	@media (max-width: 480px) {
		.hero-section {
			height: 50vh;
		}

		.slide-content {
			margin-top: 180px;
		}

		.guide-text {
			font-size: 0.8rem;
		}

		.hero-title {
			font-size: 1.6rem;
		}

		.hero-description {
			font-size: 0.9rem;
		}
	}
</style>
