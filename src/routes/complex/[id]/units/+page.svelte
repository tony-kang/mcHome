<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import UnitTypes from '../C/UnitTypes.svelte';
	import ___prj from '$prj/prjMain';
	import ___const from '$prj/lib/i_const';
	import favicon from '$lib/assets/favicon.svg';

	const complexId = $page.params.id;
	let complexData = $state(null);
	let loading = $state(true);

	async function loadComplexData() {
		try {
			const r = await ___prj.api.post('/s/system', 'get.complex.config', null, {
				complexId: complexId
			});

			if (r.data.result === ___const.OK) {
				complexData = r.data.content;
			}
		} catch (error) {
			console.error('단지 정보 로드 오류:', error);
		} finally {
			loading = false;
		}

		// 임시 데이터 (개발용)
		complexData = {
			id: '2',
			name: '센터스퀘어 발산',
			phone: '02-1234-5678'
		};
		loading = false;
	}

	onMount(() => {
		loadComplexData();
	});
</script>

<svelte:head>
	<title>평면도 - {complexData?.name || '단지명'}</title>
	<link rel="icon" href={favicon} />
	<meta name="description" content="{complexData?.name || '단지명'} 평면 타입 정보" />
</svelte:head>

{#if loading}
	<div class="c-loading">
		<div class="c-loading-spinner"></div>
		<p>로딩 중...</p>
	</div>
{:else if complexData}
	<!-- 페이지 타이틀 -->
	<section class="page-header">
		<div class="c-container">
			<h1 class="page-title">평면도</h1>
			<p class="page-subtitle">다양한 평면 타입과 상세 정보를 확인하세요</p>
		</div>
	</section>

	<!-- 평면 타입 -->
	<UnitTypes />

	<!-- E-모델하우스 CTA -->
	<section class="c-section model-house-section">
		<div class="c-container">
			<div class="model-house-card">
				<div class="model-house-icon">
					<svg width="80" height="80" viewBox="0 0 80 80" fill="none">
						<rect x="10" y="20" width="60" height="50" rx="4" stroke="currentColor" stroke-width="3" fill="none"/>
						<path d="M10 35L40 10L70 35" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
						<rect x="30" y="45" width="20" height="25" fill="currentColor"/>
						<circle cx="35" cy="57" r="2" fill="white"/>
					</svg>
				</div>
				<h2>E-모델하우스</h2>
				<p>실제와 같은 온라인 모델하우스를 체험해보세요</p>
				<button class="c-btn c-btn-primary c-btn-large">E-모델하우스 보기</button>
			</div>
		</div>
	</section>
{:else}
	<div class="error-container">
		<h1>단지를 찾을 수 없습니다</h1>
		<p>요청하신 페이지가 존재하지 않습니다.</p>
		<a href="/" class="c-btn c-btn-primary">홈으로 돌아가기</a>
	</div>
{/if}

<style>
	.model-house-section {
		background: var(--bg-light);
	}

	.model-house-card {
		max-width: 600px;
		margin: 0 auto;
		text-align: center;
		background: white;
		padding: 60px 40px;
		border-radius: 12px;
		box-shadow: var(--shadow-md);
	}

	.model-house-icon {
		color: var(--primary-color);
		margin-bottom: 30px;
		display: flex;
		justify-content: center;
	}

	.model-house-card h2 {
		font-size: 2rem;
		font-weight: 700;
		color: var(--text-dark);
		margin: 0 0 20px 0;
	}

	.model-house-card p {
		font-size: 1.1rem;
		color: var(--text-gray);
		line-height: 1.6;
		margin: 0 0 40px 0;
	}

	@media (max-width: 768px) {
		.model-house-card {
			padding: 40px 30px;
		}

		.model-house-card h2 {
			font-size: 1.6rem;
		}
	}

	@media (max-width: 480px) {
		.model-house-card {
			padding: 30px 20px;
		}

		.model-house-icon svg {
			width: 60px;
			height: 60px;
		}
	}
</style>

