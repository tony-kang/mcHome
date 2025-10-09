<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import HeroSection from './C/HeroSection.svelte';
	import ProjectInfo from './C/ProjectInfo.svelte';
	import UnitTypes from './C/UnitTypes.svelte';
	import Community from './C/Community.svelte';
	import Location from './C/Location.svelte';
	import ___prj from '$prj/prjMain';
	import ___const from '$prj/lib/i_const';
	import favicon from '$lib/assets/favicon.svg';

	const complexId = $page.params.id;
	let complexData = $state(null);
	let loading = $state(true);

	async function loadComplexData() {
		try {
			const r = await ___prj.api.post('/s/system', 'get.complex.config', null, {
				complexId: complexId
			});

			if (r.data.result === ___const.OK) {
				complexData = r.data.content;
			}
		} catch (error) {
			console.error('단지 정보 로드 오류:', error);
		} finally {
			loading = false;
		}

		// 임시 데이터 (개발용)
		complexData = {
            id: '2',
			name: '센터스퀘어 발산',
			slogan: '신분당선 탄다 · 센터스퀘어 발산 산다',
			subSlogan: '수지를 빛내는 센터스퀘어 발산 타운, 나의 프라이드가 되다!',
			phone: '02-1234-5678',
			address: '서울특별시 강서구 공항대로 302',
			developer: '온동네(주)',
			constructor: '온동네(주)',
			status: 'presale' // presale(분양), contract(청약), move_in(입주)
		};
		loading = false;
	}

	onMount(() => {
		loadComplexData();
	});
</script>

<svelte:head>
	<title>{complexData?.name || '단지명'} - 프리미엄 아파트</title>
	<link rel="icon" href={favicon} />
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
	<meta name="description" content="{complexData?.name || '단지명'} - {complexData?.slogan || '품격있는 삶의 시작'}" />
	<meta property="og:title" content="{complexData?.name || '단지명'}" />
	<meta property="og:description" content="{complexData?.slogan || '품격있는 삶의 시작'}" />
	<meta property="og:type" content="website" />
</svelte:head>

{#if loading}
	<div class="c-loading">
		<div class="c-loading-spinner"></div>
		<p>로딩 중...</p>
	</div>
{:else if complexData}
	<!-- Hero Section - 메인 비주얼 -->
	<HeroSection {complexData} />

	<!-- Project Info - 프로젝트 개요 -->
	<ProjectInfo {complexData} />

	<!-- Unit Types - 평면 타입 -->
	<UnitTypes />

	<!-- Community - 커뮤니티 시설 -->
	<Community />

	<!-- Location - 위치 안내 -->
	<Location {complexData} />

	<!-- Contact CTA Section -->
	<section class="cta-section">
		<div class="c-container">
			<div class="cta-content">
				<h2 class="cta-title">지금 바로 상담받으세요</h2>
				<p class="cta-subtitle">
					{complexData.name}의 상세한 정보와 특별한 혜택을 안내해 드립니다
				</p>
				<div class="cta-info">
					<div class="cta-phone">
						<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
							<path d="M28 23.5C28 23.9 27.9 24.3 27.7 24.7C27.5 25.1 27.2 25.5 26.8 25.8C26 26.5 25.1 27 24.1 27.3C23.1 27.6 22 27.8 20.8 27.8C19 27.8 17.1 27.4 15.1 26.5C13.1 25.6 11.1 24.4 9.1 22.9C7.1 21.4 5.2 19.7 3.4 17.8C1.6 15.9 0 14 0.5 12C0.8 10.9 1.3 10 2 9.2C2.3 8.8 2.7 8.5 3.1 8.3C3.5 8.1 3.9 8 4.3 8C4.5 8 4.8 8.1 5 8.2C5.2 8.3 5.4 8.5 5.5 8.8L8.2 13.5C8.3 13.7 8.4 13.9 8.5 14.1C8.6 14.3 8.6 14.5 8.6 14.7C8.6 14.9 8.5 15.2 8.4 15.4C8.3 15.7 8.1 15.9 7.9 16.2L7 17.2C7 17.3 6.9 17.4 6.9 17.5C6.9 17.6 6.9 17.7 6.9 17.8C7 18.1 7.2 18.5 7.5 18.9C8.1 19.6 8.8 20.3 9.7 21.1C10.5 22 11.3 22.7 12 23.3C12.4 23.6 12.8 23.8 13.1 23.9C13.2 23.9 13.3 23.9 13.4 23.9C13.5 23.9 13.6 23.9 13.7 23.9L14.7 23C15 22.7 15.3 22.5 15.5 22.4C15.8 22.3 16 22.2 16.2 22.2C16.4 22.2 16.6 22.3 16.8 22.3C17 22.4 17.2 22.5 17.4 22.6L22.2 25.4C22.5 25.6 22.7 25.8 22.8 26.1C22.9 26.3 23 26.5 23 26.8C23 27.1 22.9 27.4 22.8 27.7C22.7 28 22.5 28.3 22.2 28.6C21.9 29 21.5 29.3 21 29.5C20.5 29.7 20 29.8 19.4 29.8H28Z" fill="currentColor"/>
						</svg>
						<div>
							<span class="phone-label">분양문의</span>
							<span class="phone-number">{complexData.phone}</span>
						</div>
					</div>
					<div class="cta-time">
						<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
							<circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="2" fill="none"/>
							<path d="M16 8V16L22 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
						</svg>
						<div>
							<span class="time-label">상담시간</span>
							<span class="time-text">평일 10:00 - 18:00</span>
						</div>
					</div>
				</div>
				<div class="cta-buttons">
					<a href="/complex/{complexId}/contact" class="c-btn c-btn-primary c-btn-large">
						상담 신청하기
					</a>
					<a href="/complex/{complexId}/units" class="c-btn c-btn-gold c-btn-large">
						평면도 보기
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Quick Menu - 플로팅 버튼 -->
	<div class="quick-menu">
		<a href="tel:{complexData.phone}" class="quick-btn phone" aria-label="전화 상담">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
				<path d="M22 16.92V19.92C22 20.49 21.54 20.95 20.97 20.99C20.9 21 20.83 21 20.76 21C9.91 21 1 12.09 1 1.24C1 0.66 1.46 0.16 2.04 0.13C2.11 0.12 2.18 0.12 2.25 0.12H5.25C5.82 0.12 6.28 0.58 6.32 1.15C6.36 1.64 6.43 2.12 6.54 2.59C6.67 3.16 6.46 3.75 5.99 4.14L4.21 5.62C5.38 8.94 7.94 11.5 11.26 12.67L12.74 10.89C13.13 10.42 13.72 10.21 14.29 10.34C14.76 10.45 15.24 10.52 15.73 10.56C16.3 10.6 16.76 11.06 16.76 11.63V14.63C16.76 15.2 16.3 15.66 15.73 15.7C15.66 15.71 15.59 15.71 15.52 15.71" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
			<span>전화</span>
		</a>
		<a href="/complex/{complexId}/contact" class="quick-btn consult" aria-label="상담 신청">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
				<path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
			<span>상담</span>
		</a>
		<button class="quick-btn top" onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="맨 위로">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
				<path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
			<span>TOP</span>
		</button>
	</div>

{:else}
	<div class="error-container">
		<h1>단지를 찾을 수 없습니다</h1>
		<p>요청하신 페이지가 존재하지 않습니다.</p>
		<a href="/" class="c-btn c-btn-primary">홈으로 돌아가기</a>
	</div>
{/if}

<style>
	/* CTA Section */
	.cta-section {
		background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
		color: white;
		padding: 100px 0;
		text-align: center;
	}

	.cta-content {
		max-width: 800px;
		margin: 0 auto;
	}

	.cta-title {
		font-size: 2.5rem;
		font-weight: 700;
		margin: 0 0 20px 0;
		letter-spacing: -0.5px;
	}

	.cta-subtitle {
		font-size: 1.2rem;
		opacity: 0.95;
		margin: 0 0 50px 0;
		line-height: 1.6;
	}

	.cta-info {
		display: flex;
		justify-content: center;
		gap: 60px;
		margin-bottom: 50px;
	}

	.cta-phone,
	.cta-time {
		display: flex;
		align-items: center;
		gap: 15px;
	}

	.cta-phone svg,
	.cta-time svg {
		color: var(--secondary-color);
		flex-shrink: 0;
	}

	.cta-phone div,
	.cta-time div {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.phone-label,
	.time-label {
		font-size: 0.9rem;
		opacity: 0.8;
		margin-bottom: 5px;
	}

	.phone-number,
	.time-text {
		font-size: 1.3rem;
		font-weight: 700;
	}

	.cta-buttons {
		display: flex;
		gap: 20px;
		justify-content: center;
		flex-wrap: wrap;
	}

	/* Quick Menu */
	.quick-menu {
		position: fixed;
		right: 30px;
		bottom: 30px;
		display: flex;
		flex-direction: column;
		gap: 15px;
		z-index: 90;
	}

	.quick-btn {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 3px;
		text-decoration: none;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		transition: all 0.3s ease;
		border: none;
		cursor: pointer;
	}

	.quick-btn span {
		font-size: 0.7rem;
		font-weight: 600;
	}

	.quick-btn.phone {
		background: var(--secondary-color);
		color: white;
	}

	.quick-btn.consult {
		background: var(--primary-color);
		color: white;
	}

	.quick-btn.top {
		background: rgba(0, 0, 0, 0.6);
		color: white;
	}

	.quick-btn:hover {
		transform: translateY(-5px) scale(1.1);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
	}

	/* Error Container */
	.error-container {
		min-height: 60vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 60px 20px;
		text-align: center;
	}

	.error-container h1 {
		font-size: 2rem;
		color: var(--text-dark);
		margin: 0 0 20px 0;
	}

	.error-container p {
		font-size: 1.1rem;
		color: var(--text-gray);
		margin: 0 0 40px 0;
	}

	/* 반응형 */
	@media (max-width: 768px) {
		.cta-section {
			padding: 60px 0;
		}

		.cta-title {
			font-size: 2rem;
		}

		.cta-subtitle {
			font-size: 1.1rem;
		}

		.cta-info {
			flex-direction: column;
			gap: 30px;
		}

		.cta-phone,
		.cta-time {
			justify-content: center;
		}

		.cta-buttons {
			flex-direction: column;
			align-items: stretch;
		}

		.cta-buttons .c-btn {
			width: 100%;
			max-width: 350px;
			margin: 0 auto;
		}

		.quick-menu {
			right: 20px;
			bottom: 20px;
		}

		.quick-btn {
			width: 55px;
			height: 55px;
		}
	}

	@media (max-width: 480px) {
		.cta-title {
			font-size: 1.6rem;
		}

		.cta-subtitle {
			font-size: 1rem;
		}

		.phone-number,
		.time-text {
			font-size: 1.1rem;
		}

		.quick-menu {
			right: 15px;
			bottom: 15px;
		}

		.quick-btn {
			width: 50px;
			height: 50px;
		}

		.quick-btn svg {
			width: 20px;
			height: 20px;
		}

		.quick-btn span {
			font-size: 0.65rem;
		}
	}
</style>

