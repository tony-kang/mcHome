<script>
    import { onMount } from 'svelte';

    let {
        words = [],          // 타이핑할 단어 배열
        speed = 100,         // 타이핑 속도 (ms)
        delay = 2000,        // 단어 간 지연 시간 (ms)
        fontSize = '2rem',   // 폰트 크기
        fontFamily = 'Noto Sans KR', // 폰트 패밀리
        fontWeight = '900',  // 폰트 두께
        fontColor = '#0000FF', // 폰트 색상
        className = 'typing-text',      // 추가 CSS 클래스
        shadowColor = 'rgba(0, 0, 0, 0.3)', // 그림자 색상
        shadowBlur = '5px',  // 그림자 흐림 정도
        shadowX = '3px',     // 그림자 X축 이동
        shadowY = '10px',     // 그림자 Y축 이동
        minHeight = '100px'  // 최소 높이 설정
    } = $props();

    let currentWord = $state('');
    let currentIndex = $state(0);
    let isTyping = $state(false);
    let timer;

    onMount(() => {
        startTyping();
        return () => {
            if (timer) clearTimeout(timer);
        };
    });

    function startTyping() {
        if (currentIndex >= words.length) {
            currentIndex = 0;
        }
        const word = words[currentIndex];
        let i = 0;
        isTyping = true;

        function type() {
            if (i < word.length) {
                currentWord = word.substring(0, i + 1);
                i++;
                timer = setTimeout(type, speed);
            } else {
                isTyping = false;
                timer = setTimeout(() => {
                    currentWord = '';
                    currentIndex++;
                    startTyping();
                }, delay);
            }
        }

        type();
    }
</script>

<div class="typing-container {className}" 
     style="font-size: {fontSize}; font-family: {fontFamily}; min-height: {minHeight};">
    <span class="typing-text" 
          style="font-weight: {fontWeight}; color: {fontColor}; text-shadow: {shadowX} {shadowY} {shadowBlur} {shadowColor};">
        {currentWord}
    </span>
</div>

<style>
    .typing-container {
        display: inline-block;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%; /* 전체 너비 사용 */
    }

    .typing-text {
        display: inline-block;
        white-space: normal; /* 줄바꿈 허용 */
        word-wrap: break-word; /* 긴 단어 줄바꿈 */
        max-width: 100%; /* 컨테이너 너비 제한 */
    }
</style> 