<script>
    import { onMount } from 'svelte';

    let {
        texts = [],          // 표시할 텍스트 배열
        duration = 2000,     // 애니메이션 지속 시간 (ms)
        delay = 0,           // 시작 전 지연 시간 (ms)
        scale = 2,           // 팝아웃 시 스케일
        popColor = '#ff0000', // 팝아웃 시 텍스트 색상
        baseColor = '#000000', // 기본 텍스트 색상
        fontSize = '2rem',   // 폰트 크기
        fontFamily = 'Noto Sans KR', // 폰트 패밀리
        fontWeight = '900',  // 폰트 두께
        className = 'pop-text',      // 추가 CSS 클래스
        shadowColor = 'rgba(0, 0, 0, 0.5)', // 그림자 색상
        shadowBlur = '5px',  // 그림자 흐림 정도
        shadowX = '3px',     // 그림자 X축 이동
        shadowY = '10px',    // 그림자 Y축 이동
        gap = '1rem',         // 텍스트 간 간격
        minHeight = '100px'  // 최소 높이 설정
    } = $props();

    let currentIndex = $state(-1);
    let isPopped = $state(false);
    let timer;

    onMount(() => {
        if (delay > 0) {
            timer = setTimeout(() => {
                isPopped = true;
                startAnimation();
            }, delay);
        } else {
            isPopped = true;
            startAnimation();
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    });

    function startAnimation() {
        function showNextText() {
            if (currentIndex >= texts.length - 1) {
                currentIndex = -1;
                isPopped = false;
                setTimeout(() => {
                    isPopped = true;
                    currentIndex = -1;
                }, 100);
            } else {
                currentIndex++;
            }
            timer = setTimeout(showNextText, duration);
        }

        showNextText();
    }

    function getTextStyle(item) {
        let style = `--scale: ${item.scale || scale}; --pop-color: ${item.popColor || popColor}; --base-color: ${item.baseColor || baseColor}; --duration: ${duration}ms; --shadow-color: ${shadowColor}; --shadow-blur: ${shadowBlur}; --shadow-x: ${shadowX}; --shadow-y: ${shadowY}; font-weight: ${fontWeight}; font-size: ${item.fontSize || fontSize};`;
        
        if (item.outlineColor) {
            style += ` --outline-stroke: 1px ${item.outlineColor};`;
        }
        
        return style;
    }
</script>

<div class="pop-text-container {className}" 
     style="font-size: {fontSize}; font-family: {fontFamily};">
    <div class="text-group" style="gap: {gap}; min-height: {minHeight};">
        {#each texts as item, i}
            <span class="text" 
                  class:popped={isPopped && i <= currentIndex}
                  style={getTextStyle(item)}>
                {item.text}
            </span>
        {/each}
    </div>
</div>

<style>
    .pop-text-container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .text-group {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: var(--gap);
        width: 100%;
    }

    .text {
        display: block;
        color: var(--base-color);
        transition: all var(--duration) cubic-bezier(0.4, 0, 0.2, 1);
        text-align: center;
        width: 100%;
        transform: scale(1);
    }

    .text.popped {
        color: var(--pop-color);
        transform: scale(var(--scale));
        text-shadow: var(--shadow-x) var(--shadow-y) var(--shadow-blur) var(--shadow-color);
        -webkit-text-stroke: var(--outline-stroke, none);
    }
</style> 