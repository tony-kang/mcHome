<script>
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';

    let {
        count = 200 // intensity에 따라 전달받은 눈송이 개수
    } = $props();

    let canvas;
    let ctx;
    let snowflakes = [];

    function createSnowflake() {
        const size = Math.random();  // 0~1 사이 값
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            radius: size * 6 + 2,  // 2~8 사이의 반지름
            density: Math.random() * 0.5 + 0.1,
            speed: (1 - size) * 1.5 + 0.5,
            angle: Math.random() * Math.PI * 2,
            swing: (1 - size) * 0.5 + 0.2,  // 흔들림 증가
            swingSpeed: Math.random() * 0.02 + 0.01,  // 흔들림 속도 다양화
            alpha: size * 0.4 + 0.1,
            windOffset: Math.random() * Math.PI * 2  // 바람 효과용 오프셋
        };
    }

    function drawSnowflake(flake) {
        let gradient = ctx.createRadialGradient(
            flake.x, flake.y, 0,
            flake.x, flake.y, flake.radius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${flake.alpha})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${flake.alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius * 2, 0, Math.PI * 2, false);
        ctx.fillStyle = gradient;
        ctx.fill();
    }

    let windAngle = 0;
    let windStrength = 0;

    function updateWind() {
        // 바람 방향과 세기를 천천히 변화
        windAngle += 0.002;
        windStrength = Math.sin(windAngle) * 0.5;
    }

    function moveSnowflake(flake) {
        // 기본 흔들림
        flake.angle += flake.swingSpeed;
        
        // 바람 효과 추가
        const windEffect = Math.sin(windAngle + flake.windOffset) * windStrength;
        
        // 좌우 이동에 바람 효과 추가
        flake.x += Math.sin(flake.angle) * flake.swing + windEffect;
        
        // 수직 이동에도 약간의 바람 효과
        flake.y += flake.speed + Math.abs(windEffect) * 0.2;

        // 화면 경계 처리
        if (flake.y > canvas.height + 10) {
            flake.y = -20;
            flake.x = Math.random() * canvas.width;
        }
        
        // 좌우 경계 처리 (순환)
        if (flake.x > canvas.width + 10) {
            flake.x = -10;
        } else if (flake.x < -10) {
            flake.x = canvas.width + 10;
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        updateWind();  // 바람 상태 업데이트
        
        for (let flake of snowflakes) {
            drawSnowflake(flake);
            moveSnowflake(flake);
        }
        
        requestAnimationFrame(animate);
    }

    onMount(() => {
        if (!browser) return;

        ctx = canvas.getContext('2d');
        ctx.globalCompositeOperation = 'screen';

        function resize() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            snowflakes = Array(count).fill().map(createSnowflake);
        }

        resize();
        window.addEventListener('resize', resize);
        animate();

        return () => {
            window.removeEventListener('resize', resize);
        };
    });
</script>

<canvas bind:this={canvas} class="snow-canvas"></canvas>

<style>
    .snow-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10;
        filter: blur(0.8px); /* 블러 효과 약간 증가 */
    }
</style> 