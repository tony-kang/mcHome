<script>
    import { onMount } from 'svelte';
    import ___prj from '$prj/prjMain';
    import ___localStorage from '$prj/lib/i_localStorage';
    import { g_logedIn } from '$prj/prjStore';
    import { toastAlert } from '$prj/lib/i_alert';
    import { goto } from '$app/navigation';

    let userInfo = $state(null);
    let isLoaded = $state(false);
    let storedUrlParams = $state(null);

    // 테스트 모드 설정 (실제 서비스에서는 false로 변경)
    const isTestMode = true;
    const storageDuration = isTestMode ? 5 : 24; // 테스트: 5분, 운영: 24시간

    onMount(() => {
        if (___prj.user && $g_logedIn) {
            userInfo = ___prj.user;
            
            // 저장된 URL 파라미터 확인
            storedUrlParams = ___localStorage.urlParams.getParams();
            if (storedUrlParams) {
                console.log('수익 정산 페이지 - 저장된 URL 파라미터:', storedUrlParams);
                toastAlert('저장된 파트너/상담사 정보가 복원되었습니다.');
            }
            
            isLoaded = true;
        } else {
            console.log('사용자 정보 없음, 로그인 페이지로 리다이렉트');
            window.location.href = '/s/signIn';
        }
    });

    function goBack() {
        goto('/s/myPage');
    }
</script>

{#if isLoaded && userInfo}
    <div class="revenue-container">
        <div class="page-header">
            <div class="header-content">
                <div class="header-left">
                    <button class="back-btn" onclick={goBack}>
                        <span class="back-icon">←</span>
                        뒤로가기
                    </button>
                    <h1>수익 정산</h1>
                </div>
            </div>
        </div>

        <!-- 저장된 URL 파라미터 정보 표시 -->
        {#if storedUrlParams && (storedUrlParams.pP || storedUrlParams.pC)}
        <div class="stored-params-info">
            <div class="info-header">
                <h2>💾 저장된 파트너/상담사 정보</h2>
                <p>이전에 방문한 파트너/상담사 정보가 복원되었습니다</p>
            </div>
            
            <div class="params-grid">
                {#if storedUrlParams.pP}
                <div class="param-item">
                    <span class="param-label">파트너 ID:</span>
                    <span class="param-value">{storedUrlParams.pP}</span>
                </div>
                {/if}
                
                {#if storedUrlParams.pC}
                <div class="param-item">
                    <span class="param-label">상담사 ID:</span>
                    <span class="param-value">{storedUrlParams.pC}</span>
                </div>
                {/if}
            </div>
        </div>
        {/if}

        <div class="revenue-content">
            <div class="content-card">
                <h2>수익 정산 정보</h2>
                <p>파트너 수익 정산 관련 정보를 확인할 수 있습니다.</p>
                
                {#if storedUrlParams}
                    <div class="partner-info">
                        <h3>파트너 정보</h3>
                        <p>저장된 파라미터를 통해 파트너 정보를 추적할 수 있습니다.</p>
                    </div>
                {/if}
            </div>
        </div>
    </div>
{:else if !isLoaded}
    <div class="loading-container">
        <div class="loading-spinner"></div>
        <p>사용자 정보를 불러오는 중...</p>
    </div>
{:else}
    <div class="revenue-container">
        <h1>로그인 후 이용해주세요.</h1>
    </div>
{/if}

<style>
    .revenue-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        background: #ffffff;
        min-height: 100vh;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

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
    }

    .header-left {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .back-btn {
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

    .back-btn:hover {
        background: rgba(255, 255, 255, 0.3);
        border-color: rgba(255, 255, 255, 0.5);
        transform: translateY(-2px);
    }

    .back-icon {
        font-size: 16px;
    }

    .page-header h1 {
        margin: 0;
        color: white;
        font-size: 2.2rem;
        font-weight: 700;
    }

    .stored-params-info {
        background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
        border-radius: 20px;
        padding: 30px;
        margin-bottom: 30px;
        box-shadow: 0 8px 32px rgba(72, 187, 120, 0.2);
    }

    .info-header h2 {
        margin: 0 0 10px 0;
        color: white;
        font-size: 1.8rem;
        font-weight: 700;
    }

    .info-header p {
        margin: 0 0 20px 0;
        color: rgba(255, 255, 255, 0.9);
        font-size: 1.1rem;
    }

    .params-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
    }

    .param-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 20px;
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .param-label {
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.8);
        font-weight: 500;
    }

    .param-value {
        font-size: 1.1rem;
        color: white;
        font-weight: 600;
    }

    .revenue-content {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 20px;
        padding: 30px;
        box-shadow: 0 8px 32px rgba(102, 126, 234, 0.2);
    }

    .content-card h2 {
        margin: 0 0 15px 0;
        color: white;
        font-size: 1.8rem;
        font-weight: 700;
    }

    .content-card p {
        margin: 0 0 20px 0;
        color: rgba(255, 255, 255, 0.9);
        font-size: 1.1rem;
    }

    .partner-info {
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        padding: 20px;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .partner-info h3 {
        margin: 0 0 10px 0;
        color: white;
        font-size: 1.3rem;
        font-weight: 600;
    }

    .partner-info p {
        margin: 0;
        color: rgba(255, 255, 255, 0.8);
        font-size: 1rem;
    }

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
        .revenue-container {
            padding: 15px;
        }

        .page-header {
            padding: 20px;
        }

        .header-left {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
        }

        .page-header h1 {
            font-size: 1.8rem;
        }

        .stored-params-info, .revenue-content {
            padding: 20px;
        }

        .params-grid {
            grid-template-columns: 1fr;
            gap: 15px;
        }
    }

    @media (max-width: 480px) {
        .page-header h1 {
            font-size: 1.5rem;
        }

        .info-header h2 {
            font-size: 1.5rem;
        }

        .content-card h2 {
            font-size: 1.5rem;
        }

        .param-item {
            padding: 15px;
        }
    }
</style>