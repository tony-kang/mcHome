<script>
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';

    let {
        intensity = 'normal'
    } = $props();

    let canvas;
    let ctx;
    let fogParticles = [];
    const PARTICLE_COUNT = 20;
    let time = 0;  // 시간에 따른 변화를 위한 변수

    function createFogParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 800 + 400,
            baseOpacity: Math.random() * 0.3 + 0.1,  // 기본 투명도
            opacity: 0,  // 실제 투명도 (시간에 따라 변화)
            speed: Math.random() * 0.2 + 0.1,
            pulseOffset: Math.random() * Math.PI * 2  // 각 파티클마다 다른 주기
        };
    }

    function drawFog() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        time += 0.01;  // 시간 증가
        
        fogParticles.forEach(particle => {
            // 시간에 따른 투명도 변화 (사인파 사용)
            particle.opacity = particle.baseOpacity * 
                (1 + Math.sin(time + particle.pulseOffset) * 0.5);

            const gradient = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.radius
            );
            
            gradient.addColorStop(0, `rgba(255, 255, 255, ${particle.opacity})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // 안개 이동
            particle.x += particle.speed;
            if (particle.x > canvas.width + particle.radius) {
                particle.x = -particle.radius;
                // 새로운 y 위치 설정으로 수직 이동도 추가
                particle.y = Math.random() * canvas.height;
            }
        });
        
        requestAnimationFrame(drawFog);
    }

    onMount(() => {
        if (!browser) return;
        
        ctx = canvas.getContext('2d');
        ctx.globalCompositeOperation = 'screen';
        
        function resize() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            fogParticles = Array(PARTICLE_COUNT).fill().map(createFogParticle);
        }
        
        resize();
        window.addEventListener('resize', resize);
        drawFog();
        
        return () => window.removeEventListener('resize', resize);
    });
</script>

<canvas bind:this={canvas} class="fog-canvas"></canvas>

<style>
    .fog-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10;
    }
</style> 