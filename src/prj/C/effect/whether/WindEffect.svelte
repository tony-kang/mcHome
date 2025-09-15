<script>
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';

    let {
        count = 100, // 파티클 개수
        intensity = 'normal' // 바람 세기
    } = $props();

    let canvas;
    let ctx;
    let particles = [];

    function createParticle() {
        const size = Math.random();
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: size * 2 + 1,
            speedX: (intensity === 'heavy' ? 8 : intensity === 'light' ? 3 : 5),
            opacity: size * 0.3 + 0.1,
            sinOffset: Math.random() * Math.PI * 2
        };
    }

    function drawParticle(particle) {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(particle.x + particle.size * 3, particle.y);
        
        const gradient = ctx.createLinearGradient(
            particle.x, particle.y,
            particle.x + particle.size * 3, particle.y
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${particle.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = particle.size;
        ctx.lineCap = 'round';
        ctx.stroke();
    }

    function moveParticle(particle) {
        particle.x += particle.speedX;
        particle.y += Math.sin(particle.sinOffset + particle.x * 0.02) * 0.5;

        if (particle.x > canvas.width + 10) {
            particle.x = -10;
            particle.y = Math.random() * canvas.height;
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let particle of particles) {
            drawParticle(particle);
            moveParticle(particle);
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
            particles = Array(count).fill().map(createParticle);
        }

        resize();
        window.addEventListener('resize', resize);
        animate();

        return () => {
            window.removeEventListener('resize', resize);
        };
    });
</script>

<canvas bind:this={canvas} class="wind-canvas"></canvas>

<style>
    .wind-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10;
        filter: blur(0.3px);
    }
</style> 