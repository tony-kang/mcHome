<script>
    let {
        text = '',           // 표시할 텍스트
        fontSize = '190px',  // 폰트 크기
        duration = 2,        // 애니메이션 지속 시간 (초)
        className = '',      // 추가 CSS 클래스
        gradient = 'linear-gradient(-225deg, #231557 0%, #44107a 29%, #ff1361 67%, #fff800 100%)', // 그라데이션
        minHeight = '200px'  // 최소 높이
    } = $props();
</script>

<div class="container" style="min-height: {minHeight};">
    <div class="row">
        <div class="col-md-12 text-center">
            <h3 class="animate-charcter {className}" 
                style="font-size: {fontSize}; 
                       --gradient: {gradient};
                       --duration: {duration}s;">
                {text}
            </h3>
        </div>
    </div>
</div>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .row {
        width: 100%;
    }

    .text-center {
        text-align: center;
    }

    .animate-charcter {
        text-transform: uppercase;
        background-image: var(--gradient);
        background-size: 200% auto;
        color: #fff;
        background-clip: text;
        text-fill-color: transparent;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: textclip var(--duration) linear infinite;
        display: inline-block;
        margin: 0;
        padding: 0;
    }

    @keyframes textclip {
        to {
            background-position: 200% center;
        }
    }
</style> 