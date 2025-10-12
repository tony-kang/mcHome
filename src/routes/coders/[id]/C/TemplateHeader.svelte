<script>

import { page } from '$app/stores';
import ___prj from '$prj/prjMain';
	
	let { counselorId } = $props();
	
	let isShrunk = $state(false);
	let templateNavTop = $state(100);

	$effect(() => {
		if (isShrunk) {
			if (___prj.screenSize === 'screen768') {
				templateNavTop = 60;
			} else if (___prj.screenSize === 'screen480') {
				templateNavTop = 60;
			} else {
				templateNavTop = 100;
			}
		} else {
			if (___prj.screenSize === 'screen768') {
				templateNavTop = 60;
			} else if (___prj.screenSize === 'screen480') {
				templateNavTop = 60;
			} else {
				templateNavTop = 100;
			}
		}

		//console.log('onScroll----2----',isShrunk, templateNavTop);
	});

    function onScroll() {
        isShrunk = window.scrollY > 30;
    }

	// 현재 경로에 따라 active 클래스 적용
	const isActive = (path) => {
		const currentPath = $page.url.pathname;
		if (path === `/${counselorId}`) {
			return currentPath === `/${counselorId}`;
		}
		return currentPath.startsWith(path);
	};
</script>

<svelte:window onscroll={onScroll} />
<nav class="template-nav {isShrunk ? 'shrink' : 'expanded'} {___prj.screenSize}" style:top={templateNavTop + 'px'}>
	<div class="flex items-center justify-center gap-10 h-full">
		<a href="/{counselorId}" class="nav-link" class:active={isActive(`/${counselorId}`)}>홈</a>
		<a href="/{counselorId}/about" class="nav-link" class:active={isActive(`/${counselorId}/about`)}>소개</a>
		<a href="/{counselorId}/services" class="nav-link" class:active={isActive(`/${counselorId}/services`)}>서비스</a>
		<a href="/{counselorId}/booking" class="nav-link" class:active={isActive(`/${counselorId}/booking`)}>예약하기</a>
	</div>
</nav>

<style>
	.template-nav {
		background: white;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		position: fixed;
		left: 0;
		right: 0;
		z-index: 90;
		padding: 0 0;
		transition: top 0.3s ease;
	}

	.template-nav.shrink {
		height: 45px;
	}

	.template-nav.expanded {
		height: 65px;
	}

	/* 화면 크기별 스타일 */
	.template-nav.tablet.shrink {
		height: 40px;
	}

	.template-nav.tablet.expanded {
		height: 55px;
	}

	.template-nav.mobile.shrink {
		height: 35px;
	}

	.template-nav.mobile.expanded {
		height: 50px;
	}

	.nav-link {
		color: #333;
		text-decoration: none;
		font-weight: 600;
		padding: 2px 10px;
		border-radius: 8px;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1rem;
	}

	.nav-link:hover,
	.nav-link.active {
		background: #667eea;
		color: white;
	}

	/* 화면 크기별 네비게이션 링크 스타일 */
	.template-nav.tablet .nav-link {
		padding: 2px 15px;
		font-size: 1rem;
	}

	.template-nav.tablet .flex {
		gap: 8px;
	}

	.template-nav.mobile .nav-link {
		padding: 2px 10px;
		font-size: 1rem;
	}

	.template-nav.mobile .flex {
		gap: 5px;
	}
</style>
