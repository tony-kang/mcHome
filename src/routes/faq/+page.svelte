<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
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

	const faqs = [
		{
			question: "PTI:CODE 검사는 어떻게 진행되나요?",
			answer: "PTI:CODE 검사는 온라인으로 진행되며, 약 30-40분 정도 소요됩니다. 검사 완료 후 전문가가 결과를 분석하여 상담을 통해 맞춤형 성장 전략을 제시합니다.",
			category: "PTI:CODE 검사"
		},
		{
			question: "상담은 어디서 받을 수 있나요?",
			answer: "온라인 화상 상담과 오프라인 대면 상담 모두 가능합니다. 고객의 편의에 따라 선택하실 수 있습니다.",
			category: "상담 서비스"
		},
		{
			question: "검사 결과는 언제 받을 수 있나요?",
			answer: "검사 완료 후 3-5일 내에 결과를 제공하며, 상담을 통해 자세한 해석과 활용 방안을 안내드립니다.",
			category: "PTI:CODE 검사"
		},
		{
			question: "자격과정 수강 조건이 있나요?",
			answer: "코치 과정은 누구나 수강 가능하며, 프로 과정은 코치 과정 이수자가, 마스터 과정은 프로 과정 이수자 중 선발됩니다.",
			category: "자격과정"
		},
		{
			question: "PTI:CODE 검사 비용은 얼마인가요?",
			answer: "검사 비용은 대상별로 다르며, 상담과 함께 패키지로 제공됩니다. 정확한 비용은 상담을 통해 안내드립니다.",
			category: "PTI:CODE 검사"
		},
		{
			question: "검사 결과는 얼마나 정확한가요?",
			answer: "PTI:CODE는 심리학적 이론을 바탕으로 개발된 검사로, 높은 신뢰도와 타당도를 가지고 있습니다. 다만 검사 결과는 참고용이며, 전문가 상담을 통해 해석하는 것이 중요합니다.",
			category: "PTI:CODE 검사"
		},
		{
			question: "온라인 상담과 오프라인 상담의 차이점은 무엇인가요?",
			answer: "온라인 상담은 시간과 장소의 제약이 적어 편리하며, 오프라인 상담은 더 깊이 있는 상호작용이 가능합니다. 상담 내용과 효과는 동일합니다.",
			category: "상담 서비스"
		},
		{
			question: "자격과정 수료 후 어떤 혜택이 있나요?",
			answer: "공식 자격증 발급, 전문가 네트워크 참여, 지속적인 교육 기회, 실무 현장에서의 지원 등 다양한 혜택을 제공합니다.",
			category: "자격과정"
		},
		{
			question: "개인정보는 안전하게 보호되나요?",
			answer: "네, 개인정보보호법에 따라 개인정보를 안전하게 보호하고 있으며, 검사 결과와 상담 내용은 철저히 비밀로 유지됩니다.",
			category: "전체"
		},
		{
			question: "환불 정책은 어떻게 되나요?",
			answer: "서비스 시작 전에는 전액 환불이 가능하며, 서비스 진행 중에는 진행 정도에 따라 부분 환불이 가능합니다. 자세한 내용은 이용약관을 참고해주세요.",
			category: "결제/환불"
		}
	];

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
			<button class="category-btn" class:active={selectedCategory === '전체'} onclick={() => selectCategory('전체')}>전체</button>
			<button class="category-btn" class:active={selectedCategory === 'PTI:CODE 검사'} onclick={() => selectCategory('PTI:CODE 검사')}>PTI:CODE 검사</button>
			<button class="category-btn" class:active={selectedCategory === '상담 서비스'} onclick={() => selectCategory('상담 서비스')}>상담 서비스</button>
			<button class="category-btn" class:active={selectedCategory === '자격과정'} onclick={() => selectCategory('자격과정')}>자격과정</button>
			<button class="category-btn" class:active={selectedCategory === '결제/환불'} onclick={() => selectCategory('결제/환불')}>결제/환불</button>
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
					<div class="faq-item">
						<button class="faq-question" onclick={() => toggleFaq(index)}>
							<h3>{faq.question}</h3>
							<span class="faq-icon" class:active={openFaq === index}>
								{openFaq === index ? '−' : '+'}
							</span>
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
		background: #17a2b8;
		color: #fff;
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
		background: #dc3545;
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
