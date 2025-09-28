<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import ___prj from '$prj/prjMain';
	import ___const from '$prj/lib/i_const';
	import ___localStorage from '$prj/lib/i_localStorage';
	import { g_logedIn, g_theme } from '$prj/prjStore';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();
	let prjInit = $state(false);

	// 테스트 모드 설정 (실제 서비스에서는 false로 변경)
	const isTestMode = true;
	const storageDuration = isTestMode ? 5 : 24; // 테스트: 5분, 운영: 24시간

	// URL 파라미터 처리 함수
	function handleUrlParams() {
		// 현재 URL에서 파라미터 추출
		const currentParams = ___localStorage.urlParams.extractParamsFromUrl();
		
		// 파라미터가 있으면 저장
		if (currentParams.pP || currentParams.pC) {
			console.log('URL 파라미터 감지:', currentParams);
			console.log(`저장 시간: ${storageDuration}${isTestMode ? '분' : '시간'}`);
			
			// 로컬스토리지에 저장
			___localStorage.urlParams.saveParams(currentParams, storageDuration, isTestMode);
			
			// 쿠키에도 저장 (선택사항)
			___localStorage.cookies.saveUrlParamsToCookie(currentParams, storageDuration, isTestMode);
			
			console.log('URL 파라미터가 저장되었습니다.');
		}
	}

	onMount(async () => {
		await ___prj.init();
		prjInit = true;

		// URL 파라미터 처리
		handleUrlParams();
	});

	// 페이지 변경 시 URL 파라미터 처리
	$effect(() => {
		if (prjInit && $page.url) {
			handleUrlParams();
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
</svelte:head>
<SvelteToast />
{#if prjInit}
	{@render children()}
{:else}
	<div class="loading-container">
		<div class="loading-spinner"></div>
		<p>사용자 정보를 불러오는 중...</p>
	</div>
{/if}
