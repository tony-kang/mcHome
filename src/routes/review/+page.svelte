<script>
    import { onMount } from 'svelte';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import ___const from "$prj/lib/i_const";
    import ___prj from "$prj/prjMain";
    import ___log from "$prj/lib/i_log";
    import { _color } from "$prj/lib/i_etc";
    import { getContext } from 'svelte';

    let reviewList = $state([]);
    const apiName = '/mc/counseling';

    // 연령대 매핑
    const ageIndexMap = {
        0: '미설정',
        1: '영유아',
        2: '초등학생',
        3: '중학교 1학년',
        4: '중학교 2학년',
        5: '중학교 2학년',
        6: '중학교 3학년',
        7: '고등학교 1학년',
        8: '고등학교 2학년',
        9: '고등학교 3학년',
        10: '대학생',
        11: '대학원생',
        12: '취업준비생',
        13: '직장인',
        14: '사업가',
        15: '일반인',
    };

    // 성별 매핑
    const genderMap = {
        1: '남성',
        2: '여성',
    };

    onMount(async () => {
        const r = await ___prj.api.post(apiName, 'get.home.review.list', null, {});
        ___log.dev('review list r:', r);

        if (r.data.result === ___const.OK) {
            reviewList = r.data.content;
        }
    });
</script>

<svelte:head>
    <title>상담 후기 - 마인드코딩 | 진로 상담 및 심리 검사 후기</title>
    <meta name="description" content="마인드코딩의 진로 상담과 PTI:CODE 검사를 경험한 고객들의 진솔한 후기를 확인해보세요. 실제 상담 경험담과 변화 사례를 만나보실 수 있습니다." />
</svelte:head>

<Header />

<main class="review-page">
    <!-- Hero Section -->
    <section class="hero-section">
        <div class="container">
            <div class="hero-content">
                <h1 class="hero-title">상담 후기</h1>
                <p class="hero-subtitle">진로 상담 및 심리 검사 후기</p>
                <p class="hero-description">
                    마인드코딩의 상담을 경험한 고객들의<br>
                    진솔한 후기를 확인해보세요.
                </p>
            </div>
        </div>
    </section>

    <!-- Reviews Section -->
    <section class="reviews-section">
        <div class="container">
            <h2>고객 후기</h2>
            {#if reviewList.length > 0}
                <div class="reviews-grid">
                    {#each reviewList as review}
                        <div class="review-card">
                            <div class="review-header">
                                <div class="review-info">
                                    <span class="service-name">{review.service_name || '진로 상담'}</span>
                                    <span class="counseling-date">{review.counseling_date}</span>
                                </div>
                            </div>
                            <div class="review-content">
                                <p>"{review.review}"</p>
                            </div>
                            <div class="review-author">
                                <div class="author-info">
                                    <strong>{review.last_name}○○</strong>
                                    <span class="author-details">
                                        {genderMap[review.sex]} · {ageIndexMap[review.age_idx]}
                                        {#if review.with_parent}
                                            · 부모님과 함께
                                        {/if}
                                    </span>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            {:else}
                <div class="no-reviews">
                    <p>아직 등록된 후기가 없습니다.</p>
                </div>
            {/if}
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
        <div class="container">
            <div class="cta-content">
                <h2>상담을 받아보세요</h2>
                <p>전문 상담사와 함께 여러분의 진로를 설계해보세요.</p>
                <div class="cta-buttons">
                    <a href="/contact" class="btn-primary">상담 신청</a>
                    <a href="/services/pti-code" class="btn-secondary">PTI:CODE 검사 알아보기</a>
                </div>
            </div>
        </div>
    </section>
</main>

<Footer />

<style>
    .review-page {
        margin-top: 70px;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    }

    /* Hero Section */
    .hero-section {
        background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
        color: #fff;
        padding: 100px 0;
        text-align: center;
    }

    .hero-title {
        font-size: 3.5rem;
        font-weight: 700;
        margin: 0 0 10px 0;
    }

    .hero-subtitle {
        font-size: 1.5rem;
        font-weight: 300;
        margin: 0 0 30px 0;
        opacity: 0.9;
    }

    .hero-description {
        font-size: 1.2rem;
        line-height: 1.8;
        max-width: 600px;
        margin: 0 auto;
        opacity: 0.95;
    }

    /* Reviews Section */
    .reviews-section {
        padding: 80px 0;
        background: #fff;
    }

    .reviews-section h2 {
        font-size: 2.5rem;
        font-weight: 700;
        color: #333;
        text-align: center;
        margin: 0 0 60px 0;
    }

    .reviews-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 30px;
    }

    .review-card {
        background: #f8f9fa;
        padding: 30px;
        border-radius: 12px;
        border-left: 4px solid #007bff;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .review-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .review-header {
        margin-bottom: 20px;
    }

    .review-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
    }

    .service-name {
        background: #007bff;
        color: #fff;
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 0.9rem;
        font-weight: 500;
    }

    .counseling-date {
        color: #666;
        font-size: 0.9rem;
    }

    .review-content {
        margin-bottom: 20px;
    }

    .review-content p {
        font-style: italic;
        color: #555;
        line-height: 1.6;
        margin: 0;
        font-size: 1.1rem;
    }

    .review-author {
        border-top: 1px solid #e9ecef;
        padding-top: 15px;
    }

    .author-info {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .author-info strong {
        color: #333;
        font-size: 1rem;
    }

    .author-details {
        color: #666;
        font-size: 0.9rem;
    }

    .no-reviews {
        text-align: center;
        padding: 60px 20px;
        color: #666;
    }

    .no-reviews p {
        font-size: 1.2rem;
        margin: 0;
    }

    /* CTA Section */
    .cta-section {
        padding: 80px 0;
        background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
        color: #fff;
        text-align: center;
    }

    .cta-content h2 {
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0 0 20px 0;
    }

    .cta-content p {
        font-size: 1.2rem;
        margin: 0 0 40px 0;
        opacity: 0.9;
    }

    .cta-buttons {
        display: flex;
        gap: 20px;
        justify-content: center;
        flex-wrap: wrap;
    }

    .btn-primary,
    .btn-secondary {
        padding: 15px 30px;
        border-radius: 25px;
        text-decoration: none;
        font-weight: 600;
        font-size: 1.1rem;
        transition: all 0.3s ease;
    }

    .btn-primary {
        background: #fff;
        color: #007bff;
    }

    .btn-primary:hover {
        background: #f8f9fa;
        transform: translateY(-2px);
    }

    .btn-secondary {
        background: transparent;
        color: #fff;
        border: 2px solid #fff;
    }

    .btn-secondary:hover {
        background: #fff;
        color: #007bff;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .hero-title {
            font-size: 2.5rem;
        }

        .hero-subtitle {
            font-size: 1.2rem;
        }

        .hero-description {
            font-size: 1rem;
        }

        .reviews-section h2,
        .cta-content h2 {
            font-size: 2rem;
        }

        .reviews-grid {
            grid-template-columns: 1fr;
        }

        .review-info {
            flex-direction: column;
            align-items: flex-start;
        }

        .cta-buttons {
            flex-direction: column;
            align-items: center;
        }

        .btn-primary,
        .btn-secondary {
            width: 100%;
            max-width: 280px;
        }
    }

    @media (max-width: 480px) {
        .container {
            padding: 0 15px;
        }

        .hero-section {
            padding: 60px 0;
        }

        .reviews-section {
            padding: 60px 0;
        }

        .cta-section {
            padding: 60px 0;
        }

        .review-card {
            padding: 20px;
        }

        .reviews-grid {
            grid-template-columns: 1fr;
            gap: 20px;
        }
    }
</style>
