<script>
    let {
        text = '',           // 표시할 텍스트
        fontSize = '60px',   // 폰트 크기
        color = '#fff',      // 텍스트 색상
        background = '#151719', // 배경 색상
        className = '',      // 추가 CSS 클래스
        fontFamily = 'Alfa Slab One', // 폰트
        minHeight = '200px' // 최소 높이
    } = $props();

    const characters = $derived(Array.from(text.toUpperCase()));
</script>

<section class={className} 
        style="min-height: {minHeight}; 
               background: {background};">
    <div class="waviy" style="font-size: {fontSize};">
        {#each characters as char, i}
            <span style="--i:{i + 1}; color: {color};">{char}</span>
        {/each}
    </div>
</section>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap');

    section {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2rem 1rem;
    }

    .waviy {
        position: relative;
        -webkit-box-reflect: below -25px linear-gradient(transparent 40%, rgba(0,0,0,0.7));
        letter-spacing: 0.15em;
    }

    .waviy span {
        font-family: 'Alfa Slab One', cursive;
        position: relative;
        display: inline-block;
        text-transform: uppercase;
        animation: waviy 1s infinite;
        animation-delay: calc(.1s * var(--i));
        font-weight: 900;
        text-shadow: 2px 2px 0 rgba(0,0,0,0.1);
    }

    @keyframes waviy {
        0%, 40%, 100% {
            transform: translateY(0)
        }
        20% {
            transform: translateY(-20px)
        }
    }
</style> 