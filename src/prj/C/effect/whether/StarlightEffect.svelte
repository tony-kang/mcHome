<script>
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';

    let {
        intensity = 'normal'
    } = $props();

    let canvas;
    let ctx;
    let stars = [];
    let time = 0;
    let animationFrame;

    function createStar() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            twinkleSpeed: Math.random() * 0.3 + 0.2,
            twinkleOffset: Math.random() * Math.PI * 2,
            baseOpacity: Math.random() * 0.3 + 0.7,
            pulseSpeed: Math.random() * 0.25 + 0.15,
            pulseRange: Math.random() * 0.5 + 0.4
        };
    }

    function drawStar(star) {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const pulse = Math.sin(time * star.pulseSpeed) * star.pulseRange;
        
        let opacity = star.baseOpacity * (0.6 + twinkle * 0.4 + pulse * 0.3);
        opacity = Math.max(0.2, Math.min(1, opacity));

        const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 2
        );
        
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        gradient.addColorStop(0.3, `rgba(255, 255, 255, ${opacity * 0.7})`);
        gradient.addColorStop(0.6, `rgba(255, 255, 255, ${opacity * 0.4})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(
            star.x - star.size * 2,
            star.y - star.size * 2,
            star.size * 4,
            star.size * 4
        );

        if (opacity > 0.5) {
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 1.2})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size * 0.6, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        time += 0.15;

        stars.forEach(drawStar);
        animationFrame = requestAnimationFrame(animate);
    }

    onMount(() => {
        if (!browser) return;

        ctx = canvas.getContext('2d');
        ctx.globalCompositeOperation = 'screen';

        function resize() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            const starCount = intensity === 'heavy' ? 200 : 
                            intensity === 'light' ? 50 : 100;
            stars = Array(starCount).fill().map(createStar);
        }

        resize();
        window.addEventListener('resize', resize);
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    });
</script>

<canvas bind:this={canvas} class="starlight-canvas"></canvas>

<style>
    .starlight-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 8;
    }
</style> 