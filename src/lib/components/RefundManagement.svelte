<script>
    import { onMount } from 'svelte';
    import ___prj from '$prj/prjMain';
    import ___const from '$prj/lib/i_const';

    // 반품/환불 상태
    const STATUS = {
        REQUESTED: '접수',
        PROCESSING: '처리중',
        APPROVED: '승인',
        REJECTED: '거절',
        COMPLETED: '완료'
    };

    const STATUS_COLORS = {
        REQUESTED: '#ff9800',
        PROCESSING: '#2196f3',
        APPROVED: '#4caf50',
        REJECTED: '#f44336',
        COMPLETED: '#9e9e9e'
    };

    let refunds = $state([]);
    let loading = $state(true);
    let searchTerm = $state('');
    let filterStatus = $state('all');
    let selectedRefund = $state(null);
    let showDetail = $state(false);
    let processingId = $state(null);

    // 페이지네이션
    let currentPage = $state(1);
    let itemsPerPage = $state(10);

    onMount(async () => {
        await loadRefunds();
    });

    async function loadRefunds() {
        loading = true;
        try {
            // API 호출 - 실제 API 엔드포인트에 맞게 수정 필요
            // const response = await ___prj.api.post(___const.API_REFUND, 'get.refunds', {}, null);
            // if (response.data.result === ___const.OK) {
            //     refunds = response.data.content || [];
            // }
            
            // 임시 더미 데이터
            refunds = generateDummyData();
        } catch (error) {
            console.error('반품/환불 데이터 로드 실패:', error);
            alert('데이터를 불러오는데 실패했습니다.');
        } finally {
            loading = false;
        }
    }

    function generateDummyData() {
        const statuses = Object.keys(STATUS);
        return Array.from({ length: 25 }, (_, i) => ({
            id: i + 1,
            orderNo: `ORD${String(i + 1001).padStart(6, '0')}`,
            customerName: `고객${i + 1}`,
            customerPhone: `010-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
            productName: `상품명 ${i + 1}`,
            refundAmount: Math.floor(Math.random() * 100000) + 10000,
            requestDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            reason: ['단순변심', '상품불량', '배송지연', '상품정보 상이'][Math.floor(Math.random() * 4)],
            memo: ''
        }));
    }

    // 필터링된 데이터
    const filteredRefunds = $derived(() => {
        let result = refunds;
        
        if (searchTerm) {
            result = result.filter(r => 
                r.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                r.customerName.includes(searchTerm) ||
                r.customerPhone.includes(searchTerm) ||
                r.productName.includes(searchTerm)
            );
        }

        if (filterStatus !== 'all') {
            result = result.filter(r => r.status === filterStatus);
        }

        return result;
    });

    // 페이지네이션
    const paginatedRefunds = $derived(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredRefunds().slice(start, start + itemsPerPage);
    });

    const totalPages = $derived(Math.ceil(filteredRefunds().length / itemsPerPage));

    async function updateStatus(refundId, newStatus) {
        if (!confirm(`상태를 '${STATUS[newStatus]}'로 변경하시겠습니까?`)) return;

        processingId = refundId;
        try {
            // API 호출
            // await ___prj.api.post(___const.API_REFUND, 'update.status', { refundId, status: newStatus }, null);
            
            // 임시로 로컬 업데이트
            const refund = refunds.find(r => r.id === refundId);
            if (refund) {
                refund.status = newStatus;
            }
            
            alert('상태가 변경되었습니다.');
        } catch (error) {
            console.error('상태 변경 실패:', error);
            alert('상태 변경에 실패했습니다.');
        } finally {
            processingId = null;
        }
    }

    function viewDetail(refund) {
        selectedRefund = refund;
        showDetail = true;
    }

    function closeDetail() {
        showDetail = false;
        selectedRefund = null;
    }

    async function saveMemo(refundId, memo) {
        try {
            // API 호출
            // await ___prj.api.post(___const.API_REFUND, 'update.memo', { refundId, memo }, null);
            
            const refund = refunds.find(r => r.id === refundId);
            if (refund) {
                refund.memo = memo;
            }
            
            alert('메모가 저장되었습니다.');
        } catch (error) {
            console.error('메모 저장 실패:', error);
            alert('메모 저장에 실패했습니다.');
        }
    }

    function formatCurrency(amount) {
        return new Intl.NumberFormat('ko-KR', { 
            style: 'currency', 
            currency: 'KRW' 
        }).format(amount);
    }
</script>

<div class="refund-management">
    <div class="refund-header">
        <h2>반품 및 환불 관리</h2>
        <button class="btn-refresh" onclick={loadRefunds}>
            🔄 새로고침
        </button>
    </div>

    <!-- 필터 영역 -->
    <div class="filter-section">
        <div class="search-box">
            <input 
                type="text" 
                placeholder="주문번호, 고객명, 전화번호, 상품명 검색..." 
                bind:value={searchTerm}
            />
        </div>
        <div class="status-filter">
            <select bind:value={filterStatus}>
                <option value="all">전체 상태</option>
                {#each Object.entries(STATUS) as [key, value]}
                    <option value={key}>{value}</option>
                {/each}
            </select>
        </div>
    </div>

    <!-- 통계 카드 -->
    <div class="stats-cards">
        <div class="stat-card">
            <div class="stat-label">전체</div>
            <div class="stat-value">{refunds.length}</div>
        </div>
        {#each Object.entries(STATUS) as [key, value]}
            <div class="stat-card" style="border-color: {STATUS_COLORS[key]}">
                <div class="stat-label">{value}</div>
                <div class="stat-value" style="color: {STATUS_COLORS[key]}">
                    {refunds.filter(r => r.status === key).length}
                </div>
            </div>
        {/each}
    </div>

    <!-- 테이블 -->
    {#if loading}
        <div class="loading">데이터를 불러오는 중...</div>
    {:else if paginatedRefunds().length === 0}
        <div class="no-data">반품/환불 내역이 없습니다.</div>
    {:else}
        <div class="table-container">
            <table class="refund-table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>주문번호</th>
                        <th>고객명</th>
                        <th>전화번호</th>
                        <th>상품명</th>
                        <th>환불금액</th>
                        <th>신청일</th>
                        <th>사유</th>
                        <th>상태</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {#each paginatedRefunds() as refund (refund.id)}
                        <tr>
                            <td>{refund.id}</td>
                            <td class="order-no">{refund.orderNo}</td>
                            <td>{refund.customerName}</td>
                            <td>{refund.customerPhone}</td>
                            <td class="product-name">{refund.productName}</td>
                            <td class="amount">{formatCurrency(refund.refundAmount)}</td>
                            <td>{refund.requestDate}</td>
                            <td>{refund.reason}</td>
                            <td>
                                <span 
                                    class="status-badge" 
                                    style="background-color: {STATUS_COLORS[refund.status]}"
                                >
                                    {STATUS[refund.status]}
                                </span>
                            </td>
                            <td class="actions">
                                <button 
                                    class="btn-detail"
                                    onclick={() => viewDetail(refund)}
                                >
                                    상세
                                </button>
                                <select 
                                    class="status-select"
                                    value={refund.status}
                                    onchange={(e) => updateStatus(refund.id, e.target.value)}
                                    disabled={processingId === refund.id}
                                >
                                    {#each Object.entries(STATUS) as [key, value]}
                                        <option value={key}>{value}</option>
                                    {/each}
                                </select>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>

        <!-- 페이지네이션 -->
        <div class="pagination">
            <button 
                class="page-btn"
                onclick={() => currentPage = Math.max(1, currentPage - 1)}
                disabled={currentPage === 1}
            >
                이전
            </button>
            <span class="page-info">
                {currentPage} / {totalPages}
            </span>
            <button 
                class="page-btn"
                onclick={() => currentPage = Math.min(totalPages, currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                다음
            </button>
        </div>
    {/if}
</div>

<!-- 상세 모달 -->
{#if showDetail && selectedRefund}
    <div class="modal-overlay" onclick={closeDetail}>
        <div class="modal-content" onclick={(e) => e.stopPropagation()}>
            <div class="modal-header">
                <h3>반품/환불 상세 정보</h3>
                <button class="modal-close" onclick={closeDetail}>✕</button>
            </div>
            <div class="modal-body">
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>주문번호</label>
                        <div>{selectedRefund.orderNo}</div>
                    </div>
                    <div class="detail-item">
                        <label>고객명</label>
                        <div>{selectedRefund.customerName}</div>
                    </div>
                    <div class="detail-item">
                        <label>전화번호</label>
                        <div>{selectedRefund.customerPhone}</div>
                    </div>
                    <div class="detail-item">
                        <label>상품명</label>
                        <div>{selectedRefund.productName}</div>
                    </div>
                    <div class="detail-item">
                        <label>환불금액</label>
                        <div class="amount">{formatCurrency(selectedRefund.refundAmount)}</div>
                    </div>
                    <div class="detail-item">
                        <label>신청일</label>
                        <div>{selectedRefund.requestDate}</div>
                    </div>
                    <div class="detail-item">
                        <label>사유</label>
                        <div>{selectedRefund.reason}</div>
                    </div>
                    <div class="detail-item">
                        <label>상태</label>
                        <div>
                            <span 
                                class="status-badge" 
                                style="background-color: {STATUS_COLORS[selectedRefund.status]}"
                            >
                                {STATUS[selectedRefund.status]}
                            </span>
                        </div>
                    </div>
                    <div class="detail-item full-width">
                        <label>메모</label>
                        <textarea 
                            class="memo-input"
                            bind:value={selectedRefund.memo}
                            placeholder="관리자 메모를 입력하세요..."
                        ></textarea>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button 
                    class="btn-save"
                    onclick={() => saveMemo(selectedRefund.id, selectedRefund.memo)}
                >
                    메모 저장
                </button>
                <button class="btn-cancel" onclick={closeDetail}>닫기</button>
            </div>
        </div>
    </div>
{/if}

<style>
    .refund-management {
        padding: 20px;
        max-width: 1400px;
        margin: 0 auto;
    }

    .refund-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
    }

    .refund-header h2 {
        font-size: 1.8rem;
        font-weight: 700;
        color: #333;
        margin: 0;
    }

    .btn-refresh {
        background: #4caf50;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .btn-refresh:hover {
        background: #45a049;
        transform: translateY(-2px);
    }

    .filter-section {
        display: flex;
        gap: 15px;
        margin-bottom: 25px;
    }

    .search-box {
        flex: 1;
    }

    .search-box input {
        width: 100%;
        padding: 12px 18px;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 14px;
        transition: border-color 0.3s ease;
    }

    .search-box input:focus {
        outline: none;
        border-color: #2196f3;
    }

    .status-filter select {
        padding: 12px 18px;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 14px;
        background: white;
        cursor: pointer;
        min-width: 150px;
    }

    .stats-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 15px;
        margin-bottom: 25px;
    }

    .stat-card {
        background: white;
        padding: 20px;
        border-radius: 10px;
        border-left: 4px solid #2196f3;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        text-align: center;
    }

    .stat-label {
        font-size: 0.9rem;
        color: #666;
        margin-bottom: 8px;
    }

    .stat-value {
        font-size: 1.8rem;
        font-weight: 700;
        color: #333;
    }

    .loading, .no-data {
        text-align: center;
        padding: 60px 20px;
        font-size: 1.1rem;
        color: #666;
        background: white;
        border-radius: 10px;
    }

    .table-container {
        background: white;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        overflow-x: auto;
    }

    .refund-table {
        width: 100%;
        border-collapse: collapse;
    }

    .refund-table thead {
        background: #f5f5f5;
    }

    .refund-table th {
        padding: 15px 10px;
        text-align: left;
        font-weight: 600;
        color: #333;
        font-size: 0.9rem;
        white-space: nowrap;
    }

    .refund-table td {
        padding: 15px 10px;
        border-top: 1px solid #e0e0e0;
        font-size: 0.9rem;
    }

    .order-no {
        font-weight: 600;
        color: #2196f3;
    }

    .product-name {
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .amount {
        font-weight: 600;
        color: #f44336;
    }

    .status-badge {
        display: inline-block;
        padding: 5px 12px;
        border-radius: 20px;
        color: white;
        font-size: 0.85rem;
        font-weight: 600;
        white-space: nowrap;
    }

    .actions {
        display: flex;
        gap: 8px;
        align-items: center;
    }

    .btn-detail {
        padding: 6px 12px;
        background: #2196f3;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.85rem;
        white-space: nowrap;
        transition: background 0.3s ease;
    }

    .btn-detail:hover {
        background: #1976d2;
    }

    .status-select {
        padding: 6px 10px;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        font-size: 0.85rem;
        cursor: pointer;
        background: white;
    }

    .status-select:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        margin-top: 25px;
    }

    .page-btn {
        padding: 10px 20px;
        background: white;
        border: 2px solid #e0e0e0;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .page-btn:hover:not(:disabled) {
        background: #f5f5f5;
        border-color: #2196f3;
    }

    .page-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .page-info {
        font-weight: 600;
        color: #333;
    }

    /* 모달 */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        backdrop-filter: blur(4px);
    }

    .modal-content {
        background: white;
        border-radius: 12px;
        width: 90%;
        max-width: 700px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 25px;
        border-bottom: 1px solid #e0e0e0;
    }

    .modal-header h3 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 700;
        color: #333;
    }

    .modal-close {
        background: transparent;
        border: none;
        font-size: 1.5rem;
        color: #666;
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

    .modal-close:hover {
        background: #f5f5f5;
        color: #333;
    }

    .modal-body {
        padding: 25px;
    }

    .detail-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }

    .detail-item {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .detail-item.full-width {
        grid-column: 1 / -1;
    }

    .detail-item label {
        font-size: 0.9rem;
        font-weight: 600;
        color: #666;
    }

    .detail-item > div {
        font-size: 1rem;
        color: #333;
    }

    .memo-input {
        width: 100%;
        min-height: 100px;
        padding: 12px;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 0.95rem;
        resize: vertical;
        font-family: inherit;
    }

    .memo-input:focus {
        outline: none;
        border-color: #2196f3;
    }

    .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        padding: 20px 25px;
        border-top: 1px solid #e0e0e0;
    }

    .btn-save {
        padding: 10px 24px;
        background: #4caf50;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .btn-save:hover {
        background: #45a049;
        transform: translateY(-2px);
    }

    .btn-cancel {
        padding: 10px 24px;
        background: #9e9e9e;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .btn-cancel:hover {
        background: #757575;
    }

    /* 반응형 */
    @media (max-width: 768px) {
        .refund-management {
            padding: 15px;
        }

        .refund-header h2 {
            font-size: 1.4rem;
        }

        .filter-section {
            flex-direction: column;
        }

        .stats-cards {
            grid-template-columns: repeat(2, 1fr);
        }

        .table-container {
            overflow-x: scroll;
        }

        .refund-table {
            min-width: 1000px;
        }

        .detail-grid {
            grid-template-columns: 1fr;
        }

        .modal-content {
            width: 95%;
        }
    }
</style>

