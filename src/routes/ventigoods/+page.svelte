<script>
    import { onMount } from 'svelte';

    let currentSlide = $state(0);
    let isScrolled = $state(false);

    const slides = [
        {
            title: "트렌디한 라이프스타일 굿즈",
            subtitle: "당신의 일상을 특별하게",
            description: "벤티굿즈가 선별한 감성 아이템",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop"
        },
        {
            title: "프리미엄 셀렉션",
            subtitle: "엄선된 제품만을",
            description: "품질과 디자인을 모두 만족시키는",
            image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=600&fit=crop"
        },
        {
            title: "특별한 선물",
            subtitle: "소중한 사람에게",
            description: "마음을 담은 기프트 패키지",
            image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&h=600&fit=crop"
        }
    ];

    const categories = [
        { icon: "🏠", name: "홈 데코", desc: "공간을 빛내는 인테리어 소품" },
        { icon: "📱", name: "테크 액세서리", desc: "스마트한 디지털 라이프" },
        { icon: "👜", name: "패션 소품", desc: "스타일을 완성하는 아이템" },
        { icon: "🎁", name: "기프트 세트", desc: "특별한 선물 패키지" },
        { icon: "✍️", name: "문구 용품", desc: "감성 가득한 스테이셔너리" },
        { icon: "🌿", name: "라이프스타일", desc: "일상을 풍요롭게" }
    ];

    const features = [
        {
            icon: "✨",
            title: "큐레이션",
            desc: "트렌드와 품질을 고려한 전문가 선별 상품"
        },
        {
            icon: "🚚",
            title: "빠른 배송",
            desc: "주문 후 1-2일 내 전국 배송"
        },
        {
            icon: "💳",
            title: "안전 결제",
            desc: "다양한 결제 수단과 보안 시스템"
        },
        {
            icon: "🔄",
            title: "교환/환불",
            desc: "14일 이내 무료 교환 및 환불"
        }
    ];

    const testimonials = [
        {
            name: "김민지",
            rating: 5,
            comment: "제품 품질이 정말 좋아요! 선물용으로 구매했는데 받는 분이 너무 좋아했어요.",
            date: "2024-01-15"
        },
        {
            name: "이준호",
            rating: 5,
            comment: "배송도 빠르고 포장도 깔끔해서 만족합니다. 재구매 의향 100%!",
            date: "2024-01-12"
        },
        {
            name: "박서연",
            rating: 5,
            comment: "감성 넘치는 제품들이 많아요. 쇼핑하는 재미가 있습니다!",
            date: "2024-01-10"
        }
    ];

    onMount(() => {
        const interval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
        }, 5000);

        const handleScroll = () => {
            isScrolled = window.scrollY > 50;
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            clearInterval(interval);
            window.removeEventListener('scroll', handleScroll);
        };
    });

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
    }

    function prevSlide() {
        currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    }

    function goToSlide(index) {
        currentSlide = index;
    }
</script>

<svelte:head>
    <title>벤티굿즈 - 트렌디한 라이프스타일 쇼핑몰</title>
    <meta name="description" content="벤티굿즈는 감성 넘치는 라이프스타일 굿즈를 제공하는 프리미엄 쇼핑몰입니다." />
</svelte:head>

<!-- 헤더 -->
<header class="header" class:scrolled={isScrolled}>
    <div class="header-content">
        <div class="logo">
            <a href="/ventigoods">
                <h1>🛍️ VentiGoods</h1>
            </a>
        </div>
        <nav class="nav">
            <a href="/ventigoods">홈</a>
            <a href="/ventigoods/products">상품</a>
            <a href="/ventigoods/about">소개</a>
            <a href="/ventigoods/contact">문의</a>
            <a href="/ventigoods/admin" class="admin-link">관리자</a>
        </nav>
        <div class="header-actions">
            <button class="icon-btn" aria-label="검색">🔍</button>
            <button class="icon-btn" aria-label="장바구니">🛒</button>
            <button class="icon-btn" aria-label="내 정보">👤</button>
        </div>
    </div>
</header>

<!-- 히어로 섹션 -->
<section class="hero">
    <div class="hero-slider">
        {#each slides as slide, index}
            <div class="slide" class:active={currentSlide === index} style="background-image: url({slide.image})">
                <div class="slide-overlay"></div>
                <div class="slide-content">
                    <p class="slide-subtitle">{slide.subtitle}</p>
                    <h2 class="slide-title">{slide.title}</h2>
                    <p class="slide-description">{slide.description}</p>
                    <button class="btn-primary">쇼핑하기</button>
                </div>
            </div>
        {/each}
    </div>
    
    <button class="slider-btn prev" onclick={prevSlide} aria-label="이전 슬라이드">‹</button>
    <button class="slider-btn next" onclick={nextSlide} aria-label="다음 슬라이드">›</button>
    
    <div class="slider-dots">
        {#each slides as _, index}
            <button 
                class="dot"
                class:active={currentSlide === index}
                onclick={() => goToSlide(index)}
                aria-label="슬라이드 {index + 1}로 이동"
            ></button>
        {/each}
    </div>
</section>

<!-- 카테고리 섹션 -->
<section class="categories">
    <div class="container">
        <h2 class="section-title">카테고리</h2>
        <div class="category-grid">
            {#each categories as category}
                <div class="category-card">
                    <div class="category-icon">{category.icon}</div>
                    <h3>{category.name}</h3>
                    <p>{category.desc}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- 특징 섹션 -->
<section class="features">
    <div class="container">
        <h2 class="section-title">Why VentiGoods?</h2>
        <div class="features-grid">
            {#each features as feature}
                <div class="feature-card">
                    <div class="feature-icon">{feature.icon}</div>
                    <h3>{feature.title}</h3>
                    <p>{feature.desc}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- 베스트 상품 섹션 -->
<section class="best-products">
    <div class="container">
        <h2 class="section-title">베스트 상품</h2>
        <div class="products-grid">
            {#each Array(6) as _, i}
                <div class="product-card">
                    <div class="product-image">
                        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop" alt="상품 {i+1}">
                        <div class="product-badge">NEW</div>
                    </div>
                    <div class="product-info">
                        <h4>프리미엄 상품 {i+1}</h4>
                        <p class="product-desc">감성 넘치는 라이프스타일 아이템</p>
                        <div class="product-footer">
                            <span class="price">{(29000 + i * 5000).toLocaleString()}원</span>
                            <button class="btn-cart">장바구니</button>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- 고객 후기 섹션 -->
<section class="testimonials">
    <div class="container">
        <h2 class="section-title">고객 후기</h2>
        <div class="testimonials-grid">
            {#each testimonials as review}
                <div class="testimonial-card">
                    <div class="rating">
                        {#each Array(review.rating) as _}
                            ⭐
                        {/each}
                    </div>
                    <p class="testimonial-comment">"{review.comment}"</p>
                    <div class="testimonial-author">
                        <strong>{review.name}</strong>
                        <span class="date">{review.date}</span>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- CTA 섹션 -->
<section class="cta">
    <div class="container">
        <h2>지금 바로 시작하세요</h2>
        <p>첫 구매 시 10% 할인 쿠폰을 드립니다!</p>
        <button class="btn-cta">회원가입하고 쿠폰 받기</button>
    </div>
</section>

<!-- 푸터 -->
<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-section">
                <h3>VentiGoods</h3>
                <p>트렌디한 라이프스타일을 제안하는<br>프리미엄 쇼핑몰</p>
            </div>
            <div class="footer-section">
                <h4>쇼핑 정보</h4>
                <ul>
                    <li><a href="/ventigoods/products">상품</a></li>
                    <li><a href="/ventigoods/events">이벤트</a></li>
                    <li><a href="/ventigoods/reviews">리뷰</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>고객 지원</h4>
                <ul>
                    <li><a href="/ventigoods/faq">자주 묻는 질문</a></li>
                    <li><a href="/ventigoods/shipping">배송 안내</a></li>
                    <li><a href="/ventigoods/returns">교환/환불</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>회사 정보</h4>
                <ul>
                    <li><a href="/ventigoods/about">회사 소개</a></li>
                    <li><a href="/ventigoods/contact">문의하기</a></li>
                    <li><a href="/ventigoods/admin">관리자</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 VentiGoods. All rights reserved.</p>
            <div class="footer-links">
                <a href="/terms">이용약관</a>
                <a href="/privacy">개인정보처리방침</a>
            </div>
        </div>
    </div>
</footer>

<style>
    :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    }

    /* 헤더 */
    .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        background: transparent;
        transition: all 0.3s ease;
    }

    .header.scrolled {
        background: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .header-content {
        max-width: 1400px;
        margin: 0 auto;
        padding: 20px 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .logo h1 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 700;
    }

    .logo a {
        text-decoration: none;
        color: white;
        transition: color 0.3s ease;
    }

    .header.scrolled .logo a {
        color: #333;
    }

    .nav {
        display: flex;
        gap: 30px;
    }

    .nav a {
        text-decoration: none;
        color: white;
        font-weight: 500;
        transition: all 0.3s ease;
        position: relative;
    }

    .header.scrolled .nav a {
        color: #333;
    }

    .nav a:hover {
        color: #ff6b6b;
    }

    .nav a.admin-link {
        color: #ff6b6b;
        font-weight: 600;
    }

    .header-actions {
        display: flex;
        gap: 15px;
    }

    .icon-btn {
        background: transparent;
        border: 2px solid white;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        transition: all 0.3s ease;
    }

    .header.scrolled .icon-btn {
        border-color: #333;
        color: #333;
    }

    .icon-btn:hover {
        background: #ff6b6b;
        border-color: #ff6b6b;
        color: white;
        transform: translateY(-2px);
    }

    /* 히어로 섹션 */
    .hero {
        position: relative;
        height: 600px;
        overflow: hidden;
    }

    .hero-slider {
        position: relative;
        height: 100%;
    }

    .slide {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        opacity: 0;
        transition: opacity 1s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .slide.active {
        opacity: 1;
    }

    .slide-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3));
    }

    .slide-content {
        position: relative;
        z-index: 1;
        text-align: center;
        color: white;
        max-width: 800px;
        padding: 0 20px;
    }

    .slide-subtitle {
        font-size: 1.2rem;
        margin-bottom: 15px;
        opacity: 0.9;
    }

    .slide-title {
        font-size: 3.5rem;
        font-weight: 700;
        margin: 0 0 20px 0;
        line-height: 1.2;
    }

    .slide-description {
        font-size: 1.3rem;
        margin-bottom: 30px;
        opacity: 0.9;
    }

    .btn-primary {
        padding: 15px 40px;
        background: linear-gradient(135deg, #ff6b6b, #ff8e53);
        color: white;
        border: none;
        border-radius: 50px;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .btn-primary:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);
    }

    .slider-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(10px);
        border: none;
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 2rem;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 10;
    }

    .slider-btn:hover {
        background: rgba(255, 255, 255, 0.5);
        transform: translateY(-50%) scale(1.1);
    }

    .slider-btn.prev {
        left: 30px;
    }

    .slider-btn.next {
        right: 30px;
    }

    .slider-dots {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 10px;
        z-index: 10;
    }

    .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .dot.active {
        background: white;
        width: 30px;
        border-radius: 6px;
    }

    /* 공통 섹션 */
    .container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 40px;
    }

    section {
        padding: 80px 0;
    }

    .section-title {
        font-size: 2.5rem;
        font-weight: 700;
        text-align: center;
        margin-bottom: 50px;
        color: #333;
    }

    /* 카테고리 */
    .categories {
        background: #f9f9f9;
    }

    .category-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 30px;
    }

    .category-card {
        background: white;
        padding: 40px 30px;
        border-radius: 15px;
        text-align: center;
        transition: all 0.3s ease;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .category-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .category-icon {
        font-size: 3rem;
        margin-bottom: 20px;
    }

    .category-card h3 {
        font-size: 1.3rem;
        margin-bottom: 10px;
        color: #333;
    }

    .category-card p {
        color: #666;
        font-size: 0.95rem;
    }

    /* 특징 */
    .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 40px;
    }

    .feature-card {
        text-align: center;
    }

    .feature-icon {
        font-size: 3.5rem;
        margin-bottom: 20px;
    }

    .feature-card h3 {
        font-size: 1.3rem;
        margin-bottom: 15px;
        color: #333;
    }

    .feature-card p {
        color: #666;
        line-height: 1.6;
    }

    /* 상품 */
    .best-products {
        background: #f9f9f9;
    }

    .products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 30px;
    }

    .product-card {
        background: white;
        border-radius: 15px;
        overflow: hidden;
        transition: all 0.3s ease;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .product-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    }

    .product-image {
        position: relative;
        width: 100%;
        height: 300px;
        overflow: hidden;
    }

    .product-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
    }

    .product-card:hover .product-image img {
        transform: scale(1.1);
    }

    .product-badge {
        position: absolute;
        top: 15px;
        right: 15px;
        background: #ff6b6b;
        color: white;
        padding: 5px 15px;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 600;
    }

    .product-info {
        padding: 25px;
    }

    .product-info h4 {
        font-size: 1.2rem;
        margin-bottom: 10px;
        color: #333;
    }

    .product-desc {
        color: #666;
        font-size: 0.9rem;
        margin-bottom: 15px;
    }

    .product-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .price {
        font-size: 1.3rem;
        font-weight: 700;
        color: #ff6b6b;
    }

    .btn-cart {
        padding: 8px 20px;
        background: #333;
        color: white;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .btn-cart:hover {
        background: #ff6b6b;
        transform: translateY(-2px);
    }

    /* 고객 후기 */
    .testimonials-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 30px;
    }

    .testimonial-card {
        background: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
    }

    .rating {
        font-size: 1.3rem;
        margin-bottom: 15px;
    }

    .testimonial-comment {
        font-size: 1rem;
        line-height: 1.6;
        color: #555;
        margin-bottom: 20px;
    }

    .testimonial-author {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .testimonial-author strong {
        color: #333;
    }

    .date {
        color: #999;
        font-size: 0.85rem;
    }

    /* CTA */
    .cta {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        text-align: center;
    }

    .cta h2 {
        font-size: 2.5rem;
        margin-bottom: 15px;
    }

    .cta p {
        font-size: 1.2rem;
        margin-bottom: 30px;
        opacity: 0.9;
    }

    .btn-cta {
        padding: 15px 40px;
        background: white;
        color: #667eea;
        border: none;
        border-radius: 50px;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .btn-cta:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);
    }

    /* 푸터 */
    .footer {
        background: #2d3748;
        color: #cbd5e0;
        padding: 60px 0 30px;
    }

    .footer-content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 40px;
        margin-bottom: 40px;
    }

    .footer-section h3 {
        font-size: 1.5rem;
        margin-bottom: 15px;
        color: white;
    }

    .footer-section h4 {
        font-size: 1.1rem;
        margin-bottom: 15px;
        color: white;
    }

    .footer-section p {
        line-height: 1.6;
        opacity: 0.8;
    }

    .footer-section ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .footer-section li {
        margin-bottom: 10px;
    }

    .footer-section a {
        color: #cbd5e0;
        text-decoration: none;
        transition: color 0.3s ease;
    }

    .footer-section a:hover {
        color: #ff6b6b;
    }

    .footer-bottom {
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        padding-top: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .footer-links {
        display: flex;
        gap: 20px;
    }

    .footer-links a {
        color: #cbd5e0;
        text-decoration: none;
        font-size: 0.9rem;
    }

    .footer-links a:hover {
        color: white;
    }

    /* 반응형 */
    @media (max-width: 768px) {
        .header-content {
            padding: 15px 20px;
        }

        .nav {
            display: none;
        }

        .hero {
            height: 500px;
        }

        .slide-title {
            font-size: 2rem;
        }

        .slide-description {
            font-size: 1rem;
        }

        .slider-btn {
            width: 40px;
            height: 40px;
            font-size: 1.5rem;
        }

        .slider-btn.prev {
            left: 15px;
        }

        .slider-btn.next {
            right: 15px;
        }

        .container {
            padding: 0 20px;
        }

        section {
            padding: 50px 0;
        }

        .section-title {
            font-size: 2rem;
        }

        .category-grid,
        .products-grid {
            grid-template-columns: 1fr;
        }

        .features-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
        }

        .footer-bottom {
            flex-direction: column;
            gap: 20px;
            text-align: center;
        }
    }
</style>

