<script>
    import ___prj from '$prj/prjMain';
    import PartnerSidebar from '$lib/components/PartnerSidebar.svelte';
    import AdminSidebar from '$lib/components/AdminSidebar.svelte';

    let {
        title = '제목없음',
        showSidebar = true
    } = $props();

    let sidebarOpen = $state(false);
</script>

<div class="partner-page-header">
    <div class="header-row">
        {#if ___prj.isAdmin}
            <AdminSidebar bind:isOpen={sidebarOpen} />
        {:else if (___prj.user && ___prj.user.userType === 3) }
            <PartnerSidebar inline={true} />
        {/if}
        <h1 class="partner-title">{title}</h1>
        <a href="/" class="home-btn" aria-label="홈으로">Home</a>
    </div>
</div>

<style>
    .partner-page-header {
        margin-bottom: 24px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 16px;
        padding: 30px;
        box-shadow: 0 8px 32px rgba(102, 126, 234, 0.2);
    }

    .sidebar-inline {
        margin-bottom: 8px;
    }

    .header-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
    }

    .partner-title {
        color: #fff;
        font-size: 1.4rem;
        font-weight: 700;
        margin: 0;
    }

    .home-btn {
        display: inline-block;
        padding: 8px 14px;
        background: rgba(255, 255, 255, 0.15);
        color: #fff;
        border: 1px solid rgba(255, 255, 255, 0.25);
        border-radius: 8px;
        font-size: 0.9rem;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.2s ease;
        backdrop-filter: blur(8px);
    }

    .home-btn:hover {
        background: rgba(255, 255, 255, 0.25);
        border-color: rgba(255, 255, 255, 0.4);
        transform: translateY(-1px);
    }

    @media (max-width: 768px) {
        .partner-page-header {
            padding: 20px;
        }
    }
</style>