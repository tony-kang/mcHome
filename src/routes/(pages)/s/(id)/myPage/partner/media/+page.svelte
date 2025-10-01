<script>
    import { onMount } from 'svelte';
    import ___prj from '$prj/prjMain';
    import ___localStorage from '$prj/lib/i_localStorage';
    import { g_logedIn } from '$prj/prjStore';
    import { toastAlert } from '$prj/lib/i_alert';
    import { goto } from '$app/navigation';

    let userInfo = $state(null);
    let isLoaded = $state(false);
    // 테스트 모드 설정 (실제 서비스에서는 false로 변경)
    const isTestMode = true;
    const storageDuration = isTestMode ? 5 : 24; // 테스트: 5분, 운영: 24시간

    onMount(() => {
        if (___prj.user && $g_logedIn) {
            userInfo = ___prj.user;
                        
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
                <h1 class="text-white font-bold text-3xl">파트너 매체 관리</h1>
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
    }

    @media (max-width: 480px) {
        .page-header h1 {
            font-size: 1.5rem;
        }
    }
</style>