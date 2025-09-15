<script>
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';

    let {
        intensity = 'normal'
    } = $props();

    let canvas;
    let ctx;
    let raindrops = [];
    let time = 0;
    let animationFrame;
    let lastLightning = 0;
    let lightningAlpha = 0;
    let lightningPaths = [];

    // 빗방울 생성
    function createRaindrop() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            length: Math.random() * 20 + 10,
            speed: Math.random() * 15 + 15,
            thickness: Math.random() * 2 + 1
        };
    }

    // 번개 경로 생성
    function createLightningPath(startX, startY, angle, length) {
        const paths = [];
        let currentX = startX;
        let currentY = startY;
        
        // 주 번개 경로 생성
        const mainPoints = [];
        let segmentLength = canvas.height / (length - 1);
        
        // 주 번개 경로의 포인트 생성
        for (let i = 0; i < length; i++) {
            const deviation = Math.random() * 120 - 60; // 좌우 편차
            const x = currentX + deviation;
            const y = currentY + segmentLength;
            mainPoints.push({ x, y });
            currentX = x;
            currentY = y;
        }

        // 주 번개 경로 그리기
        for (let i = 0; i < mainPoints.length - 1; i++) {
            const start = mainPoints[i];
            const end = mainPoints[i + 1];
            
            // 중간 지점에 불규칙성 추가
            const midX = (start.x + end.x) / 2 + (Math.random() * 30 - 15);
            const midY = (start.y + end.y) / 2;

            paths.push({
                points: [
                    { x: start.x, y: start.y },
                    { x: midX, y: midY },
                    { x: end.x, y: end.y }
                ],
                alpha: 1,
                width: Math.random() * 2 + 2,
                isMain: true
            });

            // 작은 가지 번개 추가
            if (Math.random() < 0.3) {
                const branchAngle = Math.random() < 0.5 ? -0.5 : 0.5;
                const branchLength = Math.random() * 30 + 20;
                const endX = start.x + Math.cos(branchAngle) * branchLength;
                const endY = start.y + Math.sin(branchAngle) * branchLength;

                paths.push({
                    points: [
                        { x: start.x, y: start.y },
                        { x: endX, y: endY }
                    ],
                    alpha: 0.7,
                    width: 1,
                    isMain: false
                });
            }
        }

        return paths;
    }

    // 번개 생성
    function createLightning() {
        const startX = Math.random() * (canvas.width * 0.8) + canvas.width * 0.1;
        lightningPaths = createLightningPath(startX, 0, Math.PI / 2, 8);
        lastLightning = time;
        
        // 번개 소리 효과 (선택적)
        const thunder = new Audio('/sounds/thunder.mp3');
        thunder.volume = 0.3;
        thunder.play().catch(() => {});
    }

    // 빗방울 그리기
    function drawRaindrop(drop) {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + drop.length * 0.3, drop.y + drop.length);
        ctx.strokeStyle = `rgba(174, 194, 224, ${0.5})`;
        ctx.lineWidth = drop.thickness;
        ctx.lineCap = 'round';
        ctx.stroke();
    }

    // 번개 효과 그리기
    function drawLightning() {
        if (lightningPaths.length > 0) {
            // 배경 빛나는 효과
            ctx.fillStyle = `rgba(255, 255, 255, ${0.03})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 번개 선 그리기
            lightningPaths.forEach(path => {
                if (path.alpha <= 0) return;

                ctx.beginPath();
                if (path.points.length === 3) {
                    // 주 번개는 곡선으로 그리기
                    ctx.moveTo(path.points[0].x, path.points[0].y);
                    ctx.quadraticCurveTo(
                        path.points[1].x, path.points[1].y,
                        path.points[2].x, path.points[2].y
                    );
                } else {
                    // 가지 번개는 직선으로 그리기
                    ctx.moveTo(path.points[0].x, path.points[0].y);
                    ctx.lineTo(path.points[1].x, path.points[1].y);
                }

                // 내부 밝은 선
                ctx.strokeStyle = `rgba(255, 255, 255, ${path.alpha})`;
                ctx.lineWidth = path.width;
                ctx.stroke();

                // 외부 글로우
                ctx.strokeStyle = `rgba(150, 210, 255, ${path.alpha * 0.4})`;
                ctx.lineWidth = path.width + (path.isMain ? 6 : 3);
                ctx.stroke();

                // 더 빠른 페이드아웃
                path.alpha *= 0.85;
            });

            if (lightningPaths.every(path => path.alpha <= 0.05)) {
                lightningPaths = [];
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        time += 0.016;

        // 비 애니메이션
        raindrops.forEach((drop, index) => {
            drop.y += drop.speed;
            drop.x += drop.speed * 0.1;

            if (drop.y > canvas.height) {
                raindrops[index] = createRaindrop();
                raindrops[index].y = -20;
            }

            drawRaindrop(drop);
        });

        // 번개 효과
        drawLightning();

        // 랜덤하게 번개 생성
        if (lightningPaths.length === 0 && time - lastLightning > 4 && Math.random() < 0.005) {
            createLightning();
        }

        animationFrame = requestAnimationFrame(animate);
    }

    onMount(() => {
        if (!browser) return;

        ctx = canvas.getContext('2d');
        ctx.globalCompositeOperation = 'source-over';

        function resize() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            
            const dropCount = intensity === 'heavy' ? 300 : 
                            intensity === 'light' ? 100 : 200;
            
            raindrops = Array(dropCount).fill().map(createRaindrop);
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

<canvas bind:this={canvas} class="rain-lightning-canvas"></canvas>

<style>
    .rain-lightning-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 8;
        background-color: rgba(0, 0, 0, 0.3);
    }

    :global(body) {
        background-color: #1a1a1a;  /* 어두운 배경색 */
    }
</style> 