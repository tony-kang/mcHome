<script>
    import { onMount } from 'svelte';
    import ___prj from '$prj/prjMain';
    import ___const from '$prj/lib/i_const';

    let contacts = $state([]);
    let loading = $state(true);
    let searchTerm = $state('');
    let showAddModal = $state(false);
    let showEditModal = $state(false);
    let selectedContact = $state(null);
    let selectedContacts = $state([]);

    // 신규 연락처 폼
    let newContact = $state({
        name: '',
        phone: '',
        memo: '',
        tags: ''
    });

    // 페이지네이션
    let currentPage = $state(1);
    let itemsPerPage = $state(15);

    onMount(async () => {
        await loadContacts();
    });

    async function loadContacts() {
        loading = true;
        try {
            // API 호출 - 실제 API 엔드포인트에 맞게 수정 필요
            // const response = await ___prj.api.post(___const.API_ADDRESSBOOK, 'get.contacts', {}, null);
            // if (response.data.result === ___const.OK) {
            //     contacts = response.data.content || [];
            // }
            
            // 임시 더미 데이터
            contacts = generateDummyData();
        } catch (error) {
            console.error('주소록 데이터 로드 실패:', error);
            alert('데이터를 불러오는데 실패했습니다.');
        } finally {
            loading = false;
        }
    }

    function generateDummyData() {
        const memoTemplates = [
            'VIP 고객',
            '단골 고객',
            '신규 고객',
            '재구매 의향 있음',
            '이벤트 참여 고객',
            ''
        ];
        
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `고객${i + 1}`,
            phone: `010-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
            memo: memoTemplates[Math.floor(Math.random() * memoTemplates.length)],
            tags: ['VIP', '일반', '신규'][Math.floor(Math.random() * 3)],
            createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            lastContactDate: Math.random() > 0.5 ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : null
        }));
    }

    // 필터링된 연락처
    const filteredContacts = $derived(() => {
        let result = contacts;
        
        if (searchTerm) {
            result = result.filter(c => 
                c.name.includes(searchTerm) ||
                c.phone.includes(searchTerm) ||
                c.memo.includes(searchTerm) ||
                c.tags.includes(searchTerm)
            );
        }

        return result.sort((a, b) => b.id - a.id);
    });

    // 페이지네이션
    const paginatedContacts = $derived(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredContacts().slice(start, start + itemsPerPage);
    });

    const totalPages = $derived(Math.ceil(filteredContacts().length / itemsPerPage));

    function openAddModal() {
        newContact = { name: '', phone: '', memo: '', tags: '' };
        showAddModal = true;
    }

    function closeAddModal() {
        showAddModal = false;
        newContact = { name: '', phone: '', memo: '', tags: '' };
    }

    function openEditModal(contact) {
        selectedContact = { ...contact };
        showEditModal = true;
    }

    function closeEditModal() {
        showEditModal = false;
        selectedContact = null;
    }

    async function addContact() {
        if (!newContact.name || !newContact.phone) {
            alert('이름과 전화번호는 필수입니다.');
            return;
        }

        // 전화번호 형식 검증
        const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
        if (!phoneRegex.test(newContact.phone.replace(/-/g, ''))) {
            alert('올바른 전화번호 형식이 아닙니다.');
            return;
        }

        try {
            // API 호출
            // const response = await ___prj.api.post(___const.API_ADDRESSBOOK, 'add.contact', newContact, null);
            // if (response.data.result === ___const.OK) {
            //     await loadContacts();
            // }
            
            // 임시로 로컬 추가
            const newId = Math.max(...contacts.map(c => c.id), 0) + 1;
            contacts = [{
                id: newId,
                ...newContact,
                createdAt: new Date().toISOString().split('T')[0],
                lastContactDate: null
            }, ...contacts];
            
            alert('연락처가 추가되었습니다.');
            closeAddModal();
        } catch (error) {
            console.error('연락처 추가 실패:', error);
            alert('연락처 추가에 실패했습니다.');
        }
    }

    async function updateContact() {
        if (!selectedContact.name || !selectedContact.phone) {
            alert('이름과 전화번호는 필수입니다.');
            return;
        }

        try {
            // API 호출
            // await ___prj.api.post(___const.API_ADDRESSBOOK, 'update.contact', selectedContact, null);
            
            // 임시로 로컬 업데이트
            const index = contacts.findIndex(c => c.id === selectedContact.id);
            if (index !== -1) {
                contacts[index] = { ...selectedContact };
            }
            
            alert('연락처가 수정되었습니다.');
            closeEditModal();
        } catch (error) {
            console.error('연락처 수정 실패:', error);
            alert('연락처 수정에 실패했습니다.');
        }
    }

    async function deleteContact(contactId) {
        if (!confirm('이 연락처를 삭제하시겠습니까?')) return;

        try {
            // API 호출
            // await ___prj.api.post(___const.API_ADDRESSBOOK, 'delete.contact', { contactId }, null);
            
            // 임시로 로컬 삭제
            contacts = contacts.filter(c => c.id !== contactId);
            
            alert('연락처가 삭제되었습니다.');
        } catch (error) {
            console.error('연락처 삭제 실패:', error);
            alert('연락처 삭제에 실패했습니다.');
        }
    }

    function toggleSelectContact(contactId) {
        const index = selectedContacts.indexOf(contactId);
        if (index === -1) {
            selectedContacts = [...selectedContacts, contactId];
        } else {
            selectedContacts = selectedContacts.filter(id => id !== contactId);
        }
    }

    function toggleSelectAll() {
        if (selectedContacts.length === paginatedContacts().length) {
            selectedContacts = [];
        } else {
            selectedContacts = paginatedContacts().map(c => c.id);
        }
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

    async function exportToExcel() {
        // 엑셀 내보내기 기능 구현
        alert('엑셀 내보내기 기능은 준비 중입니다.');
    }
</script>

<div class="addressbook">
    <div class="addressbook-header">
        <div>
            <h2>주소록 관리</h2>
            <p class="subtitle">총 {contacts.length}명의 연락처</p>
        </div>
        <div class="header-actions">
            <button class="btn-export" onclick={exportToExcel}>
                📊 엑셀 내보내기
            </button>
            <button class="btn-add" onclick={openAddModal}>
                ➕ 연락처 추가
            </button>
        </div>
    </div>

    <!-- 검색 및 필터 -->
    <div class="search-section">
        <div class="search-box">
            <input 
                type="text" 
                placeholder="이름, 전화번호, 메모, 태그 검색..." 
                bind:value={searchTerm}
            />
        </div>
        {#if selectedContacts.length > 0}
            <div class="selected-actions">
                <span class="selected-count">{selectedContacts.length}명 선택</span>
                <button class="btn-send-sms">
                    💬 선택된 연락처에 문자 보내기
                </button>
            </div>
        {/if}
    </div>

    <!-- 테이블 -->
    {#if loading}
        <div class="loading">데이터를 불러오는 중...</div>
    {:else if paginatedContacts().length === 0}
        <div class="no-data">연락처가 없습니다.</div>
    {:else}
        <div class="table-container">
            <table class="contact-table">
                <thead>
                    <tr>
                        <th class="checkbox-col">
                            <input 
                                type="checkbox" 
                                checked={selectedContacts.length === paginatedContacts().length && paginatedContacts().length > 0}
                                onchange={toggleSelectAll}
                            />
                        </th>
                        <th>번호</th>
                        <th>이름</th>
                        <th>전화번호</th>
                        <th>메모</th>
                        <th>태그</th>
                        <th>등록일</th>
                        <th>최근 연락일</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {#each paginatedContacts() as contact (contact.id)}
                        <tr class:selected={selectedContacts.includes(contact.id)}>
                            <td class="checkbox-col">
                                <input 
                                    type="checkbox" 
                                    checked={selectedContacts.includes(contact.id)}
                                    onchange={() => toggleSelectContact(contact.id)}
                                />
                            </td>
                            <td>{contact.id}</td>
                            <td class="name">{contact.name}</td>
                            <td class="phone">{formatPhoneNumber(contact.phone)}</td>
                            <td class="memo">{contact.memo || '-'}</td>
                            <td>
                                {#if contact.tags}
                                    <span class="tag">{contact.tags}</span>
                                {/if}
                            </td>
                            <td>{contact.createdAt}</td>
                            <td>{contact.lastContactDate || '-'}</td>
                            <td class="actions">
                                <button 
                                    class="btn-edit"
                                    onclick={() => openEditModal(contact)}
                                >
                                    수정
                                </button>
                                <button 
                                    class="btn-delete"
                                    onclick={() => deleteContact(contact.id)}
                                >
                                    삭제
                                </button>
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

<!-- 추가 모달 -->
{#if showAddModal}
    <div class="modal-overlay" onclick={closeAddModal}>
        <div class="modal-content" onclick={(e) => e.stopPropagation()}>
            <div class="modal-header">
                <h3>연락처 추가</h3>
                <button class="modal-close" onclick={closeAddModal}>✕</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>이름 <span class="required">*</span></label>
                    <input 
                        type="text" 
                        bind:value={newContact.name}
                        placeholder="이름을 입력하세요"
                    />
                </div>
                <div class="form-group">
                    <label>전화번호 <span class="required">*</span></label>
                    <input 
                        type="tel" 
                        bind:value={newContact.phone}
                        placeholder="010-0000-0000"
                    />
                </div>
                <div class="form-group">
                    <label>태그</label>
                    <input 
                        type="text" 
                        bind:value={newContact.tags}
                        placeholder="예: VIP, 일반, 신규"
                    />
                </div>
                <div class="form-group">
                    <label>메모</label>
                    <textarea 
                        bind:value={newContact.memo}
                        placeholder="메모를 입력하세요"
                        rows="4"
                    ></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-save" onclick={addContact}>추가</button>
                <button class="btn-cancel" onclick={closeAddModal}>취소</button>
            </div>
        </div>
    </div>
{/if}

<!-- 수정 모달 -->
{#if showEditModal && selectedContact}
    <div class="modal-overlay" onclick={closeEditModal}>
        <div class="modal-content" onclick={(e) => e.stopPropagation()}>
            <div class="modal-header">
                <h3>연락처 수정</h3>
                <button class="modal-close" onclick={closeEditModal}>✕</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>이름 <span class="required">*</span></label>
                    <input 
                        type="text" 
                        bind:value={selectedContact.name}
                        placeholder="이름을 입력하세요"
                    />
                </div>
                <div class="form-group">
                    <label>전화번호 <span class="required">*</span></label>
                    <input 
                        type="tel" 
                        bind:value={selectedContact.phone}
                        placeholder="010-0000-0000"
                    />
                </div>
                <div class="form-group">
                    <label>태그</label>
                    <input 
                        type="text" 
                        bind:value={selectedContact.tags}
                        placeholder="예: VIP, 일반, 신규"
                    />
                </div>
                <div class="form-group">
                    <label>메모</label>
                    <textarea 
                        bind:value={selectedContact.memo}
                        placeholder="메모를 입력하세요"
                        rows="4"
                    ></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-save" onclick={updateContact}>수정</button>
                <button class="btn-cancel" onclick={closeEditModal}>취소</button>
            </div>
        </div>
    </div>
{/if}

<style>
    .addressbook {
        padding: 20px;
        max-width: 1400px;
        margin: 0 auto;
    }

    .addressbook-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
    }

    .addressbook-header h2 {
        font-size: 1.8rem;
        font-weight: 700;
        color: #333;
        margin: 0 0 5px 0;
    }

    .subtitle {
        font-size: 0.95rem;
        color: #666;
        margin: 0;
    }

    .header-actions {
        display: flex;
        gap: 10px;
    }

    .btn-add {
        background: #4caf50;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .btn-add:hover {
        background: #45a049;
        transform: translateY(-2px);
    }

    .btn-export {
        background: #2196f3;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .btn-export:hover {
        background: #1976d2;
        transform: translateY(-2px);
    }

    .search-section {
        display: flex;
        gap: 15px;
        margin-bottom: 25px;
        align-items: center;
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

    .selected-actions {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 10px 20px;
        background: #e3f2fd;
        border-radius: 8px;
    }

    .selected-count {
        font-weight: 600;
        color: #1976d2;
    }

    .btn-send-sms {
        background: #ff9800;
        color: white;
        border: none;
        padding: 8px 18px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        font-size: 0.9rem;
        transition: all 0.3s ease;
    }

    .btn-send-sms:hover {
        background: #f57c00;
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

    .contact-table {
        width: 100%;
        border-collapse: collapse;
    }

    .contact-table thead {
        background: #f5f5f5;
    }

    .contact-table th {
        padding: 15px 10px;
        text-align: left;
        font-weight: 600;
        color: #333;
        font-size: 0.9rem;
        white-space: nowrap;
    }

    .contact-table td {
        padding: 15px 10px;
        border-top: 1px solid #e0e0e0;
        font-size: 0.9rem;
    }

    .contact-table tr.selected {
        background: #e3f2fd;
    }

    .checkbox-col {
        width: 40px;
        text-align: center;
    }

    .checkbox-col input[type="checkbox"] {
        cursor: pointer;
        width: 18px;
        height: 18px;
    }

    .name {
        font-weight: 600;
        color: #333;
    }

    .phone {
        font-family: 'Courier New', monospace;
        color: #2196f3;
        font-weight: 500;
    }

    .memo {
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #666;
    }

    .tag {
        display: inline-block;
        padding: 4px 10px;
        background: #e3f2fd;
        color: #1976d2;
        border-radius: 12px;
        font-size: 0.85rem;
        font-weight: 600;
    }

    .actions {
        display: flex;
        gap: 6px;
    }

    .btn-edit {
        padding: 6px 12px;
        background: #2196f3;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.85rem;
        transition: background 0.3s ease;
    }

    .btn-edit:hover {
        background: #1976d2;
    }

    .btn-delete {
        padding: 6px 12px;
        background: #f44336;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.85rem;
        transition: background 0.3s ease;
    }

    .btn-delete:hover {
        background: #d32f2f;
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
        max-width: 600px;
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

    .form-group {
        margin-bottom: 20px;
    }

    .form-group label {
        display: block;
        font-weight: 600;
        color: #333;
        margin-bottom: 8px;
        font-size: 0.95rem;
    }

    .form-group .required {
        color: #f44336;
    }

    .form-group input,
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
    .form-group textarea:focus {
        outline: none;
        border-color: #2196f3;
    }

    .form-group textarea {
        resize: vertical;
        min-height: 80px;
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
        .addressbook {
            padding: 15px;
        }

        .addressbook-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
        }

        .addressbook-header h2 {
            font-size: 1.4rem;
        }

        .header-actions {
            width: 100%;
        }

        .btn-add, .btn-export {
            flex: 1;
            padding: 10px;
            font-size: 0.9rem;
        }

        .search-section {
            flex-direction: column;
        }

        .selected-actions {
            width: 100%;
            flex-direction: column;
            gap: 10px;
        }

        .btn-send-sms {
            width: 100%;
        }

        .table-container {
            overflow-x: scroll;
        }

        .contact-table {
            min-width: 1000px;
        }

        .modal-content {
            width: 95%;
        }
    }
</style>

