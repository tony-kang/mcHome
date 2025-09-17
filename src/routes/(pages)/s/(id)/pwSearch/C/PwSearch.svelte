<script>
    import ___const from "$prj/lib/i_const";
    import ___prj from "$prj/prjMain";
    import ___log from "$prj/lib/i_log";
    import { _color } from "$prj/lib/i_etc";
    import { getContext } from 'svelte';
    
    const ___telepasi = getContext('___telepasi');

    let userId = 'codeAdmin';
    let email = 'bluein007@naver.com';

    const apiName = '/v1/user';

    async function handleSubmit(event) {
        event.preventDefault();
        // TODO: 비밀번호 찾기 API 호출
        console.log('비밀번호 초기화 요청:', { userId, email });
        ___telepasi.loading.show('비밀번호 재설정 전송중...');
        const r = await ___prj.api.post(apiName, 'send.pw.reset.mail', null, { 
            userId, 
            email, 
            landingDomain: ___prj.protocol + '//' + ___prj.landingDomain 
        });
        ___log.dev('___submitBtn r:', r);
        ___telepasi.loading.close();

        if (r.data.result === ___const.OK) {
            ___telepasi.alert.showMessage({
                title: '비밀번호 재설정',
                message: `(<span class="px-1 text-gray-700 bg-gray-300">${email}</span>로 비밀번호 설정 이메일이 발송되었습니다.)`,
                color: _color.WARNING,
                time: 0,
                align: ___const.TEXT_CENTER
            });
        }
    }
</script>

<div class="pwsearch-page">
	<div class="pwsearch-section">
		<div class="container">
			<div class="pwsearch-card">
				<!-- 헤더 -->
				<div class="pwsearch-header">
					<a href="/" class="logo-link">
						<img src="/logo/mc_mindcoding_pattern_1_light.png" alt="마인드코딩" class="logo" />
					</a>
					<h1 class="pwsearch-title">비밀번호 찾기</h1>
					<p class="pwsearch-subtitle">가입한 이메일로 임시 비밀번호를 받아보세요</p>
				</div>

				<!-- 비밀번호 찾기 폼 -->
				<div class="pwsearch-form-wrapper">
					<form onsubmit={handleSubmit} class="pwsearch-form">
						<div class="form-group">
							<label for="userId">아이디 <span class="required">*</span></label>
							<input
								id="userId"
								type="text"
								bind:value={userId}
								placeholder="아이디를 입력하세요"
								required
							/>
						</div>

						<div class="form-group">
							<label for="email">이메일 <span class="required">*</span></label>
							<input
								id="email"
								type="email"
								bind:value={email}
								placeholder="가입시 등록한 이메일을 입력하세요"
								required
							/>
						</div>

						<button type="submit" class="pwsearch-button">
							비밀번호 찾기
						</button>
					</form>
				</div>

				<!-- 안내 메시지 섹션 -->
				<div class="notice-section">
					<div class="notice-item">
						<i class="fas fa-info-circle"></i>
						<span>가입된 이메일로 임시 비밀번호가 발송됩니다.</span>
					</div>
					<div class="notice-item">
						<i class="fas fa-exclamation-triangle"></i>
						<span>로그인 후 반드시 비밀번호를 변경해 주세요.</span>
					</div>
				</div>

				<!-- 링크 섹션 -->
				<div class="link-section">
					<p>다른 방법이 필요하신가요?</p>
					<div class="link-buttons">
						<a href="/s/signIn" class="link-button">로그인</a>
						<a href="/s/idSearch" class="link-button">아이디 찾기</a>
						<a href="/s/signUp" class="link-button">회원가입</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.pwsearch-page {
		min-height: 100vh;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.pwsearch-section {
		width: 100%;
		max-width: 500px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.container {
		width: 100%;
	}

	.pwsearch-card {
		background: white;
		border-radius: 20px;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
		overflow: hidden;
		border: 1px solid #e2e8f0;
	}

	.pwsearch-header {
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

	.pwsearch-title {
		font-size: 2rem;
		font-weight: 700;
		color: #2d3748;
		margin: 1.5rem 0 0.5rem;
	}

	.pwsearch-subtitle {
		font-size: 1rem;
		color: #718096;
		margin: 0;
	}

	.pwsearch-form-wrapper {
		padding: 2rem;
	}

	.pwsearch-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
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

	.form-group input {
		padding: 0.875rem 1rem;
		border: 2px solid #e2e8f0;
		border-radius: 10px;
		font-size: 1rem;
		transition: all 0.3s ease;
		background: #f8f9fa;
	}

	.form-group input:focus {
		outline: none;
		border-color: #667eea;
		background: white;
		box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
	}

	.pwsearch-button {
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

	.pwsearch-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
	}

	.notice-section {
		padding: 0 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.notice-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem;
		background: #f8f9ff;
		border-radius: 10px;
		border-left: 4px solid #667eea;
	}

	.notice-item i {
		color: #667eea;
		font-size: 1.125rem;
		width: 20px;
		text-align: center;
	}

	.notice-item span {
		color: #4a5568;
		font-size: 0.875rem;
		line-height: 1.5;
	}

	.link-section {
		text-align: center;
		padding: 1.2rem;
		background: #f8f9ff;
		border-top: 1px solid #e2e8f0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.link-section p {
		color: #718096;
		margin: 0;
		font-size: 0.875rem;
	}

	.link-buttons {
		display: flex;
		justify-content: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.link-button {
		display: inline-block;
		background: white;
		color: #667eea;
		border: 2px solid #667eea;
		padding: 0.5rem 1.5rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
		transition: all 0.3s ease;
		font-size: 0.875rem;
	}

	.link-button:hover {
		background: #667eea;
		color: white;
		transform: translateY(-1px);
	}

	/* 모바일 반응형 */
	@media (max-width: 768px) {
		.pwsearch-page {
			padding: 0;
			background: white;
		}

		.pwsearch-section {
			width: 100%;
			max-width: none;
			min-height: 100vh;
			align-items: flex-start;
			padding-top: 80px;
		}


		.pwsearch-card {
			border-radius: 0;
			box-shadow: none;
			border: none;
			min-height: calc(100vh - 80px);
			display: flex;
			flex-direction: column;
		}

		.pwsearch-header {
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			color: white;
			padding: 2rem 1.5rem 1.5rem;
			border-radius: 16px 16px 0 0;
		}

		.pwsearch-header .pwsearch-title {
			color: white;
		}

		.pwsearch-header .pwsearch-subtitle {
			color: rgba(255, 255, 255, 0.9);
		}

		.pwsearch-form-wrapper {
			padding: 1.5rem;
			background: white;
			flex: 1;
		}

		.notice-section {
			padding: 0 1.5rem;
		}

		.link-section {
			padding: 1.2rem;
			background: #f8f9ff;
			border-radius: 0 0 16px 16px;
		}

		.link-buttons {
			flex-direction: column;
			gap: 0.75rem;
		}

		.link-button {
			width: 100%;
			text-align: center;
		}
	}

	@media (max-width: 480px) {
		.pwsearch-header {
			padding: 1.5rem 1rem 1rem;
		}

		.pwsearch-form-wrapper {
			padding: 1rem;
		}

		.notice-section {
			padding: 0 1rem;
		}

		.link-section {
			padding: 1rem;
		}

		.pwsearch-title {
			font-size: 1.5rem;
		}
	}
</style>