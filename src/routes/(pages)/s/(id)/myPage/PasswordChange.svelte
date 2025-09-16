<script>
    import ___prj from '$prj/prjMain';

    let currentPassword = $state('');
    let newPassword = $state('');
    let confirmPassword = $state('');
    let isLoading = $state(false);
    let message = $state('');
    let messageType = $state(''); // 'success' or 'error'

    let { onClose } = $props();

    function handleSubmit() {
        // 입력 검증
        if (!currentPassword || !newPassword || !confirmPassword) {
            showMessage('모든 필드를 입력해주세요.', 'error');
            return;
        }

        if (newPassword !== confirmPassword) {
            showMessage('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.', 'error');
            return;
        }

        if (newPassword.length < 8) {
            showMessage('새 비밀번호는 8자 이상이어야 합니다.', 'error');
            return;
        }

        if (currentPassword === newPassword) {
            showMessage('현재 비밀번호와 새 비밀번호가 동일합니다.', 'error');
            return;
        }

        // 비밀번호 변경 처리
        changePassword();
    }

    async function changePassword() {
        isLoading = true;
        message = '';
        
        try {
            // 실제 API 호출 (___prj.api 사용)
            const result = await ___prj.api.post('', 'user.changePassword', null, {
                currentPassword: currentPassword,
                newPassword: newPassword
            });

            if (result.data.result === 'OK') {
                showMessage('비밀번호가 성공적으로 변경되었습니다.', 'success');
                // 2초 후 모달 닫기
                setTimeout(() => {
                    resetForm();
                    onClose();
                }, 2000);
            } else {
                showMessage(result.data.message || '비밀번호 변경에 실패했습니다.', 'error');
            }
        } catch (error) {
            console.error('비밀번호 변경 오류:', error);
            showMessage('비밀번호 변경 중 오류가 발생했습니다.', 'error');
        } finally {
            isLoading = false;
        }
    }

    function showMessage(text, type) {
        message = text;
        messageType = type;
        
        // 5초 후 메시지 자동 제거
        setTimeout(() => {
            message = '';
            messageType = '';
        }, 5000);
    }

    function resetForm() {
        currentPassword = '';
        newPassword = '';
        confirmPassword = '';
        message = '';
        messageType = '';
    }

    function handleCancel() {
        resetForm();
        onClose();
    }
</script>

<div class="password-change-modal">
    <div class="modal-overlay" onclick={handleCancel}>
        <div class="modal-content" onclick={(e) => e.stopPropagation()}>
            <div class="modal-header">
                <h3>비밀번호 변경</h3>
                <button class="close-btn" onclick={handleCancel}>×</button>
            </div>

            <div class="modal-body">
                <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <div class="form-group">
                        <label for="current-password">현재 비밀번호 *</label>
                        <input 
                            id="current-password"
                            type="password" 
                            bind:value={currentPassword}
                            placeholder="현재 비밀번호를 입력하세요"
                            required
                        />
                    </div>

                    <div class="form-group">
                        <label for="new-password">새 비밀번호 *</label>
                        <input 
                            id="new-password"
                            type="password" 
                            bind:value={newPassword}
                            placeholder="새 비밀번호를 입력하세요 (8자 이상)"
                            required
                        />
                    </div>

                    <div class="form-group">
                        <label for="confirm-password">새 비밀번호 확인 *</label>
                        <input 
                            id="confirm-password"
                            type="password" 
                            bind:value={confirmPassword}
                            placeholder="새 비밀번호를 다시 입력하세요"
                            required
                        />
                    </div>

                    {#if message}
                        <div class="message {messageType}">
                            {message}
                        </div>
                    {/if}

                    <div class="form-actions">
                        <button type="button" class="btn-cancel" onclick={handleCancel}>
                            취소
                        </button>
                        <button type="submit" class="btn-submit" disabled={isLoading}>
                            {isLoading ? '처리 중...' : '비밀번호 변경'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<style>
    .password-change-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
    }

    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }

    .modal-content {
        background: white;
        border-radius: 12px;
        width: 100%;
        max-width: 500px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 30px;
        border-bottom: 1px solid #e9ecef;
    }

    .modal-header h3 {
        margin: 0;
        color: #333;
        font-size: 1.5rem;
    }

    .close-btn {
        background: none;
        border: none;
        font-size: 24px;
        color: #666;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.3s ease;
    }

    .close-btn:hover {
        background: #f8f9fa;
        color: #333;
    }

    .modal-body {
        padding: 30px;
    }

    .form-group {
        margin-bottom: 20px;
    }

    .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: #333;
        font-size: 14px;
    }

    .form-group input {
        width: 100%;
        padding: 12px 16px;
        border: 2px solid #e9ecef;
        border-radius: 8px;
        font-size: 16px;
        transition: border-color 0.3s ease;
        box-sizing: border-box;
    }

    .form-group input:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }

    .message {
        padding: 12px 16px;
        border-radius: 8px;
        margin-bottom: 20px;
        font-weight: 500;
    }

    .message.success {
        background: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }

    .message.error {
        background: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }

    .form-actions {
        display: flex;
        gap: 15px;
        justify-content: flex-end;
        margin-top: 30px;
    }

    .btn-cancel,
    .btn-submit {
        padding: 12px 24px;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .btn-cancel {
        background: #6c757d;
        color: white;
    }

    .btn-cancel:hover {
        background: #5a6268;
    }

    .btn-submit {
        background: #007bff;
        color: white;
    }

    .btn-submit:hover:not(:disabled) {
        background: #0056b3;
    }

    .btn-submit:disabled {
        background: #6c757d;
        cursor: not-allowed;
    }

    @media (max-width: 768px) {
        .modal-overlay {
            padding: 10px;
        }

        .modal-header {
            padding: 15px 20px;
        }

        .modal-body {
            padding: 20px;
        }

        .form-actions {
            flex-direction: column;
        }

        .btn-cancel,
        .btn-submit {
            width: 100%;
        }
    }
</style>
