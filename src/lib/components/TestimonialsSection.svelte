<script>
	let currentTestimonial = $state(0);

	const testimonials = [
		{
			text: "전 세대가 남향 위주 배치라 햇살이 잘 들고 따뜻해요~! 대형 중앙광장과 단지내 소하천에서 여유로운 산책도 즐길 수 있어요^^",
			complex: "신동탄 센터스퀘어 발산",
			image: "/images/testimonial-1.jpg"
		},
		{
			text: "단지내 어린이집에 더해, 맞벌이 부부가 늦게까지 이용할 수 있는 아이키움(돌봄) 서비스가 있어서, 보육 걱정을 많이 덜 수 있어요~",
			complex: "아이키움 서비스",
			image: "/images/testimonial-2.jpg"
		},
		{
			text: "초등학교, 중학교, 고등학교를 도보로 이용 가능하고, 단지 바로 옆 대형 체육공원이 있어서 아이들 교육에 정말 좋아요^^",
			complex: "동탄2 센터스퀘어 발산",
			image: "/images/testimonial-3.jpg"
		},
		{
			text: "가전제품 렌탈 서비스와 카셰어링 서비스 덕분에 고가의 물품을 편리하고 저렴하게 이용할 수 있어서 경제적이에요!",
			complex: "가전렌탈/카셰어링 서비스",
			image: "/images/testimonial-4.jpg"
		},
		{
			text: "더블 역세권이라 출퇴근이 정말 편리합니다~ 문래동 예술촌, 쇼핑몰, 대형마트, 백화점, 대형병원도 가까워서 라이프스타일이 달라져요^^",
			complex: "문래 센터스퀘어 발산",
			image: "/images/testimonial-5.jpg"
		},
		{
			text: "이웃들의 재능기부수업을 들으면서 교양을 쌓을 수 있어요! 또한 자신의 재능을 기부하며 보람찬 생활도 할 수 있습니다!",
			complex: "재능기부 서비스",
			image: "/images/testimonial-6.jpg"
		},
		{
			text: "1호선 독산역 역세권인데다 신안산선도 개통예정이에요~~ 간선도로 진출입도 편리해 출퇴근시 사통팔달 쾌속 특권을 누릴 수 있어요!!",
			complex: "독산역 센터스퀘어 발산",
			image: "/images/testimonial-7.jpg"
		},
		{
			text: "캐슬링크 서비스가 있어, 이사를 가거나 가구원 수가 변동되어도 위약금 없이 단지 간 또는 단지 내 주택이동을 할 수 있어요~",
			complex: "캐슬링크 서비스",
			image: "/images/testimonial-8.jpg"
		}
	];

	const nextTestimonial = () => {
		currentTestimonial = (currentTestimonial + 1) % testimonials.length;
	};

	const prevTestimonial = () => {
		currentTestimonial = currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1;
	};

	const goToTestimonial = (index) => {
		currentTestimonial = index;
	};

	// Auto slide
	setInterval(() => {
		nextTestimonial();
	}, 4000);
</script>

<section class="testimonials-section">
	<div class="container">
		<div class="section-header">
			<h2>Customer Testimonials</h2>
		</div>

		<div class="testimonials-slider">
			<div class="testimonial-card">
				<div class="testimonial-image">
					<img src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].complex} />
				</div>
				<div class="testimonial-content">
					<blockquote class="testimonial-text">
						"{testimonials[currentTestimonial].text}"
					</blockquote>
					<cite class="testimonial-complex">
						{testimonials[currentTestimonial].complex}
					</cite>
				</div>
			</div>

			<!-- Navigation Arrows -->
			<button class="nav-arrow prev" onclick={prevTestimonial} aria-label="이전 후기">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
					<path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</button>
			<button class="nav-arrow next" onclick={nextTestimonial} aria-label="다음 후기">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
					<path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</button>
		</div>

		<!-- Testimonial Indicators -->
		<div class="testimonial-indicators">
					{#each testimonials as _, index}
			<button 
				class="indicator" 
				class:active={index === currentTestimonial}
				onclick={() => goToTestimonial(index)}
				aria-label="후기 {index + 1}로 이동"
			></button>
			{/each}
		</div>
	</div>
</section>

<style>
	.testimonials-section {
		padding: 80px 0;
		background: #f8f9fa;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
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

	.testimonials-slider {
		position: relative;
		max-width: 800px;
		margin: 0 auto 40px;
	}

	.testimonial-card {
		background: #fff;
		border-radius: 16px;
		overflow: hidden;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
		display: flex;
		align-items: center;
		min-height: 300px;
	}

	.testimonial-image {
		flex: 0 0 300px;
		height: 300px;
		overflow: hidden;
	}

	.testimonial-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.testimonial-content {
		flex: 1;
		padding: 40px;
	}

	.testimonial-text {
		font-size: 1.1rem;
		line-height: 1.8;
		color: #333;
		margin: 0 0 20px 0;
		font-style: italic;
	}

	.testimonial-complex {
		display: block;
		font-size: 1rem;
		font-weight: 600;
		color: #007bff;
		font-style: normal;
	}

	.nav-arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(255, 255, 255, 0.9);
		border: none;
		border-radius: 50%;
		width: 50px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #333;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
		z-index: 2;
	}

	.nav-arrow:hover {
		background: #fff;
		transform: translateY(-50%) scale(1.1);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
	}

	.nav-arrow.prev {
		left: -25px;
	}

	.nav-arrow.next {
		right: -25px;
	}

	.testimonial-indicators {
		display: flex;
		justify-content: center;
		gap: 10px;
	}

	.indicator {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: 2px solid #ddd;
		background: transparent;
		cursor: pointer;
		transition: all 0.3s ease;
		padding: 0;
	}

	.indicator.active {
		background: #007bff;
		border-color: #007bff;
	}

	.indicator:hover {
		border-color: #007bff;
		background: rgba(0, 123, 255, 0.3);
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.testimonials-section {
			padding: 60px 0;
		}

		.section-header h2 {
			font-size: 2rem;
		}

		.testimonial-card {
			flex-direction: column;
			min-height: auto;
		}

		.testimonial-image {
			flex: none;
			width: 100%;
			height: 200px;
		}

		.testimonial-content {
			padding: 30px 20px;
		}

		.testimonial-text {
			font-size: 1rem;
		}

		.nav-arrow {
			width: 40px;
			height: 40px;
		}

		.nav-arrow.prev {
			left: -20px;
		}

		.nav-arrow.next {
			right: -20px;
		}

		.container {
			padding: 0 15px;
		}
	}

	@media (max-width: 480px) {
		.section-header h2 {
			font-size: 1.8rem;
		}

		.testimonial-content {
			padding: 20px 15px;
		}

		.testimonial-text {
			font-size: 0.95rem;
			line-height: 1.6;
		}

		.testimonial-complex {
			font-size: 0.9rem;
		}

		.nav-arrow {
			width: 35px;
			height: 35px;
		}

		.nav-arrow.prev {
			left: -17px;
		}

		.nav-arrow.next {
			right: -17px;
		}
	}
</style>
