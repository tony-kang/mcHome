<script>
    import { onMount } from 'svelte';
	import ___prj from '$prj/prjMain';
	import ___const from '$prj/lib/i_const';
	import { g_logedIn, g_theme } from '$prj/prjStore';
	import GeneralUserProfile from './GeneralUserProfile.svelte';
	import PartnerProfile from './PartnerProfile.svelte';
	import PasswordChange from './PasswordChange.svelte';

    let showPasswordChange = $state(false);
    let userInfo = $state(null);
    let isLoaded = $state(false);

    console.log('myPage SSR', ___prj.user);

    onMount(() => {
        // 클라이언트에서 사용자 정보 확인
        console.log('myPage Client', ___prj.user);
        
        if (___prj.user && $g_logedIn) {
            userInfo = ___prj.user;
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
    <div class="my-page-container">
        <div class="page-header">
            <h1>마이페이지</h1>
            <button class="btn-password-change" onclick={togglePasswordChange}>
                비밀번호 변경
            </button>
        </div>

        <div class="user-content">
            {#if userInfo.user_type === 1 || userInfo.userType === 'general'}
                <!-- 일반 사용자 -->
                <GeneralUserProfile />
            {:else if userInfo.user_type === 2 || userInfo.userType === 'partner'}
                <!-- 파트너 -->
                <PartnerProfile />
            {:else}
                <!-- 기본 사용자 정보 표시 -->
                <div class="default-profile">
                    <h2>사용자 정보</h2>
                    <div class="user-info">
                        <p><strong>사용자명:</strong> {userInfo.userName || userInfo.nickname || 'N/A'}</p>
                        <p><strong>이메일:</strong> {userInfo.email || 'N/A'}</p>
                        <p><strong>사용자 타입:</strong> {userInfo.user_type || userInfo.userType || 'N/A'}</p>
                    </div>
                </div>
            {/if}
        </div>

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
        max-width: 800px;
        margin: 0 auto;
        padding: 40px 20px;
        background: #fff;
        min-height: 100vh;
    }

    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 40px;
        padding-bottom: 20px;
        border-bottom: 2px solid #e9ecef;
    }

    .page-header h1 {
        margin: 0;
        color: #333;
        font-size: 2rem;
    }

    .btn-password-change {
        background: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.3s ease;
    }

    .btn-password-change:hover {
        background: #0056b3;
    }

    .user-content {
        background: #f8f9fa;
        border-radius: 12px;
        padding: 30px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .default-profile {
        text-align: center;
    }

    .default-profile h2 {
        color: #333;
        margin-bottom: 20px;
    }

    .user-info {
        text-align: left;
        max-width: 400px;
        margin: 0 auto;
    }

    .user-info p {
        margin: 15px 0;
        padding: 10px;
        background: white;
        border-radius: 6px;
        border-left: 4px solid #007bff;
    }

    @media (max-width: 768px) {
        .my-page-container {
            padding: 20px 15px;
        }

        .page-header {
            flex-direction: column;
            gap: 15px;
            text-align: center;
        }

        .page-header h1 {
            font-size: 1.5rem;
        }

        .user-content {
            padding: 20px;
        }
    }

    .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 60vh;
        text-align: center;
    }

    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #007bff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 20px;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .loading-container p {
        color: #666;
        font-size: 16px;
        margin: 0;
    }
</style>