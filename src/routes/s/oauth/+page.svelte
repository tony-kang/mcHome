<script>
	import { onMount } from 'svelte';
	import { handleKakaoCallback, getAuthorizationCodeFromUrl } from '$lib/utils/kakaoLogin.js';

	let hasCode = $state(false);
	let hasError = $state(false);
	let code = $state('');
	let urlError = $state('');

	onMount(async () => {
		// URL 파라미터 확인
		const urlParams = new URLSearchParams(window.location.search);
		const authCode = urlParams.get('code');
		const error = urlParams.get('error');
		
		if (authCode) {
			hasCode = true;
			code = authCode;
			console.log('인증 코드 받음:', authCode);
		}
		
		if (error) {
			hasError = true;
			urlError = error;
			console.error('카카오 로그인 오류:', error);
		}

		// 카카오 콜백 처리
		if (authCode) {
			await handleKakaoCallback();
		}
	});
</script>

<!-- 카카오 로그인 처리 중 -->
<div class="oauth-page">
	<div class="oauth-container">
		<div class="loading-spinner"></div>
		<h2>카카오 로그인 처리 중...</h2>
		<p>잠시만 기다려주세요.</p>
	</div>
</div>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
	<div class="max-w-md w-full space-y-8 text-center">
		<h1 class="text-3xl font-bold text-gray-900">OAuth 콜백 페이지</h1>
		
		<div class="bg-white p-6 rounded-lg shadow">
			<p class="text-lg text-gray-700 mb-4">
				이 페이지가 정상적으로 로드되었습니다!
			</p>
			
			<div class="space-y-2 text-left">
				<p><strong>인증 코드:</strong> {hasCode ? '있음' : '없음'}</p>
				<p><strong>오류:</strong> {hasError ? '있음' : '없음'}</p>
				<p><strong>코드 값:</strong> {code || '없음'}</p>
				<p><strong>오류 값:</strong> {urlError || '없음'}</p>
			</div>
			
			<div class="mt-6">
				<a href="/s/signIn" class="text-blue-600 hover:text-blue-800 underline">
					로그인 페이지로 돌아가기
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	.oauth-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	.oauth-container {
		text-align: center;
		background: white;
		padding: 3rem 2rem;
		border-radius: 16px;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
		max-width: 400px;
		width: 100%;
		margin: 0 1rem;
	}

	.loading-spinner {
		width: 40px;
		height: 40px;
		border: 4px solid #f3f3f3;
		border-top: 4px solid #667eea;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin: 0 auto 1.5rem;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	h2 {
		color: #2d3748;
		margin-bottom: 0.5rem;
		font-size: 1.5rem;
		font-weight: 600;
	}

	p {
		color: #718096;
		margin: 0;
		font-size: 1rem;
	}

	/* 모바일 반응형 */
	@media (max-width: 768px) {
		.oauth-page {
			padding: 1rem;
		}

		.oauth-container {
			padding: 2rem 1.5rem;
		}

		h2 {
			font-size: 1.25rem;
		}

		p {
			font-size: 0.875rem;
		}
	}
</style>