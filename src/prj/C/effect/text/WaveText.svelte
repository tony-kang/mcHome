<script>
    let {
        text = '',           // 표시할 텍스트
        fontSize = '8em',    // 폰트 크기
        strokeColor = '#03a9f4', // 외곽선 색상
        fillColor = '#03a9f4',   // 채우기 색상
        duration = 4000,     // 애니메이션 지속 시간 (ms)
        strokeWidth = 2,     // 외곽선 두께
        minHeight = '100px', // 최소 높이
        className = '',      // 추가 CSS 클래스
        fontWeight = '400',  // 폰트 두께
        letterSpacing = '0', // 자간
        outlineWidth = '2px' // 외곽선 두께
    } = $props();
</script>

<section class={className}>
    <div class="content" 
         style="--font-size: {fontSize}; 
                --stroke-color: {strokeColor}; 
                --fill-color: {fillColor}; 
                --duration: {duration}ms; 
                --stroke-width: {outlineWidth}; 
                --font-weight: {fontWeight};
                --letter-spacing: {letterSpacing};
                min-height: {minHeight};">
        <h2 class="stroke">{text}</h2>
        <h2 class="fill">{text}</h2>
    </div>
</section>

<style>
    @import url("https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900");

    section {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .content {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .content h2 {
        color: #fff;
        font-size: var(--font-size);
        font-family: "Poppins", sans-serif;
        font-weight: var(--font-weight);
        letter-spacing: var(--letter-spacing);
        position: absolute;
        white-space: nowrap;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        margin: 0;
        padding: 0;
        width: fit-content;
    }

    .content h2.stroke {
        color: transparent;
        -webkit-text-stroke: var(--stroke-width) var(--stroke-color);
    }

    .content h2.fill {
        color: var(--fill-color);
        animation: animate var(--duration) ease-in-out infinite;
    }

    @keyframes animate {
        0%,
        100% {
            clip-path: polygon(
                0% 45%,
                16% 44%,
                33% 50%,
                54% 60%,
                70% 61%,
                84% 59%,
                100% 52%,
                100% 100%,
                0% 100%
            );
        }

        50% {
            clip-path: polygon(
                0% 60%,
                15% 65%,
                34% 66%,
                51% 62%,
                67% 50%,
                84% 45%,
                100% 46%,
                100% 100%,
                0% 100%
            );
        }
    }
</style> 