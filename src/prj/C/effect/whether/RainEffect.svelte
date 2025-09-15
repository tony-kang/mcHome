<script>
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';

    let {
        count = 200 // intensity에 따라 전달받은 빗방울 개수
    } = $props();

    let canvas;
    let ctx;
    let raindrops = [];

    function createRaindrop() {
        const size = Math.random();  // 0~1 사이 값
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            length: size * 20 + 10,  // 빗줄기 길이
            speed: size * 15 + 14,   // 떨어지는 속도
            thickness: size * 1.5 + 0.5,  // 빗줄기 두께
            windOffset: Math.random() * Math.PI * 2,  // 바람 효과용
            alpha: size * 0.2 + 0.1
        };
    }

    function drawRaindrop(drop) {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        // 빗줄기를 약간 기울여서 그림
        ctx.lineTo(
            drop.x + drop.length * 0.1, 
            drop.y + drop.length
        );
        
        ctx.strokeStyle = `rgba(174, 194, 224, ${drop.alpha})`;
        ctx.lineWidth = drop.thickness;
        ctx.lineCap = 'round';
        ctx.stroke();
    }

    let windAngle = 0;
    let windStrength = 0;

    function updateWind() {
        windAngle += 0.002;
        windStrength = Math.sin(windAngle) * 1;
    }

    function moveRaindrop(drop) {
        const windEffect = Math.sin(windAngle + drop.windOffset) * windStrength;
        
        // 비가 떨어지는 각도 조절
        drop.x += windEffect + 1;  // 기본적으로 약간 오른쪽으로 기울어짐
        drop.y += drop.speed;

        // 화면 밖으로 나가면 위로 재배치
        if (drop.y > canvas.height) {
            drop.y = -20;
            drop.x = Math.random() * canvas.width;
        }
        
        // 좌우 경계 처리
        if (drop.x > canvas.width + 100) {
            drop.x = -100;
        } else if (drop.x < -100) {
            drop.x = canvas.width + 100;
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        updateWind();
        
        for (let drop of raindrops) {
            drawRaindrop(drop);
            moveRaindrop(drop);
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
            raindrops = Array(count).fill().map(createRaindrop); // count 사용
        }

        resize();
        window.addEventListener('resize', resize);
        animate();

        return () => {
            window.removeEventListener('resize', resize);
        };
    });
</script>

<canvas bind:this={canvas} class="rain-canvas"></canvas>

<style>
    .rain-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10;
        filter: blur(0.2px);
    }
</style> 