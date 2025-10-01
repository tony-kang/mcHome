<script>
    import { onMount } from 'svelte';
    import ___prj from '$prj/prjMain';
    import ___const from '$prj/lib/i_const';
    import ___localStorage from '$prj/lib/i_localStorage';
    import { g_logedIn } from '$prj/prjStore';
    import { toastAlert } from '$prj/lib/i_alert';
    import { goto } from '$app/navigation';
    import PartnerInfo from './PartnerInfo.svelte';

    let partnerInfo = $state(null);
    let isLoaded = $state(false);

    onMount(async () => {
        if (___prj.user && $g_logedIn) {
            const r = await ___prj.api.post('/s/partner', 'get.partner.info', null, null);

            if (r.data.result === ___const.OK) {
                partnerInfo = r.data.content[0];
                console.log('partnerInfo', $state.snapshot(partnerInfo));
            }
        } else {
            console.log('사용자 정보 없음, 로그인 페이지로 리다이렉트');
            window.location.href = '/s/signIn';
        }
        isLoaded = true;
    });

    function goBack() {
        goto('/s/myPage');
    }
</script>

<div class="partner-info-container">
    <div class="page-header">
        <div class="header-content">
            <h1 class="text-white font-bold text-3xl">파트너 정보 관리</h1>
        </div>
    </div>
    <div>
        {#if isLoaded}
            <PartnerInfo {partnerInfo} />
        {/if}
    </div>
</div>

<style>
    .partner-info-container {
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

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    /* 반응형 디자인 */
    @media (max-width: 768px) {
        .partner-info-container {
            padding: 15px;
        }

        .page-header {
            padding: 20px;
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