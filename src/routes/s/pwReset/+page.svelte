<script>
    //http://localhost:5174/s/pwReset?token=5f2523c246481054209642b2f42ca0937ab2279e2c9215bd1351933e05541cce
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    import ___const from '$prj/lib/i_const';
    import ___prj from '$prj/prjMain';
    import { g_brandLogo, g_logoSizes } from '$prj/prjStore';

    import ScreenCenter from '$prj/C/layout/ScreenCenter.svelte';

    let pwResetToken = $state('');
    let errorExist = $state(false);

    // 회원 구분 옵션
    const userTypes = [
        { value: 0, label: '선택해 주세요' },
        { value: 1, label: '일반' },
        { value: 2, label: '상담사' },
        { value: 3, label: '파트너' }
    ];

    let formData = $state({
        user_pw: '',
        user_pw_confirm: '',
    });

    let errors = $state({
        user_pw: '',
        user_pw_confirm: '',
    });

    function validatePassword() {
        // 더 많은 특수문자를 허용하는 정규식
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
        if (!passwordRegex.test(formData.user_pw)) {
            errors.user_pw = '비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다.';
            return false;
        }
        errors.user_pw = '';
        return true;
    }

    function validatePasswordConfirm() {
        if (formData.user_pw !== formData.user_pw_confirm) {
            errors.user_pw_confirm = '비밀번호가 일치하지 않습니다.';
            return false;
        }
        errors.user_pw_confirm = '';
        return true;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        // 모든 필수 필드 유효성 검사
        const isValid = 
            validatePassword() &&
            validatePasswordConfirm();

        if (!isValid) {
            console.log('validatePassword()', validatePassword());
            console.log('validatePasswordConfirm()', validatePasswordConfirm());
            alert('비밀번호를 확인해주세요.');
            return;
        }

        // TODO: 회원가입 API 호출
        try {
            let apiPath = '/v1/user';
            const _para = null;
            const _data = {
                ...formData,
                token: pwResetToken
            };

            ___prj.log.dev('비밀번호 재설정 API', apiPath, _para, _data);
            const r = await ___prj.api.post(apiPath, 'pw.change.from.email', _para, _data);
            ___prj.log.dev('비밀번호 재설정 API 응답', r);
            if (r.data.result === ___const.OK) {
                alert('비밀번호 재설정이 완료되었습니다.');
                goto('/s/signIn');
            }
        } catch (error) {
            console.error('비밀번호 재설정 실패:', error);
            alert('비밀번호 재설정 중 오류가 발생했습니다.');
        }
    }

    onMount(() => {
        pwResetToken = $page.url.searchParams.get('token');

        if (!pwResetToken) {
            errorExist = true;
        }
    });
</script>

{#if errorExist}
    <ScreenCenter >잘못된 접근 입니다.</ScreenCenter> 
{:else}
    <div class="flex items-center justify-center">
        <div class="w-full max-w-2xl my-10 px-4">
            <!-- 회원가입 폼 -->
            <div class="bg-theme p-8 rounded-lg shadow-theme">
                <form onsubmit={handleSubmit} class="space-y-6">
                    <!-- 기본 정보 -->
                    <div class="space-y-4">
                        <div>
                            <label class="block font-medium text-theme text-xs" for="user_pw">
                                비밀번호 (<span class="edit-item-required">★</span>)
                            </label>
                            <input
                                id="user_pw"
                                type="password"
                                bind:value={formData.user_pw}
                                onblur={validatePassword}
                                placeholder="비밀번호 (영문, 숫자, 특수문자 포함 8자 이상)"
                                class="mt-1 block w-full px-3 py-2 border border-theme rounded-md shadow-sm 
                                    focus:outline-none focus:ring-primary focus:border-primary 
                                    bg-input text-input-text text-base placeholder:text-base"
                                autocomplete="new-password"
                                required
                            />
                            {#if errors.user_pw}
                                <p class="mt-1 text-sm text-red-500">{errors.user_pw}</p>
                            {/if}
                        </div>

                        <div>
                            <label class="block font-medium text-theme text-xs" for="user_pw_confirm">
                                비밀번호 확인 (<span class="edit-item-required">★</span>)
                            </label>
                            <input
                                id="user_pw_confirm"
                                type="password"
                                bind:value={formData.user_pw_confirm}
                                onblur={validatePasswordConfirm}
                                placeholder="비밀번호 확인"
                                class="mt-1 block w-full px-3 py-2 border border-theme rounded-md shadow-sm 
                                    focus:outline-none focus:ring-primary focus:border-primary 
                                    bg-input text-input-text text-base placeholder:text-base"
                                required
                            />
                            {#if errors.user_pw_confirm}
                                <p class="mt-1 text-sm text-red-500">{errors.user_pw_confirm}</p>
                            {/if}
                        </div>
                    </div>

                    <button
                        type="submit"
                        onclick={handleSubmit}
                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm 
                            text-base font-medium text-white bg-primary hover:bg-primary-hover 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        패스워드 재설정
                    </button>
                </form>
            </div>
        </div>
    </div>
{/if}
<style>
    :global(.text-theme) {
        color: var(--text-color);
    }

    :global(.bg-theme) {
        background-color: var(--bg-color);
    }

    :global(.border-theme) {
        border-color: var(--border-color);
    }

    :global(.shadow-theme) {
        box-shadow: 0 2px 10px var(--shadow-color);
    }

    :global(.bg-input) {
        background-color: var(--input-bg);
    }

    :global(.text-input-text) {
        color: var(--input-text);
    }

    :global(.text-primary) {
        color: var(--primary-color);
    }

    :global(.bg-primary) {
        background-color: var(--primary-color);
    }

    :global(.hover\:bg-primary-hover:hover) {
        background-color: var(--primary-hover);
    }

    :global(.hover\:text-primary-hover:hover) {
        color: var(--primary-hover);
    }

    :global(.focus\:ring-primary:focus) {
        --tw-ring-color: var(--primary-color);
    }

    :global(.focus\:border-primary:focus) {
        border-color: var(--primary-color);
    }

    .edit-item-required {
        font-size: 12px;
    }
</style>