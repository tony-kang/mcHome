<script>
    import { onMount } from 'svelte';
    
    export let texts = [];
    export let interval = 3000;
    export let fontSize = '2rem';
    export let fontFamily = 'Arial';
    export let fontWeight = 'normal';
    export let fontColor = '#000';
    export let className = '';
    export let shadowColor = 'rgba(0, 0, 0, 0.3)';
    export let shadowBlur = '5px';
    export let shadowX = '3px';
    export let shadowY = '10px';
    export let minHeight = '160px';

    let currentText = '';
    let isFlipping = false;
    let timer;

    onMount(() => {
        if (texts.length > 0) {
            currentText = texts[0];
            startAnimation();
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    });

    function startAnimation() {
        let currentIndex = 0;
        timer = setInterval(() => {
            isFlipping = true;
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % texts.length;
                currentText = texts[currentIndex];
                isFlipping = false;
            }, 500); // 애니메이션 중간에 텍스트 변경
        }, interval);
    }
</script>

<div class="flip-container {className}" style="font-size: {fontSize}; font-family: {fontFamily}; font-weight: {fontWeight}; color: {fontColor}; min-height: {minHeight};">
    <div class="flip-text {isFlipping ? 'flip' : ''}" style="text-shadow: {shadowX} {shadowY} {shadowBlur} {shadowColor};">
        {currentText}
    </div>
</div>

<style>
    .flip-container {
        display: flex;
        justify-content: center;
        align-items: center;
        perspective: 1000px;
    }

    .flip-text {
        text-align: center;
        transition: transform 0.5s ease;
        transform-style: preserve-3d;
        backface-visibility: hidden;
    }

    .flip {
        animation: flipX 0.5s ease-in-out;
    }

    @keyframes flipX {
        0% {
            transform: rotateX(0deg);
            opacity: 1;
        }
        50% {
            transform: rotateX(90deg);
            opacity: 0;
        }
        51% {
            transform: rotateX(-90deg);
            opacity: 0;
        }
        100% {
            transform: rotateX(0deg);
            opacity: 1;
        }
    }
</style> 