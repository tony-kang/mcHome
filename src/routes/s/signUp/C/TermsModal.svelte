<script>
    const { isOpen = false, title = '', content = '', type = '', onClose } = $props();
</script>

{#if isOpen}
    <div class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen p-4">
            <!-- 배경 오버레이 -->
            <button 
                type="button"
                class="fixed inset-0 bg-black bg-opacity-50 transition-opacity w-full h-full border-none cursor-pointer"
                onclick={onClose}
                aria-label="모달 닫기"
            ></button>

            <!-- 모달 컨텐츠 -->
            <div class="relative bg-white rounded-lg shadow-lg w-full max-w-2xl">
                <!-- 헤더 -->
                <div class="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 class="text-xl font-semibold text-black">
                        {title}
                    </h3>
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <button 
                        onclick={onClose}
                        class="text-gray-600 hover:text-gray-800"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- 본문 -->
                <div class="p-6 max-h-[60vh] overflow-y-auto text-black terms-modal-content">
                    {@html content}
                </div>

                <!-- 푸터 -->
                <div class="flex justify-end p-4 border-t border-gray-200">
                    <button
                        onclick={onClose}
                        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    /* 약관 내용 스타일링 */
    :global(.terms-modal-content) {
        line-height: 1.6;
        color: #000000 !important;
        background-color: #ffffff !important;
    }

    :global(.terms-modal-content h1) {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
        color: #000000 !important;
    }

    :global(.terms-modal-content h2) {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
        color: #000000 !important;
    }

    :global(.terms-modal-content h3) {
        font-size: 1.2rem;
        font-weight: 600;
        margin: 1.5rem 0 1rem;
        color: #000000 !important;
    }

    :global(.terms-modal-content p) {
        margin-bottom: 1rem;
        color: #000000 !important;
    }

    :global(.terms-modal-content ul) {
        list-style-type: disc;
        margin-left: 1.5rem;
        margin-bottom: 1rem;
        color: #000000 !important;
    }

    :global(.terms-modal-content li) {
        margin-bottom: 0.5rem;
        color: #000000 !important;
    }

    :global(.terms-modal-content strong) {
        color: #000000 !important;
        font-weight: 600;
    }

    :global(.terms-modal-content section) {
        margin-bottom: 2rem;
    }

    /* 모든 텍스트 요소에 명시적 검정색 적용 */
    :global(.terms-modal-content *) {
        color: #000000 !important;
    }
</style> 