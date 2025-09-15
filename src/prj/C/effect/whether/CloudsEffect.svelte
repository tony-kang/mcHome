<script>
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';

    let {
        intensity = 'normal'
    } = $props();

    let canvas;
    let ctx;
    let clouds = [];
    let time = 0;
    let animationFrame;

    function createCloud(forceX = null) {
        const baseSize = intensity === 'heavy' ? 150 : 
                        intensity === 'light' ? 80 : 100;
        
        const x = forceX ?? (Math.random() * canvas.width * 1.5 - canvas.width * 0.25);
        const segments = Math.floor(Math.random() * 3) + 3;

        return {
            x,
            y: Math.random() * (canvas.height * 0.5),
            segments: Array(segments).fill().map(() => ({
                offsetX: Math.random() * baseSize * 0.8,
                offsetY: Math.random() * baseSize * 0.2,
                size: Math.random() * baseSize * 0.5 + baseSize * 0.5,
                opacity: Math.random() * 0.3 + 0.7,
                pulseSpeed: Math.random() * 0.002 + 0.001,  // 각 세그먼트의 고유한 맥동 속도
                pulseOffset: Math.random() * Math.PI * 2    // 각 세그먼트의 맥동 오프셋
            })),
            speed: Math.random() * 0.2 + 0.1,
            baseSize,
            sizeMultiplier: 1,  // 전체 구름의 크기 배수
            cloudPulseSpeed: Math.random() * 0.001 + 0.0005  // 구름 전체의 맥동 속도
        };
    }

    function drawCloud(cloud) {
        const edgeAlpha = Math.max(0, Math.min(1, 
            Math.min(cloud.x / (canvas.width * 0.1), 
                    (canvas.width - cloud.x) / (canvas.width * 0.1)
            )
        ));

        // 블러 효과 감소 (30px -> 15px)
        ctx.filter = 'blur(15px)';
        
        // 구름 전체의 크기 변화 계산
        cloud.sizeMultiplier = 1 + Math.sin(time * cloud.cloudPulseSpeed) * 0.2;

        // 먼저 부드러운 배경 레이어 그리기
        cloud.segments.forEach((segment, index) => {
            ctx.beginPath();

            const centerX = cloud.x + segment.offsetX;
            const centerY = cloud.y + segment.offsetY;
            
            const segmentPulse = Math.sin(time + segment.pulseOffset) * 0.1;
            const currentSize = segment.size * (cloud.sizeMultiplier + segmentPulse);

            // 배경 그라데이션 조정
            const gradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, currentSize * 1.3  // 범위 축소 (1.5 -> 1.3)
            );
            const alpha = segment.opacity * edgeAlpha * 0.6;  // 투명도 증가 (0.5 -> 0.6)
            gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
            gradient.addColorStop(0.4, `rgba(255, 255, 255, ${alpha * 0.8})`);
            gradient.addColorStop(0.7, `rgba(255, 255, 255, ${alpha * 0.4})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(
                centerX - currentSize * 1.3,
                centerY - currentSize * 1.3,
                currentSize * 2.6,
                currentSize * 2.6
            );
        });

        // 메인 구름 블러 감소 (15px -> 8px)
        ctx.filter = 'blur(8px)';

        cloud.segments.forEach((segment, index) => {
            const centerX = cloud.x + segment.offsetX;
            const centerY = cloud.y + segment.offsetY;
            
            const segmentPulse = Math.sin(time + segment.pulseOffset) * 0.1;
            const currentSize = segment.size * (cloud.sizeMultiplier + segmentPulse);

            const points = [];
            const numPoints = 12;
            for (let i = 0; i <= numPoints; i++) {
                const angle = (i / numPoints) * Math.PI * 2;
                const radiusVariation = Math.sin(time * segment.pulseSpeed + i) * 0.1;
                const radius = currentSize * (0.8 + radiusVariation);
                const x = centerX + Math.cos(angle) * radius * (1 + Math.sin(time * 0.5) * 0.1);
                const y = centerY + Math.sin(angle) * radius * 0.6;
                points.push({x, y});
            }

            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 0; i < points.length - 1; i++) {
                const xc = (points[i].x + points[i + 1].x) / 2;
                const yc = (points[i].y + points[i + 1].y) / 2;
                ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
            }
            ctx.closePath();

            // 메인 구름 그라데이션 조정
            const gradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, currentSize
            );
            const alpha = segment.opacity * edgeAlpha;
            gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
            gradient.addColorStop(0.3, `rgba(255, 255, 255, ${alpha * 0.95})`);
            gradient.addColorStop(0.6, `rgba(255, 255, 255, ${alpha * 0.6})`);
            gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

            ctx.fillStyle = gradient;
            ctx.fill();
        });

        // 필터 리셋
        ctx.filter = 'none';
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        time += 0.016;

        // 구름 그리기 전에 캔버스 설정
        ctx.globalCompositeOperation = 'screen';  // 더 부드러운 블렌딩

        clouds.forEach((cloud, index) => {
            cloud.x += cloud.speed;
            
            if (cloud.x - cloud.baseSize > canvas.width) {
                clouds[index] = createCloud(-cloud.baseSize);
            }

            drawCloud(cloud);
        });

        animationFrame = requestAnimationFrame(animate);
    }

    onMount(() => {
        if (!browser) return;

        ctx = canvas.getContext('2d');
        
        function resize() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            
            const cloudCount = intensity === 'heavy' ? 8 : 
                             intensity === 'light' ? 3 : 5;
            
            clouds = Array(cloudCount).fill().map(() => createCloud());
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

<canvas bind:this={canvas} class="clouds-canvas"></canvas>

<style>
    .clouds-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 8;
    }
</style> 