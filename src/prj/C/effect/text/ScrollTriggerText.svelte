<script>
    import { onMount, onDestroy } from 'svelte';
    import gsap from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';

    // Default color palette based on the example
    const defaultColorPalette = [
        ['#DF8453', '#3D8DAE', '#E4A9A8'],
        ['#DBAD4A', '#ACCFCB', '#17494D'],
        ['#ACCFCB', '#E4A9A8', '#ACCFCB'],
        ['#3D8DAE', '#DF8453', '#E4A9A8'],
    ];

    let {
        texts = [],           // 표시할 텍스트 배열
        fontSize = '40px',   // 폰트 크기
        fontWeight = '300',  // 폰트 두께
        fontFamily = 'Signika Negative', // 폰트
        className = '',      // 추가 CSS 클래스
        backgroundColor = 'transparent', // 배경 색상
        textColor = '#000',     // 텍스트 색상 (색상 애니메이션 비활성화 시)
        minHeight = '100vh', // 최소 높이
        markers = false,      // ScrollTrigger 마커 표시 여부
        duration = 1.25,     // ScrollTrigger 애니메이션 지속 시간 (초)
        yOffset = 100,       // ScrollTrigger 애니메이션 시작 Y 오프셋
        stagger = 0.2,       // ScrollTrigger 각 텍스트 애니메이션 시작 간격 (초)

        // --- Color Animation Props ---
        enableColorAnimation = false, // 색상 애니메이션 활성화 여부
        colorAnimationDuration = 4, // 색상 애니메이션 지속 시간 (초)
        colorPalette = defaultColorPalette, // 단어별 색상 세트 배열
        colorFontFamily = 'Montserrat', // 색상 애니메이션용 폰트
        colorFontWeight = '800',        // 색상 애니메이션용 폰트 두께
        colorFontSize = '8.5vw',      // 색상 애니메이션용 폰트 크기
        colorAnimationLineOffset = 0.5 // 각 라인별 색상 애니메이션 시작 지연 시간 증가량 (초)
    } = $props();

    let sectionRef;
    let scrollTriggerInstances = [];
    let revealElements = []; // 애니메이션 대상 요소 (div.revealUpContainer)

    gsap.registerPlugin(ScrollTrigger);

    // Helper to split text into words
    const splitText = (text) => text.split(/\s+/).filter(Boolean);

    onMount(() => {
        // 애니메이션 대상 요소 선택
        revealElements = gsap.utils.toArray(sectionRef.querySelectorAll('.revealUpContainer'));

        if (revealElements.length === 0) {
            return; // 애니메이션할 요소 없음
        }

        // 초기 상태 숨김
        gsap.set(revealElements, { autoAlpha: 0 });

        // 각 요소에 대해 ScrollTrigger 설정
        revealElements.forEach((elem, index) => {
            const st = ScrollTrigger.create({
                trigger: elem,
                start: "top 80%",
                end: "bottom 20%",
                markers: markers,
                onEnter: () => {
                    gsap.fromTo(
                        elem,
                        { y: yOffset, autoAlpha: 0 },
                        {
                            duration: duration,
                            y: 0,
                            autoAlpha: 1,
                            ease: "back",
                            delay: index * stagger,
                            overwrite: "auto"
                        }
                    );
                },
                onLeave: () => {
                    gsap.to(elem, { autoAlpha: 0, overwrite: "auto" });
                },
                onEnterBack: () => {
                    gsap.fromTo(
                        elem,
                        { y: -yOffset, autoAlpha: 0 },
                        {
                            duration: duration,
                            y: 0,
                            autoAlpha: 1,
                            ease: "back",
                            delay: index * stagger,
                            overwrite: "auto"
                        }
                    );
                },
                onLeaveBack: () => {
                    gsap.to(elem, { autoAlpha: 0, overwrite: "auto" });
                }
            });
            scrollTriggerInstances.push(st);
        });

        return () => {
            scrollTriggerInstances.forEach(st => st.kill());
            gsap.killTweensOf(revealElements);
        };
    });

</script>

<section bind:this={sectionRef}
         class={`scroll-section ${className}`}
         style="background-color: {backgroundColor}; min-height: {minHeight};">
    {#each texts as textItem, i}
        {@const lineDelay = i * colorAnimationLineOffset} <!-- Calculate line delay -->
        <div class="revealUpContainer" style="width: 100%; text-align: center;"> <!-- ScrollTrigger 대상 -->
            {#if enableColorAnimation}
                <h2 class="title color-animate"
                    style="font-family: '{colorFontFamily}', sans-serif; font-weight: {colorFontWeight}; font-size: {colorFontSize}; --color-animation-duration: {colorAnimationDuration}s;">
                    {#each splitText(textItem) as word, wordIndex}
                        {@const paletteIndex = wordIndex % colorPalette.length}
                        {@const currentColors = colorPalette[paletteIndex] || defaultColorPalette[0]} <!-- Fallback -->
                        <span class="title-word"
                              style="--color-1: {currentColors[0]}; --color-2: {currentColors[1]}; --color-3: {currentColors[2]}; animation-delay: {lineDelay}s;">
                            {word}
                        </span>
                    {/each}
                </h2>
            {:else}
                <h1 class="title standard-text"
                    style="font-size: {fontSize}; font-weight: {fontWeight}; font-family: '{fontFamily}', sans-serif; color: {textColor};">
                    {textItem}
                </h1>
            {/if}
        </div>
    {/each}
</section>

<style>
    @import url("https://fonts.googleapis.com/css?family=Signika+Negative:300,400&display=swap");
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap');

    .scroll-section {
      width: 100%;
      position: relative;
      padding: 2rem; /* 텍스트가 잘리지 않도록 패딩 추가 */
      text-align: center;
      overflow: hidden;
      display: flex;
      flex-direction: column; /* 텍스트를 세로로 배치 */
      justify-content: center;
      align-items: center;
      gap: 1rem; /* revealUpContainer 간의 간격 */
    }

    .revealUpContainer {
      /* GSAP이 visibility와 opacity를 제어 */
    }

    .title {
        margin: 0;
        padding: 0;
        line-height: 1.2;
        letter-spacing: 0.04em;
    }

    .standard-text {
        /* Standard h1 styles applied via inline style props */
    }

    /* --- Color Animation Styles --- */
    .color-animate {
        text-transform: uppercase;
    }

    .title-word {
        display: inline-block; /* Allow spacing between words */
        margin: 0 0.1em; /* Adjust spacing between words */
        /* Colors are now set via inline styles */
        animation: color-animation var(--color-animation-duration) linear infinite;
        /* animation-delay is now set via inline style */
    }

    @keyframes color-animation {
      0%    {color: var(--color-1)}
      32%   {color: var(--color-1)}
      33%   {color: var(--color-2)}
      65%   {color: var(--color-2)}
      66%   {color: var(--color-3)}
      99%   {color: var(--color-3)}
      100%  {color: var(--color-1)}
    }

</style> 