<script>
    import { goto } from '$app/navigation';
    import ___prj from '$prj/prjMain';

    let { isOpen = $bindable(false) } = $props();

    function toggleSidebar() {
        isOpen = !isOpen;
    }

    function navigateToAdminPage(path) {
        goto(path);
        isOpen = false;
    }

    // ESC 키로 사이드바 닫기
    function handleKeydown(event) {
        if (event.key === 'Escape' && isOpen) {
            isOpen = false;
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if ___prj.isAdmin}
    <!-- 사이드바 토글 버튼 -->
    <button class="admin-sidebar-toggle" onclick={toggleSidebar} class:active={isOpen}>
        <div class="hamburger-icon" class:active={isOpen}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="line line-1" d="M3 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path class="line line-2" d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path class="line line-3" d="M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <span class="admin-label">관리자</span>
    </button>

    <!-- 사이드바 오버레이 -->
    {#if isOpen}
        <div 
            class="sidebar-overlay" 
            onclick={toggleSidebar}
            onkeydown={(e) => e.key === 'Escape' && toggleSidebar()}
            role="button"
            tabindex="0"
            aria-label="사이드바 닫기"
        ></div>
    {/if}

    <!-- 관리자 사이드바 -->
    <div class="admin-sidebar" class:open={isOpen}>
        <div class="sidebar-header">
            <div class="sidebar-title">
                <span class="admin-icon">⚙️</span>
                <h3>관리자 메뉴</h3>
            </div>
            <button class="sidebar-close" onclick={toggleSidebar}>✕</button>
        </div>

        <nav class="sidebar-nav">
            <div class="nav-section">
                <h4 class="nav-section-title">사용자 관리</h4>
                <button class="nav-item" onclick={() => navigateToAdminPage('/admin/users')}>
                    <span class="nav-icon">👥</span>
                    <span>사용자 목록</span>
                </button>
                <button class="nav-item" onclick={() => navigateToAdminPage('/admin/counselors')}>
                    <span class="nav-icon">👨‍⚕️</span>
                    <span>상담사 관리</span>
                </button>
                <button class="nav-item" onclick={() => navigateToAdminPage('/admin/partners')}>
                    <span class="nav-icon">🤝</span>
                    <span>파트너 관리</span>
                </button>
            </div>

            <div class="nav-section">
                <h4 class="nav-section-title">콘텐츠 관리</h4>
                <button class="nav-item" onclick={() => navigateToAdminPage('/admin/notice')}>
                    <span class="nav-icon">📢</span>
                    <span>공지사항 관리</span>
                </button>
                <button class="nav-item" onclick={() => navigateToAdminPage('/admin/reviews')}>
                    <span class="nav-icon">⭐</span>
                    <span>후기 관리</span>
                </button>
                <button class="nav-item" onclick={() => navigateToAdminPage('/admin/faq')}>
                    <span class="nav-icon">❓</span>
                    <span>FAQ 관리</span>
                </button>
            </div>

            <div class="nav-section">
                <h4 class="nav-section-title">상담 관리</h4>
                <button class="nav-item" onclick={() => navigateToAdminPage('/admin/counseling/sessions')}>
                    <span class="nav-icon">💬</span>
                    <span>상담 세션</span>
                </button>
                <button class="nav-item" onclick={() => navigateToAdminPage('/admin/counseling/schedule')}>
                    <span class="nav-icon">📅</span>
                    <span>상담 일정</span>
                </button>
                <button class="nav-item" onclick={() => navigateToAdminPage('/admin/counseling/reports')}>
                    <span class="nav-icon">📊</span>
                    <span>상담 리포트</span>
                </button>
            </div>

            <div class="nav-section">
                <h4 class="nav-section-title">시스템</h4>
                <button class="nav-item" onclick={() => navigateToAdminPage('/admin/settings')}>
                    <span class="nav-icon">🔧</span>
                    <span>시스템 설정</span>
                </button>
                <button class="nav-item" onclick={() => navigateToAdminPage('/admin/logs')}>
                    <span class="nav-icon">📝</span>
                    <span>시스템 로그</span>
                </button>
                <button class="nav-item" onclick={() => navigateToAdminPage('/admin/statistics')}>
                    <span class="nav-icon">📈</span>
                    <span>통계</span>
                </button>
            </div>
        </nav>
    </div>
{/if}

<style>
    /* 관리자 사이드바 스타일 */
    .admin-sidebar-toggle {
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 1001;
        background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 12px 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 20px rgba(255, 107, 107, 0.3);
        transition: all 0.3s ease;
        font-weight: 600;
        font-size: 14px;
    }

    .admin-sidebar-toggle:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 25px rgba(255, 107, 107, 0.4);
    }

    .admin-sidebar-toggle.active {
        background: linear-gradient(135deg, #ee5a24 0%, #ff6b6b 100%);
    }

    .hamburger-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s ease;
    }

    .hamburger-icon svg {
        transition: all 0.3s ease;
    }

    .hamburger-icon .line {
        transition: all 0.3s ease;
        transform-origin: center;
    }

    /* 활성화 상태 - X 모양으로 변형 */
    .hamburger-icon.active .line-1 {
        transform: rotate(45deg) translate(0, 6px);
    }

    .hamburger-icon.active .line-2 {
        opacity: 0;
    }

    .hamburger-icon.active .line-3 {
        transform: rotate(-45deg) translate(0, -6px);
    }

    .admin-label {
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .sidebar-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1002;
        backdrop-filter: blur(4px);
    }

    .admin-sidebar {
        position: fixed;
        top: 0;
        left: -350px;
        width: 350px;
        height: 100vh;
        background: linear-gradient(180deg, #2d3748 0%, #1a202c 100%);
        z-index: 1003;
        transition: left 0.3s ease;
        overflow-y: auto;
        box-shadow: 4px 0 20px rgba(0, 0, 0, 0.3);
    }

    .admin-sidebar.open {
        left: 0;
    }

    .sidebar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 25px;
        background: rgba(0, 0, 0, 0.2);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .sidebar-title {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .admin-icon {
        font-size: 1.5rem;
    }

    .sidebar-title h3 {
        margin: 0;
        color: white;
        font-size: 1.3rem;
        font-weight: 700;
    }

    .sidebar-close {
        background: transparent;
        border: none;
        color: #cbd5e0;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 5px;
        border-radius: 50%;
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }

    .sidebar-close:hover {
        background: rgba(255, 255, 255, 0.1);
        color: white;
    }

    .sidebar-nav {
        padding: 0;
    }

    .nav-section {
        margin-bottom: 10px;
    }

    .nav-section-title {
        color: #a0aec0;
        font-size: 0.8rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding: 20px 25px 10px 25px;
        margin: 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .nav-item {
        width: 100%;
        background: transparent;
        border: none;
        color: #e2e8f0;
        padding: 15px 25px;
        text-align: left;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 15px;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.3s ease;
        border-left: 3px solid transparent;
    }

    .nav-item:hover {
        background: rgba(255, 255, 255, 0.1);
        border-left-color: #ff6b6b;
        color: white;
        padding-left: 30px;
    }

    .nav-item:active {
        background: rgba(255, 107, 107, 0.2);
    }

    .nav-icon {
        font-size: 1.2rem;
        min-width: 20px;
        text-align: center;
    }

    /* 사이드바 스크롤바 스타일 */
    .admin-sidebar::-webkit-scrollbar {
        width: 6px;
    }

    .admin-sidebar::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
    }

    .admin-sidebar::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
    }

    .admin-sidebar::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.3);
    }

    /* 관리자 사이드바 반응형 */
    @media (max-width: 768px) {
        .admin-sidebar {
            width: 280px;
            left: -280px;
        }

        .admin-sidebar-toggle {
            top: 15px;
            left: 15px;
            padding: 10px 16px;
            font-size: 12px;
        }

        .admin-label {
            display: none;
        }

        .hamburger-icon svg {
            width: 18px;
            height: 18px;
        }

        .sidebar-header {
            padding: 20px;
        }

        .nav-item {
            padding: 12px 20px;
            font-size: 13px;
        }

        .nav-item:hover {
            padding-left: 25px;
        }

        .nav-section-title {
            padding: 15px 20px 8px 20px;
            font-size: 0.75rem;
        }
    }

    @media (max-width: 480px) {
        .admin-sidebar {
            width: 100vw;
            left: -100vw;
        }

        .admin-sidebar-toggle {
            top: 10px;
            left: 10px;
            padding: 8px 12px;
        }
    }
</style>
