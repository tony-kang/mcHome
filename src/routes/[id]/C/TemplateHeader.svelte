<script>
	import { page } from '$app/stores';
	
	let { counselorId } = $props();
	
	let isShrunk = $state(false);

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
<nav class="template-nav {isShrunk ? 'shrink' : 'expanded'}">
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
		top: var(--header-height, 70px);
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

	.nav-link {
		color: #333;
		text-decoration: none;
		font-weight: 600;
		padding: 2px 20px;
		border-radius: 8px;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-link:hover,
	.nav-link.active {
		background: #667eea;
		color: white;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.nav-links {
			gap: 10px;
			flex-wrap: wrap;
		}

		.nav-link {
			padding: 8px 15px;
			font-size: 0.9rem;
		}
	}
</style>
