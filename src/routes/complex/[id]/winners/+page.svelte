<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import ___prj from '$prj/prjMain';
	import ___const from '$prj/lib/i_const';
	import favicon from '$lib/assets/favicon.svg';

	const complexId = $page.params.id;
	let complexData = $state(null);
	let loading = $state(true);

	// 당첨자 조회 모드
	let searchMode = $state('name'); // 'name' or 'number'
	
	// 검색 데이터
	let searchData = $state({
		name: '',
		phone: '',
		applicationNumber: ''
	});

	let searchResult = $state(null);
	let isSearching = $state(false);

	// 당첨자 발표 정보
	const announcementInfo = {
		date: '2025년 10월 25일 (금) 14:00',
		contractStartDate: '2025년 11월 1일 (수)',
		contractEndDate: '2025년 11월 15일 (수)',
		contractLocation: '분양 사무실',
		moveInDate: '2026년 3월 예정'
	};

	// 필요 서류
	const requiredDocuments = [
		{ category: '필수 서류', items: [
			'신분증 (주민등록증 또는 운전면허증)',
			'주민등록등본 (최근 1개월 이내 발급)',
			'인감증명서 및 인감도장',
			'청약 당첨 확인서',
			'계약금 납부 증빙 (무통장입금증 등)'
		]},
		{ category: '가족관계 증명', items: [
			'가족관계증명서 (상세)',
			'혼인관계증명서 (해당자에 한함)'
		]},
		{ category: '소득 증빙', items: [
			'소득금액증명원 (최근 1년)',
			'근로소득원천징수영수증',
			'재직증명서'
		]},
		{ category: '기타', items: [
			'통장 사본 (월 임대료 자동이체)',
			'위임장 및 대리인 신분증 (대리 계약 시)'
		]}
	];

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
			phone: '02-1234-5678'
		};
		loading = false;
	}

	async function searchWinner() {
		if (searchMode === 'name') {
			if (!searchData.name || !searchData.phone) {
				alert('성명과 전화번호를 입력해주세요.');
				return;
			}
		} else {
			if (!searchData.applicationNumber) {
				alert('청약 번호를 입력해주세요.');
				return;
			}
		}

		isSearching = true;
		searchResult = null;

		try {
			// API 호출 (구현 필요)
			// const result = await ___prj.api.post('/s/winner', 'check.winner', null, searchData);
			
			// 임시 처리 - 50% 확률로 당첨/미당첨
			await new Promise(resolve => setTimeout(resolve, 1000));
			
			const isWinner = Math.random() > 0.5;
			
			if (isWinner) {
				searchResult = {
					status: 'winner',
					name: searchData.name || '홍길동',
					applicationNumber: searchData.applicationNumber || 'A2024-1234',
					unitType: '84B',
					dong: '101동',
					floor: '15층',
					ho: '1502호',
					contractDate: '2025년 11월 5일 (화) 14:00',
					depositAmount: '50,000,000원'
				};
			} else {
				searchResult = {
					status: 'not_winner',
					message: '죄송합니다. 당첨자 명단에 없습니다.'
				};
			}
		} catch (error) {
			console.error('당첨자 조회 오류:', error);
			alert('조회 중 오류가 발생했습니다.');
		} finally {
			isSearching = false;
		}
	}

	function resetSearch() {
		searchData = {
			name: '',
			phone: '',
			applicationNumber: ''
		};
		searchResult = null;
	}

	onMount(() => {
		loadComplexData();
	});
</script>

<svelte:head>
	<title>당첨자 발표 - {complexData?.name || '단지명'}</title>
	<link rel="icon" href={favicon} />
	<meta name="description" content="{complexData?.name || '단지명'} 청약 당첨자 발표" />
</svelte:head>

{#if loading}
	<div class="c-loading">
		<div class="c-loading-spinner"></div>
		<p>로딩 중...</p>
	</div>
{:else if complexData}
	<!-- 페이지 타이틀 -->
	<section class="page-header">
		<div class="c-container">
			<h1 class="page-title">당첨자 발표</h1>
			<p class="page-subtitle">청약 당첨 여부를 확인하세요</p>
		</div>
	</section>

	<!-- 당첨자 조회 섹션 -->
	<section class="c-section winners-section">
		<div class="c-container">
			<!-- 발표 일정 안내 -->
			<div class="announcement-banner">
				<div class="banner-icon">
					<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
						<circle cx="24" cy="24" r="20" stroke="currentColor" stroke-width="3" fill="none"/>
						<path d="M24 12V24L32 28" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
					</svg>
				</div>
				<div class="banner-content">
					<h2>당첨자 발표일</h2>
					<p class="announce-date">{announcementInfo.date}</p>
					<p class="announce-note">당첨자 명단은 발표일 이후 조회 가능합니다</p>
				</div>
			</div>

			<!-- 조회 방법 선택 -->
			<div class="search-section">
				<div class="search-mode-selector">
					<button 
						class="mode-btn {searchMode === 'name' ? 'active' : ''}"
						onclick={() => { searchMode = 'name'; resetSearch(); }}
					>
						이름 + 전화번호로 조회
					</button>
					<button 
						class="mode-btn {searchMode === 'number' ? 'active' : ''}"
						onclick={() => { searchMode = 'number'; resetSearch(); }}
					>
						청약 번호로 조회
					</button>
				</div>

				<!-- 조회 폼 -->
				<div class="search-form-box">
					{#if searchMode === 'name'}
						<div class="form-row-2">
							<div class="form-group">
								<label for="name">성명</label>
								<input
									type="text"
									id="name"
									bind:value={searchData.name}
									placeholder="성명을 입력하세요"
									class="form-input"
								/>
							</div>
							<div class="form-group">
								<label for="phone">전화번호</label>
								<input
									type="tel"
									id="phone"
									bind:value={searchData.phone}
									placeholder="010-0000-0000"
									class="form-input"
								/>
							</div>
						</div>
					{:else}
						<div class="form-group">
							<label for="applicationNumber">청약 번호</label>
							<input
								type="text"
								id="applicationNumber"
								bind:value={searchData.applicationNumber}
								placeholder="A2024-XXXX"
								class="form-input"
							/>
						</div>
					{/if}

					<button 
						class="c-btn c-btn-primary c-btn-large search-btn"
						onclick={searchWinner}
						disabled={isSearching}
					>
						{#if isSearching}
							조회 중...
						{:else}
							당첨 여부 조회
						{/if}
					</button>
				</div>

				<!-- 조회 결과 -->
				{#if searchResult}
					{#if searchResult.status === 'winner'}
						<div class="result-box winner">
							<div class="result-icon">
								<svg width="64" height="64" viewBox="0 0 64 64" fill="none">
									<circle cx="32" cy="32" r="28" fill="#10b981"/>
									<path d="M20 32L28 40L44 22" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							</div>
							<h2>🎉 축하합니다! 당첨되셨습니다!</h2>
							
							<div class="winner-info-grid">
								<div class="info-item">
									<span class="label">성명</span>
									<span class="value">{searchResult.name}</span>
								</div>
								<div class="info-item">
									<span class="label">청약 번호</span>
									<span class="value">{searchResult.applicationNumber}</span>
								</div>
								<div class="info-item">
									<span class="label">당첨 타입</span>
									<span class="value">{searchResult.unitType}형</span>
								</div>
								<div class="info-item">
									<span class="label">당첨 동호수</span>
									<span class="value highlight">{searchResult.dong} {searchResult.floor} {searchResult.ho}</span>
								</div>
								<div class="info-item full">
									<span class="label">계약 일정</span>
									<span class="value">{searchResult.contractDate}</span>
								</div>
								<div class="info-item full">
									<span class="label">계약금</span>
									<span class="value price">{searchResult.depositAmount}</span>
								</div>
							</div>

							<div class="action-buttons">
								<button class="c-btn c-btn-primary">계약 서류 다운로드</button>
								<button class="c-btn c-btn-gold">계약 일정 안내</button>
							</div>
						</div>
					{:else}
						<div class="result-box not-winner">
							<div class="result-icon">
								<svg width="64" height="64" viewBox="0 0 64 64" fill="none">
									<circle cx="32" cy="32" r="28" fill="#6b7280"/>
									<path d="M22 22L42 42M42 22L22 42" stroke="white" stroke-width="4" stroke-linecap="round"/>
								</svg>
							</div>
							<h2>당첨자 명단에 없습니다</h2>
							<p>{searchResult.message}</p>
							<button class="c-btn c-btn-secondary" onclick={resetSearch}>
								다시 조회하기
							</button>
						</div>
					{/if}
				{/if}
			</div>

			<!-- 계약 일정 안내 -->
			<div class="schedule-section">
				<h2 class="section-title">
					<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
						<rect x="4" y="6" width="24" height="22" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
						<path d="M10 4V8M22 4V8M4 12H28" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
					</svg>
					계약 일정
				</h2>
				<div class="schedule-grid">
					<div class="schedule-card">
						<div class="card-icon">📅</div>
						<h3>계약 기간</h3>
						<p class="schedule-date">
							{announcementInfo.contractStartDate}<br/>
							~ {announcementInfo.contractEndDate}
						</p>
					</div>
					<div class="schedule-card">
						<div class="card-icon">📍</div>
						<h3>계약 장소</h3>
						<p class="schedule-location">
							{announcementInfo.contractLocation}
						</p>
					</div>
					<div class="schedule-card">
						<div class="card-icon">🏠</div>
						<h3>입주 예정일</h3>
						<p class="schedule-date">
							{announcementInfo.moveInDate}
						</p>
					</div>
				</div>
			</div>

			<!-- 필요 서류 안내 -->
			<div class="documents-section">
				<h2 class="section-title">
					<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
						<path d="M20 4H8C6.89543 4 6 4.89543 6 6V26C6 27.1046 6.89543 28 8 28H24C25.1046 28 26 27.1046 26 26V10L20 4Z" stroke="currentColor" stroke-width="2" fill="none"/>
						<path d="M20 4V10H26" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M10 16H22M10 20H22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
					</svg>
					계약 시 필요 서류
				</h2>
				<div class="documents-grid">
					{#each requiredDocuments as docCategory}
						<div class="document-card">
							<h3>{docCategory.category}</h3>
							<ul>
								{#each docCategory.items as item}
									<li>{item}</li>
								{/each}
							</ul>
						</div>
					{/each}
				</div>
				<div class="document-notice">
					<strong>안내사항</strong>
					<ul>
						<li>모든 서류는 <strong>원본</strong>을 지참해주시기 바랍니다.</li>
						<li>서류 미비 시 계약이 불가할 수 있습니다.</li>
						<li>대리인 계약 시 위임장 및 대리인 신분증이 추가로 필요합니다.</li>
						<li>자세한 사항은 분양 사무실로 문의해주시기 바랍니다.</li>
					</ul>
				</div>
			</div>

			<!-- 문의 CTA -->
			<div class="inquiry-cta">
				<h3>문의사항이 있으신가요?</h3>
				<p>계약 및 입주 관련 문의는 분양 사무실로 연락주시기 바랍니다.</p>
				<div class="cta-buttons">
					<a href="tel:{complexData.phone}" class="c-btn c-btn-gold c-btn-icon">
						<span class="btn-icon">📞</span>
						<span>전화 상담 ({complexData.phone})</span>
					</a>
					<a href="/complex/{complexId}/contact" class="c-btn c-btn-primary c-btn-icon">
						<span class="btn-icon">💬</span>
						<span>온라인 문의</span>
					</a>
				</div>
			</div>
		</div>
	</section>
{:else}
	<div class="error-container">
		<h1>단지를 찾을 수 없습니다</h1>
		<p>요청하신 페이지가 존재하지 않습니다.</p>
		<a href="/" class="c-btn c-btn-primary">홈으로 돌아가기</a>
	</div>
{/if}

<style>
	.winners-section {
		background: var(--bg-light);
	}

	/* 발표 일정 배너 */
	.announcement-banner {
		display: flex;
		align-items: center;
		gap: 30px;
		padding: 40px;
		background: linear-gradient(135deg, var(--secondary-color), #B09551);
		border-radius: 12px;
		color: white;
		margin-bottom: 60px;
		box-shadow: var(--shadow-md);
	}

	.banner-icon {
		flex-shrink: 0;
	}

	.banner-content h2 {
		font-size: 1.5rem;
		font-weight: 700;
		margin: 0 0 15px 0;
	}

	.announce-date {
		font-size: 2rem;
		font-weight: 700;
		margin: 0 0 10px 0;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.announce-note {
		font-size: 1rem;
		margin: 0;
		opacity: 0.95;
	}

	/* 조회 섹션 */
	.search-section {
		max-width: 700px;
		margin: 0 auto 60px;
	}

	.search-mode-selector {
		display: flex;
		gap: 15px;
		margin-bottom: 30px;
	}

	.mode-btn {
		flex: 1;
		padding: 15px 25px;
		background: white;
		border: 2px solid var(--border-color);
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-gray);
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.mode-btn:hover {
		border-color: var(--primary-color);
		color: var(--primary-color);
	}

	.mode-btn.active {
		background: var(--primary-color);
		border-color: var(--primary-color);
		color: white;
	}

	.search-form-box {
		background: white;
		padding: 40px;
		border-radius: 12px;
		box-shadow: var(--shadow-sm);
	}

	.form-row-2 {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
		margin-bottom: 30px;
	}

	.form-group {
		margin-bottom: 30px;
	}

	.form-group:last-child {
		margin-bottom: 0;
	}

	.form-group label {
		display: block;
		font-weight: 600;
		color: var(--text-dark);
		margin-bottom: 10px;
		font-size: 0.95rem;
	}

	.form-input {
		width: 100%;
		padding: 14px 18px;
		border: 2px solid var(--border-color);
		border-radius: 8px;
		font-size: 1rem;
		transition: all 0.3s ease;
		box-sizing: border-box;
	}

	.form-input:focus {
		outline: none;
		border-color: var(--primary-color);
	}

	.search-btn {
		width: 100%;
	}

	/* 조회 결과 */
	.result-box {
		margin-top: 40px;
		padding: 50px 40px;
		background: white;
		border-radius: 12px;
		box-shadow: var(--shadow-md);
		text-align: center;
		animation: fadeInUp 0.5s ease;
	}

	.result-icon {
		margin-bottom: 25px;
		display: flex;
		justify-content: center;
	}

	.result-box h2 {
		font-size: 1.8rem;
		font-weight: 700;
		margin: 0 0 30px 0;
	}

	.result-box.winner {
		border: 3px solid #10b981;
	}

	.result-box.winner h2 {
		color: #10b981;
	}

	.result-box.not-winner {
		border: 3px solid #6b7280;
	}

	.result-box.not-winner h2 {
		color: #6b7280;
	}

	.result-box.not-winner p {
		color: var(--text-gray);
		margin: 0 0 30px 0;
		font-size: 1.1rem;
	}

	.winner-info-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20px;
		margin-bottom: 40px;
		padding: 30px;
		background: var(--bg-light);
		border-radius: 8px;
	}

	.info-item {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 15px;
		background: white;
		border-radius: 6px;
	}

	.info-item.full {
		grid-column: 1 / -1;
	}

	.info-item .label {
		font-size: 0.9rem;
		color: var(--text-gray);
		font-weight: 600;
	}

	.info-item .value {
		font-size: 1.2rem;
		color: var(--text-dark);
		font-weight: 700;
	}

	.info-item .value.highlight {
		color: var(--primary-color);
		font-size: 1.4rem;
	}

	.info-item .value.price {
		color: var(--secondary-color);
		font-size: 1.4rem;
	}

	.action-buttons {
		display: flex;
		gap: 15px;
		justify-content: center;
		flex-wrap: wrap;
	}

	/* 일정 섹션 */
	.schedule-section {
		margin-bottom: 60px;
	}

	.section-title {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		font-size: 1.8rem;
		font-weight: 700;
		color: var(--text-dark);
		margin: 0 0 40px 0;
	}

	.section-title svg {
		color: var(--primary-color);
	}

	.schedule-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 30px;
	}

	.schedule-card {
		background: white;
		padding: 40px 30px;
		border-radius: 12px;
		text-align: center;
		box-shadow: var(--shadow-sm);
		transition: all 0.3s ease;
	}

	.schedule-card:hover {
		transform: translateY(-5px);
		box-shadow: var(--shadow-md);
	}

	.card-icon {
		font-size: 3rem;
		margin-bottom: 20px;
	}

	.schedule-card h3 {
		font-size: 1.2rem;
		font-weight: 700;
		color: var(--text-dark);
		margin: 0 0 15px 0;
	}

	.schedule-date,
	.schedule-location {
		font-size: 1.1rem;
		color: var(--text-gray);
		line-height: 1.6;
		margin: 0;
	}

	.schedule-date {
		font-weight: 600;
		color: var(--primary-color);
	}

	/* 서류 안내 */
	.documents-section {
		margin-bottom: 60px;
	}

	.documents-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 25px;
		margin-bottom: 30px;
	}

	.document-card {
		background: white;
		padding: 30px;
		border-radius: 8px;
		box-shadow: var(--shadow-sm);
	}

	.document-card h3 {
		font-size: 1.2rem;
		font-weight: 700;
		color: var(--primary-color);
		margin: 0 0 20px 0;
		padding-bottom: 15px;
		border-bottom: 2px solid var(--border-color);
	}

	.document-card ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.document-card li {
		padding: 10px 0 10px 25px;
		color: var(--text-dark);
		position: relative;
		line-height: 1.5;
		border-bottom: 1px solid var(--bg-light);
	}

	.document-card li:last-child {
		border-bottom: none;
	}

	.document-card li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: var(--primary-color);
		font-weight: 700;
	}

	.document-notice {
		padding: 30px;
		background: #fef3c7;
		border: 2px solid #f59e0b;
		border-radius: 8px;
	}

	.document-notice strong {
		display: block;
		font-size: 1.1rem;
		color: #92400e;
		margin-bottom: 15px;
	}

	.document-notice ul {
		margin: 0;
		padding-left: 20px;
		color: #78350f;
	}

	.document-notice li {
		margin-bottom: 10px;
		line-height: 1.6;
	}

	/* 문의 CTA */
	.inquiry-cta {
		text-align: center;
		padding: 50px 40px;
		background: white;
		border-radius: 12px;
		box-shadow: var(--shadow-sm);
	}

	.inquiry-cta h3 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-dark);
		margin: 0 0 15px 0;
	}

	.inquiry-cta p {
		font-size: 1rem;
		color: var(--text-gray);
		margin: 0 0 30px 0;
	}

	.cta-buttons {
		display: flex;
		gap: 15px;
		justify-content: center;
		flex-wrap: wrap;
	}

	.c-btn-icon {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.btn-icon {
		font-size: 1.3rem;
		line-height: 1;
	}

	/* 반응형 */
	@media (max-width: 1024px) {
		.schedule-grid {
			grid-template-columns: 1fr;
		}

		.documents-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 768px) {
		.announcement-banner {
			flex-direction: column;
			padding: 30px 25px;
			text-align: center;
		}

		.announce-date {
			font-size: 1.6rem;
		}

		.search-mode-selector {
			flex-direction: column;
		}

		.search-form-box {
			padding: 30px 20px;
		}

		.form-row-2 {
			grid-template-columns: 1fr;
		}

		.result-box {
			padding: 40px 25px;
		}

		.winner-info-grid {
			grid-template-columns: 1fr;
		}

		.action-buttons {
			flex-direction: column;
		}

		.action-buttons .c-btn {
			width: 100%;
		}

		.inquiry-cta {
			padding: 40px 25px;
		}

		.cta-buttons {
			flex-direction: column;
		}

		.cta-buttons .c-btn {
			width: 100%;
		}
	}

	@media (max-width: 480px) {
		.announcement-banner {
			padding: 25px 20px;
		}

		.banner-icon svg {
			width: 36px;
			height: 36px;
		}

		.banner-content h2 {
			font-size: 1.2rem;
		}

		.announce-date {
			font-size: 1.3rem;
		}

		.announce-note {
			font-size: 0.9rem;
		}

		.result-box h2 {
			font-size: 1.5rem;
		}

		.document-card {
			padding: 25px 20px;
		}

		.document-notice {
			padding: 25px 20px;
		}
	}
</style>

