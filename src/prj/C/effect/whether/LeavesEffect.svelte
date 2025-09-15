<script>
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';

    let {
        intensity = 'normal'
    } = $props();

    let canvas;
    let ctx;
    let leaves = [];
    let time = 0;
    let animationFrame;

    // 나뭇잎 이미지 로드
    let leafImages = [];
    const totalLeafImages = 10;

    function preloadImages() {
        for (let i = 1; i <= totalLeafImages; i++) {
            const img = new Image();
            const number = i.toString().padStart(3, '0');
            img.src = `images/leaf/leaf_${number}.png`;
            leafImages.push(img);
        }
    }

    function createLeaf(forceX = null) {
        const size = Math.random() * 37 + 20; // 35-75px (더 크게 조정)
        const windSpeed = Math.random() * 0.15 + 0.05;
        return {
            x: forceX ?? Math.random() * canvas.width,
            y: -size,
            size,
            speedX: Math.random() * 0.3 - 0.15,
            speedY: Math.random() * 0.4 + 0.2,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 0.8,
            swayFactor: Math.random() * 0.015 + 0.005,
            swayOffset: Math.random() * Math.PI * 2,
            windEffect: windSpeed,
            imageIndex: Math.floor(Math.random() * totalLeafImages),
            opacity: Math.random() * 0.15 + 0.85,
            scale: Math.random() * 0.2 + 0.9,    // 크기 변화 증가
            flutter: 0,
            flutterSpeed: Math.random() * 0.015 + 0.005
        };
    }

    function drawLeaf(leaf) {
        if (!ctx || leafImages.length === 0) return;
        
        ctx.save();
        
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate((leaf.rotation * Math.PI) / 180);
        
        const flutterScale = 1 + Math.sin(leaf.flutter) * 0.015;
        const baseScale = leaf.size / 40 * leaf.scale;  // 기본 스케일 조정
        ctx.scale(baseScale * flutterScale, baseScale);
        
        ctx.globalAlpha = leaf.opacity;
        
        // 이미지로 나뭇잎 그리기
        const img = leafImages[leaf.imageIndex];
        const size = 45; // 이미지 기본 크기 증가
        ctx.drawImage(img, -size/2, -size/2, size, size);
        
        ctx.restore();
    }

    function animate() {
        if (!ctx || !canvas) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        time += 0.016;

        leaves.forEach((leaf, index) => {
            // 바람 효과
            const wind = Math.sin(time * 0.3) * leaf.windEffect;  // 바람 주기 증가
            
            // 좌우 흔들림과 바람 효과 결합
            leaf.x += leaf.speedX + Math.sin(time + leaf.swayOffset) * leaf.swayFactor * 15 + wind;
            leaf.y += leaf.speedY;
            
            // 회전 (바람 방향에 따라 회전 속도 변화)
            leaf.rotation += leaf.rotationSpeed + wind;
            
            // 펄럭임 효과 업데이트
            leaf.flutter += leaf.flutterSpeed;
            
            // 화면 밖으로 나간 낙엽 재생성
            if (leaf.y > canvas.height || leaf.x < -50 || leaf.x > canvas.width + 50) {
                leaves[index] = createLeaf();
            }

            drawLeaf(leaf);
        });

        animationFrame = requestAnimationFrame(animate);
    }

    onMount(() => {
        if (!browser) return;

        ctx = canvas.getContext('2d');
        preloadImages();

        function resize() {
            if (!canvas) return;
            
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            
            const leafCount = intensity === 'heavy' ? 40 : 
                            intensity === 'light' ? 15 : 25;
            
            leaves = Array(leafCount).fill().map(() => createLeaf());
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

<canvas bind:this={canvas} class="leaves-canvas"></canvas>

<style>
    .leaves-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 8;
    }
</style> 