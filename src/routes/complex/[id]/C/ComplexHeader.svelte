<script>
	import { page } from '$app/stores';
	import ___prj from '$prj/prjMain';
	
	let { complexId, complexData } = $props();
	
	let isShrunk = $state(false);
	let isMenuOpen = $state(false);
	let complexNavTop = $state(100);

	$effect(() => {
		if (isShrunk) {
			if (___prj.screenSize === 'screen768') {
				complexNavTop = 60;
			} else if (___prj.screenSize === 'screen480') {
				complexNavTop = 60;
			} else {
				complexNavTop = 100;
			}
		} else {
			if (___prj.screenSize === 'screen768') {
				complexNavTop = 60;
			} else if (___prj.screenSize === 'screen480') {
				complexNavTop = 60;
			} else {
				complexNavTop = 100;
			}
		}
	});

	function onScroll() {
		isShrunk = window.scrollY > 30;
	}

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	// 현재 경로에 따라 active 클래스 적용
	const isActive = (path) => {
		const currentPath = $page.url.pathname;
		if (path === `/complex/${complexId}`) {
			return currentPath === `/complex/${complexId}`;
		}
		return currentPath.startsWith(path);
	};
</script>

<svelte:window onscroll={onScroll} />

<nav class="complex-nav {isShrunk ? 'shrink' : 'expanded'} {___prj.screenSize}" style:top={complexNavTop + 'px'}>
	<div class="nav-container">
		<a href="/complex/{complexId}" class="logo">
			<span class="logo-text">{complexData?.name || '단지명'}</span>
		</a>
		
		<!-- 모바일 메뉴 버튼 -->
		<button class="menu-toggle" onclick={toggleMenu} aria-label="메뉴">
			<span class="hamburger" class:open={isMenuOpen}></span>
		</button>

		<!-- 네비게이션 메뉴 -->
		<div class="nav-menu {isMenuOpen ? 'open' : ''}">
			<a href="/complex/{complexId}" class="nav-link" class:active={isActive(`/complex/${complexId}`)}>
				홈
			</a>
			<a href="/complex/{complexId}/info" class="nav-link" class:active={isActive(`/complex/${complexId}/info`)}>
				단지정보
			</a>
			<a href="/complex/{complexId}/units" class="nav-link" class:active={isActive(`/complex/${complexId}/units`)}>
				평면도
			</a>
			<a href="/complex/{complexId}/community" class="nav-link" class:active={isActive(`/complex/${complexId}/community`)}>
				커뮤니티
			</a>
			<a href="/complex/{complexId}/location" class="nav-link" class:active={isActive(`/complex/${complexId}/location`)}>
				위치안내
			</a>
			<a href="/complex/{complexId}/subscription" class="nav-link" class:active={isActive(`/complex/${complexId}/subscription`)}>
				청약신청
			</a>
			<a href="/complex/{complexId}/winners" class="nav-link" class:active={isActive(`/complex/${complexId}/winners`)}>
				당첨자발표
			</a>
			<a href="/complex/{complexId}/contact" class="nav-link" class:active={isActive(`/complex/${complexId}/contact`)}>
				분양문의
			</a>
		</div>

		<!-- 상담문의 버튼 -->
		<a href="/complex/{complexId}/contact" class="btn-consult">
			상담신청
		</a>
	</div>
</nav>

<style>
	.complex-nav {
		background: white;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		position: fixed;
		left: 0;
		right: 0;
		z-index: 100;
		transition: all 0.3s ease;
	}

	.complex-nav.shrink {
		height: 65px;
	}

	.complex-nav.expanded {
		height: 80px;
	}

	.nav-container {
		max-width: 1600px;
		margin: 0 auto;
		padding: 0 20px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
	}

	.logo {
		text-decoration: none;
		display: flex;
		align-items: center;
		flex-shrink: 0;
		min-width: 180px;
	}

	.logo-text {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--primary-color);
		letter-spacing: -0.5px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.menu-toggle {
		display: none;
		background: none;
		border: none;
		cursor: pointer;
		padding: 8px;
		z-index: 101;
	}

	.hamburger {
		display: block;
		width: 24px;
		height: 2px;
		background: var(--text-dark);
		position: relative;
		transition: all 0.3s ease;
	}

	.hamburger::before,
	.hamburger::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 2px;
		background: var(--text-dark);
		transition: all 0.3s ease;
	}

	.hamburger::before {
		top: -8px;
	}

	.hamburger::after {
		bottom: -8px;
	}

	.hamburger.open {
		background: transparent;
	}

	.hamburger.open::before {
		transform: rotate(45deg);
		top: 0;
	}

	.hamburger.open::after {
		transform: rotate(-45deg);
		bottom: 0;
	}

	.nav-menu {
		display: flex;
		align-items: center;
		gap: 3px;
		flex: 1;
		justify-content: center;
		overflow-x: auto;
		scrollbar-width: none;
	}

	.nav-menu::-webkit-scrollbar {
		display: none;
	}

	.nav-link {
		color: var(--text-dark);
		text-decoration: none;
		font-weight: 600;
		padding: 8px 12px;
		border-radius: 4px;
		transition: all 0.3s ease;
		font-size: 0.9rem;
		white-space: nowrap;
		flex-shrink: 0;
	}

	.nav-link:hover,
	.nav-link.active {
		background: var(--primary-color);
		color: white;
	}

	.btn-consult {
		background: var(--secondary-color);
		color: white;
		text-decoration: none;
		padding: 8px 20px;
		border-radius: 4px;
		font-weight: 600;
		font-size: 0.9rem;
		transition: all 0.3s ease;
		white-space: nowrap;
		flex-shrink: 0;
	}

	.btn-consult:hover {
		background: #B09551;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	/* 태블릿/작은 데스크톱 */
	@media (max-width: 1400px) {
		.nav-container {
			max-width: 100%;
			gap: 15px;
		}

		.logo {
			min-width: 150px;
		}

		.logo-text {
			font-size: 1rem;
		}

		.nav-link {
			padding: 8px 10px;
			font-size: 0.85rem;
		}

		.btn-consult {
			padding: 8px 16px;
			font-size: 0.85rem;
		}
	}

	/* 태블릿 */
	@media (max-width: 1024px) {
		.complex-nav.shrink {
			height: 60px;
		}

		.complex-nav.expanded {
			height: 70px;
		}

		.nav-container {
			padding: 0 15px;
			gap: 10px;
		}

		.logo {
			min-width: 130px;
		}

		.logo-text {
			font-size: 0.95rem;
		}

		.nav-link {
			padding: 6px 8px;
			font-size: 0.8rem;
		}

		.btn-consult {
			padding: 6px 14px;
			font-size: 0.8rem;
		}
	}

	/* 모바일 */
	@media (max-width: 768px) {
		.menu-toggle {
			display: block;
		}

		.nav-menu {
			position: fixed;
			top: 60px;
			left: 0;
			right: 0;
			background: white;
			flex-direction: column;
			padding: 20px;
			box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
			transform: translateY(-100%);
			opacity: 0;
			visibility: hidden;
			transition: all 0.3s ease;
			gap: 0;
		}

		.nav-menu.open {
			transform: translateY(0);
			opacity: 1;
			visibility: visible;
		}

		.nav-link {
			width: 100%;
			padding: 12px 20px;
			text-align: center;
			border-radius: 0;
			border-bottom: 1px solid var(--border-color);
		}

		.btn-consult {
			padding: 10px 20px;
		}

		.logo-text {
			font-size: 1rem;
		}
	}

	@media (max-width: 480px) {
		.nav-container {
			padding: 0 15px;
		}

		.logo-text {
			font-size: 0.9rem;
		}

		.btn-consult {
			padding: 8px 16px;
			font-size: 0.85rem;
		}
	}
</style>

