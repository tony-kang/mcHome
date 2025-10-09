<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import ___prj from '$prj/prjMain';
	import ___const from '$prj/lib/i_const';
	import favicon from '$lib/assets/favicon.svg';

	const complexId = $page.params.id;
	let complexData = $state(null);
	let loading = $state(true);

	// 단계별 진행 상태
	let currentStep = $state(3);
	const totalSteps = 5;

	// 폼 데이터
	let formData = $state({
		// 1단계: 신청자 정보
		name: '',
		phone: '',
		verificationCode: '',
		isPhoneVerified: false,
		
		// 2단계: 주택 타입 선택
		unitType: '',
		
		// 3단계: 동호수 선택
		dong: '',
		floor: '',
		ho: '',
		
		// 4단계: 임대 조건
		rentalCondition: '',
		
		// 5단계: 동의사항
		agreePrivacy: false,
		agreeMarketing: false
	});

	// 인증 관련
	let verificationSent = $state(false);
	let verificationTimer = $state(0);
	let verificationInterval = null;

	// 동별 정보 표시 토글
	let showDongInfo = $state(false);

	// 주택 타입 옵션
	const unitTypes = [
		{ value: '84A', label: '84A형', area: '84.94㎡', rooms: '3룸', floorplan: '/main/story_sub_1.jpg' },
		{ value: '84B', label: '84B형', area: '84.98㎡', rooms: '3룸', floorplan: '/main/story_sub_2.jpg' },
		{ value: '84C', label: '84C형', area: '84.94㎡', rooms: '4룸', floorplan: '/main/story_sub_3.jpg' },
		{ value: '84D', label: '84D형', area: '84.93㎡', rooms: '3룸', floorplan: '/main/story_sub_4.jpg' },
		{ value: '84E', label: '84E형', area: '84.96㎡', rooms: '3룸', floorplan: '/main/story_main.jpg' }
	];

	// 동별 정보 테이블 (동번호, 총 층수, 층당 세대수, 호수 시작번호, 조감도 위치)
	// posX, posY: 조감도 이미지에서의 위치 (%, 좌측 상단 기준)
	const dongConfig = [
		{ dong: '101', name: '101동', floors: 36, unitsPerFloor: 4, startUnit: 1, posX: 25, posY: 30 },
		{ dong: '102', name: '102동', floors: 36, unitsPerFloor: 4, startUnit: 1, posX: 40, posY: 25 },
		{ dong: '103', name: '103동', floors: 30, unitsPerFloor: 6, startUnit: 1, posX: 55, posY: 35 },
		{ dong: '104', name: '104동', floors: 30, unitsPerFloor: 6, startUnit: 1, posX: 70, posY: 30 },
		{ dong: '105', name: '105동', floors: 25, unitsPerFloor: 8, startUnit: 1, posX: 20, posY: 60 },
		{ dong: '106', name: '106동', floors: 25, unitsPerFloor: 8, startUnit: 1, posX: 35, posY: 55 },
		{ dong: '107', name: '107동', floors: 20, unitsPerFloor: 4, startUnit: 1, posX: 50, posY: 65 },
		{ dong: '108', name: '108동', floors: 20, unitsPerFloor: 4, startUnit: 1, posX: 65, posY: 60 },
		{ dong: '109', name: '109동', floors: 15, unitsPerFloor: 6, startUnit: 1, posX: 30, posY: 80 },
		{ dong: '110', name: '110동', floors: 15, unitsPerFloor: 6, startUnit: 1, posX: 75, posY: 75 }
	];

	// 선택된 동의 층수 옵션 생성
	let floorOptions = $derived.by(() => {
		if (!formData.dong) return [];
		const config = dongConfig.find(d => d.name === formData.dong);
		if (!config) return [];
		
		// 1층부터 최고층까지 (일부 건물은 4층부터 시작할 수도 있음)
		const floors = [];
		for (let i = 1; i <= config.floors; i++) {
			if (i === 4 || i === 13 || i === 14) continue; // 4층, 13층, 14층 제외 (미신)
			floors.push(`${i}층`);
		}
		return floors;
	});

	// 선택된 동과 층의 호수 옵션 생성
	let hoOptions = $derived.by(() => {
		if (!formData.dong || !formData.floor) return [];
		const config = dongConfig.find(d => d.name === formData.dong);
		if (!config) return [];
		
		// 층수 추출 (예: "5층" -> 5)
		const floorNumber = parseInt(formData.floor);
		
		// 호수 생성 (층수 + 세대번호)
		// 예: 5층 1호 -> 501호, 5층 2호 -> 502호
		const units = [];
		for (let i = 0; i < config.unitsPerFloor; i++) {
			const unitNumber = config.startUnit + i;
			const hosu = `${floorNumber}0${unitNumber}호`;
			units.push(hosu);
		}
		return units;
	});

	// 임대 조건 옵션
	const rentalConditions = [
		{ value: '10year', label: '10년 임대' },
		{ value: '8year', label: '8년 임대' }
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

	// 인증번호 발송
	async function sendVerificationCode() {
		if (!formData.phone) {
			alert('전화번호를 입력해주세요.');
			return;
		}

		const phoneRegex = /^010-?\d{4}-?\d{4}$/;
		if (!phoneRegex.test(formData.phone.replace(/-/g, ''))) {
			alert('올바른 전화번호 형식이 아닙니다.');
			return;
		}

		try {
			// API 호출 (구현 필요)
			// await ___prj.api.post('/s/verification', 'send.code', null, { phone: formData.phone });
			
			// 임시 처리
			verificationSent = true;
			verificationTimer = 1800; // 30분 = 1800초
			
			// 타이머 시작
			if (verificationInterval) clearInterval(verificationInterval);
			verificationInterval = setInterval(() => {
				verificationTimer--;
				if (verificationTimer <= 0) {
					clearInterval(verificationInterval);
					verificationSent = false;
					formData.isPhoneVerified = false;
				}
			}, 1000);
			
			alert('인증번호가 발송되었습니다. (유효시간: 30분)');
		} catch (error) {
			console.error('인증번호 발송 오류:', error);
			alert('인증번호 발송에 실패했습니다.');
		}
	}

	// 인증번호 확인
	async function verifyCode() {
		if (!formData.verificationCode) {
			alert('인증번호를 입력해주세요.');
			return;
		}

		try {
			// API 호출 (구현 필요)
			// const result = await ___prj.api.post('/s/verification', 'verify.code', null, {
			//   phone: formData.phone,
			//   code: formData.verificationCode
			// });
			
			// 임시 처리
			if (formData.verificationCode === '123456') {
				formData.isPhoneVerified = true;
				clearInterval(verificationInterval);
				alert('인증이 완료되었습니다.');
			} else {
				alert('인증번호가 일치하지 않습니다.');
			}
		} catch (error) {
			console.error('인증 확인 오류:', error);
			alert('인증 확인에 실패했습니다.');
		}
	}

	// 다음 단계로 이동
	function nextStep() {
		// 각 단계별 유효성 검사
		if (currentStep === 1) {
			if (!formData.name || !formData.phone) {
				alert('성명과 전화번호를 입력해주세요.');
				return;
			}
			if (!formData.isPhoneVerified) {
				alert('전화번호 인증을 완료해주세요.');
				return;
			}
		} else if (currentStep === 2) {
			if (!formData.unitType) {
				alert('주택 타입을 선택해주세요.');
				return;
			}
		} else if (currentStep === 3) {
			if (!formData.dong || !formData.floor || !formData.ho) {
				alert('동, 층, 호수를 모두 선택해주세요.');
				return;
			}
		} else if (currentStep === 4) {
			if (!formData.rentalCondition) {
				alert('임대 조건을 선택해주세요.');
				return;
			}
		}

		if (currentStep < totalSteps) {
			currentStep++;
		}
	}

	// 이전 단계로 이동
	function prevStep() {
		if (currentStep > 1) {
			currentStep--;
		}
	}

	// 최종 제출
	async function submitApplication() {
		if (!formData.agreePrivacy) {
			alert('개인정보 수집 및 이용에 동의해주세요.');
			return;
		}

		try {
			// API 호출 (구현 필요)
			// const result = await ___prj.api.post('/s/subscription', 'submit.application', null, formData);
			
			// 임시 처리
			await new Promise(resolve => setTimeout(resolve, 1000));
			
			alert('청약 신청이 완료되었습니다.\n신청 내역은 마이페이지에서 확인하실 수 있습니다.');
			
			// 메인 페이지로 이동
			window.location.href = `/complex/${complexId}`;
		} catch (error) {
			console.error('청약 신청 오류:', error);
			alert('청약 신청 중 오류가 발생했습니다.');
		}
	}

	// 타이머 포맷팅
	function formatTime(seconds) {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${String(secs).padStart(2, '0')}`;
	}

	onMount(() => {
		loadComplexData();
		return () => {
			if (verificationInterval) clearInterval(verificationInterval);
		};
	});
</script>

<svelte:head>
	<title>청약 신청 - {complexData?.name || '단지명'}</title>
	<link rel="icon" href={favicon} />
	<meta name="description" content="{complexData?.name || '단지명'} 청약 신청" />
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
			<h1 class="page-title">청약 신청</h1>
			<p class="page-subtitle">온라인으로 간편하게 청약을 신청하세요</p>
		</div>
	</section>

	<!-- 청약 신청 섹션 -->
	<section class="c-section subscription-section">
		<div class="c-container">
			<!-- 진행 단계 표시 -->
			<div class="step-indicator">
				{#each Array(totalSteps) as _, index}
					<div class="step-item {currentStep === index + 1 ? 'active' : ''} {currentStep > index + 1 ? 'completed' : ''}">
						<div class="step-number">{index + 1}</div>
						<div class="step-label">
							{#if index === 0}
								신청자 정보
							{:else if index === 1}
								주택 타입
							{:else if index === 2}
								동호수 선택
							{:else if index === 3}
								임대 조건
							{:else if index === 4}
								동의 및 제출
							{/if}
						</div>
					</div>
					{#if index < totalSteps - 1}
						<div class="step-divider {currentStep > index + 1 ? 'completed' : ''}"></div>
					{/if}
				{/each}
			</div>

			<!-- 폼 컨텐츠 -->
			<div class="form-container">
				<!-- 1단계: 신청자 정보 -->
				{#if currentStep === 1}
					<div class="step-content">
						<h2 class="step-title">신청자 정보 입력</h2>
						<p class="step-description">본인 확인을 위한 정보를 입력해주세요</p>

						<div class="form-group">
							<label for="name">성명 *</label>
							<input
								type="text"
								id="name"
								bind:value={formData.name}
								placeholder="성명을 입력하세요"
								class="form-input"
							/>
						</div>

						<div class="form-group">
							<label for="phone">전화번호 *</label>
							<div class="input-with-button">
								<input
									type="tel"
									id="phone"
									bind:value={formData.phone}
									placeholder="010-0000-0000"
									class="form-input"
									disabled={formData.isPhoneVerified}
								/>
								<button
									type="button"
									class="c-btn c-btn-secondary"
									onclick={sendVerificationCode}
									disabled={verificationSent || formData.isPhoneVerified}
								>
									{verificationSent ? '재발송' : '인증번호 발송'}
								</button>
							</div>
						</div>

						{#if verificationSent && !formData.isPhoneVerified}
							<div class="form-group verification-group">
								<label for="verificationCode">인증번호 *</label>
								<div class="input-with-button">
									<input
										type="text"
										id="verificationCode"
										bind:value={formData.verificationCode}
										placeholder="인증번호 6자리"
										class="form-input"
										maxlength="6"
									/>
									<button
										type="button"
										class="c-btn c-btn-primary"
										onclick={verifyCode}
									>
										확인
									</button>
								</div>
								<div class="verification-info">
									<span class="timer">남은 시간: {formatTime(verificationTimer)}</span>
									<span class="info-text">인증번호가 오지 않으면 재발송 버튼을 눌러주세요.</span>
								</div>
							</div>
						{/if}

						{#if formData.isPhoneVerified}
							<div class="verification-success">
								<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
									<circle cx="10" cy="10" r="9" fill="#10b981"/>
									<path d="M6 10L9 13L14 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
								<span>전화번호 인증이 완료되었습니다</span>
							</div>
						{/if}

						<div class="notice-box">
							<strong>안내사항</strong>
							<ul>
								<li>가입된 번호나 가상전화번호는 인증번호를 받을 수 없습니다.</li>
								<li>인증번호 유효시간은 30분입니다.</li>
								<li>정확한 연락처를 입력해주셔야 청약 관련 안내를 받으실 수 있습니다.</li>
							</ul>
						</div>
					</div>
				{/if}

			<!-- 2단계: 주택 타입 선택 -->
			{#if currentStep === 2}
				<div class="step-content">
					<h2 class="step-title">주택 타입 선택</h2>
					<p class="step-description">원하시는 평면 타입을 선택해주세요</p>

					<div class="unit-selection-layout">
						<!-- 왼쪽: 타입 선택 -->
						<div class="type-selector-panel">
							<h3 class="panel-title">타입 선택</h3>
							<div class="unit-type-list">
								{#each unitTypes as type}
									<button
										type="button"
										class="unit-type-card {formData.unitType === type.value ? 'selected' : ''}"
										onclick={() => formData.unitType = type.value}
									>
										<div class="type-badge">{type.label}</div>
										<div class="type-info">
											<div class="type-area">
                                                {type.area}
                                                <span class="type-rooms"> : {type.rooms}</span>
                                            </div>
										</div>
										<div class="type-check">
											{#if formData.unitType === type.value}
												<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
													<circle cx="10" cy="10" r="9" fill="currentColor"/>
													<path d="M7 10L9 12L13 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
												</svg>
											{/if}
										</div>
									</button>
								{/each}
							</div>
						</div>

						<!-- 오른쪽: 평면도 미리보기 -->
						<div class="floorplan-panel">
							{#if formData.unitType}
								{@const selectedType = unitTypes.find(t => t.value === formData.unitType)}
								{#if selectedType}
									<div class="floorplan-preview">
										<h3 class="preview-title">{selectedType.label} 평면도</h3>
										<div class="preview-image-box">
											<img src={selectedType.floorplan} alt="{selectedType.label} 평면도" class="floorplan-image" />
										</div>
										<div class="preview-info">
											<span class="info-item">
												<strong>면적:</strong> {selectedType.area}
											</span>
											<span class="info-item">
												<strong>구성:</strong> {selectedType.rooms}
											</span>
										</div>
										<a href="/complex/{complexId}/units" target="_blank" class="preview-link">
											상세 평면도 보기
											<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
												<path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
											</svg>
										</a>
									</div>
								{/if}
							{:else}
								<div class="no-selection-message">
									<svg width="80" height="80" viewBox="0 0 80 80" fill="none">
										<rect x="10" y="20" width="60" height="50" rx="4" stroke="currentColor" stroke-width="3" fill="none"/>
										<path d="M10 35L40 10L70 35" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
										<rect x="30" y="45" width="20" height="25" fill="currentColor"/>
									</svg>
									<p>타입을 선택하면<br/>평면도를 확인할 수 있습니다</p>
								</div>
							{/if}
						</div>
					</div>
				</div>
			{/if}

				<!-- 3단계: 동호수 선택 -->
				{#if currentStep === 3}
					<div class="step-content">
						<h2 class="step-title">동호수 선택</h2>
						<p class="step-description">희망하시는 동호수를 선택해주세요</p>

					<!-- 동별 정보 토글 버튼 -->
					<div class="dong-info-section">
						<button 
							type="button"
							class="dong-info-toggle" 
							onclick={() => showDongInfo = !showDongInfo}
						>
							<span class="toggle-text">
								{showDongInfo ? '동별 정보 접기' : '동별 정보 상세보기'}
							</span>
							<svg 
								class="toggle-icon {showDongInfo ? 'open' : ''}" 
								width="20" 
								height="20" 
								viewBox="0 0 20 20" 
								fill="none"
							>
								<path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</button>

						{#if showDongInfo}
							<div class="dong-info-content">
								<div class="dong-info-table-wrapper">
									<table class="dong-info-table">
										<thead>
											<tr>
												<th>동</th>
												<th>총 층수</th>
												<th>세대수/층</th>
												<th>호수 구성</th>
											</tr>
										</thead>
										<tbody>
											{#each dongConfig as config}
												<tr class={formData.dong === config.name ? 'selected' : ''}>
													<td><strong>{config.name}</strong></td>
													<td>{config.floors}층</td>
													<td>{config.unitsPerFloor}세대</td>
													<td class="hosu-format">
														{#if config.unitsPerFloor === 4}
															X01호, X02호, X03호, X04호
														{:else if config.unitsPerFloor === 6}
															X01호 ~ X06호
														{:else if config.unitsPerFloor === 8}
															X01호 ~ X08호
														{/if}
													</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
								<div class="table-notice">
									<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
										<circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5" fill="none"/>
										<path d="M8 4V8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
										<circle cx="8" cy="11" r="0.5" fill="currentColor"/>
									</svg>
									<span>호수 구성: X는 층수를 의미합니다 (예: 5층 1호 = 501호, 15층 3호 = 1503호)</span>
								</div>
							</div>
						{/if}
					</div>

					<!-- 조감도 이미지 -->
					<div class="bird-view-section">
						<h3 class="section-subtitle">단지 조감도</h3>
						<div class="bird-view-box">
							<img src="/main/story_main.jpg" alt="단지 조감도" class="bird-view-image" />
							<div class="bird-view-overlay">
								<!-- 모든 동 위치 표시 -->
								{#each dongConfig as config}
									<div 
										class="dong-marker {formData.dong === config.name ? 'selected' : ''}"
										style="left: {config.posX}%; top: {config.posY}%;"
									>
										<div class="marker-dot"></div>
										<div class="marker-name">
											{config.name}
											{#if config.name === formData.dong}
												{#if formData.floor}
													<br/>{formData.floor}
												{/if}
												{#if formData.ho}
													{formData.ho}
												{/if}
											{/if}
										</div>
									</div>
								{/each}
							</div>
						</div>
						<p class="bird-view-caption">※ 조감도는 입주자의 이해를 돕기 위한 것으로 실제와 다를 수 있습니다</p>
					</div>

						<div class="select-grid-3">
							<div class="form-group">
								<label for="dong">동 선택 *</label>
								<select 
									id="dong" 
									bind:value={formData.dong} 
									class="form-select"
									onchange={() => { formData.floor = ''; formData.ho = ''; }}
								>
									<option value="">동 선택</option>
									{#each dongConfig as config}
										<option value={config.name}>{config.name}</option>
									{/each}
								</select>
								{#if formData.dong}
									{@const config = dongConfig.find(d => d.name === formData.dong)}
									<div class="select-info">
										{config?.floors}층 · {config?.unitsPerFloor}세대/층
									</div>
								{/if}
							</div>

							<div class="form-group">
								<label for="floor">층 선택 *</label>
								<select 
									id="floor" 
									bind:value={formData.floor} 
									class="form-select" 
									disabled={!formData.dong}
									onchange={() => { formData.ho = ''; }}
								>
									<option value="">층 선택</option>
									{#each floorOptions as floor}
										<option value={floor}>{floor}</option>
									{/each}
								</select>
							</div>

							<div class="form-group">
								<label for="ho">호수 선택 *</label>
								<select id="ho" bind:value={formData.ho} class="form-select" disabled={!formData.floor}>
									<option value="">호수 선택</option>
									{#each hoOptions as ho}
										<option value={ho}>{ho}</option>
									{/each}
								</select>
							</div>
						</div>

						{#if formData.dong && formData.floor && formData.ho}
							<div class="selected-unit-box">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
									<path d="M12 2L2 7V17C2 18.1046 2.89543 19 4 19H20C21.1046 19 22 18.1046 22 17V7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
									<path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
								<div>
									<strong>선택한 동호수</strong>
									<span class="selected-unit">{formData.dong} {formData.floor} {formData.ho}</span>
								</div>
							</div>
						{/if}
					</div>
				{/if}

				<!-- 4단계: 임대 조건 -->
				{#if currentStep === 4}
					<div class="step-content">
						<h2 class="step-title">임대 조건 선택</h2>
						<p class="step-description">임대 기간을 선택해주세요</p>

						<div class="rental-condition-grid">
							{#each rentalConditions as condition}
								<button
									type="button"
									class="rental-card {formData.rentalCondition === condition.value ? 'selected' : ''}"
									onclick={() => formData.rentalCondition = condition.value}
								>
									<div class="rental-label">{condition.label}</div>
									<div class="rental-check">
										{#if formData.rentalCondition === condition.value}
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
												<circle cx="12" cy="12" r="11" fill="currentColor"/>
												<path d="M8 12L11 15L16 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
											</svg>
										{/if}
									</div>
								</button>
							{/each}
						</div>

						<div class="info-link-box">
							<button type="button" class="info-link" onclick={() => alert('임대 조건 상세 안내')}>
								<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
									<path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" stroke-width="2"/>
									<path d="M10 14V10M10 6H10.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
								</svg>
								<span>임대 조건 자세히 보기</span>
							</button>
						</div>

						<div class="notice-box">
							<strong>임대주택 안내</strong>
							<ul>
								<li>본 주택은 장기일반민간임대주택입니다.</li>
								<li>임대 기간 동안 안정적인 거주가 보장됩니다.</li>
								<li>자세한 임대 조건은 계약서를 확인해주시기 바랍니다.</li>
							</ul>
						</div>
					</div>
				{/if}

				<!-- 5단계: 동의 및 제출 -->
				{#if currentStep === 5}
					<div class="step-content">
						<h2 class="step-title">동의 및 신청 완료</h2>
						<p class="step-description">청약 신청을 위한 동의사항을 확인해주세요</p>

						<!-- 신청 정보 요약 -->
						<div class="summary-box">
							<h3>신청 정보 확인</h3>
							<div class="summary-grid">
								<div class="summary-item">
									<span class="summary-label">성명</span>
									<span class="summary-value">{formData.name}</span>
								</div>
								<div class="summary-item">
									<span class="summary-label">전화번호</span>
									<span class="summary-value">{formData.phone}</span>
								</div>
								<div class="summary-item">
									<span class="summary-label">주택 타입</span>
									<span class="summary-value">{formData.unitType}형</span>
								</div>
								<div class="summary-item">
									<span class="summary-label">동호수</span>
									<span class="summary-value">{formData.dong} {formData.floor} {formData.ho}</span>
								</div>
								<div class="summary-item">
									<span class="summary-label">임대 조건</span>
									<span class="summary-value">
										{rentalConditions.find(c => c.value === formData.rentalCondition)?.label}
									</span>
								</div>
							</div>
						</div>

						<!-- 동의 항목 -->
						<div class="agreements-box">
							<div class="agreement-item required">
								<input
									type="checkbox"
									id="agreePrivacy"
									bind:checked={formData.agreePrivacy}
								/>
								<label for="agreePrivacy">
									<strong>[필수]</strong> 개인정보 수집 및 이용에 동의합니다
								</label>
								<button type="button" class="detail-btn" onclick={() => alert('개인정보 수집 및 이용 동의서')}>
									자세히
								</button>
							</div>

							<div class="privacy-detail">
								<ul>
									<li><strong>수집항목:</strong> 성명, 전화번호, 선택한 주택 정보</li>
									<li><strong>수집목적:</strong> 청약 신청 처리 및 계약 이행</li>
									<li><strong>보유기간:</strong> 청약 신청 완료 후 5년</li>
								</ul>
							</div>

							<div class="agreement-item optional">
								<input
									type="checkbox"
									id="agreeMarketing"
									bind:checked={formData.agreeMarketing}
								/>
								<label for="agreeMarketing">
									<strong>[선택]</strong> 마케팅 목적 SMS 발송에 동의합니다
								</label>
							</div>

							<div class="marketing-detail">
								<p>청약 및 분양 관련 정보, 이벤트 소식을 SMS로 받으실 수 있습니다.</p>
							</div>
						</div>

						<div class="warning-box">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path d="M12 2L2 22H22L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
								<path d="M12 10V14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
								<circle cx="12" cy="18" r="1" fill="currentColor"/>
							</svg>
							<div>
								<strong>주의사항</strong>
								<p>청약 신청 후에는 수정이 불가능하니 신중하게 확인 후 신청해주시기 바랍니다.</p>
							</div>
						</div>
					</div>
				{/if}

				<!-- 버튼 영역 -->
				<div class="button-area">
					{#if currentStep > 1}
						<button type="button" class="c-btn c-btn-secondary" onclick={prevStep}>
							이전
						</button>
					{/if}
					
					{#if currentStep < totalSteps}
						<button type="button" class="c-btn c-btn-primary" onclick={nextStep}>
							다음
						</button>
					{:else}
						<button type="button" class="c-btn c-btn-primary" onclick={submitApplication}>
							청약 신청하기
						</button>
					{/if}
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
	.subscription-section {
		background: var(--bg-light);
		min-height: 70vh;
	}

	/* 진행 단계 표시 */
	.step-indicator {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 10px;
		padding: 30px;
		background: white;
		border-radius: 8px;
		box-shadow: var(--shadow-sm);
	}

	.step-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
        width: 80px;
	}

	.step-number {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: var(--border-color);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 1.2rem;
		transition: all 0.3s ease;
	}

	.step-item.active .step-number {
		background: var(--primary-color);
		transform: scale(1.1);
	}

	.step-item.completed .step-number {
		background: var(--secondary-color);
	}

	.step-label {
		font-size: 0.9rem;
		color: var(--text-gray);
		font-weight: 600;
		text-align: center;
		white-space: nowrap;
	}

	.step-item.active .step-label {
		color: var(--primary-color);
	}

	.step-divider {
		width: 80px;
		height: 2px;
		background: var(--border-color);
		margin: -18px 10px 10px 0px;
		transition: all 0.3s ease;
	}

	.step-divider.completed {
		background: var(--secondary-color);
	}

	/* 폼 컨테이너 */
	.form-container {
		/* max-width: 900px; */
		margin: 0 auto;
		background: white;
		padding: 40px;
		border-radius: 8px;
		box-shadow: var(--shadow-sm);
	}

	.step-content {
		min-height: 350px;
	}

	.step-title {
		font-size: 1.8rem;
		font-weight: 700;
		color: var(--text-dark);
		margin: 0 0 10px 0;
	}

	.step-description {
		font-size: 1rem;
		color: var(--text-gray);
		margin: 0 0 40px 0;
	}

	/* 폼 요소 */
	.form-group {
		margin-bottom: 25px;
	}

	.form-group label {
		display: block;
		font-weight: 600;
		color: var(--text-dark);
		margin-bottom: 8px;
		font-size: 0.95rem;
	}

	.form-input,
	.form-select {
		width: 100%;
		padding: 12px 15px;
		border: 2px solid var(--border-color);
		border-radius: 4px;
		font-size: 1rem;
		transition: all 0.3s ease;
		box-sizing: border-box;
	}

	.form-input:focus,
	.form-select:focus {
		outline: none;
		border-color: var(--primary-color);
	}

	.form-input:disabled {
		background: var(--bg-light);
		cursor: not-allowed;
	}

	.input-with-button {
		display: flex;
		gap: 10px;
	}

	.input-with-button .form-input {
		flex: 1;
	}

	.input-with-button .c-btn {
		flex-shrink: 0;
		white-space: nowrap;
	}

	/* 인증 관련 */
	.verification-group {
		background: var(--bg-light);
		padding: 20px;
		border-radius: 4px;
	}

	.verification-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 8px;
		font-size: 0.85rem;
	}

	.timer {
		color: var(--primary-color);
		font-weight: 700;
	}

	.info-text {
		color: var(--text-gray);
	}

	.verification-success {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 15px;
		background: #d1fae5;
		border: 1px solid #10b981;
		border-radius: 4px;
		color: #065f46;
		font-weight: 600;
	}

	/* 주택 타입 선택 - 2단 레이아웃 */
	.unit-selection-layout {
		display: grid;
		grid-template-columns: 260px 1fr;
		gap: 30px;
		min-height: 500px;
	}

	.type-selector-panel {
		background: var(--bg-light);
		padding: 20px;
		border-radius: 8px;
		border: 1px solid var(--border-color);
	}

	.panel-title {
		font-size: 1rem;
		font-weight: 700;
		color: var(--text-dark);
		margin: 0 0 15px 0;
		padding-bottom: 12px;
		border-bottom: 2px solid var(--border-color);
	}

	.unit-type-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.floorplan-panel {
		background: white;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.unit-type-card {
		position: relative;
		background: white;
		border: 2px solid var(--border-color);
		border-radius: 6px;
		padding: 12px 15px;
		text-align: center;
		cursor: pointer;
		transition: all 0.3s ease;
		width: 100%;
	}

	.unit-type-card:hover {
		border-color: var(--primary-color);
		transform: translateX(5px);
		box-shadow: var(--shadow-md);
	}

	.unit-type-card.selected {
		border-color: var(--primary-color);
		background: rgba(139, 47, 57, 0.05);
		box-shadow: var(--shadow-sm);
	}

	.type-badge {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--primary-color);
		margin-bottom: 8px;
	}

	.type-info {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.type-area {
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--text-dark);
	}

	.type-rooms {
		font-size: 0.8rem;
		color: var(--text-gray);
	}

	.type-check {
		position: absolute;
		top: 8px;
		right: 8px;
		color: var(--primary-color);
	}

	.type-check svg {
		width: 20px;
		height: 20px;
	}

	/* 평면도 미리보기 */
	.floorplan-preview {
		width: 100%;
		height: 100%;
		padding: 0;
	}

	.no-selection-message {
		text-align: center;
		color: var(--text-gray);
		padding: 60px 20px;
	}

	.no-selection-message svg {
		color: var(--border-color);
		margin-bottom: 20px;
	}

	.no-selection-message p {
		font-size: 1rem;
		line-height: 1.6;
		margin: 0;
	}

	.preview-title {
		font-size: 1.3rem;
		font-weight: 700;
		color: var(--primary-color);
		margin: 0 0 25px 0;
		text-align: center;
		padding-bottom: 15px;
		border-bottom: 2px solid var(--border-color);
	}

	.preview-image-box {
		background: white;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: var(--shadow-md);
		margin-bottom: 25px;
	}

	.floorplan-image {
		width: 100%;
		height: auto;
		display: block;
	}

	.preview-info {
		display: flex;
		justify-content: center;
		gap: 40px;
		margin-bottom: 25px;
		padding: 20px;
		background: var(--bg-light);
		border-radius: 4px;
	}

	.info-item {
		font-size: 1rem;
		color: var(--text-dark);
		font-weight: 600;
	}

	.info-item strong {
		color: var(--primary-color);
		margin-right: 8px;
	}

	.preview-link {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 12px 24px;
		background: white;
		border: 2px solid var(--primary-color);
		border-radius: 4px;
		color: var(--primary-color);
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.preview-link:hover {
		background: var(--primary-color);
		color: white;
		gap: 12px;
	}

	/* 동별 정보 테이블 */
	.dong-info-section {
		margin-bottom: 40px;
	}

	.dong-info-toggle {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 15px 20px;
		background: white;
		border: 2px solid var(--primary-color);
		border-radius: 8px;
		color: var(--primary-color);
		font-weight: 600;
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.3s ease;
		margin-bottom: 20px;
	}

	.dong-info-toggle:hover {
		background: var(--primary-color);
		color: white;
	}

	.toggle-icon {
		transition: transform 0.3s ease;
	}

	.toggle-icon.open {
		transform: rotate(180deg);
	}

	.dong-info-content {
		animation: slideDown 0.3s ease;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.dong-info-table-wrapper {
		background: white;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: var(--shadow-sm);
		margin-bottom: 15px;
		border: 1px solid var(--border-color);
	}

	.dong-info-table {
		width: 100%;
		border-collapse: collapse;
	}

	.dong-info-table thead {
		background: var(--primary-color);
		color: white;
	}

	.dong-info-table th {
		padding: 12px 15px;
		text-align: center;
		font-weight: 600;
		font-size: 0.9rem;
	}

	.dong-info-table td {
		padding: 12px 15px;
		text-align: center;
		border-bottom: 1px solid var(--border-color);
		font-size: 0.9rem;
		color: var(--text-dark);
	}

	.dong-info-table tbody tr:last-child td {
		border-bottom: none;
	}

	.dong-info-table tbody tr:hover {
		background: var(--bg-light);
	}

	.dong-info-table tbody tr.selected {
		background: rgba(139, 47, 57, 0.08);
	}

	.dong-info-table tbody tr.selected td {
		color: var(--primary-color);
		font-weight: 600;
	}

	.hosu-format {
		font-family: 'Courier New', monospace;
		font-size: 0.85rem;
		color: var(--text-gray);
	}

	.table-notice {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 15px;
		background: #eff6ff;
		border-radius: 4px;
		font-size: 0.85rem;
		color: #1e40af;
	}

	.table-notice svg {
		flex-shrink: 0;
		color: #3b82f6;
	}

	/* 조감도 섹션 */
	.bird-view-section {
		margin-bottom: 40px;
	}

	.section-subtitle {
		font-size: 1.2rem;
		font-weight: 700;
		color: var(--text-dark);
		margin: 0 0 20px 0;
		text-align: center;
	}

	.bird-view-box {
		position: relative;
		background: white;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: var(--shadow-md);
		margin-bottom: 15px;
	}

	.bird-view-image {
		width: 100%;
		height: auto;
		display: block;
	}

	.bird-view-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	/* 동 마커 */
	.dong-marker {
		position: absolute;
		transform: translate(-50%, -50%);
		text-align: center;
		transition: all 0.3s ease;
	}

	.marker-dot {
		width: 12px;
		height: 12px;
		background: rgba(139, 47, 57, 0.6);
		border: 2px solid white;
		border-radius: 50%;
		margin: 0 auto 4px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
		transition: all 0.3s ease;
	}

	.marker-name {
		background: rgba(0, 0, 0, 0.7);
		color: white;
		padding: 3px 8px;
		border-radius: 10px;
		font-weight: 600;
		font-size: 0.75rem;
		white-space: nowrap;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
		transition: all 0.3s ease;
		line-height: 1.3;
	}

	.dong-marker.selected .marker-dot {
		width: 18px;
		height: 18px;
		background: var(--primary-color);
		border: 3px solid var(--secondary-color);
		animation: markerPulse 2s ease-in-out infinite;
	}

	.dong-marker.selected .marker-name {
		background: var(--primary-color);
		padding: 8px 14px;
		font-size: 0.9rem;
		font-weight: 700;
		border: 2px solid var(--secondary-color);
		white-space: normal;
		min-width: 70px;
		line-height: 1.4;
	}

	@keyframes markerPulse {
		0%, 100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.15);
		}
	}

	.bird-view-caption {
		text-align: center;
		font-size: 0.85rem;
		color: var(--text-gray);
		margin: 0;
	}

	/* 동호수 선택 */
	.select-grid-3 {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;
		margin-bottom: 30px;
	}

	.select-info {
		margin-top: 8px;
		font-size: 0.85rem;
		color: var(--primary-color);
		font-weight: 600;
		text-align: center;
	}

	.selected-unit-box {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 15px;
		padding: 25px;
		background: linear-gradient(135deg, rgba(139, 47, 57, 0.05), rgba(196, 166, 97, 0.05));
		border: 2px solid var(--primary-color);
		border-radius: 8px;
		margin-top: 30px;
	}

	.selected-unit-box svg {
		color: var(--primary-color);
		flex-shrink: 0;
	}

	.selected-unit-box > div {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.selected-unit-box strong {
		font-size: 0.9rem;
		color: var(--text-gray);
	}

	.selected-unit {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--primary-color);
	}

	/* 임대 조건 */
	.rental-condition-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20px;
		margin-bottom: 30px;
	}

	.rental-card {
		position: relative;
		background: white;
		border: 2px solid var(--border-color);
		border-radius: 8px;
		padding: 40px 30px;
		text-align: center;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.rental-card:hover {
		border-color: var(--primary-color);
		transform: translateY(-3px);
		box-shadow: var(--shadow-md);
	}

	.rental-card.selected {
		border-color: var(--primary-color);
		background: rgba(139, 47, 57, 0.05);
	}

	.rental-label {
		font-size: 1.4rem;
		font-weight: 700;
		color: var(--text-dark);
	}

	.rental-check {
		position: absolute;
		top: 15px;
		right: 15px;
		color: var(--primary-color);
	}

	/* 요약 정보 */
	.summary-box {
		padding: 30px;
		background: var(--bg-light);
		border-radius: 8px;
		margin-bottom: 30px;
	}

	.summary-box h3 {
		font-size: 1.3rem;
		font-weight: 700;
		color: var(--text-dark);
		margin: 0 0 20px 0;
	}

	.summary-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 15px;
	}

	.summary-item {
		display: flex;
		justify-content: space-between;
		padding: 12px 0;
		border-bottom: 1px solid var(--border-color);
	}

	.summary-label {
		color: var(--text-gray);
		font-weight: 600;
	}

	.summary-value {
		color: var(--text-dark);
		font-weight: 700;
	}

	/* 동의 항목 */
	.agreements-box {
		margin-bottom: 30px;
	}

	.agreement-item {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 15px;
		border: 1px solid var(--border-color);
		border-radius: 4px;
		margin-bottom: 15px;
	}

	.agreement-item.required {
		border-color: var(--primary-color);
		background: rgba(139, 47, 57, 0.02);
	}

	.agreement-item input[type="checkbox"] {
		width: 20px;
		height: 20px;
		accent-color: var(--primary-color);
		cursor: pointer;
	}

	.agreement-item label {
		flex: 1;
		font-size: 0.95rem;
		color: var(--text-dark);
		cursor: pointer;
	}

	.detail-btn {
		padding: 6px 16px;
		background: white;
		border: 1px solid var(--border-color);
		border-radius: 4px;
		font-size: 0.85rem;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.detail-btn:hover {
		background: var(--bg-light);
	}

	.privacy-detail,
	.marketing-detail {
		padding: 15px 20px;
		background: var(--bg-light);
		border-radius: 4px;
		margin-bottom: 15px;
		font-size: 0.9rem;
		color: var(--text-gray);
	}

	.privacy-detail ul {
		margin: 0;
		padding-left: 20px;
	}

	.privacy-detail li {
		margin-bottom: 8px;
	}

	/* 안내 박스 */
	.notice-box,
	.warning-box {
		padding: 20px;
		border-radius: 4px;
		margin-top: 30px;
	}

	.notice-box {
		background: #eff6ff;
		border: 1px solid #3b82f6;
	}

	.notice-box strong {
		display: block;
		color: #1e40af;
		margin-bottom: 10px;
	}

	.notice-box ul {
		margin: 0;
		padding-left: 20px;
		color: #1e3a8a;
	}

	.notice-box li {
		margin-bottom: 8px;
	}

	.warning-box {
		display: flex;
		gap: 15px;
		background: #fef3c7;
		border: 1px solid #f59e0b;
	}

	.warning-box svg {
		color: #f59e0b;
		flex-shrink: 0;
	}

	.warning-box strong {
		display: block;
		color: #92400e;
		margin-bottom: 5px;
	}

	.warning-box p {
		margin: 0;
		color: #78350f;
		font-size: 0.9rem;
	}

	/* 정보 링크 */
	.info-link-box {
		margin-top: 20px;
		text-align: center;
	}

	.info-link {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 12px 24px;
		background: white;
		border: 2px solid var(--primary-color);
		border-radius: 4px;
		color: var(--primary-color);
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s ease;
		cursor: pointer;
	}

	.info-link:hover {
		background: var(--primary-color);
		color: white;
	}

	/* 버튼 영역 */
	.button-area {
		display: flex;
		gap: 15px;
		justify-content: center;
		margin-top: 50px;
		padding-top: 30px;
		border-top: 2px solid var(--border-color);
	}

	.button-area .c-btn {
		min-width: 150px;
	}

	/* 반응형 */
	@media (max-width: 1024px) {
		.step-divider {
			width: 60px;
		}
	}

	@media (max-width: 768px) {
		.step-indicator {
			padding: 20px;
			overflow-x: auto;
		}

		.step-label {
			font-size: 0.8rem;
		}

		.step-divider {
			width: 40px;
		}

		.form-container {
			padding: 30px 20px;
		}

		.unit-selection-layout {
			grid-template-columns: 1fr;
			gap: 30px;
		}

		.type-selector-panel {
			max-width: 100%;
		}

		.unit-type-list {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 15px;
		}

		.floorplan-panel {
			min-height: 400px;
		}

		.preview-info {
			flex-direction: column;
			gap: 15px;
			align-items: center;
		}

		.dong-info-section {
			margin-bottom: 30px;
		}

		.dong-info-table {
			font-size: 0.85rem;
		}

		.dong-info-table th,
		.dong-info-table td {
			padding: 10px 8px;
		}

		.hosu-format {
			font-size: 0.75rem;
		}

		.bird-view-section {
			margin-bottom: 30px;
		}

		.marker-dot {
			width: 10px;
			height: 10px;
		}

		.dong-marker.selected .marker-dot {
			width: 16px;
			height: 16px;
		}

		.marker-name {
			font-size: 0.7rem;
			padding: 2px 6px;
		}

		.dong-marker.selected .marker-name {
			font-size: 0.85rem;
			padding: 5px 12px;
		}

		.select-grid-3 {
			grid-template-columns: 1fr;
		}

		.rental-condition-grid {
			grid-template-columns: 1fr;
		}

		.summary-grid {
			grid-template-columns: 1fr;
		}

		.button-area {
			flex-direction: column;
		}

		.button-area .c-btn {
			width: 100%;
		}
	}

	@media (max-width: 480px) {
		.step-number {
			width: 40px;
			height: 40px;
			font-size: 1rem;
		}

		.form-container {
			padding: 25px 15px;
		}

		.step-title {
			font-size: 1.5rem;
		}

		.unit-selection-layout {
			gap: 20px;
		}

		.unit-type-list {
			grid-template-columns: 1fr;
		}

		.type-selector-panel {
			padding: 20px;
		}

		.floorplan-panel {
			min-height: 350px;
		}

		.preview-title {
			font-size: 1.1rem;
		}

		.no-selection-message {
			padding: 40px 20px;
		}

		.no-selection-message svg {
			width: 60px;
			height: 60px;
		}

		.dong-info-table-wrapper {
			overflow-x: auto;
		}

		.dong-info-table th,
		.dong-info-table td {
			padding: 8px 6px;
			font-size: 0.8rem;
		}

		.hosu-format {
			font-size: 0.7rem;
		}

		.table-notice {
			flex-direction: column;
			align-items: flex-start;
			gap: 6px;
		}

		.marker-dot {
			width: 8px;
			height: 8px;
		}

		.dong-marker.selected .marker-dot {
			width: 14px;
			height: 14px;
		}

		.marker-name {
			font-size: 0.65rem;
			padding: 2px 5px;
		}

		.dong-marker.selected .marker-name {
			font-size: 0.8rem;
			padding: 4px 10px;
		}

		.selected-unit-box {
			padding: 20px;
		}

		.selected-unit {
			font-size: 1.3rem;
		}

		.input-with-button {
			flex-direction: column;
		}

		.input-with-button .c-btn {
			width: 100%;
		}
	}
</style>

