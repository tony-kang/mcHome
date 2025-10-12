<script>
    import { onMount } from 'svelte';
    import RefundManagement from '$lib/components/RefundManagement.svelte';
    import AddressBook from '$lib/components/AddressBook.svelte';
    import SmsManager from '$lib/components/SmsManager.svelte';
    import ___prj from '$prj/prjMain';

    // 탭 상태
    let activeTab = $state('refund');
    
    // 주소록에서 선택된 연락처 ID들
    let selectedContactIds = $state([]);

    // 관리자 권한 체크
    let isAuthorized = $state(false);
    let loading = $state(true);

    onMount(async () => {
        await checkAuth();
    });

    async function checkAuth() {
        loading = true;
        try {
            // 관리자 권한 체크 로직
            // const userInfo = ___prj.getUserInfo();
            // if (!userInfo || userInfo.role !== 'admin') {
            //     alert('접근 권한이 없습니다.');
            //     window.location.href = '/';
            //     return;
            // }
            
            // 임시로 권한 허용
            isAuthorized = true;
        } catch (error) {
            console.error('권한 체크 실패:', error);
            alert('권한 확인에 실패했습니다.');
        } finally {
            loading = false;
        }
    }

    function switchTab(tab) {
        activeTab = tab;
    }

    // 주소록에서 문자 보내기로 이동하는 핸들러
    function handleSendSmsFromAddressBook(contactIds) {
        selectedContactIds = contactIds;
        activeTab = 'sms';
    }
</script>

<svelte:head>
    <title>벤티굿즈 관리자 - 쇼핑몰 관리</title>
</svelte:head>

{#if loading}
    <div class="loading-screen">
        <div class="spinner"></div>
        <p>로딩 중...</p>
    </div>
{:else if !isAuthorized}
    <div class="unauthorized">
        <div class="unauthorized-content">
            <h1>⚠️ 접근 권한 없음</h1>
            <p>이 페이지에 접근할 권한이 없습니다.</p>
            <a href="/" class="btn-home">홈으로 돌아가기</a>
        </div>
    </div>
{:else}
    <div class="ventigoods-admin">
        <!-- 헤더 -->
        <header class="admin-header">
            <div class="admin-header-content">
                <div class="header-left">
                    <h1>🛍️ 벤티굿즈 관리자</h1>
                    <p class="subtitle">쇼핑몰 운영 관리 시스템</p>
                </div>
                <div class="header-right">
                    <a href="/ventigoods" class="btn-shop">
                        🏪 쇼핑몰 바로가기
                    </a>
                </div>
            </div>
        </header>

        <!-- 탭 네비게이션 -->
        <nav class="tab-navigation">
            <button 
                class="tab-btn"
                class:active={activeTab === 'refund'}
                onclick={() => switchTab('refund')}
            >
                <span class="tab-icon">📦</span>
                <span class="tab-label">반품/환불 관리</span>
            </button>
            <button 
                class="tab-btn"
                class:active={activeTab === 'addressbook'}
                onclick={() => switchTab('addressbook')}
            >
                <span class="tab-icon">📇</span>
                <span class="tab-label">주소록 관리</span>
            </button>
            <button 
                class="tab-btn"
                class:active={activeTab === 'sms'}
                onclick={() => switchTab('sms')}
            >
                <span class="tab-icon">💬</span>
                <span class="tab-label">문자 발송</span>
            </button>
        </nav>

        <!-- 콘텐츠 영역 -->
        <main class="admin-content">
            {#if activeTab === 'refund'}
                <div class="tab-panel" class:active={activeTab === 'refund'}>
                    <RefundManagement />
                </div>
            {:else if activeTab === 'addressbook'}
                <div class="tab-panel" class:active={activeTab === 'addressbook'}>
                    <AddressBook />
                </div>
            {:else if activeTab === 'sms'}
                <div class="tab-panel" class:active={activeTab === 'sms'}>
                    <SmsManager {selectedContactIds} />
                </div>
            {/if}
        </main>

        <!-- 푸터 -->
        <footer class="admin-footer">
            <p>&copy; 2024 벤티굿즈. All rights reserved.</p>
            <p class="footer-info">관리자 전용 페이지 | 문의: admin@ventigoods.com</p>
        </footer>
    </div>
{/if}

<style>
    /* 로딩 화면 */
    .loading-screen {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }

    .spinner {
        width: 50px;
        height: 50px;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    .loading-screen p {
        margin-top: 20px;
        font-size: 1.2rem;
        font-weight: 600;
    }

    /* 권한 없음 화면 */
    .unauthorized {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }

    .unauthorized-content {
        text-align: center;
        background: white;
        padding: 60px 40px;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .unauthorized-content h1 {
        font-size: 2.5rem;
        margin-bottom: 20px;
        color: #333;
    }

    .unauthorized-content p {
        font-size: 1.2rem;
        color: #666;
        margin-bottom: 30px;
    }

    .btn-home {
        display: inline-block;
        padding: 14px 32px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .btn-home:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
    }

    /* 메인 레이아웃 */
    .ventigoods-admin {
        min-height: 100vh;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }

    /* 헤더 */
    .admin-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 30px 0;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .admin-header-content {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header-left h1 {
        font-size: 2rem;
        font-weight: 700;
        margin: 0 0 8px 0;
    }

    .subtitle {
        font-size: 1rem;
        opacity: 0.9;
        margin: 0;
    }

    .btn-shop {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 24px;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 600;
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255, 255, 255, 0.3);
        transition: all 0.3s ease;
    }

    .btn-shop:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }

    /* 탭 네비게이션 */
    .tab-navigation {
        background: white;
        display: flex;
        max-width: 1400px;
        margin: 0 auto;
        padding: 0;
        border-radius: 0;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        position: sticky;
        top: 0;
        z-index: 100;
    }

    .tab-btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 20px;
        background: transparent;
        border: none;
        border-bottom: 3px solid transparent;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        color: #666;
        transition: all 0.3s ease;
    }

    .tab-btn:hover {
        background: #f5f5f5;
        color: #333;
    }

    .tab-btn.active {
        color: #667eea;
        border-bottom-color: #667eea;
        background: #f5f7ff;
    }

    .tab-icon {
        font-size: 1.5rem;
    }

    .tab-label {
        font-size: 1rem;
    }

    /* 콘텐츠 */
    .admin-content {
        max-width: 1400px;
        margin: 0 auto;
        padding: 30px 20px;
        min-height: calc(100vh - 300px);
    }

    .tab-panel {
        display: none;
        animation: fadeIn 0.3s ease;
    }

    .tab-panel.active {
        display: block;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* 푸터 */
    .admin-footer {
        background: #2d3748;
        color: #cbd5e0;
        text-align: center;
        padding: 30px 20px;
        margin-top: 50px;
    }

    .admin-footer p {
        margin: 5px 0;
        font-size: 0.9rem;
    }

    .footer-info {
        opacity: 0.7;
    }

    /* 반응형 */
    @media (max-width: 768px) {
        .admin-header {
            padding: 20px 0;
        }

        .admin-header-content {
            flex-direction: column;
            gap: 15px;
            text-align: center;
        }

        .header-left h1 {
            font-size: 1.5rem;
        }

        .subtitle {
            font-size: 0.9rem;
        }

        .tab-navigation {
            flex-direction: column;
            position: static;
        }

        .tab-btn {
            padding: 15px;
            border-bottom: 1px solid #e0e0e0;
        }

        .tab-btn.active {
            border-bottom-color: #667eea;
            border-left: 4px solid #667eea;
        }

        .tab-icon {
            font-size: 1.3rem;
        }

        .tab-label {
            font-size: 0.95rem;
        }

        .admin-content {
            padding: 20px 10px;
        }

        .admin-footer {
            padding: 20px;
        }
    }

    @media (max-width: 480px) {
        .header-left h1 {
            font-size: 1.3rem;
        }

        .btn-shop {
            padding: 10px 18px;
            font-size: 0.9rem;
        }
    }
</style>

