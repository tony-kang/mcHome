<script>
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';

    let {
        intensity = 'normal'
    } = $props();

    let canvas;
    let ctx;
    let time = 0;
    let points = [];
    const colors = [
        'rgba(0, 255, 128, 0.3)',
        'rgba(64, 128, 255, 0.3)',
        'rgba(128, 0, 255, 0.3)'
    ];

    function createPoints() {
        const count = intensity === 'heavy' ? 5 : 
                     intensity === 'light' ? 2 : 3;
        return Array(count).fill().map((_, i) => ({
            x: (canvas.width * i) / (count - 1),
            y: canvas.height * 0.3,
            amplitude: Math.random() * 50 + 50,
            speed: Math.random() * 0.002 + 0.001,
            offset: Math.random() * Math.PI * 2
        }));
    }

    function drawAurora() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        time += 0.01;

        colors.forEach((color, colorIndex) => {
            ctx.beginPath();
            ctx.moveTo(0, canvas.height);

            for (let x = 0; x <= canvas.width; x += 5) {
                let y = canvas.height * 0.3;
                points.forEach(point => {
                    const distance = Math.abs(x - point.x);
                    const influence = Math.max(0, 1 - distance / (canvas.width / 2));
                    y += Math.sin(time * point.speed + point.offset + x * 0.01) 
                         * point.amplitude * influence;
                });
                y += colorIndex * 20; // 각 색상 레이어 높이 차이
                ctx.lineTo(x, y);
            }

            ctx.lineTo(canvas.width, canvas.height);
            ctx.closePath();

            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.fill();
        });

        requestAnimationFrame(drawAurora);
    }

    onMount(() => {
        if (!browser) return;

        ctx = canvas.getContext('2d');
        ctx.globalCompositeOperation = 'screen';

        function resize() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            points = createPoints();
        }

        resize();
        window.addEventListener('resize', resize);
        drawAurora();

        return () => window.removeEventListener('resize', resize);
    });
</script>

<canvas bind:this={canvas} class="aurora-canvas"></canvas>

<style>
    .aurora-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 7;
    }
</style> 