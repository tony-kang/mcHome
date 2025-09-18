<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>뉴스 - 마인드코딩</title>
	<meta name="description" content="마인드코딩의 최신 뉴스와 보도자료를 확인하세요." />
</svelte:head>

<Header />

<main class="news-page">
	<!-- Hero Section -->
	<section class="hero-section">
		<div class="container">
			<div class="hero-content">
				<h1 class="hero-title">뉴스</h1>
				<p class="hero-subtitle">마인드코딩 소식</p>
				<p class="hero-description">
					마인드코딩의 최신 뉴스와<br>
					보도자료를 확인하세요.
				</p>
			</div>
		</div>
	</section>

	<!-- Coming Soon Section -->
	<section class="coming-soon-section">
		<div class="container">
			<div class="coming-soon-content">
				<div class="icon">📰</div>
				<h2>뉴스 섹션 준비 중</h2>
				<p>마인드코딩의 최신 뉴스와 보도자료를 곧 만나보실 수 있습니다.</p>
				<div class="features">
					<div class="feature">
						<h3>보도자료</h3>
						<p>회사 소식과 주요 발표</p>
					</div>
					<div class="feature">
						<h3>언론보도</h3>
						<p>언론에서 다룬 마인드코딩</p>
					</div>
					<div class="feature">
						<h3>업계 동향</h3>
						<p>심리재능 분야 최신 트렌드</p>
					</div>
				</div>
				<a href="/notice" class="btn-primary">공지사항 보기</a>
			</div>
		</div>
	</section>
</main>

<Footer />

<style>
	/* CSS 모듈 방식 - 더 깔끔하고 유지보수하기 좋음 */
	.news-page {
		margin-top: 70px;
	}

	.hero-section {
		background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
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

	.coming-soon-section {
		padding: 100px 0;
		background: #fff;
		text-align: center;
	}

	.coming-soon-content {
		max-width: 600px;
		margin: 0 auto;
	}

	.icon {
		font-size: 4rem;
		margin-bottom: 30px;
	}

	.coming-soon-content :global(h2) {
		font-size: 2.5rem;
		font-weight: 700;
		color: #333;
		margin: 0 0 20px 0;
	}

	.coming-soon-content :global(p) {
		font-size: 1.2rem;
		color: #666;
		margin: 0 0 50px 0;
		line-height: 1.6;
	}

	.features {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 30px;
		margin-bottom: 50px;
	}

	.feature {
		background: #f8f9fa;
		padding: 30px 20px;
		border-radius: 12px;
		border: 1px solid #e9ecef;
	}

	.feature :global(h3) {
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 15px 0;
	}

	.feature :global(p) {
		font-size: 1rem;
		color: #666;
		margin: 0;
		line-height: 1.5;
	}

	.btn-primary {
		display: inline-block;
		padding: 15px 30px;
		background: #17a2b8;
		color: #fff;
		text-decoration: none;
		border-radius: 25px;
		font-weight: 600;
		font-size: 1.1rem;
		transition: all 0.3s ease;
	}

	.btn-primary:hover {
		background: #138496;
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

		.coming-soon-content :global(h2) {
			font-size: 2rem;
		}

		.features {
			grid-template-columns: 1fr;
		}
	}
</style>
