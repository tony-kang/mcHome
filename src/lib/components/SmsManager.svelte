<script>
    import { onMount } from 'svelte';
    import ___prj from '$prj/prjMain';
    import ___const from '$prj/lib/i_const';

    // Props
    let { selectedContactIds = [] } = $props();

    // 문자 발송 상태
    const SMS_STATUS = {
        PENDING: '대기',
        SENDING: '발송중',
        SUCCESS: '성공',
        FAILED: '실패'
    };

    const STATUS_COLORS = {
        PENDING: '#ff9800',
        SENDING: '#2196f3',
        SUCCESS: '#4caf50',
        FAILED: '#f44336'
    };

    // 메시지 템플릿
    const MESSAGE_TEMPLATES = [
        { id: 1, name: '주문 확인', content: '[{상점명}] 주문이 접수되었습니다. 주문번호: {주문번호}' },
        { id: 2, name: '배송 시작', content: '[{상점명}] 상품이 발송되었습니다. 송장번호: {송장번호}' },
        { id: 3, name: '배송 완료', content: '[{상점명}] 상품이 배송 완료되었습니다. 감사합니다!' },
        { id: 4, name: '이벤트 안내', content: '[{상점명}] 특별 이벤트 진행중! 자세한 내용은 홈페이지를 확인해주세요.' },
        { id: 5, name: '할인 쿠폰', content: '[{상점명}] 고객님께 특별 할인 쿠폰을 드립니다. 쿠폰코드: {쿠폰코드}' }
    ];

    let smsHistory = $state([]);
    let loading = $state(true);
    let sending = $state(false);
    
    // 새 메시지 폼
    let newMessage = $state({
        recipients: [],
        message: '',
        scheduledDate: '',
        scheduledTime: '',
        useTemplate: false,
        selectedTemplate: null
    });

    // 페이지네이션
    let currentPage = $state(1);
    let itemsPerPage = $state(10);

    // 검색 및 필터
    let searchTerm = $state('');
    let filterStatus = $state('all');

    // 글자 수 계산
    const messageLength = $derived(newMessage.message.length);
    const messageCount = $derived(Math.ceil(messageLength / 90) || 1);
    const byteLength = $derived(new Blob([newMessage.message]).size);

    onMount(async () => {
        await loadSmsHistory();
        
        // selectedContactIds가 있으면 자동으로 수신자에 추가
        if (selectedContactIds.length > 0) {
            await loadSelectedContacts();
        }
    });

    async function loadSmsHistory() {
        loading = true;
        try {
            // API 호출
            // const response = await ___prj.api.post(___const.API_SMS, 'get.history', {}, null);
            // if (response.data.result === ___const.OK) {
            //     smsHistory = response.data.content || [];
            // }
            
            // 임시 더미 데이터
            smsHistory = generateDummyHistory();
        } catch (error) {
            console.error('문자 발송 내역 로드 실패:', error);
            alert('데이터를 불러오는데 실패했습니다.');
        } finally {
            loading = false;
        }
    }

    function generateDummyHistory() {
        const statuses = Object.keys(SMS_STATUS);
        return Array.from({ length: 30 }, (_, i) => ({
            id: i + 1,
            recipients: Math.floor(Math.random() * 50) + 1,
            message: `문자 메시지 내용 ${i + 1}`,
            sentDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            sentTime: `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            successCount: 0,
            failedCount: 0,
            cost: Math.floor(Math.random() * 5000) + 500
        })).map(item => {
            if (item.status === 'SUCCESS') {
                item.successCount = item.recipients;
                item.failedCount = 0;
            } else if (item.status === 'FAILED') {
                item.successCount = 0;
                item.failedCount = item.recipients;
            } else if (item.status === 'SENDING') {
                const sent = Math.floor(Math.random() * item.recipients);
                item.successCount = sent;
                item.failedCount = 0;
            }
            return item;
        });
    }

    async function loadSelectedContacts() {
        // selectedContactIds로부터 연락처 정보 로드
        // const response = await ___prj.api.post(___const.API_ADDRESSBOOK, 'get.contacts.by.ids', { ids: selectedContactIds }, null);
        // newMessage.recipients = response.data.content || [];
        
        // 임시 데이터
        newMessage.recipients = selectedContactIds.map(id => ({
            id,
            name: `고객${id}`,
            phone: `010-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
        }));
    }

    function applyTemplate(templateId) {
        const template = MESSAGE_TEMPLATES.find(t => t.id === templateId);
        if (template) {
            newMessage.message = template.content;
            newMessage.selectedTemplate = templateId;
        }
    }

    function addRecipient(phone) {
        if (!phone) return;
        
        // 전화번호 형식 검증
        const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
        if (!phoneRegex.test(phone.replace(/-/g, ''))) {
            alert('올바른 전화번호 형식이 아닙니다.');
            return;
        }

        const exists = newMessage.recipients.find(r => r.phone === phone);
        if (!exists) {
            newMessage.recipients = [...newMessage.recipients, {
                id: Date.now(),
                name: '직접입력',
                phone: formatPhoneNumber(phone)
            }];
        }
    }

    function removeRecipient(recipientId) {
        newMessage.recipients = newMessage.recipients.filter(r => r.id !== recipientId);
    }

    async function sendSms() {
        if (newMessage.recipients.length === 0) {
            alert('수신자를 추가해주세요.');
            return;
        }

        if (!newMessage.message.trim()) {
            alert('메시지 내용을 입력해주세요.');
            return;
        }

        if (!confirm(`${newMessage.recipients.length}명에게 문자를 발송하시겠습니까?\n예상 비용: ${messageCount * newMessage.recipients.length * 15}원`)) {
            return;
        }

        sending = true;
        try {
            // API 호출
            // const response = await ___prj.api.post(___const.API_SMS, 'send', {
            //     recipients: newMessage.recipients.map(r => r.phone),
            //     message: newMessage.message,
            //     scheduledDate: newMessage.scheduledDate,
            //     scheduledTime: newMessage.scheduledTime
            // }, null);

            // if (response.data.result === ___const.OK) {
            //     alert('문자 발송이 완료되었습니다.');
            //     resetForm();
            //     await loadSmsHistory();
            // }

            // 임시 처리
            await new Promise(resolve => setTimeout(resolve, 1500));
            alert('문자 발송이 완료되었습니다.');
            resetForm();
            await loadSmsHistory();
        } catch (error) {
            console.error('문자 발송 실패:', error);
            alert('문자 발송에 실패했습니다.');
        } finally {
            sending = false;
        }
    }

    function resetForm() {
        newMessage = {
            recipients: [],
            message: '',
            scheduledDate: '',
            scheduledTime: '',
            useTemplate: false,
            selectedTemplate: null
        };
    }

    function formatPhoneNumber(phone) {
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 11) {
            return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        } else if (cleaned.length === 10) {
            return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        }
        return phone;
    }

    function formatCurrency(amount) {
        return new Intl.NumberFormat('ko-KR').format(amount);
    }

    // 필터링된 내역
    const filteredHistory = $derived(() => {
        let result = smsHistory;
        
        if (searchTerm) {
            result = result.filter(h => h.message.includes(searchTerm));
        }

        if (filterStatus !== 'all') {
            result = result.filter(h => h.status === filterStatus);
        }

        return result.sort((a, b) => {
            const dateA = new Date(`${a.sentDate} ${a.sentTime}`);
            const dateB = new Date(`${b.sentDate} ${b.sentTime}`);
            return dateB - dateA;
        });
    });

    // 페이지네이션
    const paginatedHistory = $derived(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredHistory().slice(start, start + itemsPerPage);
    });

    const totalPages = $derived(Math.ceil(filteredHistory().length / itemsPerPage));

    // 통계
    const stats = $derived(() => {
        const total = smsHistory.length;
        const success = smsHistory.filter(h => h.status === 'SUCCESS').length;
        const failed = smsHistory.filter(h => h.status === 'FAILED').length;
        const totalCost = smsHistory.reduce((sum, h) => sum + h.cost, 0);
        const totalRecipients = smsHistory.reduce((sum, h) => sum + h.recipients, 0);

        return { total, success, failed, totalCost, totalRecipients };
    });
</script>

<div class="sms-manager">
    <div class="sms-header">
        <h2>문자 발송 관리</h2>
    </div>

    <!-- 통계 카드 -->
    <div class="stats-cards">
        <div class="stat-card">
            <div class="stat-icon">📊</div>
            <div class="stat-info">
                <div class="stat-label">총 발송 건수</div>
                <div class="stat-value">{stats().total}건</div>
            </div>
        </div>
        <div class="stat-card success">
            <div class="stat-icon">✅</div>
            <div class="stat-info">
                <div class="stat-label">성공</div>
                <div class="stat-value">{stats().success}건</div>
            </div>
        </div>
        <div class="stat-card failed">
            <div class="stat-icon">❌</div>
            <div class="stat-info">
                <div class="stat-label">실패</div>
                <div class="stat-value">{stats().failed}건</div>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-info">
                <div class="stat-label">총 수신자</div>
                <div class="stat-value">{formatCurrency(stats().totalRecipients)}명</div>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">💰</div>
            <div class="stat-info">
                <div class="stat-label">총 비용</div>
                <div class="stat-value">{formatCurrency(stats().totalCost)}원</div>
            </div>
        </div>
    </div>

    <!-- 문자 발송 폼 -->
    <div class="sms-form-section">
        <h3>새 문자 발송</h3>
        
        <!-- 수신자 관리 -->
        <div class="form-group">
            <label>수신자 ({newMessage.recipients.length}명)</label>
            <div class="recipients-list">
                {#each newMessage.recipients as recipient (recipient.id)}
                    <div class="recipient-chip">
                        <span>{recipient.name}</span>
                        <span class="recipient-phone">{recipient.phone}</span>
                        <button 
                            class="remove-recipient"
                            onclick={() => removeRecipient(recipient.id)}
                        >
                            ✕
                        </button>
                    </div>
                {/each}
            </div>
        </div>

        <!-- 템플릿 선택 -->
        <div class="form-group">
            <label>메시지 템플릿</label>
            <select 
                bind:value={newMessage.selectedTemplate}
                onchange={(e) => applyTemplate(Number(e.target.value))}
            >
                <option value={null}>템플릿 선택</option>
                {#each MESSAGE_TEMPLATES as template}
                    <option value={template.id}>{template.name}</option>
                {/each}
            </select>
        </div>

        <!-- 메시지 입력 -->
        <div class="form-group">
            <label>메시지 내용</label>
            <textarea 
                bind:value={newMessage.message}
                placeholder="메시지를 입력하세요..."
                rows="6"
            ></textarea>
            <div class="message-info">
                <span>글자수: {messageLength}자 / 바이트: {byteLength}byte</span>
                <span>예상 메시지 수: {messageCount}건</span>
                <span class="cost">예상 비용: {formatCurrency(messageCount * newMessage.recipients.length * 15)}원</span>
            </div>
        </div>

        <!-- 예약 발송 -->
        <div class="form-group">
            <label>
                <input 
                    type="checkbox" 
                    bind:checked={newMessage.useSchedule}
                />
                예약 발송
            </label>
            {#if newMessage.useSchedule}
                <div class="schedule-inputs">
                    <input 
                        type="date" 
                        bind:value={newMessage.scheduledDate}
                        min={new Date().toISOString().split('T')[0]}
                    />
                    <input 
                        type="time" 
                        bind:value={newMessage.scheduledTime}
                    />
                </div>
            {/if}
        </div>

        <!-- 발송 버튼 -->
        <div class="form-actions">
            <button 
                class="btn-send"
                onclick={sendSms}
                disabled={sending || newMessage.recipients.length === 0 || !newMessage.message.trim()}
            >
                {sending ? '발송 중...' : '문자 발송'}
            </button>
            <button 
                class="btn-reset"
                onclick={resetForm}
                disabled={sending}
            >
                초기화
            </button>
        </div>
    </div>

    <!-- 발송 내역 -->
    <div class="sms-history-section">
        <h3>발송 내역</h3>
        
        <!-- 검색 및 필터 -->
        <div class="filter-section">
            <div class="search-box">
                <input 
                    type="text" 
                    placeholder="메시지 내용 검색..." 
                    bind:value={searchTerm}
                />
            </div>
            <div class="status-filter">
                <select bind:value={filterStatus}>
                    <option value="all">전체 상태</option>
                    {#each Object.entries(SMS_STATUS) as [key, value]}
                        <option value={key}>{value}</option>
                    {/each}
                </select>
            </div>
        </div>

        <!-- 내역 테이블 -->
        {#if loading}
            <div class="loading">데이터를 불러오는 중...</div>
        {:else if paginatedHistory().length === 0}
            <div class="no-data">발송 내역이 없습니다.</div>
        {:else}
            <div class="table-container">
                <table class="history-table">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>발송일시</th>
                            <th>수신자수</th>
                            <th>메시지 내용</th>
                            <th>성공/실패</th>
                            <th>비용</th>
                            <th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each paginatedHistory() as history (history.id)}
                            <tr>
                                <td>{history.id}</td>
                                <td>{history.sentDate} {history.sentTime}</td>
                                <td>{history.recipients}명</td>
                                <td class="message-content">{history.message}</td>
                                <td>
                                    <span class="success-count">{history.successCount}</span> / 
                                    <span class="failed-count">{history.failedCount}</span>
                                </td>
                                <td class="cost">{formatCurrency(history.cost)}원</td>
                                <td>
                                    <span 
                                        class="status-badge" 
                                        style="background-color: {STATUS_COLORS[history.status]}"
                                    >
                                        {SMS_STATUS[history.status]}
                                    </span>
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
</div>

<style>
    .sms-manager {
        padding: 20px;
        max-width: 1400px;
        margin: 0 auto;
    }

    .sms-header {
        margin-bottom: 25px;
    }

    .sms-header h2 {
        font-size: 1.8rem;
        font-weight: 700;
        color: #333;
        margin: 0;
    }

    .stats-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        margin-bottom: 30px;
    }

    .stat-card {
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 15px;
        border-left: 4px solid #2196f3;
    }

    .stat-card.success {
        border-left-color: #4caf50;
    }

    .stat-card.failed {
        border-left-color: #f44336;
    }

    .stat-icon {
        font-size: 2rem;
    }

    .stat-info {
        flex: 1;
    }

    .stat-label {
        font-size: 0.9rem;
        color: #666;
        margin-bottom: 5px;
    }

    .stat-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: #333;
    }

    .sms-form-section, .sms-history-section {
        background: white;
        padding: 25px;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        margin-bottom: 25px;
    }

    h3 {
        font-size: 1.3rem;
        font-weight: 700;
        color: #333;
        margin: 0 0 20px 0;
    }

    .form-group {
        margin-bottom: 20px;
    }

    .form-group label {
        display: block;
        font-weight: 600;
        color: #333;
        margin-bottom: 10px;
        font-size: 0.95rem;
    }

    .form-group input[type="text"],
    .form-group input[type="date"],
    .form-group input[type="time"],
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 12px;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 0.95rem;
        transition: border-color 0.3s ease;
        font-family: inherit;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: #2196f3;
    }

    .form-group textarea {
        resize: vertical;
    }

    .recipients-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        min-height: 50px;
        padding: 10px;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        background: #f9f9f9;
    }

    .recipient-chip {
        display: flex;
        align-items: center;
        gap: 8px;
        background: white;
        padding: 8px 12px;
        border-radius: 20px;
        border: 1px solid #e0e0e0;
        font-size: 0.9rem;
    }

    .recipient-phone {
        color: #666;
        font-family: 'Courier New', monospace;
    }

    .remove-recipient {
        background: transparent;
        border: none;
        color: #f44336;
        cursor: pointer;
        font-size: 1.1rem;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.3s ease;
    }

    .remove-recipient:hover {
        background: #ffebee;
    }

    .message-info {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;
        padding-top: 8px;
        border-top: 1px solid #e0e0e0;
        font-size: 0.85rem;
        color: #666;
    }

    .message-info .cost {
        color: #f44336;
        font-weight: 600;
    }

    .schedule-inputs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-top: 10px;
    }

    .form-actions {
        display: flex;
        gap: 10px;
        margin-top: 25px;
    }

    .btn-send {
        flex: 1;
        padding: 14px 24px;
        background: linear-gradient(135deg, #ff9800 0%, #ff5722 100%);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        font-size: 1rem;
        transition: all 0.3s ease;
    }

    .btn-send:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(255, 152, 0, 0.4);
    }

    .btn-send:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .btn-reset {
        padding: 14px 24px;
        background: #9e9e9e;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .btn-reset:hover:not(:disabled) {
        background: #757575;
    }

    .filter-section {
        display: flex;
        gap: 15px;
        margin-bottom: 20px;
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

    .loading, .no-data {
        text-align: center;
        padding: 40px 20px;
        font-size: 1.1rem;
        color: #666;
    }

    .table-container {
        overflow-x: auto;
    }

    .history-table {
        width: 100%;
        border-collapse: collapse;
    }

    .history-table thead {
        background: #f5f5f5;
    }

    .history-table th {
        padding: 15px 10px;
        text-align: left;
        font-weight: 600;
        color: #333;
        font-size: 0.9rem;
        white-space: nowrap;
    }

    .history-table td {
        padding: 15px 10px;
        border-top: 1px solid #e0e0e0;
        font-size: 0.9rem;
    }

    .message-content {
        max-width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .success-count {
        color: #4caf50;
        font-weight: 600;
    }

    .failed-count {
        color: #f44336;
        font-weight: 600;
    }

    .cost {
        color: #f44336;
        font-weight: 600;
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

    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        margin-top: 20px;
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

    /* 반응형 */
    @media (max-width: 768px) {
        .sms-manager {
            padding: 15px;
        }

        .sms-header h2 {
            font-size: 1.4rem;
        }

        .stats-cards {
            grid-template-columns: repeat(2, 1fr);
        }

        .sms-form-section, .sms-history-section {
            padding: 20px;
        }

        .form-actions {
            flex-direction: column;
        }

        .filter-section {
            flex-direction: column;
        }

        .table-container {
            overflow-x: scroll;
        }

        .history-table {
            min-width: 900px;
        }

        .schedule-inputs {
            grid-template-columns: 1fr;
        }
    }
</style>

