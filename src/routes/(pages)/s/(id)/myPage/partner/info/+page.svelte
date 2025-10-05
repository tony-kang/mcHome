<script>
    import { onMount } from 'svelte';
    import ___prj from '$prj/prjMain';
    import ___const from '$prj/lib/i_const';
    import ___localStorage from '$prj/lib/i_localStorage';
    import { g_logedIn } from '$prj/prjStore';
    import { toastAlert } from '$prj/lib/i_alert';
    import { goto } from '$app/navigation';
    import PartnerInfo from './PartnerInfo.svelte';
    import PartnerSidebar from '$lib/components/PartnerSidebar.svelte';
    import '../partner-common.css';

    let partnerInfo = $state(null);
    let isLoaded = $state(false);

    let userInfo = $state(null);
    let sidebarOpen = $state(false);

    onMount(async () => {
        if (___prj.user && $g_logedIn) {
            userInfo = ___prj.user;
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

{#if (userInfo && userInfo.userType === 3) }
    <PartnerSidebar bind:isOpen={sidebarOpen} />
{/if}
<div class="partner-container">
    <div class="partner-page-header">
        <div class="partner-header-content">
            <h1 class="partner-title">파트너 정보 관리</h1>
        </div>
    </div>
    <div>
        {#if isLoaded}
            <PartnerInfo {partnerInfo} />
        {/if}
    </div>
</div>

<!-- 공통 CSS는 partner-common.css에서 import -->