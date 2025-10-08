<script>
	import { g_logedIn } from '$prj/prjStore';
	import ___prj from '$prj/prjMain';
	import ___const from '$prj/lib/i_const';
	import { ___toCurrency, ___isInArray } from '$prj/lib/i_telepasi';
	import { base64Decode } from '$prj/lib/i_util';
	import { goto } from '$app/navigation';

    let isShrunk = $state(false);
	let headerHeight = $state('100px');

	$effect(() => {
		if (___prj.screenSize === 'screen768') {
			headerHeight = isShrunk ? '80px' : '100px';
		} else if (___prj.screenSize === 'screen480') {
			headerHeight = isShrunk ? '60px' : '80px';
		}

        document.documentElement.style.setProperty('--header-height', headerHeight);
		//console.log('onScroll--------',isShrunk, headerHeight);
	});

    function onScroll() {
        isShrunk = window.scrollY > 30;
    }

	let isMenuOpen = $state(false);
	let isSubMenuOpen = $state(false);
	let openSubMenu = $state('');
	let mobileOpenSubMenu = $state('');
	let loginUserName = $state('');
	let apiVersion = $state('');
	let userInfoDropdown = $state(false);

	// 로그인 상태가 변경될 때 사용자 정보 업데이트
	$effect(() => {
		try {
			if ($g_logedIn && ___prj.user) {
				// console.log('___prj.user',___prj.user);
				loginUserName = base64Decode(___prj.user.userName) || ___prj.user.userName || '';
				apiVersion = ___prj.storage?.getItem(___const.API_VERSION) || ''; 
			} else {
				loginUserName = '';
				apiVersion = '';
				userInfoDropdown = false; // 드롭다운도 닫기
			}
		} catch (error) {
			console.error('Header: 로그인 상태 업데이트 오류:', error);
			loginUserName = '';
			apiVersion = '';
			userInfoDropdown = false;
		}
	});

	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
		// 모바일 메뉴가 열릴 때 서브메뉴 초기화
		if (!isMenuOpen) {
			mobileOpenSubMenu = '';
		}
	};

	const toggleMobileSubMenu = (menuName) => {
		mobileOpenSubMenu = mobileOpenSubMenu === menuName ? '' : menuName;
	};

	const handleLogout = () => {
		___prj.storage.clear();
		___prj.log.info('prjMain logout(3) - localStorage.clear() ');

		alert('로그아웃 완료');
		
		// 상태 초기화
		window.location.href = '/';
	};

	const openUserDropdown = () => {
		if ($g_logedIn) {
			userInfoDropdown = true;
		}
	};

	const closeUserDropdown = () => {
		userInfoDropdown = false;
	};

	// 드롭다운 외부 클릭 시 닫기
	const handleDropdownClick = (event) => {
		event.stopPropagation();
	};

	const gotoMove = (url) => {
		goto(url);
		userInfoDropdown = false;
	};
</script>

<svelte:window onscroll={onScroll} />

<header class={`header ${isShrunk ? 'shrink' : 'expanded'}`}>
	<div class="container">
		<div class="header-content">
			<!-- Logo -->
			<div class="logo">
				<a href="/">
					<img class="mt-2" src="/logo/mc_mindcoding_pattern_1_light.png" alt="마인드코딩" />
				</a>
			</div>

			<!-- Desktop Navigation -->
			<nav class="desktop-nav">
				<ul class="nav-list">
					<li><a href="/about">스토리</a></li>
					<li class="dropdown"
						onmouseenter={() => { isSubMenuOpen = true; openSubMenu = 'Services'}} 
						onmouseleave={() => { isSubMenuOpen = false; openSubMenu = ''}}>
						<a href="/services">서비스</a>
						{#if openSubMenu === 'Services'}
							<div class="dropdown-menu" style="min-width: 500px;">
								<div class="dropdown-section">
									<h4>핵심 서비스</h4>
									<ul>
										<li><a href="/services/pti-code">PTI:CODE</a></li>
										<li><a href="/services/psychological">심리재능</a></li>
										<li><a href="/services/learning-career">학습진로</a></li>
										<li><a href="/services/relationship">관계소통</a></li>
										<!-- <li><a href="/services/business">비즈니스</a></li> -->
									</ul>
								</div>
						<div class="dropdown-section">
							<h4>특별 프로그램</h4>
							<ul>
								<li><a href="/services/learning-camp">학습 캠프</a></li>
								<li><a href="/services/career-camp">진로 캠프</a></li>
								<li><a href="/services/workshop">워크숍</a></li>
							</ul>
						</div>
							</div>
						{/if}
					</li>
					<li><a href="/services/certification">자격과정</a></li>
					<li class="dropdown"
						onmouseenter={() => { isSubMenuOpen = true; openSubMenu = 'Support'}} 
						onmouseleave={() => { isSubMenuOpen = false; openSubMenu = ''}}>
						<a href="/contact">고객지원</a>
						{#if openSubMenu === 'Support'}
							<div class="dropdown-menu" style="min-width: 200px;">
								<div class="dropdown-section">
									<ul>
										<li><a href="/contact/counseling">나의 문의사항</a></li>
										<li><a href="/faq">자주묻는 질문</a></li>
										<li><a href="/privacy">개인정보처리방침</a></li>
										<li><a href="/terms">이용약관</a></li>
									</ul>
								</div>
							</div>
						{/if}
					</li>
					<li class="dropdown" 
						onmouseenter={() => { isSubMenuOpen = true; openSubMenu = 'Info'}} 
						onmouseleave={() => { isSubMenuOpen = false; openSubMenu = ''}}>
						<a href="/notice">커뮤니티</a>
						{#if openSubMenu === 'Info'}
							<div class="dropdown-menu" style="min-width: 200px;">
								<div class="dropdown-section">
									<ul>
										<li><a href="/notice">공지사항</a></li>
										<li><a href="/review">이용후기</a></li>
										<li><a href="/news">뉴스</a></li>
										<li><a href="/events">이벤트</a></li>
									</ul>
								</div>
							</div>
						{/if}
					</li>
				</ul>
			</nav>

			<!-- Auth Buttons -->
			<div class="auth-buttons">
				{#if $g_logedIn}
					<!-- 로그인된 상태 -->
					<div class="user-dropdown-container" onmouseover={openUserDropdown} onmouseleave={closeUserDropdown} onfocus={openUserDropdown} onblur={closeUserDropdown} onkeydown={(e) => e.key === 'Enter' && openUserDropdown()} role="button" tabindex="0">
						<button class="user-dropdown-btn" onclick={handleDropdownClick}>
							<span>✨{loginUserName}</span>
							<svg class="dropdown-arrow" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
							</svg>
						</button>
						
						{#if userInfoDropdown}
							<div class="user-dropdown" onclick={handleDropdownClick} onkeydown={(e) => e.key === 'Enter' && handleDropdownClick(e)} role="dialog" aria-modal="true" tabindex="-1">
								<div class="dropdown-content">
									<div class="user-info-section">
										<div class="user-name">{loginUserName}</div>
										<div class="user-email">{___prj.user.userEmail}</div>
									</div>
									<div class="user-stats">
										{#if ___prj.user.cLevel}
											<div class="stat-item">코칭레벨 <span class="stat-value">{___prj.user.cLevel}</span></div>
										{/if}
										<!-- <div class="stat-item">충전 포인트<span class="stat-value">{___toCurrency(___prj.user.bizPoint ?? 0)}</span></div>
										<div class="stat-item">보너스 포인트<span class="stat-value">{___toCurrency(___prj.user.bonusPoint ?? 0)}</span></div> -->
									</div>
									<!-- <div class="user-level">
										{#if ___isInArray(___prj.user.pLevel, [___const.P_ADMIN])}
											<div class="level-badge admin">사이트 관리자</div>
										{/if}
										{#if ___isInArray(___prj.user.pLevel, [___const.P_MAINTENANCE])}
											<div class="level-badge maintenance">유지보수 담당자</div>
										{/if}
										{#if ___isInArray(___prj.user.pLevel, [___const.P_DEVELOPER, ___const.P_MASTER])}
											<div class="level-badge developer">개발자</div>
										{/if}
									</div> -->
									<div class="dropdown-menu-buttons">
										<button class="dropdown-btn" onclick={() => gotoMove('/s/myPage')}>마이페이지</button>   
										<button class="dropdown-btn logout" onclick={handleLogout}>로그아웃</button>
									</div>
									<div class="version-info">
										<div class="version-text">WEB : {___prj.version} -----  API : {apiVersion}</div>
									</div>
								</div>
							</div>
						{/if}
					</div>
				{:else}
					<!-- 로그인되지 않은 상태 -->
					<a href="/s/signIn" class="btn-login" onclick={() => { userInfoDropdown = false; }}>로그인</a>
					<a href="/s/signUp" class="btn-join" onclick={() => { userInfoDropdown = false; }}>파트너 회원가입</a>
				{/if}
			</div>

			<!-- Mobile Menu Toggle -->
			<button class="mobile-menu-toggle" onclick={toggleMenu} aria-label="메뉴 열기/닫기">
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>

		<!-- Mobile Navigation -->
		{#if isMenuOpen}
			<nav class="mobile-nav">
				<ul class="mobile-nav-list">
					<li><a href="/about">스토리</a></li>
					<li class="mobile-dropdown">
						<button onclick={() => toggleMobileSubMenu('Services')}>서비스</button>
						{#if mobileOpenSubMenu === 'Services'}
							<ul class="mobile-dropdown-menu">
								<li class="mobile-dropdown-section">
									<h4>핵심 서비스</h4>
									<ul>
										<li><a href="/services/pti-code">PTI:CODE</a></li>
										<li><a href="/services/psychological">심리재능</a></li>
										<li><a href="/services/learning-career">학습진로</a></li>
										<li><a href="/services/relationship">관계소통</a></li>
										<li><a href="/services/business">비즈니스</a></li>
									</ul>
								</li>
								<li class="mobile-dropdown-section">
									<h4>특별 프로그램</h4>
									<ul>
										<li><a href="/services/learning-camp">학습 캠프</a></li>
										<li><a href="/services/career-camp">진로 캠프</a></li>
										<li><a href="/services/workshop">워크숍</a></li>
									</ul>
								</li>
							</ul>
						{/if}
					</li>
					<li><a href="/services/certification">자격과정</a></li>
					<li class="mobile-dropdown">
						<button onclick={() => toggleMobileSubMenu('Support')}>고객지원</button>
						{#if mobileOpenSubMenu === 'Support'}
							<ul class="mobile-dropdown-menu">
								<li><a href="/contact">상담 신청</a></li>
								<li><a href="/contact/counseling">나의 문의사항</a></li>
								<li><a href="/faq">자주묻는 질문</a></li>
								<li><a href="/privacy">개인정보처리방침</a></li>
								<li><a href="/terms">이용약관</a></li>
							</ul>
						{/if}
					</li>
					<li class="mobile-dropdown">
						<button onclick={() => toggleMobileSubMenu('Info')}>커뮤니티</button>
						{#if mobileOpenSubMenu === 'Info'}
							<ul class="mobile-dropdown-menu">
								<li><a href="/notice">공지사항</a></li>
								<li><a href="/review">이용후기</a></li>
								<li><a href="/news">뉴스</a></li>
								<li><a href="/events">이벤트</a></li>
							</ul>
						{/if}
					</li>
				</ul>
				
				<!-- Mobile Auth Buttons -->
				<div class="mobile-auth-buttons">
					{#if $g_logedIn}
						<!-- 로그인된 상태 -->
						<div class="mobile-user-info">
							<span class="mobile-user-name">✨{loginUserName}님</span>
							<div class="mobile-user-details">
								<div class="mobile-user-email">{___prj.user.userEmail}</div>
								{#if ___prj.user.cLevel}
									<div class="mobile-user-level">코칭레벨: {___prj.user.cLevel}</div>
								{/if}
								<div class="mobile-user-points">
									<div>충전 포인트: {___toCurrency(___prj.user.bizPoint ?? 0)}</div>
									<div>보너스 포인트: {___toCurrency(___prj.user.bonusPoint ?? 0)}</div>
								</div>
								{#if ___isInArray(___prj.user.pLevel, [___const.P_ADMIN])}
									<div class="mobile-level-badge admin">사이트 관리자</div>
								{/if}
								{#if ___isInArray(___prj.user.pLevel, [___const.P_MAINTENANCE])}
									<div class="mobile-level-badge maintenance">유지보수 담당자</div>
								{/if}
								{#if ___isInArray(___prj.user.pLevel, [___const.P_DEVELOPER, ___const.P_MASTER])}
									<div class="mobile-level-badge developer">개발자</div>
								{/if}
							</div>
							<div>
								<button class="mobile-action-btn" onclick={() => gotoMove('/s/myPage')}>마이페이지</button>
								<button class="mobile-action-btn logout" onclick={handleLogout}>로그아웃</button>
							</div>
							<div class="mobile-version-info">WEB : {___prj.version} -----  API : {apiVersion}</div>
						</div>
					{:else}
						<!-- 로그인되지 않은 상태 -->
						<a href="/s/signIn" class="mobile-btn-login">로그인</a>
						<a href="/s/signUp" class="mobile-btn-join">파트너 회원가입</a>
					{/if}
				</div>
			</nav>
		{/if}
	</div>
</header>

<style>
	.header {
		background: #fff;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
	}


    .header-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
        height: var(--header-height, 100px);
	}

    .logo img { height: 80px; transition: height .25s ease; }
    .header.expanded .logo img { height: 80px; }
    .header.shrink   .logo img { height: 60px; }

	.desktop-nav {
		display: flex;
		align-items: center;
	}

	.nav-list {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: 30px;
	}

	.nav-list li {
		position: relative;
	}

	.nav-list a {
		text-decoration: none;
		color: #333;
		font-weight: 600;
		font-size: 18px;
		transition: color 0.3s ease;
	}

	.nav-list a:hover {
		color: #007bff;
	}

	.dropdown {
		position: relative;
	}

	.dropdown-menu {
		position: absolute;
		top: 100%;
		left: 0;
		background: #fff;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
		border-radius: 8px;
		padding: 20px;
		display: flex;
		gap: 30px;
		z-index: 1001;
	}

	.dropdown-section h4 {
		margin: 0 0 15px 0;
		color: #333;
		font-size: 16px;
		font-weight: 600;
	}

	.dropdown-section ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.dropdown-section li {
		margin-bottom: 8px;
	}

	.dropdown-section a {
		color: #666;
		font-size: 14px;
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.dropdown-section a:hover {
		color: #007bff;
	}

	.auth-buttons {
		display: flex;
		align-items: center;
		gap: 15px;
	}

	.btn-login,
	.btn-join {
		padding: 8px 16px;
		text-decoration: none;
		border-radius: 4px;
		font-size: 14px;
		font-weight: 500;
		transition: all 0.3s ease;
	}

	.btn-login {
		color: #333;
		border: 1px solid #ddd;
	}

	.btn-login:hover {
		background: #f8f9fa;
	}

	.btn-join {
		background: #007bff;
		color: #fff;
	}

	.btn-join:hover {
		background: #0056b3;
	}

	.user-dropdown-container {
		position: relative;
		display: inline-block;
	}

	.user-dropdown-btn {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 8px 12px;
		background: none;
		border: none;
		color: #333;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		border-radius: 4px;
		transition: all 0.3s ease;
	}

	.user-dropdown-btn:hover {
		background: #f8f9fa;
	}

	.dropdown-arrow {
		width: 16px;
		height: 16px;
		transition: transform 0.3s ease;
	}

	.user-dropdown {
		position: absolute;
		top: 100%;
		right: 0;
		width: 250px;
		background: #fff;
		border: 1px solid #e5e5e5;
		border-radius: 8px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
		z-index: 1001;
		margin-top: 0px;
	}

	.dropdown-content {
		padding: 16px;
	}

	.user-info-section {
		margin-bottom: 12px;
		padding-bottom: 12px;
		border-bottom: 1px solid #e5e5e5;
	}

	.user-info-section .user-name {
		font-weight: 600;
		font-size: 16px;
		color: #333;
		margin-bottom: 4px;
	}

	.user-email {
		font-size: 12px;
		color: #666;
	}

	.user-stats {
		margin-bottom: 12px;
	}

	.stat-item {
		display: flex;
		justify-content: space-between;
		font-size: 13px;
		color: #666;
		margin-bottom: 4px;
	}

	.stat-value {
		color: #007bff;
		font-weight: 500;
	}


	.dropdown-menu {
		margin-bottom: 12px;
	}

	.dropdown-menu-buttons {
		display: flex;
		gap: 8px;
		margin-bottom: 12px;
		flex-wrap: wrap;
	}

	.dropdown-btn {
		flex: 1;
		padding: 4px 4px;
		background: #f8f9fa;
		border: 1px solid #e2e8f0;
		border-radius: 6px;
		color: #333;
		font-size: 12px;
		cursor: pointer;
		transition: all 0.3s ease;
		text-align: center;
		min-width: 60px;
	}

	.dropdown-btn:hover {
		background: #e9ecef;
		border-color: #cbd5e1;
		transform: translateY(-1px);
	}

	.dropdown-btn.logout {
		background: #dc3545;
		border-color: #dc3545;
		color: white;
	}

	.dropdown-btn.logout:hover {
		background: #c82333;
		border-color: #c82333;
	}


	.version-info {
		padding-top: 12px;
		border-top: 1px solid #e5e5e5;
	}

	.version-text {
		font-size: 10px;
		color: #999;
		text-align: center;
	}

	.mobile-menu-toggle {
		display: none;
		flex-direction: column;
		background: none;
		border: none;
		cursor: pointer;
		padding: 5px;
	}

	.mobile-menu-toggle span {
		width: 25px;
		height: 3px;
		background: #333;
		margin: 3px 0;
		transition: 0.3s;
	}

	.mobile-nav {
		display: none;
		background: #fff;
		border-top: 1px solid #eee;
	}

	.mobile-nav-list {
		list-style: none;
		margin: 0;
		padding: 20px 0;
	}

	.mobile-nav-list li {
		margin-bottom: 0px;
	}

	.mobile-nav-list a,
	.mobile-nav-list button {
		display: block;
		padding: 10px 0;
		color: #333;
		text-decoration: none;
		font-size: 16px;
		background: none;
		border: none;
		width: 100%;
		text-align: left;
		cursor: pointer;
	}

	.mobile-dropdown-menu {
		list-style: none;
		margin: 10px 0 0 20px;
		padding: 0;
	}

	.mobile-dropdown-menu li {
		margin-bottom: 8px;
	}

	.mobile-dropdown-menu a {
		font-size: 14px;
		color: #666;
	}

	.mobile-dropdown-section {
		margin-bottom: 20px;
	}

	.mobile-dropdown-section h4 {
		font-size: 14px;
		font-weight: 600;
		color: #333;
		margin: 0 0 10px 0;
		padding: 0;
	}

	.mobile-dropdown-section ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.mobile-dropdown-section li {
		margin-bottom: 5px;
	}

	.mobile-dropdown-section a {
		font-size: 13px;
		color: #666;
		padding: 5px 0;
	}

	/* Mobile Auth Buttons */
	.mobile-auth-buttons {
		padding-top: 20px;
		padding-bottom: 20px;
		border-top: 1px solid #e5e5e5;
		display: flex;
		gap: 10px;
		justify-content: center;
		flex-wrap: wrap;
	}

	.mobile-btn-login,
	.mobile-btn-join {
		padding: 8px 16px;
		border-radius: 20px;
		text-decoration: none;
		font-size: 14px;
		font-weight: 500;
		transition: all 0.3s ease;
		border: 1px solid;
		text-align: center;
		min-width: 80px;
	}

	.mobile-btn-login {
		color: #667eea;
		border-color: #667eea;
		background: transparent;
	}

	.mobile-btn-login:hover {
		background: #667eea;
		color: white;
	}

	.mobile-btn-join {
		color: white;
		border-color: #667eea;
		background: #667eea;
	}

	.mobile-btn-join:hover {
		background: #5a67d8;
		border-color: #5a67d8;
	}

	.mobile-user-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		width: 100%;
		margin-bottom: 15px;
		padding: 15px;
		background: #f8f9fa;
		border-radius: 8px;
	}

	.mobile-user-name {
		color: #333;
		font-size: 18px;
		font-weight: 600;
		text-align: center;
	}

	.mobile-user-details {
		width: 100%;
		text-align: center;
	}

	.mobile-user-email {
		font-size: 12px;
		color: #666;
		margin-bottom: 8px;
	}

	.mobile-user-level {
		font-size: 13px;
		color: #007bff;
		font-weight: 500;
		margin-bottom: 8px;
	}

	.mobile-user-points {
		font-size: 12px;
		color: #666;
		margin-bottom: 8px;
	}

	.mobile-user-points div {
		margin-bottom: 2px;
	}

	.mobile-level-badge {
		display: inline-block;
		padding: 4px 8px;
		border-radius: 4px;
		font-size: 11px;
		font-weight: 500;
		color: white;
		margin: 2px;
	}

	.mobile-level-badge.admin {
		background: #28a745;
	}

	.mobile-level-badge.maintenance {
		background: #17a2b8;
	}

	.mobile-level-badge.developer {
		background: #6f42c1;
	}


	.mobile-action-btn {
		padding: 10px 16px;
		border-radius: 20px;
		text-decoration: none;
		font-size: 14px;
		font-weight: 500;
		transition: all 0.3s ease;
		border: 1px solid #667eea;
		background: transparent;
		color: #667eea;
		text-align: center;
		cursor: pointer;
	}

	.mobile-action-btn:hover {
		background: #667eea;
		color: white;
	}

	.mobile-action-btn.logout {
		border-color: #dc3545;
		color: #dc3545;
	}

	.mobile-action-btn.logout:hover {
		background: #dc3545;
		color: white;
	}

	.mobile-version-info {
		font-size: 10px;
		color: #999;
		text-align: center;
		margin-top: 8px;
		padding-top: 8px;
		border-top: 1px solid #e5e5e5;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.desktop-nav,
		.auth-buttons {
			display: none;
		}

		.mobile-menu-toggle {
			display: flex;
		}

		.mobile-nav {
			display: block;
		}

		.header-content {
			height: 60px;
		}

		.logo img {
			height: 35px;
		}

		.header.expanded .logo img { height: 60px; }
		.header.shrink   .logo img { height: 50px; }
	}

		/* Responsive Design */
	@media (max-width: 480px) {
		.header.expanded .logo img { height: 55px; }
		.header.shrink   .logo img { height: 40px; }
	}
</style>
