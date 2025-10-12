<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import ___prj from '$prj/prjMain';
	import ___const from '$prj/lib/i_const';

	const counselorId = $page.params.id;
	const serviceParam = $page.url.searchParams.get('service');
	
	let counselorData = $state(null);
	let loading = $state(true);
	let submitting = $state(false);

	let formData = $state({
		name: '',
		phone: '',
		email: '',
		service: serviceParam || 'individual',
		preferredDate: '',
		preferredTime: '',
		consultationType: 'offline',
		message: ''
	});

	const services = [
		{ value: 'individual', label: '개인 심리상담' },
		{ value: 'psychological-test', label: '종합 심리검사' },
		{ value: 'student-counseling', label: '학생 상담' },
		{ value: 'coaching', label: '목표달성 코칭' }
	];

	const timeSlots = [
		'09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'
	];

	async function loadCounselorData() {
		try {
			const r = await ___prj.api.post('/s/system', 'get.special.template.config', null, {
				counselorId: counselorId
			});

			if (r.data.result === ___const.OK) {
				counselorData = r.data.content;
			}
		} catch (error) {
			console.error('상담사 정보 로드 오류:', error);
		} finally {
			loading = false;
		}

		counselorData = {
            name: '홍길동',
            title: '심리상담 전문가',
            profile_image: 'https://nimage.g-enews.com/phpwas/restmb_allidxmake.php?idx=5&simg=2020060618594303154b8488d322b9220692192.jpg',
            email: 'hong@gmail.com',
            phone: '010-1234-5678'
        };
        loading = false;
	}

	async function handleSubmit(e) {
		e.preventDefault();

		if (!formData.name || !formData.phone || !formData.email) {
			alert('필수 항목을 모두 입력해주세요.');
			return;
		}

		if (!formData.preferredDate || !formData.preferredTime) {
			alert('희망 날짜와 시간을 선택해주세요.');
			return;
		}

		submitting = true;

		try {
			const r = await ___prj.api.post('/s/counseling', 'create.booking', null, {
				counselorId: counselorId,
				...formData
			});

			if (r.data.result === ___const.OK) {
				alert('예약 신청이 완료되었습니다.\n상담사가 확인 후 연락드리겠습니다.');
				goto(`/${counselorId}`);
			} else {
				alert('예약 신청 중 오류가 발생했습니다.\n다시 시도해주세요.');
			}
		} catch (error) {
			console.error('예약 신청 오류:', error);
			alert('예약 신청 중 오류가 발생했습니다.');
		} finally {
			submitting = false;
		}
	}

	// 오늘 날짜 이후만 선택 가능하도록
	const today = new Date().toISOString().split('T')[0];

	onMount(() => {
		loadCounselorData();
	});
</script>

<svelte:head>
	<title>예약하기 - {counselorData?.name || '상담사'}</title>
</svelte:head>

{#if !loading && counselorData}
	<!-- Page Header -->
	<section class="page-header">
		<div class="t-container">
			<h1>상담 예약</h1>
			<p>편안한 마음으로 상담을 시작하세요</p>
		</div>
	</section>

	<!-- Booking Form -->
	<section class="booking-section">
		<div class="t-container">
			<div class="booking-layout">
				<!-- Form -->
				<div class="booking-form-wrapper">
					<form onsubmit={handleSubmit} class="booking-form">
						<h2>예약 정보 입력</h2>

						<!-- 기본 정보 -->
						<div class="form-section">
							<h3>기본 정보</h3>
							<div class="form-group">
								<label for="name">이름 *</label>
								<input
									id="name"
									type="text"
									bind:value={formData.name}
									placeholder="이름을 입력하세요"
									required
								/>
							</div>

							<div class="form-group">
								<label for="phone">연락처 *</label>
								<input
									id="phone"
									type="tel"
									bind:value={formData.phone}
									placeholder="010-0000-0000"
									required
								/>
							</div>

							<div class="form-group">
								<label for="email">이메일 *</label>
								<input
									id="email"
									type="email"
									bind:value={formData.email}
									placeholder="example@email.com"
									required
								/>
							</div>
						</div>

						<!-- 상담 정보 -->
						<div class="form-section">
							<h3>상담 정보</h3>
							<div class="form-group">
								<label for="service">상담 서비스 *</label>
								<select id="service" bind:value={formData.service} required>
									{#each services as service}
										<option value={service.value}>{service.label}</option>
									{/each}
								</select>
							</div>

							<div class="form-group">
								<label for="consultationType">상담 방식 *</label>
								<div class="radio-group">
									<label class="radio-label">
										<input
											type="radio"
											name="consultationType"
											value="offline"
											bind:group={formData.consultationType}
										/>
										<span>대면 상담</span>
									</label>
									<label class="radio-label">
										<input
											type="radio"
											name="consultationType"
											value="online"
											bind:group={formData.consultationType}
										/>
										<span>비대면 상담 (화상)</span>
									</label>
								</div>
							</div>

							<div class="form-row">
								<div class="form-group">
									<label for="preferredDate">희망 날짜 *</label>
									<input
										id="preferredDate"
										type="date"
										bind:value={formData.preferredDate}
										min={today}
										required
									/>
								</div>

								<div class="form-group">
									<label for="preferredTime">희망 시간 *</label>
									<select id="preferredTime" bind:value={formData.preferredTime} required>
										<option value="">시간 선택</option>
										{#each timeSlots as time}
											<option value={time}>{time}</option>
										{/each}
									</select>
								</div>
							</div>

							<div class="form-group">
								<label for="message">상담 내용 (선택)</label>
								<textarea
									id="message"
									bind:value={formData.message}
									placeholder="상담받고 싶은 내용을 간단히 적어주세요"
									rows="5"
								></textarea>
							</div>
						</div>

						<!-- 안내사항 -->
						<div class="notice-box">
							<h4>📌 예약 안내</h4>
							<ul>
								<li>예약 신청 후 24시간 이내에 확인 연락을 드립니다</li>
								<li>상담 24시간 전까지 취소 및 변경이 가능합니다</li>
								<li>모든 상담 내용은 철저히 비밀이 보장됩니다</li>
								<li>첫 상담 시 간단한 사전 설문이 진행됩니다</li>
							</ul>
						</div>

						<!-- 제출 버튼 -->
						<button type="submit" class="btn-submit" disabled={submitting}>
							{submitting ? '예약 신청 중...' : '예약 신청하기'}
						</button>
					</form>
				</div>

				<!-- Info Sidebar -->
				<div class="info-sidebar">
					<div class="info-card">
						<h3>상담사 정보</h3>
						<div class="counselor-info">
							{#if counselorData.profile_image}
								<img src={counselorData.profile_image} alt={counselorData.name} class="counselor-avatar" />
							{:else}
								<div class="counselor-avatar-placeholder">
									{counselorData.name?.charAt(0) || 'C'}
								</div>
							{/if}
							<div>
								<p class="counselor-name">{counselorData.name || '상담사'}</p>
								<p class="counselor-title">{counselorData.title || '심리상담 전문가'}</p>
							</div>
						</div>
					</div>

					<div class="info-card">
						<h3>연락처</h3>
						<div class="contact-info">
							{#if counselorData.email}
								<div class="contact-item">
									<span class="icon">📧</span>
									<span>{counselorData.email}</span>
								</div>
							{/if}
							{#if counselorData.phone}
								<div class="contact-item">
									<span class="icon">📞</span>
									<span>{counselorData.phone}</span>
								</div>
							{/if}
							<div class="contact-item">
								<span class="icon">⏰</span>
								<span>평일 09:00 - 18:00</span>
							</div>
						</div>
					</div>

					<div class="info-card highlight">
						<h3>💡 상담 전 준비사항</h3>
						<ul class="tips-list">
							<li>편안한 복장으로 참석해주세요</li>
							<li>상담 시작 10분 전 도착을 권장합니다</li>
							<li>비대면 상담 시 안정적인 인터넷 환경을 확인해주세요</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</section>

{/if}

<style>

	.booking-section {
		padding: 80px 0;
		background: #f8f9fa;
	}

	.booking-layout {
		display: grid;
		grid-template-columns: 1fr 350px;
		gap: 40px;
	}

	.booking-form-wrapper {
		background: white;
		border-radius: 16px;
		padding: 40px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
	}

	.booking-form h2 {
		font-size: 2rem;
		margin: 0 0 30px 0;
		color: #333;
	}

	.form-section {
		margin-bottom: 40px;
	}

	.form-section h3 {
		font-size: 1.3rem;
		margin: 0 0 20px 0;
		color: #667eea;
		border-bottom: 2px solid #667eea;
		padding-bottom: 10px;
	}

	.form-group {
		margin-bottom: 20px;
	}

	.form-group label {
		display: block;
		margin-bottom: 8px;
		font-weight: 600;
		color: #333;
	}

	.form-group input,
	.form-group select,
	.form-group textarea {
		width: 100%;
		padding: 12px 16px;
		border: 2px solid #e9ecef;
		border-radius: 8px;
		font-size: 1rem;
		transition: border-color 0.3s ease;
	}

	.form-group input:focus,
	.form-group select:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: #667eea;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
	}

	.radio-group {
		display: flex;
		gap: 20px;
	}

	.radio-label {
		display: flex;
		align-items: center;
		gap: 8px;
		cursor: pointer;
		padding: 12px 20px;
		border: 2px solid #e9ecef;
		border-radius: 8px;
		transition: all 0.3s ease;
	}

	.radio-label:has(input:checked) {
		border-color: #667eea;
		background: rgba(102, 126, 234, 0.1);
	}

	.radio-label input[type="radio"] {
		width: auto;
		margin: 0;
	}

	.notice-box {
		background: #f8f9fa;
		padding: 20px;
		border-radius: 12px;
		border-left: 4px solid #667eea;
		margin-bottom: 30px;
	}

	.notice-box h4 {
		margin: 0 0 15px 0;
		color: #333;
	}

	.notice-box ul {
		margin: 0;
		padding-left: 20px;
	}

	.notice-box li {
		padding: 5px 0;
		color: #666;
		line-height: 1.6;
	}

	.btn-submit {
		width: 100%;
		padding: 18px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		border-radius: 12px;
		font-size: 1.2rem;
		font-weight: 700;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.btn-submit:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
	}

	.btn-submit:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.info-sidebar {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.info-card {
		background: white;
		padding: 25px;
		border-radius: 12px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
	}

	.info-card.highlight {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
	}

	.info-card h3 {
		font-size: 1.2rem;
		margin: 0 0 20px 0;
		color: #333;
	}

	.info-card.highlight h3 {
		color: white;
	}

	.counselor-info {
		display: flex;
		align-items: center;
		gap: 15px;
	}

	.counselor-avatar {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		object-fit: cover;
	}

	.counselor-avatar-placeholder {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		font-weight: 700;
	}

	.counselor-name {
		font-weight: 700;
		font-size: 1.1rem;
		margin: 0 0 5px 0;
		color: #333;
	}

	.counselor-title {
		color: #667eea;
		margin: 0;
		font-size: 0.9rem;
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	.contact-item {
		display: flex;
		align-items: center;
		gap: 10px;
		color: #666;
	}

	.icon {
		font-size: 1.2rem;
	}

	.tips-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.tips-list li {
		padding: 8px 0;
		padding-left: 20px;
		position: relative;
		line-height: 1.6;
	}

	.tips-list li::before {
		content: '✓';
		position: absolute;
		left: 0;
		font-weight: 700;
	}

	/* Responsive */
	@media (max-width: 968px) {
		.booking-layout {
			grid-template-columns: 1fr;
		}

		.info-sidebar {
			order: -1;
		}
	}

	@media (max-width: 768px) {
		.booking-form-wrapper {
			padding: 25px;
		}

		.form-row {
			grid-template-columns: 1fr;
		}

		.radio-group {
			flex-direction: column;
		}
	}
</style>
