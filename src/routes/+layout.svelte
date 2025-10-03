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
	const isTestMode = false;
	const storageDuration = isTestMode ? 30 : 24; // 테스트: 5분, 운영: 24시간
	let currentParams = $state(null);
	let storedUrlParams = $state(null);

	// URL 파라미터 처리 함수
	function handleUrlParams() {
		// 현재 URL에서 파라미터 추출
		currentParams = ___localStorage.urlParams.extractParamsFromUrl();
		
		// 파라미터가 있으면 저장
		if (currentParams.pP) {
			console.log('URL 파라미터 감지:', currentParams);
			console.log(`저장 시간: ${storageDuration}${isTestMode ? '분' : '시간'}`);
			
			// 로컬스토리지에 저장
			___localStorage.urlParams.saveParams(currentParams, storageDuration, isTestMode);
			
			// 쿠키에도 저장 (선택사항)
			___localStorage.cookies.saveUrlParamsToCookie(currentParams, storageDuration, isTestMode);
			
			storedUrlParams = currentParams;
			console.log('URL 파라미터가 저장되었습니다.');
		} else {
			storedUrlParams = ___localStorage.urlParams.getParams();
			console.log('저장된 URL 파라미터 감지:', $state.snapshot(storedUrlParams));
			console.log('복호화:', ___encDec.telepasiDecrypt(storedUrlParams.pP));
		}
	}

	onMount(async () => {
		await ___prj.init();
		prjInit = true;

		// URL 파라미터 처리
		handleUrlParams();
	});

	// 페이지 변경 시 URL 파라미터 처리
	// $effect(() => {
	// 	if (prjInit && $page.url) {
	// 		handleUrlParams();
	// 	}
	// });
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
</svelte:head>
<SvelteToast />
{#if prjInit}
	<!-- 저장된 URL 파라미터 정보 표시 -->
	{#if storedUrlParams && (storedUrlParams.pP || storedUrlParams.pC)}
	<div class="stored-params-banner">
		<div class="params-content">
			<div class="params-info">
				<span class="params-icon">💾</span>
				<div class="params-text">
					<span class="params-title">저장된 파트너정보</span>
					<div class="params-details">
						{#if storedUrlParams.pP}
							<span class="param-item">파트너: {storedUrlParams.pP}</span>
						{/if}
						{#if storedUrlParams.pC}
							<span class="param-item">상담사: {storedUrlParams.pC}</span>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
	{/if}
	{@render children()}
{/if}
<style>
	/* 저장된 파라미터 배너 스타일 */
	.stored-params-banner {
		margin-top: 100px;
		background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
		border-radius: 16px;
		padding: 20px;
		margin-bottom: 10px;
		box-shadow: 0 8px 32px rgba(72, 187, 120, 0.2);
		animation: slideInDown 0.5s ease-out;
	}

	.params-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
	}

	.params-info {
		display: flex;
		align-items: center;
		gap: 15px;
		flex: 1;
	}

	.params-icon {
		font-size: 2rem;
		color: white;
	}

	.params-text {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.params-title {
		color: white;
		font-size: 1.1rem;
		font-weight: 600;
	}

	.params-details {
		display: flex;
		gap: 20px;
		flex-wrap: wrap;
	}

	.param-item {
		color: rgba(255, 255, 255, 0.9);
		font-size: 0.9rem;
		background: rgba(255, 255, 255, 0.15);
		padding: 4px 12px;
		border-radius: 20px;
		backdrop-filter: blur(10px);
	}
</style>