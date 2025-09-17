<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    import ___const from '$prj/lib/i_const';
    import ___prj from '$prj/prjMain';
    import { g_brandLogo, g_logoSizes } from '$prj/prjStore';
    import TermsModal from './TermsModal.svelte';

    // 페이지 로드 시 CSS가 완전히 로드되도록 보장
    onMount(() => {
        // CSS 로딩 완료를 확인하고 추가 안정성 보장
        setTimeout(() => {
            document.body.style.visibility = 'visible';
        }, 100);
    });

    // 모달 상태 관리
    let modalState = $state({
        isOpen: false,
        title: '',
        content: '',
        type: ''
    });

    // 약관 내용을 저장할 상태 변수
    let termsContent = $state('');
    let privacyContent = $state('');

    // 약관 보기 함수
    function showTerms(type) {
        modalState.type = type;
        modalState.title = type === 'terms' ? '이용약관' : '개인정보 처리방침';
        modalState.content = type === 'terms' ? termsContent : privacyContent;
        modalState.isOpen = true;
    }

    function closeModal() {
        modalState.isOpen = false;
    }

    // 회원 구분 옵션
    const userTypes = [
        // { value: 0, label: '선택해 주세요' },
        // { value: 1, label: '일반' },
        // { value: 2, label: '상담사' },
        { value: 3, label: '파트너' }
    ];

    let formData = $state({
        user_id: 'user_id',
        user_pw: 'User_pw007!',
        user_pw_confirm: 'User_pw007!',
        user_name: '홍길동',
        user_email: 'hong@gmail.com',
        user_tel: '01012345678',
        user_company: '사용자 회사명',
        user_type: 3
    });

    let agreements = $state({
        terms: false,
        privacy: false,
        marketing: false,
    });

    let errors = $state({
        user_id: '',
        user_pw: '',
        user_pw_confirm: '',
        user_name: '',
        user_email: '',
        user_tel: '',
        user_company: '',
        user_type: 0
    });

    // 유효성 검사 함수들
    function validateUserId() {
        if (formData.user_id.length < 4) {
            errors.user_id = '아이디는 4자 이상이어야 합니다.';
            return false;
        }
        errors.user_id = '';
        return true;
    }

    function validatePassword() {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
        if (!passwordRegex.test(formData.user_pw)) {
            errors.user_pw = '비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다.';
            return false;
        }
        errors.user_pw = '';
        return true;
    }

    function validatePasswordConfirm() {
        if (formData.user_pw !== formData.user_pw_confirm) {
            errors.user_pw_confirm = '비밀번호가 일치하지 않습니다.';
            return false;
        }
        errors.user_pw_confirm = '';
        return true;
    }

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.user_email)) {
            errors.user_email = '유효한 이메일 주소를 입력해주세요.';
            return false;
        }
        errors.user_email = '';
        return true;
    }

    function validatePhone() {
        const phoneRegex = /^01[0-9]-?\d{3,4}-?\d{4}$/;
        if (!phoneRegex.test(formData.user_tel)) {
            errors.user_tel = '유효한 휴대폰 번호를 입력해주세요.';
            return false;
        }
        errors.user_tel = '';
        return true;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        // 모든 필수 필드 유효성 검사
        const isValid = 
            validateUserId() &&
            validatePassword() &&
            validatePasswordConfirm() &&
            validateEmail() &&
            validatePhone();

        // 필수 약관 동의 확인
        if (!agreements.terms || !agreements.privacy) {
            alert('필수 약관에 동의해주세요.');
            return;
        }

        if (!isValid) {
            alert('입력 정보를 확인해주세요.');
            return;
        }

        // TODO: 회원가입 API 호출
        try {
            const _para = null;
            const _data = {
                ...formData,
                user_marketing: agreements.marketing
            };

            const r = await ___prj.api.post('/s/user', 'signup.partner', _para, _data);
            ___prj.log.dev('회원가입 API 응답', r);
            if (r.data.result === ___const.OK){
                alert('회원가입이 완료되었습니다.');
                goto('/s/signIn');
            }
        } catch (error) {
            console.error('회원가입 실패:', error);
            alert('회원가입 중 오류가 발생했습니다.');
        }
    }

    // 약관 내용 불러오기
    async function loadTermsContent() {
        try {
            const response = await fetch('/terms.html');
			console.log(response);
            if (response.ok) {
                termsContent = await response.text();
            }
        } catch (error) {
            console.error('이용약관 로드 실패:', error);
        }
    }

    async function loadPrivacyContent() {
        try {
            const response = await fetch('/privacy.html');
            if (response.ok) {
                privacyContent = await response.text();
            }
        } catch (error) {
            console.error('개인정보처리방침 로드 실패:', error);
        }
    }

    onMount(() => {
        loadTermsContent();
        loadPrivacyContent();
    });
</script>

<div class="signup-page">
	<div class="signup-section">
		<div class="container">
			<div class="signup-card">
				<!-- 헤더 -->
				<div class="signup-header">
					<a href="/" class="logo-link">
						<img src="/logo/mc_mindcoding_pattern_1_light.png" alt="마인드코딩" class="logo" />
					</a>
					<h1 class="signup-title">파트너 회원가입</h1>
					<p class="signup-subtitle">마인드코딩 광고및 홍보 파트너님을 위한 계정을 만들어보세요</p>
				</div>

				<!-- 회원가입 폼 -->
				<div class="signup-form-wrapper">
					<form onsubmit={handleSubmit} class="signup-form">
						<!-- 기본 정보 섹션 -->
						<div class="form-section">
							<h3>기본 정보</h3>
							
							<div class="form-group">
								<label for="user_id">아이디 <span class="required">*</span></label>
								<input
									id="user_id"
									type="text"
									bind:value={formData.user_id}
									onblur={validateUserId}
									placeholder="아이디 (4자 이상)"
									required
								/>
								{#if errors.user_id}
									<span class="error-message">{errors.user_id}</span>
								{/if}
							</div>

							<div class="form-group">
								<label for="user_pw">비밀번호 <span class="required">*</span></label>
								<input
									id="user_pw"
									type="password"
									bind:value={formData.user_pw}
									onblur={validatePassword}
									placeholder="비밀번호 (영문, 숫자, 특수문자 포함 8자 이상)"
									required
								/>
								{#if errors.user_pw}
									<span class="error-message">{errors.user_pw}</span>
								{/if}
							</div>

							<div class="form-group">
								<label for="user_pw_confirm">비밀번호 확인 <span class="required">*</span></label>
								<input
									id="user_pw_confirm"
									type="password"
									bind:value={formData.user_pw_confirm}
									onblur={validatePasswordConfirm}
									placeholder="비밀번호 확인"
									required
								/>
								{#if errors.user_pw_confirm}
									<span class="error-message">{errors.user_pw_confirm}</span>
								{/if}
							</div>
						</div>

						<!-- 개인 정보 섹션 -->
						<div class="form-section">
							<h3>개인 정보</h3>
							
							<div class="form-row">
								<div class="form-group">
									<label for="user_type">회원구분 <span class="required">*</span></label>
									<select id="user_type" bind:value={formData.user_type} required>
										{#each userTypes as type}
											<option value={type.value}>{type.label}</option>
										{/each}
									</select>
								</div>
								
								<div class="form-group">
									<label for="user_name">이름 <span class="required">*</span></label>
									<input
										id="user_name"
										type="text"
										bind:value={formData.user_name}
										placeholder="이름"
										required
									/>
								</div>
							</div>

							<div class="form-group">
								<label for="user_email">이메일 <span class="required">*</span></label>
								<input
									id="user_email"
									type="email"
									bind:value={formData.user_email}
									onblur={validateEmail}
									placeholder="이메일"
									required
								/>
								{#if errors.user_email}
									<span class="error-message">{errors.user_email}</span>
								{/if}
							</div>

							<div class="form-group">
								<label for="user_tel">휴대폰 번호 <span class="required">*</span></label>
								<input
									id="user_tel"
									type="tel"
									bind:value={formData.user_tel}
									onblur={validatePhone}
									placeholder="휴대폰 번호 (- 없이 입력)"
									required
								/>
								{#if errors.user_tel}
									<span class="error-message">{errors.user_tel}</span>
								{/if}
							</div>

							<div class="form-group">
								<label for="user_company">회사명</label>
								<input
									id="user_company"
									type="text"
									bind:value={formData.user_company}
									placeholder="회사명 (선택사항)"
								/>
							</div>
						</div>

						<!-- 약관 동의 섹션 -->
						<div class="form-section">
							<h3>약관 동의</h3>
							
							<div class="agreement-item">
								<div class="agreement-checkbox">
									<input
										id="terms"
										type="checkbox"
										bind:checked={agreements.terms}
										required
									/>
									<label for="terms">이용약관 동의 <span class="required">(필수)</span></label>
								</div>
								<button type="button" onclick={() => showTerms('terms')} class="view-terms">보기</button>
							</div>

							<div class="agreement-item">
								<div class="agreement-checkbox">
									<input
										id="privacy"
										type="checkbox"
										bind:checked={agreements.privacy}
										required
									/>
									<label for="privacy">개인정보 처리방침 동의 <span class="required">(필수)</span></label>
								</div>
								<button type="button" onclick={() => showTerms('privacy')} class="view-terms">보기</button>
							</div>

							<div class="agreement-item">
								<div class="agreement-checkbox">
									<input
										id="user_marketing"
										type="checkbox"
										bind:checked={agreements.marketing}
									/>
									<label for="user_marketing">마케팅 정보 수신 동의 (선택)</label>
								</div>
							</div>
						</div>

						<button type="submit" class="signup-button">
							파트너 회원가입
						</button>
					</form>
				</div>

				<!-- 로그인 링크 섹션 -->
				<div class="login-section">
					<p>이미 계정이 있으신가요?</p>
					<a href="/s/signIn" class="login-button">로그인</a>
				</div>
			</div>
		</div>
	</div>
</div>

<TermsModal
	isOpen={modalState.isOpen}
	title={modalState.title}
	content={modalState.content}
	type={modalState.type}
	onClose={closeModal}
/>

<style>
	.signup-page {
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

	.signup-section {
		width: 100%;
		max-width: 500px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.container {
		width: 100%;
	}

	.signup-card {
		background: white;
		border-radius: 20px;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
		overflow: hidden;
		border: 1px solid #e2e8f0;
		/* 레이아웃 안정성을 위한 추가 속성 */
		position: relative;
		z-index: 1;
	}

	.signup-header {
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

	.signup-title {
		font-size: 2rem;
		font-weight: 700;
		color: #2d3748;
		margin: 1.5rem 0 0.5rem;
	}

	.signup-subtitle {
		font-size: 1rem;
		color: #718096;
		margin: 0;
	}

	.signup-form-wrapper {
		padding: 2rem;
	}

	.signup-form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.form-section {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-section h3 {
		font-size: 1.25rem;
		font-weight: 600;
		color: #2d3748;
		margin: 0 0 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid #e2e8f0;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 1rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-group label {
		font-weight: 600;
		color: #4a5568;
		font-size: 0.875rem;
	}

	.required {
		color: #e53e3e;
	}

	.form-group input,
	.form-group select {
		padding: 0.875rem 1rem;
		border: 2px solid #e2e8f0;
		border-radius: 10px;
		font-size: 1rem;
		transition: all 0.3s ease;
		background: #f8f9fa;
	}

	.form-group input:focus,
	.form-group select:focus {
		outline: none;
		border-color: #667eea;
		background: white;
		box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
	}

	.error-message {
		color: #e53e3e;
		font-size: 0.875rem;
		margin-top: 0.25rem;
	}

	.agreement-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
		background: #f8f9ff;
		border-radius: 10px;
		border: 1px solid #e2e8f0;
	}

	.agreement-checkbox {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.agreement-checkbox input[type="checkbox"] {
		width: 18px;
		height: 18px;
		accent-color: #667eea;
	}

	.agreement-checkbox label {
		font-size: 0.875rem;
		color: #4a5568;
		cursor: pointer;
		margin: 0;
	}

	.view-terms {
		background: none;
		border: none;
		color: #667eea;
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
		text-decoration: underline;
		padding: 0.25rem 0.5rem;
		border-radius: 5px;
		transition: all 0.3s ease;
	}

	.view-terms:hover {
		background: #667eea;
		color: white;
		text-decoration: none;
	}

	.signup-button {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		padding: 1rem 2rem;
		border-radius: 10px;
		font-size: 1.125rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		margin-top: 1rem;
	}

	.signup-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
	}

	.login-section {
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

	.login-section p {
		color: #718096;
		margin-bottom: 0;
		font-size: 0.875rem;
	}

	.login-button {
		display: inline-block;
		background: white;
		color: #667eea;
		border: 2px solid #667eea;
		padding: 0.5rem 2rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
		transition: all 0.3s ease;
		font-size: 0.875rem;
	}

	.login-button:hover {
		background: #667eea;
		color: white;
		transform: translateY(-1px);
	}

	/* 모바일 반응형 */
	@media (max-width: 768px) {
		.signup-page {
			padding: 0;
			background: white;
		}

		.signup-section {
			width: 100%;
			max-width: none;
			min-height: 100vh;
			align-items: flex-start;
			padding-top: 80px;
		}


		.signup-card {
			border-radius: 0;
			box-shadow: none;
			border: none;
			min-height: calc(100vh - 80px);
			display: flex;
			flex-direction: column;
			/* 모바일에서 CSS 안정성 보장 */
			-webkit-text-size-adjust: 100%;
			-ms-text-size-adjust: 100%;
		}

		.signup-header {
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			color: white;
			padding: 2rem 1.5rem 1.5rem;
			border-radius: 16px 16px 0 0;
		}

		.signup-header .signup-title {
			color: white;
		}

		.signup-header .signup-subtitle {
			color: rgba(255, 255, 255, 0.9);
		}

		.signup-form-wrapper {
			padding: 1.5rem;
			background: white;
			flex: 1;
		}

		.form-row {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.login-section {
			padding: 1.2rem;
			background: #f8f9ff;
			border-radius: 0 0 16px 16px;
		}
	}

	@media (max-width: 480px) {
		.signup-header {
			padding: 1.5rem 1rem 1rem;
		}

		.signup-form-wrapper {
			padding: 1rem;
		}

		.login-section {
			padding: 1rem;
			background: #f8f9ff;
			border-radius: 0 0 16px 16px;
		}

		.form-section h3 {
			font-size: 1.125rem;
		}
	}
</style>