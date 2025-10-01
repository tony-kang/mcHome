<script>
    import { onMount } from 'svelte';
    import ___prj from '$prj/prjMain';
	import ___const from '$prj/lib/i_const';
	import ___localStorage from '$prj/lib/i_localStorage';
	import { g_logedIn, g_theme } from '$prj/prjStore';
    import PasswordChange from './PasswordChange.svelte';
    import AdminSidebar from '$lib/components/AdminSidebar.svelte';
    import PartnerSidebar from '$lib/components/PartnerSidebar.svelte';
    import ___encDec from '$prj/lib/i_encDec';
    import { toastAlert } from '$prj/lib/i_alert';
    import { goto } from '$app/navigation';

    let showPasswordChange = $state(false);
    let userInfo = $state(null);
    let isLoaded = $state(false);
    const baseUrl = 'https://mind-codding.com';

    const userTypes = [
        { value: 1, label: '일반' },
        { value: 2, label: '상담사' },
        { value: 3, label: '파트너' }
    ];

    let encodedPartnerUrl = $state('');
    let encodedCounselorUrl = $state('');
    let counselorId = $state('MC001');
    let sidebarOpen = $state(false);

    function getUserTypeLabel(userType) {
        return userTypes.find(type => type.value === userType)?.label;
    }

    onMount(() => {
        if (___prj.user && $g_logedIn) {
            userInfo = ___prj.user;
            encodedPartnerUrl = baseUrl + `?pP=${___encDec.telepasiEncrypt(userInfo.userId)}`
            encodedCounselorUrl = encodedPartnerUrl + `&pC=${___encDec.telepasiEncrypt(counselorId)}`
            isLoaded = true;
        } else {
            // 사용자 정보가 없으면 로그인 페이지로 리다이렉트
            console.log('사용자 정보 없음, 로그인 페이지로 리다이렉트');
            window.location.href = '/s/signIn';
        }
    });

    function togglePasswordChange() {
        showPasswordChange = !showPasswordChange;
    }
</script>

{#if isLoaded && userInfo}
    <!-- 관리자 사이드바 컴포넌트 -->
    {#if ___prj.isAdmin}
        <AdminSidebar bind:isOpen={sidebarOpen} />
    {:else if (userInfo.userType === 3) }
        <PartnerSidebar bind:isOpen={sidebarOpen} />
    {/if}
    <div class="my-page-container">
        <!-- 헤더 섹션 -->
        <div class="partner-info-card">
            <div class="card-header">
                <div class="header-left">
                    <div class="card-icon">👋</div>
                    <div>
                        <h2>안녕하세요, {userInfo.loginUserName || userInfo.nickname || '사용자'}님!</h2>
                        <p class="welcome-subtitle">마인드코딩에 오신 것을 환영합니다</p>
                    </div>
                </div>
                <div class="header-right flex items-center justify-center gap-2">
                    <button class="btn-password-change" onclick={togglePasswordChange}>
                        <span class="btn-icon">🔐</span>
                        비밀번호 변경
                    </button>
                </div>
            </div>
        </div>

        <!-- 사용자 정보 카드 -->
        <div class="user-info-card">
            <div class="card-header">
                <div class="header-left">
                    <div class="card-icon">👤</div>
                    <h2>사용자 정보</h2>
                </div>
            </div>
            <div class="user-info-grid">
                <div class="info-item">
                    <div class="info-icon">🏷️</div>
                    <div class="info-content">
                        <span class="info-label">사용자명</span>
                        <span class="info-value">{userInfo.loginUserName || userInfo.nickname || 'N/A'}</span>
                    </div>
                </div>
                <div class="info-item">
                    <div class="info-icon">📧</div>
                    <div class="info-content">
                        <span class="info-label">이메일</span>
                        <span class="info-value">{userInfo.userEmail || 'N/A'}</span>
                    </div>
                </div>
                <div class="info-item">
                    <div class="info-icon">🎯</div>
                    <div class="info-content">
                        <span class="info-label">사용자 타입</span>
                        <span class="info-value user-type-badge user-type-{userInfo.userType}">
                            {getUserTypeLabel(userInfo.userType) || 'N/A'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 파트너 정보 섹션 -->
        {#if (userInfo.userType === 3) }
        <div class="partner-info-card">
            <div class="card-header">
                <div class="header-left">
                    <div class="card-icon">🤝</div>
                    <div>
                        <h2>파트너 링크정보</h2>
                        <p class="welcome-subtitle">마인드코딩에서 제공하는 URL을 링크하여 수익을 얻어보세요</p>
                    </div>
                </div>
            </div>
            
            <!-- 파트너 URL 섹션 -->
            <div class="url-section">
                <div class="section-title">
                    <span class="section-icon">🔗</span>
                    <span>파트너 URL</span>
                </div>
                <div class="url-container">
                    <div class="url-display">
                        <code class="url-code">{encodedPartnerUrl}</code>
                        <button class="copy-btn" onclick={() => { 
                            navigator.clipboard.writeText(encodedPartnerUrl); 
                            toastAlert('복사되었습니다.');
                        }}>
                            <span class="copy-icon">📋</span>
                            복사
                        </button>
                    </div>
                </div>
            </div>

            <!-- 상담사 URL 섹션 -->
            <div class="url-section">
                <div class="section-title">
                    <span class="section-icon">👨‍⚕️</span>
                    <span>상담사 포함 URL</span>
                </div>
                <div class="counselor-input-group">
                    <div class="input-wrapper">
                        <label for="counselor-input">상담사 ID</label>
                        <input id="counselor-input" type="text" class="counselor-input" bind:value={counselorId} placeholder="상담사 ID 입력" />
                        <button class="apply-btn" onclick={() => { 
                            encodedCounselorUrl = encodedPartnerUrl + `&pC=${___encDec.telepasiEncrypt(counselorId)}`; 
                            // console.log(encodedCounselorUrl);
                        }}>
                            URL에 적용
                        </button>
                    </div>
                    {#if encodedCounselorUrl}
                        <div class="url-container">
                            <div class="url-display">
                                <code class="url-code">{encodedCounselorUrl}</code>
                                <button class="copy-btn" onclick={() => { 
                                    navigator.clipboard.writeText(encodedCounselorUrl); 
                                    toastAlert('복사되었습니다.');
                                }}>
                                    <span class="copy-icon">📋</span>
                                    복사
                                </button>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
        {/if}

        {#if showPasswordChange}
            <PasswordChange onClose={() => showPasswordChange = false} />
        {/if}
    </div>
{:else if !isLoaded}
    <!-- 로딩 중 -->
    <div class="loading-container">
        <div class="loading-spinner"></div>
        <p>사용자 정보를 불러오는 중...</p>
    </div>
{:else}
    <div class="my-page-container">
        <h1>로그인 후 이용해주세요.</h1>
    </div>
{/if}

<style>
    .my-page-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        background: #ffffff;
        min-height: 100vh;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    /* 헤더 스타일 */
    .page-header {
        margin-bottom: 30px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 20px;
        padding: 30px;
        box-shadow: 0 8px 32px rgba(102, 126, 234, 0.2);
    }

    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
    }


    .welcome-subtitle {
        margin: 0;
        color: rgba(255, 255, 255, 0.9);
        font-size: 1.1rem;
        font-weight: 500;
    }

    .btn-password-change {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: 2px solid rgba(255, 255, 255, 0.3);
        padding: 12px 24px;
        border-radius: 12px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
        backdrop-filter: blur(10px);
    }

    .btn-password-change:hover {
        background: rgba(255, 255, 255, 0.3);
        border-color: rgba(255, 255, 255, 0.5);
        transform: translateY(-2px);
    }

    .btn-icon {
        font-size: 16px;
    }

    /* 카드 스타일 */
    .user-info-card, .partner-info-card, .stored-params-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 20px;
        padding: 30px;
        margin-bottom: 30px;
        box-shadow: 0 8px 32px rgba(102, 126, 234, 0.2);
        transition: all 0.3s ease;
    }

    .user-info-card:hover, .partner-info-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 40px rgba(102, 126, 234, 0.3);
    }

    .card-header {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 25px;
        padding-bottom: 15px;
        border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    }

    /* 환영 카드만 오른쪽 정렬 */
    .partner-info-card:first-child .card-header {
        justify-content: space-between;
    }

    .header-left {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    .header-right {
        display: flex;
        align-items: center;
    }

    .card-icon {
        font-size: 2rem;
        color: white;
    }

    .card-header h2 {
        margin: 0;
        color: white;
        font-size: 1.8rem;
        font-weight: 700;
    }

    /* 사용자 정보 그리드 */
    .user-info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
    }

    .info-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 20px;
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.3s ease;
    }

    .info-item:hover {
        transform: translateX(5px);
        background: rgba(255, 255, 255, 0.25);
        box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
    }

    .info-icon {
        font-size: 1.5rem;
        min-width: 40px;
        text-align: center;
    }

    .info-content {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .info-label {
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.8);
        font-weight: 500;
    }

    .info-value {
        font-size: 1.1rem;
        color: white;
        font-weight: 600;
    }

    .user-type-badge {
        display: inline-block;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);
    }

    /* URL 섹션 스타일 */
    .url-section {
        margin-bottom: 30px;
    }

    .section-title {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
        font-size: 1.2rem;
        font-weight: 600;
        color: white;
    }

    .section-icon {
        font-size: 1.3rem;
    }

    .url-container {
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);
        border-radius: 12px;
        padding: 20px;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .url-display {
        display: flex;
        align-items: center;
        gap: 15px;
        flex-wrap: wrap;
    }

    .url-code {
        font-weight: 600;
        flex: 1;
        background: rgba(0, 0, 0, 1);
        color: #e2e8f0;
        padding: 12px 16px;
        border-radius: 8px;
        font-family: 'Courier New', monospace;
        font-size: 1.2rem;
        word-break: break-all;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .copy-btn {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);
        padding: 12px 20px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
        white-space: nowrap;
        backdrop-filter: blur(10px);
    }

    .copy-btn:hover {
        background: rgba(255, 255, 255, 0.3);
        border-color: rgba(255, 255, 255, 0.5);
        transform: translateY(-2px);
    }

    .copy-icon {
        font-size: 16px;
    }

    /* 상담사 입력 그룹 */
    .counselor-input-group {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .input-wrapper {
        display: flex;
        align-items: center;
        gap: 15px;
        flex-wrap: wrap;
    }

    .input-wrapper label {
        font-weight: 600;
        color: white;
        min-width: 80px;
    }

    .counselor-input {
        flex: 1;
        max-width: 100px;
        padding: 12px 16px;
        border: 2px solid rgba(58, 1, 242, 0.3);
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        transition: all 0.3s ease;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        backdrop-filter: blur(10px);
        text-align: center;
    }

    .counselor-input::placeholder {
        color: rgba(255, 255, 255, 0.7);
    }

    .counselor-input:focus {
        outline: none;
        border-color: rgba(255, 255, 255, 0.5);
        background: rgba(255, 255, 255, 0.2);
        box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
    }

    .apply-btn {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);
        padding: 12px 20px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        transition: all 0.3s ease;
        white-space: nowrap;
        backdrop-filter: blur(10px);
    }

    .apply-btn:hover {
        background: rgba(255, 255, 255, 0.3);
        border-color: rgba(255, 255, 255, 0.5);
        transform: translateY(-2px);
    }

    /* 로딩 스타일 */
    .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 60vh;
        text-align: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 20px;
        margin: 20px;
        box-shadow: 0 8px 32px rgba(102, 126, 234, 0.2);
    }

    .loading-spinner {
        width: 50px;
        height: 50px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #667eea;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 20px;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .loading-container p {
        color: #718096;
        font-size: 18px;
        font-weight: 500;
        margin: 0;
    }

    /* 반응형 디자인 */
    @media (max-width: 768px) {
        .my-page-container {
            padding: 15px;
        }

        .page-header {
            padding: 20px;
        }

        .header-content {
            flex-direction: column;
            text-align: center;
            gap: 20px;
        }


        .welcome-subtitle {
            font-size: 1rem;
        }

        .user-info-card, .partner-info-card, .stored-params-card {
            padding: 20px;
        }

        /* 환영 카드만 세로 배치 */
        .partner-info-card:first-child .card-header {
            flex-direction: column;
            align-items: stretch;
            gap: 20px;
        }

        .partner-info-card:first-child .header-left {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
        }

        .partner-info-card:first-child .header-right {
            align-self: stretch;
            justify-content: center;
        }

        .user-info-grid, .stored-params-grid {
            grid-template-columns: 1fr;
            gap: 15px;
        }

        .url-display {
            flex-direction: column;
            align-items: stretch;
        }

        .url-code {
            font-size: 1rem;
        }

        .input-wrapper {
            flex-direction: column;
            align-items: stretch;
        }

        .input-wrapper label {
            min-width: auto;
            margin-bottom: 5px;
        }

        .counselor-input {
            min-width: auto;
        }
    }

    @media (max-width: 480px) {

        .card-header h2 {
            font-size: 1.5rem;
        }

        .info-item {
            padding: 15px;
        }

        .url-container {
            padding: 15px;
        }

        .copy-btn, .apply-btn {
            padding: 10px 16px;
            font-size: 13px;
        }
    }
</style>