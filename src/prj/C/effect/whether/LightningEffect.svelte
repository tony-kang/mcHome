<script>
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';

    let {
        intensity = 'normal'
    } = $props();

    let canvas;
    let ctx;
    let lastFlash = 0;
    let flashOpacity = 0;
    let flashInterval = 0;

    function createLightningPath() {
        const segments = [];
        let x = Math.random() * canvas.width;
        let y = 0;
        
        while (y < canvas.height) {
            const newX = x + (Math.random() - 0.5) * 150;
            const newY = y + Math.random() * 50 + 20;
            segments.push({ x1: x, y1: y, x2: newX, y2: newY });
            x = newX;
            y = newY;
        }
        return segments;
    }

    function drawLightning() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const now = Date.now();
        if (now - lastFlash > flashInterval) {
            flashOpacity = 1;
            lastFlash = now;
            flashInterval = Math.random() * (intensity === 'heavy' ? 2000 : 
                                          intensity === 'light' ? 8000 : 4000) + 1000;
            
            // 번개 그리기
            const segments = createLightningPath();
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${flashOpacity})`;
            ctx.lineWidth = 2;
            
            segments.forEach(segment => {
                ctx.moveTo(segment.x1, segment.y1);
                ctx.lineTo(segment.x2, segment.y2);
            });
            
            ctx.stroke();
            
            // 번개 빛 효과
            const gradient = ctx.createRadialGradient(
                canvas.width/2, canvas.height/2, 0,
                canvas.width/2, canvas.height/2, canvas.width
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${flashOpacity * 0.2})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else {
            flashOpacity *= 0.9;
        }
        
        requestAnimationFrame(drawLightning);
    }

    onMount(() => {
        if (!browser) return;
        
        ctx = canvas.getContext('2d');
        ctx.globalCompositeOperation = 'screen';
        
        function resize() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        
        resize();
        window.addEventListener('resize', resize);
        drawLightning();
        
        return () => window.removeEventListener('resize', resize);
    });
</script>

<canvas bind:this={canvas} class="lightning-canvas"></canvas>

<style>
    .lightning-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 11;
    }
</style> 