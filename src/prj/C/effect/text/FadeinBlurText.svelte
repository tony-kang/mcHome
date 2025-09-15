<script>
    import { onMount } from 'svelte';
    
    let {
        text = '', // 단일 텍스트 입력
        fontSize = '2rem',
        fontFamily = 'Montserrat',
        fontWeight = '500',
        maxWidth = '40ch',
        className = '',
        minHeight = '100vh',
        animationDuration = '3s', // 애니메이션 지속 시간 증가
        animationDelay = '0.2s', // 단어 간 지연 시간 증가
        scaleDuration = '6s', // 스케일 애니메이션 지속 시간 증가
        threshold = 0.8, // 요소가 화면에 80% 보일 때 트리거
        rootMargin = '100px' // 뷰포트에서 100px 떨어진 지점부터 관찰 시작
    } = $props();

    let container;
    let isVisible = $state(false);
    let words = $state([]);

    $effect(() => {
        if (text) {
            words = text.split(' ').filter(word => word.trim() !== '');
        }
    });

    onMount(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    isVisible = entry.isIntersecting;
                });
            },
            {
                threshold: threshold,
                rootMargin: `-${rootMargin}`
            }
        );

        if (container) {
            observer.observe(container);
        }

        return () => {
            if (container) {
                observer.unobserve(container);
            }
        };
    });
</script>

<div class="container {className}" style="min-height: {minHeight};" bind:this={container}>
    <h1 class:visible={isVisible} style="font-family: {fontFamily}; font-size: {fontSize}; font-weight: {fontWeight}; max-width: {maxWidth};">
        {#each words as word, i}
            <span class="fade-in-blur" style="animation-delay: {i * parseFloat(animationDelay)}s;">
                {word}
            </span>
            {#if i < words.length - 1}
                <span class="space"> </span>
            {/if}
        {/each}
    </h1>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    h1 {
        transform: scale(0.94);
    }

    h1.visible {
        animation: scale 6s infinite cubic-bezier(0.4, 0, 0.2, 1);
    }

    .fade-in-blur {
        display: inline-block;
        opacity: 0;
        filter: blur(4px);
        animation: fade-in 3s infinite cubic-bezier(0.4, 0, 0.2, 1);
    }

    .space {
        display: inline-block;
        width: 0.3em;
    }

    @keyframes scale {
        0% {
            transform: scale(0.94);
        }
        50% {
            transform: scale(1.02);
        }
        100% {
            transform: scale(0.94);
        }
    }

    @keyframes fade-in {
        0% {
            opacity: 0;
            filter: blur(4px);
        }
        50% {
            opacity: 1;
            filter: blur(0);
        }
        100% {
            opacity: 1;
            filter: blur(0);
        }
    }
</style> 