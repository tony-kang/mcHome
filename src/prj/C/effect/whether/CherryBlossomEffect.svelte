<script>
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';

    let {
        intensity = 'normal'
    } = $props();

    let canvas;
    let ctx;
    let petals = [];
    let time = 0;

    function createPetal() {
        const size = Math.random() * 4 + 3;
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 + 1,
            opacity: Math.random() * 0.3 + 0.4,
            wobble: Math.random() * Math.PI * 2,
            wobbleSpeed: Math.random() * 0.02 + 0.01
        };
    }

    function drawPetal(petal) {
        ctx.save();
        ctx.translate(petal.x, petal.y);
        ctx.rotate(petal.rotation);

        // 벚꽃잎 그리기
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 223, 236, ${petal.opacity})`;
        
        // 하트 모양의 꽃잎
        ctx.moveTo(0, -petal.size);
        ctx.bezierCurveTo(
            petal.size, -petal.size,
            petal.size, petal.size/2,
            0, petal.size
        );
        ctx.bezierCurveTo(
            -petal.size, petal.size/2,
            -petal.size, -petal.size,
            0, -petal.size
        );
        
        ctx.fill();
        ctx.restore();
    }

    function updatePetal(petal) {
        petal.wobble += petal.wobbleSpeed;
        petal.x += petal.speedX + Math.sin(petal.wobble) * 0.5;
        petal.y += petal.speedY;
        petal.rotation += petal.rotationSpeed;

        if (petal.y > canvas.height + petal.size) {
            petal.y = -petal.size;
            petal.x = Math.random() * canvas.width;
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        time += 0.016;

        petals.forEach(petal => {
            updatePetal(petal);
            drawPetal(petal);
        });

        requestAnimationFrame(animate);
    }

    onMount(() => {
        if (!browser) return;

        ctx = canvas.getContext('2d');
        ctx.globalCompositeOperation = 'screen';

        function resize() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            const petalCount = intensity === 'heavy' ? 100 : 
                             intensity === 'light' ? 30 : 50;
            petals = Array(petalCount).fill().map(createPetal);
        }

        resize();
        window.addEventListener('resize', resize);
        animate();

        return () => window.removeEventListener('resize', resize);
    });
</script>

<canvas bind:this={canvas} class="cherry-blossom-canvas"></canvas>

<style>
    .cherry-blossom-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10;
    }
</style> 