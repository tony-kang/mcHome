<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import ___prj from '$prj/prjMain';
	import ___const from '$prj/lib/i_const';
	import favicon from '$lib/assets/favicon.svg';

	const complexId = $page.params.id;
	let complexData = $state(null);
	let loading = $state(true);

	// 폼 데이터
	let formData = $state({
		name: '',
		phone: '',
		email: '',
		visitDate: '',
		visitTime: '',
		message: '',
		agreePrivacy: false,
		agreeMarketing: false
	});

	let isSubmitting = $state(false);
	let submitMessage = $state('');

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
			phone: '02-1234-5678',
			address: '서울특별시 강서구 공항대로 302'
		};
		loading = false;
	}

	async function handleSubmit(event) {
		event.preventDefault();
		
		if (!formData.agreePrivacy) {
			alert('개인정보 수집 및 이용에 동의해주세요.');
			return;
		}

		isSubmitting = true;
		submitMessage = '';

		try {
			// API 호출 (구현 필요)
			// const result = await ___prj.api.post('/s/contact', 'submit.inquiry', null, formData);
			
			// 임시 성공 처리
			await new Promise(resolve => setTimeout(resolve, 1000));
			
			submitMessage = '상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.';
			
			// 폼 초기화
			formData = {
				name: '',
				phone: '',
				email: '',
				visitDate: '',
				visitTime: '',
				message: '',
				agreePrivacy: false,
				agreeMarketing: false
			};
		} catch (error) {
			console.error('상담 신청 오류:', error);
			submitMessage = '상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.';
		} finally {
			isSubmitting = false;
		}
	}

	onMount(() => {
		loadComplexData();
	});
</script>

<svelte:head>
	<title>분양문의 - {complexData?.name || '단지명'}</title>
	<link rel="icon" href={favicon} />
	<meta name="description" content="{complexData?.name || '단지명'} 분양 상담 문의" />
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
			<h1 class="page-title">분양문의</h1>
			<p class="page-subtitle">궁금하신 사항을 문의해주세요</p>
		</div>
	</section>

	<!-- 문의 폼 -->
	<section class="c-section contact-section">
		<div class="c-container">
			<div class="contact-grid">
				<!-- 연락처 정보 -->
				<div class="contact-info-box">
					<h2>상담 안내</h2>
					
					<div class="info-item">
						<div class="info-icon">
							<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
								<path d="M28 23.5C28 23.9 27.9 24.3 27.7 24.7C27.5 25.1 27.2 25.5 26.8 25.8C26 26.5 25.1 27 24.1 27.3C23.1 27.6 22 27.8 20.8 27.8C19 27.8 17.1 27.4 15.1 26.5C13.1 25.6 11.1 24.4 9.1 22.9C7.1 21.4 5.2 19.7 3.4 17.8C1.6 15.9 0 14 0.5 12C0.8 10.9 1.3 10 2 9.2C2.3 8.8 2.7 8.5 3.1 8.3C3.5 8.1 3.9 8 4.3 8C4.5 8 4.8 8.1 5 8.2C5.2 8.3 5.4 8.5 5.5 8.8L8.2 13.5C8.3 13.7 8.4 13.9 8.5 14.1C8.6 14.3 8.6 14.5 8.6 14.7C8.6 14.9 8.5 15.2 8.4 15.4C8.3 15.7 8.1 15.9 7.9 16.2L7 17.2C7 17.3 6.9 17.4 6.9 17.5C6.9 17.6 6.9 17.7 6.9 17.8C7 18.1 7.2 18.5 7.5 18.9C8.1 19.6 8.8 20.3 9.7 21.1C10.5 22 11.3 22.7 12 23.3C12.4 23.6 12.8 23.8 13.1 23.9C13.2 23.9 13.3 23.9 13.4 23.9C13.5 23.9 13.6 23.9 13.7 23.9L14.7 23C15 22.7 15.3 22.5 15.5 22.4C15.8 22.3 16 22.2 16.2 22.2C16.4 22.2 16.6 22.3 16.8 22.3C17 22.4 17.2 22.5 17.4 22.6L22.2 25.4C22.5 25.6 22.7 25.8 22.8 26.1C22.9 26.3 23 26.5 23 26.8C23 27.1 22.9 27.4 22.8 27.7C22.7 28 22.5 28.3 22.2 28.6C21.9 29 21.5 29.3 21 29.5C20.5 29.7 20 29.8 19.4 29.8H28Z" fill="currentColor"/>
							</svg>
						</div>
						<div>
							<div class="info-label">분양문의</div>
							<div class="info-value">{complexData.phone}</div>
						</div>
					</div>

					<div class="info-item">
						<div class="info-icon">
							<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
								<circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="2" fill="none"/>
								<path d="M16 8V16L22 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
							</svg>
						</div>
						<div>
							<div class="info-label">상담시간</div>
							<div class="info-value">평일 10:00 - 18:00</div>
							<div class="info-note">주말 및 공휴일 휴무</div>
						</div>
					</div>

					<div class="info-item">
						<div class="info-icon">
							<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
								<path d="M16 4C11.268 4 7 8.268 7 13C7 19.5 16 28 16 28C16 28 25 19.5 25 13C25 8.268 20.732 4 16 4Z" stroke="currentColor" stroke-width="2" fill="none"/>
								<circle cx="16" cy="13" r="3" stroke="currentColor" stroke-width="2" fill="none"/>
							</svg>
						</div>
						<div>
							<div class="info-label">주소</div>
							<div class="info-value">{complexData.address}</div>
						</div>
					</div>

					<div class="direct-contact">
						<a href="tel:{complexData.phone}" class="c-btn c-btn-gold">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
								<path d="M18 12.5C18 12.9 17.9 13.3 17.7 13.7C17.5 14.1 17.2 14.5 16.8 14.8C16 15.5 15.1 16 14.1 16.3C13.1 16.6 12 16.8 10.8 16.8C9 16.8 7.1 16.4 5.1 15.5C3.1 14.6 1.1 13.4 -0.9 11.9C-2.9 10.4 -4.8 8.7 -6.6 6.8C-8.4 4.9 -10 3 -9.5 1C-9.2 -0.1 -8.7 -1 -8 -1.8C-7.7 -2.2 -7.3 -2.5 -6.9 -2.7C-6.5 -2.9 -6.1 -3 -5.7 -3C-5.5 -3 -5.2 -2.9 -5 -2.8C-4.8 -2.7 -4.6 -2.5 -4.5 -2.2L-1.8 2.5C-1.7 2.7 -1.6 2.9 -1.5 3.1C-1.4 3.3 -1.4 3.5 -1.4 3.7C-1.4 3.9 -1.5 4.2 -1.6 4.4C-1.7 4.7 -1.9 4.9 -2.1 5.2L-3 6.2C-3 6.3 -3.1 6.4 -3.1 6.5C-3.1 6.6 -3.1 6.7 -3.1 6.8C-3 7.1 -2.8 7.5 -2.5 7.9C-1.9 8.6 -1.2 9.3 -0.3 10.1C0.5 11 1.3 11.7 2 12.3C2.4 12.6 2.8 12.8 3.1 12.9C3.2 12.9 3.3 12.9 3.4 12.9C3.5 12.9 3.6 12.9 3.7 12.9L4.7 12C5 11.7 5.3 11.5 5.5 11.4C5.8 11.3 6 11.2 6.2 11.2C6.4 11.2 6.6 11.3 6.8 11.3C7 11.4 7.2 11.5 7.4 11.6L12.2 14.4C12.5 14.6 12.7 14.8 12.8 15.1C12.9 15.3 13 15.5 13 15.8C13 16.1 12.9 16.4 12.8 16.7C12.7 17 12.5 17.3 12.2 17.6C11.9 18 11.5 18.3 11 18.5C10.5 18.7 10 18.8 9.4 18.8H18Z" fill="currentColor"/>
							</svg>
							전화 상담
						</a>
					</div>
				</div>

				<!-- 상담 신청 폼 -->
				<div class="contact-form-box">
					<h2>상담 신청</h2>
					
					{#if submitMessage}
						<div class="submit-message {submitMessage.includes('완료') ? 'success' : 'error'}">
							{submitMessage}
						</div>
					{/if}

					<form onsubmit={handleSubmit} class="contact-form">
						<div class="form-row">
							<div class="form-group">
								<label for="name">성함 *</label>
								<input
									type="text"
									id="name"
									bind:value={formData.name}
									required
									placeholder="성함을 입력하세요"
								/>
							</div>
							<div class="form-group">
								<label for="phone">연락처 *</label>
								<input
									type="tel"
									id="phone"
									bind:value={formData.phone}
									required
									placeholder="010-0000-0000"
								/>
							</div>
						</div>

						<div class="form-group">
							<label for="email">이메일</label>
							<input
								type="email"
								id="email"
								bind:value={formData.email}
								placeholder="example@email.com"
							/>
						</div>

						<div class="form-row">
							<div class="form-group">
								<label for="visitDate">방문 희망일</label>
								<input
									type="date"
									id="visitDate"
									bind:value={formData.visitDate}
								/>
							</div>
							<div class="form-group">
								<label for="visitTime">방문 희망시간</label>
								<select id="visitTime" bind:value={formData.visitTime}>
									<option value="">선택하세요</option>
									<option value="10:00">10:00</option>
									<option value="11:00">11:00</option>
									<option value="13:00">13:00</option>
									<option value="14:00">14:00</option>
									<option value="15:00">15:00</option>
									<option value="16:00">16:00</option>
									<option value="17:00">17:00</option>
								</select>
							</div>
						</div>

						<div class="form-group">
							<label for="message">문의내용</label>
							<textarea
								id="message"
								bind:value={formData.message}
								rows="5"
								placeholder="문의하실 내용을 입력하세요"
							></textarea>
						</div>

						<div class="form-agreements">
							<div class="agreement-item">
								<input
									type="checkbox"
									id="agreePrivacy"
									bind:checked={formData.agreePrivacy}
									required
								/>
								<label for="agreePrivacy">
									개인정보 수집 및 이용에 동의합니다 (필수)
								</label>
							</div>
							<div class="agreement-item">
								<input
									type="checkbox"
									id="agreeMarketing"
									bind:checked={formData.agreeMarketing}
								/>
								<label for="agreeMarketing">
									마케팅 정보 수신에 동의합니다 (선택)
								</label>
							</div>
						</div>

						<button
							type="submit"
							class="c-btn c-btn-primary c-btn-large submit-btn"
							disabled={isSubmitting}
						>
							{#if isSubmitting}
								처리 중...
							{:else}
								상담 신청하기
							{/if}
						</button>
					</form>
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
	.contact-section {
		background: var(--bg-light);
	}

	.contact-grid {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 40px;
	}

	.contact-info-box,
	.contact-form-box {
		background: white;
		padding: 40px;
		border-radius: 8px;
		box-shadow: var(--shadow-sm);
	}

	.contact-info-box h2,
	.contact-form-box h2 {
		font-size: 1.8rem;
		font-weight: 700;
		color: var(--text-dark);
		margin: 0 0 30px 0;
	}

	.info-item {
		display: flex;
		gap: 20px;
		padding: 20px 0;
		border-bottom: 1px solid var(--border-color);
	}

	.info-item:last-of-type {
		border-bottom: none;
	}

	.info-icon {
		color: var(--primary-color);
		flex-shrink: 0;
	}

	.info-label {
		font-size: 0.9rem;
		color: var(--text-gray);
		margin-bottom: 5px;
	}

	.info-value {
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--text-dark);
		margin-bottom: 3px;
	}

	.info-note {
		font-size: 0.85rem;
		color: var(--text-light);
	}

	.direct-contact {
		margin-top: 30px;
	}

	.direct-contact .c-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
	}

	.form-group {
		margin-bottom: 20px;
	}

	.form-group label {
		display: block;
		font-weight: 600;
		color: var(--text-dark);
		margin-bottom: 8px;
		font-size: 0.95rem;
	}

	.form-group input,
	.form-group select,
	.form-group textarea {
		width: 100%;
		padding: 12px 15px;
		border: 2px solid var(--border-color);
		border-radius: 4px;
		font-size: 1rem;
		transition: all 0.3s ease;
		box-sizing: border-box;
	}

	.form-group input:focus,
	.form-group select:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: var(--primary-color);
	}

	.form-group textarea {
		resize: vertical;
		font-family: inherit;
	}

	.form-agreements {
		margin: 25px 0;
		padding: 20px;
		background: var(--bg-light);
		border-radius: 4px;
	}

	.agreement-item {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 12px;
	}

	.agreement-item:last-child {
		margin-bottom: 0;
	}

	.agreement-item input[type="checkbox"] {
		width: 18px;
		height: 18px;
		accent-color: var(--primary-color);
		cursor: pointer;
	}

	.agreement-item label {
		font-size: 0.95rem;
		color: var(--text-gray);
		cursor: pointer;
	}

	.submit-btn {
		width: 100%;
	}

	.submit-message {
		padding: 15px;
		border-radius: 4px;
		margin-bottom: 20px;
		text-align: center;
		font-weight: 600;
	}

	.submit-message.success {
		background: #d4edda;
		color: #155724;
		border: 1px solid #c3e6cb;
	}

	.submit-message.error {
		background: #f8d7da;
		color: #721c24;
		border: 1px solid #f5c6cb;
	}

	.error-container {
		min-height: 60vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 60px 20px;
		text-align: center;
	}

	/* 반응형 */
	@media (max-width: 1024px) {
		.contact-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 768px) {
		.contact-info-box,
		.contact-form-box {
			padding: 30px 20px;
		}

		.form-row {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 480px) {
		.contact-info-box h2,
		.contact-form-box h2 {
			font-size: 1.5rem;
		}

		.info-item {
			flex-direction: column;
			gap: 10px;
		}
	}
</style>

