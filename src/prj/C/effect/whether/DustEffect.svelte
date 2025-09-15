<script>
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';

    let {
        intensity = 'normal'
    } = $props();

    let canvas;
    let ctx;
    let particles = [];
    let time = 0;

    function createParticle() {
        const size = Math.random() * 2 + 1;
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.3 + 0.2,
            wobble: Math.random() * Math.PI * 2,
            wobbleSpeed: Math.random() * 0.002 + 0.001,
            wobbleRange: Math.random() * 30 + 10
        };
    }

    function drawParticle(particle) {
        const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 2
        );
        
        gradient.addColorStop(0, `rgba(255, 248, 240, ${particle.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 248, 240, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(
            particle.x - particle.size * 2,
            particle.y - particle.size * 2,
            particle.size * 4,
            particle.size * 4
        );
    }

    function updateParticle(particle) {
        particle.wobble += particle.wobbleSpeed;
        
        // 부드러운 부유 운동
        particle.x += particle.speedX + 
            Math.sin(particle.wobble) * 0.2;
        particle.y += particle.speedY + 
            Math.cos(particle.wobble) * 0.1;

        // 화면 경계 처리
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        time += 0.016;

        particles.forEach(particle => {
            updateParticle(particle);
            drawParticle(particle);
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
            const particleCount = intensity === 'heavy' ? 150 : 
                                intensity === 'light' ? 50 : 100;
            particles = Array(particleCount).fill().map(createParticle);
        }

        resize();
        window.addEventListener('resize', resize);
        animate();

        return () => window.removeEventListener('resize', resize);
    });
</script>

<canvas bind:this={canvas} class="dust-canvas"></canvas>

<style>
    .dust-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 6;
        filter: blur(0.3px);
    }
</style> 