<script>
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { goto } from '$app/navigation';
	import ___prj from '$prj/prjMain';
	import ___const from '$prj/lib/i_const';
	import ___prjConst from '$prj/prjConst';

	let openFaq = $state(null);
	let selectedCategory = $state('전체');
	let searchTerm = $state('');

	const toggleFaq = (index) => {
		openFaq = openFaq === index ? null : index;
	};

	const selectCategory = (category) => {
		selectedCategory = category;
		openFaq = null; // 카테고리 변경 시 열린 FAQ 닫기
	};

	const handleSearch = () => {
		// 검색 시 열린 FAQ 닫기
		openFaq = null;
		console.log('검색어:', searchTerm);
	};

	let faqs = $state([]);
	let categories = $state([]);

	// 카테고리별 및 검색어별 필터링된 FAQ 목록
	const filteredFaqs = $derived(faqs.filter(faq => {
		// 카테고리 필터링
		const categoryMatch = selectedCategory === '전체' || faq.category === selectedCategory;
		
		// 검색어 필터링 (질문과 답변에서 검색)
		const searchMatch = !searchTerm || 
			faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
			faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
		
		const result = categoryMatch && searchMatch;
		console.log(`FAQ "${faq.question}" - 카테고리: ${categoryMatch}, 검색: ${searchMatch}, 결과: ${result}`);
		return result;
	}));

	async function loadFaqs() {
		const r = await ___prj.api.post('/s/system', 'get.faq.list', null, {
			category: selectedCategory,
			search: searchTerm
		});

		if (r.data.result === ___const.OK) {
			faqs = r.data.content;
			categories = faqs.map(faq => faq.category).filter((category, index, self) => self.indexOf(category) === index);
			categories.unshift('전체');
			console.log('categories',$state.snapshot(categories));
		}
	}

	onMount(() => {
		loadFaqs();
	});
</script>

<svelte:head>
	<title>자주묻는 질문 - 마인드코딩 | FAQ</title>
	<meta name="description" content="마인드코딩 서비스에 대한 자주묻는 질문과 답변을 확인하세요. PTI:CODE 검사, 상담, 자격과정 등에 대한 궁금한 점을 해결해드립니다." />
</svelte:head>

<Header />

<main class="faq-page">
	<!-- Hero Section -->
	<section class="hero-section">
		<div class="container">
			<div class="hero-content">
				<h1 class="hero-title">자주묻는 질문</h1>
				<p class="hero-subtitle">FAQ</p>
				<p class="hero-description">
					마인드코딩 서비스에 대한<br>
					궁금한 점을 해결해드립니다.
				</p>
				{#if ___prj.isAdmin}
					<div class="admin-actions">
						<button class="write-faq-btn" onclick={() => goto('/admin/faq/write')}>
							<span class="btn-icon">✏️</span>
							FAQ 작성
						</button>
					</div>
				{/if}
			</div>
		</div>
	</section>

	<!-- Search Section -->
	<section class="search-section">
		<div class="container">
			<div class="search-box">
				<input type="text" placeholder="궁금한 내용을 검색해보세요..." bind:value={searchTerm} oninput={handleSearch} onkeydown={(e) => e.key === 'Enter' && handleSearch()} />
				<button type="button" onclick={handleSearch}>검색</button>
			</div>
		</div>
	</section>

	<!-- FAQ Categories -->
	<section class="faq-categories">
		<div class="container">
		<div class="categories-nav">
			{#each categories as category}
				<button class="category-btn" class:active={selectedCategory === category} onclick={() => selectCategory(category)}>{category}</button>
			{/each}
		</div>
		</div>
	</section>

	<!-- FAQ List -->
	<section class="faq-list-section">
		<div class="container">
		<div class="faq-list">
			{#if filteredFaqs.length === 0}
				<div class="no-results">
					<div class="no-results-icon">🔍</div>
					<h3>검색 결과가 없습니다</h3>
					<p>다른 키워드로 검색하거나 카테고리를 변경해보세요.</p>
				</div>
			{:else}
				{#each filteredFaqs as faq, index}
					<div class="faq-item" class:faq-hidden={faq.is_active === 0}>
						<button class="faq-question" onclick={() => toggleFaq(index)}>
							<h3>{faq.question}</h3>
							<span class="faq-icon" class:active={openFaq === index}>
								{openFaq === index ? '➖' : '➕'}
							</span>
							{#if ___prj.isAdmin}
								{#if faq.is_active === 0}
									<span class="text-red-500 p-1 text-xs">비활성 상태</span>
								{/if}
								<!-- svelte-ignore node_invalid_placement_ssr -->
								<button class="edit-faq-btn ml-2" onclick={() => goto(`/admin/faq/edit/${faq.no}`)}>
									<span class="btn-icon rounded-full text-xs">✏️수정</span>
								</button>
							{/if}
						</button>
						{#if openFaq === index}
							<div class="faq-answer">
								<p>{faq.answer}</p>
							</div>
						{/if}
					</div>
				{/each}
			{/if}
		</div>
		</div>
	</section>

	<!-- Contact Section -->
	<section class="contact-section">
		<div class="container">
			<div class="contact-content">
				<h2>더 궁금한 점이 있으신가요?</h2>
				<p>원하는 답변을 찾지 못하셨다면 언제든지 문의해주세요.</p>
				<div class="contact-buttons">
					<!-- <a href="/contact" class="btn-primary">상담 신청</a> -->
					<a href="tel:{___prjConst.COMPANY.COUNSELING_TEL}" class="btn-secondary">전화 문의 ( ☎ {___prjConst.COMPANY.COUNSELING_TEL} )</a>
				</div>
			</div>
		</div>
	</section>
</main>

<Footer />

<style>
	.write-faq-btn {
		background: rgba(255, 255, 255, 0.2);
		color: white;
		border: 2px solid rgba(255, 255, 255, 0.3);
		padding: 15px 30px;
		border-radius: 50px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		display: inline-flex;
		align-items: center;
		gap: 10px;
		backdrop-filter: blur(10px);
	}

	.write-faq-btn:hover {
		background: rgba(255, 255, 255, 0.3);
		border-color: rgba(255, 255, 255, 0.5);
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
	}

	.faq-page {
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

	.search-section {
		padding: 40px 0;
		background: #f8f9fa;
	}

	.search-box {
		max-width: 600px;
		margin: 0 auto;
		display: flex;
		gap: 10px;
	}

	.search-box input {
		flex: 1;
		padding: 15px 20px;
		border: 2px solid #e9ecef;
		border-radius: 8px;
		font-size: 1rem;
		transition: border-color 0.3s ease;
	}

	.search-box input:focus {
		outline: none;
		border-color: #17a2b8;
	}

	.search-box button {
		padding: 15px 30px;
		background: #17a2b8;
		color: #fff;
		border: none;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.3s ease;
	}

	.search-box button:hover {
		background: #138496;
	}

	.faq-categories {
		padding: 30px 0;
		background: #fff;
		border-bottom: 1px solid #e9ecef;
	}

	.categories-nav {
		display: flex;
		justify-content: center;
		gap: 10px;
		flex-wrap: wrap;
	}

	.category-btn {
		padding: 10px 20px;
		background: #f8f9fa;
		color: #666;
		border: 1px solid #e9ecef;
		border-radius: 20px;
		font-size: 0.95rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.category-btn:hover,
	.category-btn.active {
		background: #17a2b8;
		color: #fff;
		border-color: #17a2b8;
	}

	.faq-list-section {
		padding: 60px 0;
		background: #fff;
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
		border: 1px solid #e9ecef;
	}

	.faq-hidden {
		background: #f8f9fa;
		margin-bottom: 15px;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 4px 15px rgba(255, 0, 0, 0.5);
		border: 1px solid #ff0000;
	}

	.faq-question {
		width: 100%;
		padding: 25px 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		border: none;
		cursor: pointer;
		transition: background 0.3s ease;
		text-align: left;
	}

	.faq-question:hover {
		background: #f8f9fa;
	}

	.faq-question h3 {
		font-size: 1.2rem;
		font-weight: 600;
		color: #333;
		margin: 0;
		flex: 1;
		padding-right: 20px;
	}

	.faq-icon {
		width: 30px;
		height: 30px;
		/* background: #17a2b8; */
		/* color: #fff; */
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.2rem;
		font-weight: 700;
		transition: all 0.3s ease;
		flex-shrink: 0;
	}

	.faq-icon.active {
		/* background: #dc3545; */
		transform: rotate(180deg);
	}

	.faq-answer {
		padding: 20px 30px 25px;
		background: #f8f9fa;
		animation: slideDown 0.3s ease;
	}

	.faq-answer p {
		color: #555;
		line-height: 1.8;
		margin: 0;
		font-size: 1rem;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			max-height: 0;
		}
		to {
			opacity: 1;
			max-height: 200px;
		}
	}

	.no-results {
		text-align: center;
		padding: 60px 20px;
		color: #666;
	}

	.no-results-icon {
		font-size: 3rem;
		margin-bottom: 20px;
		opacity: 0.5;
	}

	.no-results h3 {
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0 0 10px 0;
		color: #333;
	}

	.no-results p {
		font-size: 1rem;
		margin: 0;
		opacity: 0.8;
	}

	.contact-section {
		padding: 80px 0;
		background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
		color: #fff;
		text-align: center;
	}

	.contact-content h2 {
		font-size: 2.5rem;
		font-weight: 700;
		margin: 0 0 20px 0;
	}

	.contact-content p {
		font-size: 1.2rem;
		margin: 0 0 40px 0;
		opacity: 0.9;
	}

	.contact-buttons {
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
		color: #17a2b8;
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
		color: #17a2b8;
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

		.search-box {
			flex-direction: column;
		}

		.categories-nav {
			flex-direction: column;
			align-items: center;
		}

		.category-btn {
			width: 200px;
		}

		.faq-question {
			padding: 20px;
		}

		.faq-question h3 {
			font-size: 1.1rem;
		}

		.faq-answer {
			padding: 0 20px 20px;
		}

		.contact-buttons {
			flex-direction: column;
			align-items: center;
		}

	}
</style>
