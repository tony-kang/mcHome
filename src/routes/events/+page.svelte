<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>이벤트 - 마인드코딩</title>
	<meta name="description" content="마인드코딩의 다양한 이벤트와 특별 프로그램을 확인하세요." />
</svelte:head>

<Header />

<main class="events-page">
	<!-- Hero Section -->
	<section class="hero-section">
		<div class="container">
			<div class="hero-content">
				<h1 class="hero-title">이벤트</h1>
				<p class="hero-subtitle">마인드코딩 특별 프로그램</p>
				<p class="hero-description">
					다양한 이벤트와 특별 프로그램으로<br>
					더욱 풍부한 경험을 제공합니다.
				</p>
			</div>
		</div>
	</section>

	<!-- Coming Soon Section -->
	<section class="coming-soon-section">
		<div class="container">
			<div class="coming-soon-content">
				<div class="icon">🎉</div>
				<h2>이벤트 섹션 준비 중</h2>
				<p>마인드코딩의 다양한 이벤트와 특별 프로그램을 곧 만나보실 수 있습니다.</p>
				<div class="features">
					<div class="feature">
						<h3>워크숍</h3>
						<p>실습 중심의 체험형 프로그램</p>
					</div>
					<div class="feature">
						<h3>세미나</h3>
						<p>전문가와 함께하는 지식 공유</p>
					</div>
					<div class="feature">
						<h3>캠프</h3>
						<p>집중적인 학습과 성장의 시간</p>
					</div>
					<div class="feature">
						<h3>특별 이벤트</h3>
						<p>기념일과 시즌별 특별 프로그램</p>
					</div>
				</div>
				<div class="cta-buttons">
					<a href="/services" class="btn-primary">서비스 보기</a>
					<a href="/contact" class="btn-secondary">문의하기</a>
				</div>
			</div>
		</div>
	</section>
</main>

<Footer />

<style>
	.events-page {
		margin-top: 70px;
	}

	.hero-section {
		background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%);
		color: #fff;
		padding: 100px 0;
		text-align: center;
	}

	.container {
		max-width: 1000px;
		margin: 0 auto;
		padding: 0 20px;
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

	.coming-soon-section {
		padding: 100px 0;
		background: #fff;
		text-align: center;
	}

	.coming-soon-content {
		max-width: 800px;
		margin: 0 auto;
	}

	.icon {
		font-size: 4rem;
		margin-bottom: 30px;
	}

	.coming-soon-content h2 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #333;
		margin: 0 0 20px 0;
	}

	.coming-soon-content p {
		font-size: 1.2rem;
		color: #666;
		margin: 0 0 50px 0;
		line-height: 1.6;
	}

	.features {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 30px;
		margin-bottom: 50px;
	}

	.feature {
		background: #f8f9fa;
		padding: 30px 20px;
		border-radius: 12px;
		border: 1px solid #e9ecef;
		transition: all 0.3s ease;
	}

	.feature:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
	}

	.feature h3 {
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 15px 0;
	}

	.feature p {
		font-size: 1rem;
		color: #666;
		margin: 0;
		line-height: 1.5;
	}

	.cta-buttons {
		display: flex;
		gap: 20px;
		justify-content: center;
		flex-wrap: wrap;
	}

	.btn-primary,
	.btn-secondary {
		display: inline-block;
		padding: 15px 30px;
		text-decoration: none;
		border-radius: 25px;
		font-weight: 600;
		font-size: 1.1rem;
		transition: all 0.3s ease;
	}

	.btn-primary {
		background: #ffc107;
		color: #333;
	}

	.btn-primary:hover {
		background: #fd7e14;
		color: #fff;
		transform: translateY(-2px);
	}

	.btn-secondary {
		background: transparent;
		color: #ffc107;
		border: 2px solid #ffc107;
	}

	.btn-secondary:hover {
		background: #ffc107;
		color: #333;
		transform: translateY(-2px);
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

		.coming-soon-content h2 {
			font-size: 2rem;
		}

		.features {
			grid-template-columns: 1fr;
		}

		.cta-buttons {
			flex-direction: column;
			align-items: center;
		}

		.container {
			padding: 0 15px;
		}
	}
</style>
