<script>
    import { onMount } from 'svelte';

    let {
        popupList = $bindable(null),
        popupWidth = 900,
        popupHeight = 0,
    } = $props();

    let popupId = '';
    let popupTitle = $state(null);
    let showPopup = $state(false);
    let popupContent = $state(null);
    let pWidth = $state(popupWidth + 'px');
    let pHeight = $state(popupHeight + 'px');

    $effect(() => {
        if (popupHeight === 0) {
            pHeight = 'auto';
        }
    });
    
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const mPos = {
        x: screenWidth / 2 - popupWidth / 2,
        y: 200
    };

    function ___decodeHtml(encodedHtml) {
        return encodedHtml.replace(/&lt;|&gt;|&amp;|&quot;|&#39;/g, (entity) => {
            const chars = {
                '&lt;': '<',
                '&gt;': '>',
                '&amp;': '&',
                '&quot;': '"',
                '&#39;': "'"
            };
            return chars[entity];
        });
    }

    function onClosePopup(popupId) {
        showPopup = false;
        popupCheck();
    }

    function onCloseTodayPopup() {
        const today = new Date().toISOString().split('T')[0]; // 현재 날짜를 YYYY-MM-DD 형식으로 저장
        localStorage.setItem('popup_' + popupId, today);
        onClosePopup();
    }

    function popupCheck() {
        if (popupList?.length > 0) {
            let popupState;
            for (let i = 0; i < popupList.length; i++) {
                popupId = popupList[i].id;

                if (popupList[i].alreadyShowen) {
                    continue;
                }

                popupState = localStorage.getItem('popup_' + popupId);
                console.log('popup_' + popupId, popupState);

                // 오늘 날짜를 가져옴
                const today = new Date().toISOString().split('T')[0];

                // 저장된 날짜가 없거나, 저장된 날짜가 오늘이 아닐 경우 팝업을 표시
                if (!popupState || popupState !== today) {
                    showPopup = true;
                    popupList[i].alreadyShowen = true;
                    popupContent = popupList[i];
                    popupTitle = popupContent.title;
                    popupContent = ___decodeHtml(popupContent.content);
                    break;
                } else {
                    showPopup = false; // 오늘 보지 않기로 설정된 경우 팝업을 표시하지 않음
                }
            }
        }
    }

    onMount(async () => {
        popupCheck();
    });
</script>

{#if showPopup}
    <div class="backdrop">
        <div class="popup_layer" style="top:{mPos.y}px; left:{mPos.x}px; width: {pWidth}; height: {pHeight};">
            <button class="btn_close text-red-500 text-xl" onclick={() => onClosePopup(popupId)}>닫기</button>
            <p class="popup_title border-b-2 border-gray-300 pb-2">{popupTitle}</p>
            <div class="popup_cont">
                <div class="fr-view">
                    {@html popupContent}
                </div>
            </div>
            <div class="border-t-2 border-gray-300 pt-2 text-right">
                <button class="btn_today_info text-xl" onclick={onCloseTodayPopup}>오늘 하루 보지 않기</button>
            </div>
        </div>
    </div>
{/if}

<style>
	.popup_layer {
		position: fixed;
		background: var(--bg-color);
        padding: 1rem;
		border-radius: 0.5rem;
		box-shadow: 0 2px 10px var(--shadow-color);
		/* max-height: 90vh; */
		overflow-y: auto;
        position: relative;
	}

    .popup_title {
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 1rem;
    }

    .btn_close {
        position: absolute;
        top: 20px;
        right: 20px;
    }

    /* .popup_cont {
        font-size: 1rem;
    } */
</style>