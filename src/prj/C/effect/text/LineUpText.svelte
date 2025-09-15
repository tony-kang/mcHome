<script>
    import { onMount } from 'svelte';
    
    let {
        texts = [
            "CODE 심리재능,<br>아는 만큼 행복해진다!",
            "PTI 심리재능,<br>아는 만큼 성장한다.",
            "CODE 심리재능,<br>마음을 다스리는 암호!"
        ],  // 표시할 텍스트 배열
        interval = 3000,     // 텍스트 전환 간격 (ms)
        mainTitleSize = '2.0rem',  // 메인 타이틀 폰트 크기
        subTitleSize = '1.0rem',   // 서브 타이틀 폰트 크기
        subTitleText = "심리재능으로 당신의 삶을 더 풍요롭게 만들어보세요",  // 서브 타이틀 텍스트
        minHeight = '60vh',  // 최소 높이
        lightGradient = 'linear-gradient(135deg, #4f46e5 0%, #97d589 100%)',  // 라이트 모드 그라데이션
        darkGradient = 'linear-gradient(135deg, #1e1b4b 0%, #60154c 100%)',   // 다크 모드 그라데이션
        className = ''       // 추가 CSS 클래스
    } = $props();

    let currentText = $state(0);
    let isDark = $state(false);

    onMount(() => {
        // 테마 감지
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        isDark = darkModeMediaQuery.matches;
        darkModeMediaQuery.addEventListener('change', (e) => {
            isDark = e.matches;
        });

        // 텍스트 전환 효과
        setInterval(() => {
            currentText = (currentText + 1) % texts.length;
        }, interval);
    });
</script>

<div class="main-hero {className}" 
     class:dark={isDark}
     style="min-height: {minHeight}; background: {isDark ? darkGradient : lightGradient};">
    <div class="hero-content">
        <div class="text-container">
            <h1 class="main-title" style="font-size: {mainTitleSize};">
                {@html texts[currentText]}
            </h1>
            <p class="sub-title" style="font-size: {subTitleSize};">
                {subTitleText}
            </p>
        </div>
    </div>
    <div class="particles"></div>
</div>

<style>
    .main-hero {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-color);
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
    }

    .hero-content {
        max-width: 1200px;
        width: 100%;
        text-align: center;
        position: relative;
        z-index: 1;
    }

    .text-container {
        margin-bottom: 2rem;
    }

    .main-title {
        font-weight: bold;
        margin-bottom: 1rem;
        animation: fadeIn 1s ease-in-out;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }

    .sub-title {
        opacity: 0.9;
        animation: slideUp 1s ease-in-out;
    }

    .particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: 
            radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
        animation: particlesMove 20s linear infinite;
    }

    .cta-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
    }

    .cta-button {
        padding: 0.8rem 2rem;
        border-radius: 0.5rem;
        font-weight: bold;
        text-decoration: none;
        transition: all 0.3s ease;
    }

    .cta-button.primary {
        background-color: white;
        color: var(--primary-color);
    }

    .cta-button.secondary {
        background-color: transparent;
        border: 2px solid white;
        color: white;
    }

    .cta-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes particlesMove {
        0% {
            transform: translate(0, 0);
        }
        50% {
            transform: translate(10px, 10px);
        }
        100% {
            transform: translate(0, 0);
        }
    }

    @media (max-width: 768px) {
        .main-hero {
            min-height: 50vh;
        }

        .main-title {
            font-size: 1.8rem;
        }

        .sub-title {
            font-size: 1rem;
        }

        .cta-buttons {
            flex-direction: column;
        }

        .cta-button {
            width: 100%;
        }
    }
</style> 