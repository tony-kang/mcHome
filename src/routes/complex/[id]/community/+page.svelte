<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Community from '../C/Community.svelte';
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
			name: '센터스퀘어 발산'
		};
		loading = false;
	}

	onMount(() => {
		loadComplexData();
	});
</script>

<svelte:head>
	<title>커뮤니티 - {complexData?.name || '단지명'}</title>
	<link rel="icon" href={favicon} />
	<meta name="description" content="{complexData?.name || '단지명'} 커뮤니티 시설 안내" />
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
			<h1 class="page-title">커뮤니티</h1>
			<p class="page-subtitle">입주민을 위한 특별한 편의시설</p>
		</div>
	</section>

	<!-- 커뮤니티 시설 -->
	<Community />
{:else}
	<div class="error-container">
		<h1>단지를 찾을 수 없습니다</h1>
		<p>요청하신 페이지가 존재하지 않습니다.</p>
		<a href="/" class="c-btn c-btn-primary">홈으로 돌아가기</a>
	</div>
{/if}

<style>
	/* 페이지별 추가 스타일이 필요한 경우 여기에 작성 */
</style>

