<script>
	let currentSlide = $state(0);
	
	const slides = [
		{
			title: "마인드 코딩",
			subtitle: "재능경영",
			description: "마인드코딩은 개인의 심리재능(PTI:CODE)을 기반으로 학습·진로·관계·비즈니스 등 삶의 전 영역을 경영하듯 설계하고 관리하는 맞춤형 성장 플랫폼입니다.",
			image: "/main/slide/main_slide_5.jpg"
		},
		{
			title: "마음의 영역",
			subtitle: "심리",
			description: "사람은 누구나 흔들릴 때가 있습니다. 마인드코딩은 심리재능 코칭과 멘탈 매니지먼트를 통해 스스로의 마음을 이해하고 회복할 수 있도록 돕습니다. 단순한 상담이 아니라, 타고난 재능을 기반으로 한 자기이해와 자기성장의 여정을 함께합니다.",
			image: "/main/slide/main_slide_1.jpg"
		},
		{
			title: "배움과 진로의 영역",
			subtitle: "학습",
			description: "학생에게는 자신에게 맞는 학습 전략을 찾는 것이, 성인에게는 진로와 경력의 길을 설계하는 것이 핵심 과제입니다. 마인드코딩은 학습 성향을 분석하고, 진로와 계열을 제시하며, 입시와 관련한 컨설팅을 통해 생애주기에 맞는 학습 로드맵을 제공합니다.",
			image: "/main/slide/main_slide_2.jpg"
		},
		{
			title: "소통의 영역",
			subtitle: "관계",
			description: "가정에서는 부모와 자녀가 더 잘 이해하고 소통할 수 있도록, 학교와 조직에서는 협력과 리더십이 살아나도록 돕습니다. 관계는 재능이 발휘되는 무대이기에, 마인드코딩은 심리재능을 바탕으로 관계를 경영하는 새로운 방식을 제안합니다.",
			image: "/main/slide/main_slide_3.jpg"
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
		nextSlide();
	}, 5000);
</script>

<section class="hero-section">
	<div class="hero-slider">
		{#each slides as slide, index}
			<div class="slide" class:active={index === currentSlide}>
				<div class="slide-content">
					<div class="container">
						<div class="hero-text">
							<h1 class="hero-title">『 {slide.title} 』</h1>
							<h2 class="hero-subtitle">{slide.subtitle}</h2>
							<p class="hero-description">{slide.description}</p>
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
		height: 100vh;
		overflow: hidden;
		margin-top: 70px; /* Header height */
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
		margin-top: 250px;
		align-items: top;
	}

	.container {
		max-width: 1200px;
		margin: 200px auto 0 auto;
		padding: 0 20px;
		width: 100%;
	}

	.hero-text {
		color: #fff;
		max-width: 600px;
	}

	.hero-title {
		font-size: 4rem;
		font-weight: 700;
		margin: 0 0 20px 0;
		line-height: 1.2;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	}

	.hero-subtitle {
		font-size: 1.8rem;
		font-weight: 700;
		margin: 0 0 15px 0;
		line-height: 1.4;
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
		top: 50%;
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
			height: 70vh;
		}

		.hero-title {
			font-size: 2.5rem;
		}

		.hero-subtitle {
			font-size: 1.2rem;
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

		.container {
			padding: 0 15px;
		}
	}

	@media (max-width: 480px) {
		.hero-title {
			font-size: 2rem;
		}

		.hero-subtitle {
			font-size: 1rem;
		}

		.hero-description {
			font-size: 0.9rem;
		}
	}
</style>
