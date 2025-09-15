<script>
	import { signIn } from '$prj/prjLogin';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let username = $state('');
	let password = $state('');
	let userType = $state('partner'); // general, admin, partner
	let keepLoggedIn = $state(false);
	let isLoading = $state(false);
	let errorMessage = $state('');

	// URL 파라미터에서 id 가져오기
	const id = $page.params.id;

	// 사용자 타입 옵션
	const userTypes = [
		// { value: 'general', label: '일반', icon: '👤' },
		{ value: 'admin', label: '관리자 로그인', icon: '👨‍💼' },
		{ value: 'partner', label: '파트너 로그인', icon: '🤝' }
	];

	// 페이지 로드 시 CSS가 완전히 로드되도록 보장
	onMount(() => {
		// CSS 로딩 완료를 확인하고 추가 안정성 보장
		setTimeout(() => {
			document.body.style.visibility = 'visible';
		}, 100);
	});

	async function doLogin(event) {
		event.preventDefault();
		isLoading = true;
		errorMessage = '';

		try {
			// 실제 로그인 로직은 여기에 구현
			// 임시로 간단한 검증만 수행
			if (!username || !password) {
				errorMessage = '아이디와 비밀번호를 입력해주세요.';
				return;
			}

			// 사용자 타입 정보와 함께 로그인 처리
			const loginData = {
				username,
				password,
				userType,
				keepLoggedIn
			};

			// 로그인 성공 시 메인 페이지로 이동
			signIn(username, password, keepLoggedIn, userType);
		} catch (error) {
			errorMessage = '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.';
		} finally {
			isLoading = false;
		}
	}
</script>

<!-- 로그인 페이지 -->
<div class="login-page">
	<div class="login-card">
		<!-- 헤더 -->
		<div class="login-header">
			<a href="/" class="logo-link">
				<img src="/logo/mc_mindcoding_pattern_1_light.png" alt="마인드코딩" class="logo" />
			</a>
			<!-- <h1 class="login-title">로그인</h1> -->
			<p class="login-subtitle">마인드코딩에 오신 것을 환영합니다</p>
			
			<!-- 사용자 타입 선택 -->
			<div class="user-type-selector">
				{#each userTypes as type}
					<button 
						type="button"
						class="user-type-btn {userType === type.value ? 'active' : ''}"
						onclick={() => userType = type.value}
					>
						<span class="user-type-icon">{type.icon}</span>
						<span class="user-type-label text-black">{type.label}</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- 로그인 폼 -->
		<div class="login-form-wrapper">
			<form onsubmit={doLogin} class="login-form">
				{#if errorMessage}
					<div class="error-message">
						{errorMessage}
					</div>
				{/if}

				<div class="form-group">
					<label for="username" class="form-label">
						{#if userType === 'admin'}
							관리자 아이디
						{:else if userType === 'partner'}
							파트너 아이디
						{:else}
							아이디 또는 이메일
						{/if}
					</label>
					<input
						id="username"
						type="text"
						bind:value={username}
						placeholder={userType === 'admin' ? '관리자 아이디를 입력하세요' : userType === 'partner' ? '파트너 아이디를 입력하세요' : '아이디 또는 이메일을 입력하세요'}
						class="form-input"
						autocomplete="username"
						required
					/>
				</div>

				<div class="form-group">
					<label for="password" class="form-label">비밀번호</label>
					<input
						id="password"
						type="password"
						bind:value={password}
						placeholder="비밀번호를 입력하세요"
						class="form-input"
						autocomplete="current-password"
						required
					/>
				</div>

				<div class="form-options">
					<div class="checkbox-group">
						<input
							id="keepLoggedIn"
							type="checkbox"
							bind:checked={keepLoggedIn}
							class="form-checkbox"
						/>
						<label for="keepLoggedIn" class="checkbox-label">로그인 상태 유지</label>
					</div>
					<div class="forgot-password">
						<a href="/s/pwSearch" class="forgot-link">비밀번호를 잊으셨나요?</a>
					</div>
				</div>

				<button
					type="submit"
					class="login-button"
					disabled={isLoading}
				>
					{#if isLoading}
						<span class="loading-spinner"></span>
						로그인 중...
					{:else}
						로그인
					{/if}
				</button>
			</form>

			<!-- 소셜 로그인 -->
			<div class="social-login">
				<div class="divider">
					<span>또는</span>
				</div>
				<div class="social-buttons">
					<button type="button" class="social-button kakao">
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
							<path d="M10 0C4.477 0 0 3.582 0 8c0 2.889 1.889 5.43 4.7 6.929l-1.2 4.4c-.1.4.3.7.7.5l5.1-3.4c.5.1 1 .1 1.5.1 5.523 0 10-3.582 10-8S15.523 0 10 0z" fill="currentColor"/>
						</svg>
						카카오로 로그인
					</button>
					<button type="button" class="social-button google">
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
							<path d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.21-2.13 2.95v2.66h3.46c2.02-1.85 3.19-4.58 3.19-7.79z" fill="#4285F4"/>
							<path d="M10 20c2.7 0 4.96-.89 6.61-2.41l-3.46-2.66c-.9.6-2.07.95-3.15.95-2.43 0-4.5-1.64-5.24-3.85H1.34v2.74C2.98 17.55 6.21 20 10 20z" fill="#34A853"/>
							<path d="M4.76 11.93c-.22-.6-.35-1.25-.35-1.93s.13-1.33.35-1.93V5.33H1.34C.61 6.85 0 8.57 0 10.5s.61 3.65 1.34 5.17l3.42-2.74z" fill="#FBBC05"/>
							<path d="M10 3.98c1.44 0 2.7.49 3.71 1.45l2.78-2.78C14.96.99 12.7 0 10 0 6.21 0 2.98 2.45 1.34 5.33l3.42 2.74C5.5 5.62 7.57 3.98 10 3.98z" fill="#EA4335"/>
						</svg>
						구글로 로그인
					</button>
				</div>
			</div>
		</div>

		<!-- 회원가입 링크 -->
		<div class="signup-section">
			<p>아직 회원이 아니신가요?</p>
			<a href="/s/signup" class="signup-button">회원가입</a>
		</div>
	</div>
</div>

<style>
	/* 기본 스타일 - PC (중앙 카드) */
	.login-page {
		min-height: 100vh;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		box-sizing: border-box;
		/* CSS 로딩 안정성을 위한 기본값 설정 */
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		line-height: 1.5;
		color: #333;
	}

	.login-card {
		width: 100%;
		max-width: 420px;
		background: white;
		border-radius: 16px;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
		overflow: hidden;
		/* 레이아웃 안정성을 위한 추가 속성 */
		position: relative;
		z-index: 1;
	}

	.login-header {
		text-align: center;
		padding: 3rem 2rem 2rem;
		background: linear-gradient(135deg, #f8f9ff 0%, #e8f0ff 100%);
	}

	.logo-link {
		display: inline-block;
	}

	.logo {
		height: 60px;
		width: auto;
	}

	.login-title {
		font-size: 2rem;
		font-weight: 700;
		color: #2d3748;
		margin-bottom: 0.5rem;
	}

	.login-subtitle {
		color: #718096;
		font-size: 1rem;
		margin: 0 0 1.5rem 0;
	}

	/* 사용자 타입 선택기 */
	.user-type-selector {
		display: flex;
		gap: 0.5rem;
		justify-content: center;
		margin-top: 1rem;
	}

	.user-type-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		padding: 5px 10px;
		border: 2px solid rgba(90, 83, 83, 0.3);
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.1);
		color: white;
		font-size: 0.75rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		backdrop-filter: blur(10px);
		min-width: 80px;
	}

	.user-type-btn:hover {
		background: rgba(255, 255, 255, 0.2);
		border-color: rgba(255, 255, 255, 0.5);
		transform: translateY(-1px);
	}

	.user-type-btn.active {
		background: rgba(255, 255, 255, 0.3);
		border-color: rgba(255, 255, 255, 0.8);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.user-type-icon {
		font-size: 1.5rem;
		line-height: 1;
	}

	.user-type-label {
		margin-top: 5px;
		font-size: 1rem;
		line-height: 1;
		text-align: center;
	}

	.login-form-wrapper {
		padding: 2rem;
	}

	.login-form {
		margin-bottom: 1.2rem;
	}

	.error-message {
		background: #fed7d7;
		color: #c53030;
		padding: 0.75rem 1rem;
		border-radius: 8px;
		margin-bottom: 1.5rem;
		font-size: 0.875rem;
		border: 1px solid #feb2b2;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	.form-label {
		display: block;
		font-weight: 600;
		color: #2d3748;
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
	}

	.form-input {
		width: 100%;
		padding: 0.875rem 1rem;
		border: 2px solid #e2e8f0;
		border-radius: 8px;
		font-size: 16px; /* 모바일 줌 방지를 위해 16px로 설정 */
		transition: all 0.2s ease;
		background: white;
		box-sizing: border-box;
		-webkit-appearance: none; /* iOS에서 기본 스타일 제거 */
		appearance: none;
	}

	.form-input:focus {
		outline: none;
		border-color: #667eea;
		box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
	}

	.form-input::placeholder {
		color: #a0aec0;
	}

	.form-options {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.2rem;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.checkbox-group {
		display: flex;
		align-items: center;
	}

	.form-checkbox {
		width: 18px;
		height: 18px;
		margin-right: 0.5rem;
		accent-color: #667eea;
	}

	.checkbox-label {
		font-size: 0.875rem;
		color: #4a5568;
		cursor: pointer;
	}

	.forgot-password {
		flex-shrink: 0;
	}

	.forgot-link {
		color: #667eea;
		text-decoration: none;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.forgot-link:hover {
		text-decoration: underline;
	}

	.login-button {
		width: 100%;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		padding: 1rem;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	.login-button:hover:not(:disabled) {
		transform: translateY(-1px);
		box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
	}

	.login-button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.loading-spinner {
		width: 16px;
		height: 16px;
		border: 2px solid transparent;
		border-top: 2px solid currentColor;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.social-login {
		margin-top: 1.2rem;
	}

	.divider {
		text-align: center;
		margin-bottom: 1.2rem;
		position: relative;
	}

	.divider::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		height: 1px;
		background: #e2e8f0;
	}

	.divider span {
		background: white;
		padding: 0 1rem;
		color: #718096;
		font-size: 0.875rem;
		position: relative;
		z-index: 1;
	}

	.social-buttons {
		display: flex;
		gap: 0.75rem;
	}

	.social-button {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		border: 2px solid #e2e8f0;
		border-radius: 8px;
		background: white;
		color: #4a5568;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.social-button:hover {
		border-color: #cbd5e0;
		background: #f7fafc;
	}

	.social-button.kakao {
		background: #fee500;
		border-color: #fee500;
		color: #3c1e1e;
	}

	.social-button.kakao:hover {
		background: #fdd835;
		border-color: #fdd835;
	}

	.social-button.google {
		background: white;
		border-color: #e2e8f0;
	}

	.social-button.google:hover {
		background: #f7fafc;
		border-color: #cbd5e0;
	}

	.signup-section {
		text-align: center;
		padding: 1.2rem;
		background: #f8f9ff;
		border-top: 1px solid #e2e8f0;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.signup-section p {
		color: #718096;
		margin-bottom: 0;
		font-size: 0.875rem;
	}

	.signup-button {
		display: inline-block;
		background: white;
		color: #667eea;
		border: 2px solid #667eea;
		padding: 0.5rem 2rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
		transition: all 0.2s ease;
	}

	.signup-button:hover {
		background: #667eea;
		color: white;
		transform: translateY(-1px);
	}

	/* 모바일 스타일 */
	@media (max-width: 768px) {
		.login-page {
			background: white;
			padding: 1rem;
			align-items: flex-start;
			min-height: 100vh;
			padding-top: 2rem;
			/* 모바일에서 CSS 안정성 보장 */
			-webkit-text-size-adjust: 100%;
			-ms-text-size-adjust: 100%;
		}

		.login-card {
			width: 100%;
			max-width: 100%;
			border-radius: 16px;
			box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
			/* border: 1px solid #e2e8f0; */
		}

		.login-header {
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			color: white;
			padding: 2rem 1.5rem 1.5rem;
			border-radius: 16px 16px 0 0;
		}

		.login-header .login-title {
			color: white;
		}

		.login-header .login-subtitle {
			color: rgba(255, 255, 255, 0.9);
		}

		.user-type-selector {
			flex-direction: row;
			gap: 0.5rem;
			margin-top: 1rem;
		}

		.user-type-btn {
			min-width: 90px;
			padding: 0.6rem 0.8rem;
			border: 1px solid rgba(90, 83, 83, 0.3);
		}

		.user-type-label {
			font-size: 0.85rem;
		}

		.login-form-wrapper {
			padding: 1.5rem;
			background: white;
		}

		.signup-section {
			padding: 1.5rem;
			background: #f8f9ff;
			border-radius: 0 0 16px 16px;
		}

		.login-title {
			font-size: 1.75rem;
		}

		.form-input {
			font-size: 16px; /* 모바일에서도 16px 유지 */
			padding: 1rem;
		}

		.form-options {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}

		.social-buttons {
			flex-direction: row;
			gap: 0.75rem;
		}
	}

	@media (max-width: 480px) {
		.login-page {
			padding: 1rem;
			padding-top: 1.5rem;
		}

		.login-header {
			padding: 1.5rem 1rem 1rem;
		}

		.login-form-wrapper {
			padding: 1rem;
		}

		.signup-section {
			padding: 1rem;
		}

		.login-title {
			font-size: 1.5rem;
		}

		.logo {
			height: 50px;
		}

		.form-input {
			font-size: 16px; /* 작은 화면에서도 16px 유지 */
			padding: 0.875rem 1rem;
		}

		.user-type-btn {
			min-width: 80px;
			padding: 0.5rem 0.6rem;
		}

		.user-type-label {
			font-size: 1rem;
		}
	}
</style>


