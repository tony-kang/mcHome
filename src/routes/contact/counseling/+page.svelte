<script>
	import { onMount } from 'svelte';
	import ___prj from '$prj/prjMain';
	import ___const from '$prj/lib/i_const';
	import { g_logedIn, g_theme } from '$prj/prjStore';
	import { toastAlert, toastError } from '$prj/lib/i_alert';
	import { ___date } from '$prj/lib/i_telepasi';

	let isLoaded = $state(false);
	let userInfo = $state(null);
	let inquiryList = $state([]);
	let showInquiryForm = $state(false);
	let showInquiryList = $state(false);
	let loading = $state(false);

	// 문의 조회 폼
	let inquiryForm = $state({
		c_email: 'blue@blue.com',
		c_phone: '010-1234-5678',
		c_pw: ''
	});

	// 문의 수정 폼
	let editForm = $state({
		no: 0,
		name: '',
		c_email: '',
		c_phone: '',
		content: '',
		type: '',
		c_date: '',
		c_pw: ''
	});

	let editingInquiry = $state(null);

	onMount(() => {
		if (___prj.user && $g_logedIn) {
			userInfo = ___prj.user;
		}
		isLoaded = true;
	});

	// 문의사항 불러오기
	async function loadInquiries() {
		if (!inquiryForm.c_email || !inquiryForm.c_phone) {
			toastError('이메일 또는 전화번호를 입력해주세요.');
			return;
		}

		if (!inquiryForm.c_pw) {
			toastError('비밀번호를 입력해주세요.');
			return;
		}

		loading = true;
		try {
			const r = await ___prj.api.post('/s/system', 'counselling.inquiry.list', {
				c_email: inquiryForm.c_email,
				c_phone: inquiryForm.c_phone,
				c_pw: inquiryForm.c_pw
			},null);

			if (r.data.result === ___const.OK) {
				inquiryList = r.data.content;
				showInquiryList = true;
				toastAlert(`${inquiryList.length}개의 문의사항을 찾았습니다.`);
			} else {
				toastError('문의사항을 찾을 수 없습니다.');
				inquiryList = [];
			}
		} catch (error) {
			console.error('문의사항 조회 오류:', error);
			toastError('문의사항 조회 중 오류가 발생했습니다.');
			inquiryList = [];
		} finally {
			loading = false;
		}
	}

	// 문의사항 수정
	async function updateInquiry() {
		if (!editForm.name || !editForm.c_phone || !editForm.content) {
			toastError('필수 항목을 모두 입력해주세요.');
			return;
		}

		if (!editForm.c_pw) {
			toastError('수정을 위한 비밀번호를 입력해주세요.');
			return;
		}

		loading = true;
		try {
			const r = await ___prj.api.post('/s/system', 'update.counselling.inquiry',null, {
				no: editForm.no,
				name: editForm.name,
				c_email: editForm.c_email,
				c_phone: editForm.c_phone,
				content: editForm.content,
				type: editForm.type,
				c_date: editForm.c_date,
				c_pw: editForm.c_pw
			});

			if (r.data.result === ___const.OK) {
				toastAlert('문의사항이 수정되었습니다.');
				editingInquiry = null;
				// 목록 새로고침
				await loadInquiries();
			} else {
				toastError(r.data.message || '수정에 실패했습니다.');
			}
		} catch (error) {
			console.error('문의사항 수정 오류:', error);
			toastError('수정 중 오류가 발생했습니다.');
		} finally {
			loading = false;
		}
	}

	// 수정 모드 시작
	function startEdit(inquiry) {
		editingInquiry = inquiry;
		
		// datetime-local input을 위한 날짜 포맷 변환
		let formattedDate = '';
		if (inquiry.c_date) {
			const date = new Date(inquiry.c_date);
			// ISO 형식으로 변환 (YYYY-MM-DDTHH:MM)
			formattedDate = date.toISOString().slice(0, 16);
		}
		
		editForm = {
			no: inquiry.no,
			name: inquiry.name,
			c_email: inquiry.c_email,
			c_phone: inquiry.c_phone,
			content: inquiry.content,
			type: inquiry.type || '',
			c_date: formattedDate,
			c_pw: ''
		};
	}

	// 수정 취소
	function cancelEdit() {
		editingInquiry = null;
		editForm = {
			no: 0,
			name: '',
			c_email: '',
			c_phone: '',
			content: '',
			type: '',
			c_date: '',
			c_pw: ''
		};
	}

	// 문의 유형 한글 변환
	function getTypeLabel(type) {
		const types = {
			'individual': '개인 상담',
			'workshop': '워크숍/캠프',
			'other': '기타'
		};
		return types[type] || type;
	}

	// 날짜 포맷팅
	function formatDate(dateString) {
		if (!dateString) return '-';
		const date = new Date(dateString);
		return date.toLocaleString('ko-KR');
	}

	// 상태 한글 변환
	function getStatusLabel(status) {
		const statuses = {
			'pending': '대기중',
			'processing': '처리중',
			'completed': '완료',
			'cancelled': '취소'
		};
		return statuses[status] || status;
	}

	// 상태별 색상
	function getStatusColor(status) {
		const colors = {
			'pending': '#f59e0b',
			'processing': '#3b82f6',
			'completed': '#10b981',
			'cancelled': '#ef4444'
		};
		return colors[status] || '#6b7280';
	}
</script>

<svelte:head>
	<title>나의 문의사항 - 마인드코딩</title>
</svelte:head>

<div class="counseling-page">
	<div class="container">
		{#if isLoaded}
			<div class="page-header">
				<h1>나의 문의사항</h1>
				<p class="page-description">
					이메일 또는 전화번호와 비밀번호를 입력하여 문의사항을 확인하고 수정할 수 있습니다.
				</p>
			</div>

			{#if !showInquiryList}
				<!-- 문의 조회 폼 -->
				<div class="inquiry-search-card">
					<div class="card-header">
						<h2>문의사항 조회</h2>
						<p>이메일 또는 전화번호와 비밀번호를 입력해주세요</p>
					</div>
					
					<div class="search-form" autocomplete="off" data-form-type="other">
						<div class="form-group">
							<label for="search-email">이메일</label>
							<input
								id="search-email"
								type="text"
								placeholder="이메일을 입력해주세요"
								bind:value={inquiryForm.c_email}
								autocomplete="off"
								spellcheck="false"
								data-form-type="other"
								data-lpignore="true"
							/>
						</div>
						
						<div class="form-group">
							<label for="search-phone">전화번호</label>
							<input
								id="search-phone"
								type="tel"
								placeholder="전화번호를 입력해주세요"
								bind:value={inquiryForm.c_phone}
								autocomplete="off"
								spellcheck="false"
								data-form-type="other"
								data-lpignore="true"
							/>
						</div>
						
						<div class="form-group">
							<label for="search-password">비밀번호 *</label>
							<input
								id="search-password"
								type="password"
								placeholder="문의 작성 시 입력한 비밀번호"
								bind:value={inquiryForm.c_pw}
								autocomplete="new-password"
								spellcheck="false"
								data-form-type="other"
							/>
						</div>
						
						<div class="form-actions">
							<button 
								class="btn-primary" 
								onclick={loadInquiries}
								disabled={loading}
							>
								{loading ? '조회 중...' : '문의사항 불러오기'}
							</button>
						</div>
					</div>
				</div>
			{:else}
				<!-- 문의 목록 -->
				<div class="inquiry-list-section">
					<div class="flex justify-between items-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8">
						<h2 class="text-3xl font-semibold m-0">문의사항 목록</h2>
						<div class="flex gap-3">
							<button class="btn-secondary" onclick={() => {
								showInquiryList = false;
								inquiryList = [];
								// 폼 초기화
								inquiryForm = { c_email: '', c_phone: '', c_pw: '' };
								
								// DOM에서 직접 input 값 초기화
								setTimeout(() => {
									const emailInput = document.getElementById('search-email');
									const phoneInput = document.getElementById('search-phone');
									const passwordInput = document.getElementById('search-password');
									
									if (emailInput) emailInput.value = '';
									if (phoneInput) phoneInput.value = '';
									if (passwordInput) passwordInput.value = '';
								}, 100);
							}}>
								새로 조회하기
							</button>
						</div>
					</div>

					{#if inquiryList.length === 0}
						<div class="empty-state">
							<div class="empty-icon">📝</div>
							<h3>문의사항이 없습니다</h3>
							<p>입력한 정보로 등록된 문의사항을 찾을 수 없습니다.</p>
						</div>
					{:else}
						<div class="inquiry-list">
							{#each inquiryList as inquiry, index}
								<div class="inquiry-item">
									{#if editingInquiry && editingInquiry.no === inquiry.no}
										<!-- 수정 모드 -->
										<div class="edit-form">
											<div class="flex justify-between items-center mb-6">
												<h3 class="text-xl font-semibold text-gray-900 m-0">문의사항 수정</h3>
												<button class="btn-cancel" onclick={cancelEdit}>취소</button>
											</div>
											
											<div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-3" autocomplete="off">
												<div class="form-group">
													<label for="edit-name">이름 *</label>
													<input
														id="edit-name"
														type="text"
														bind:value={editForm.name}
														autocomplete="off"
														spellcheck="false"
													/>
												</div>
												
												<div class="form-group">
													<label for="edit-email">이메일</label>
													<input
														id="edit-email"
														type="text"
														bind:value={editForm.c_email}
														autocomplete="off"
														spellcheck="false"
														disabled
													/>
												</div>
												
												<div class="form-group">
													<label for="edit-phone">연락처 *</label>
													<input
														id="edit-phone"
														type="tel"
														bind:value={editForm.c_phone}
														autocomplete="off"
														spellcheck="false"
														disabled
													/>
												</div>
												
												<div class="form-group">
													<label for="edit-type">문의 유형</label>
													<select id="edit-type" bind:value={editForm.type}>
														<option value="">문의 유형을 선택해주세요</option>
														<option value="individual">개인 상담</option>
														<option value="workshop">워크숍/캠프</option>
														<option value="other">기타</option>
													</select>
												</div>
												
												<div class="form-group">
													<label for="edit-datetime">상담 희망 일시</label>
													<input
														id="edit-datetime"
														type="datetime-local"
														bind:value={editForm.c_date}
														autocomplete="off"
													/>
												</div>
												
												<div class="form-group">
													<label for="edit-password">수정 비밀번호 *</label>
													<input
														id="edit-password"
														type="password"
														placeholder="수정을 위한 비밀번호"
														bind:value={editForm.c_pw}
														autocomplete="off"
														spellcheck="false"
													/>
												</div>
												
												<div class="form-group md:col-span-2">
													<label for="edit-content">문의 내용 *</label>
													<textarea
														id="edit-content"
														rows="4"
														bind:value={editForm.content}
													></textarea>
												</div>
											</div>
											
											<div class="flex gap-3 justify-end">
												<button class="btn-secondary" onclick={cancelEdit}>취소</button>
												<button 
													class="btn-primary" 
													onclick={updateInquiry}
													disabled={loading}
												>
													{loading ? '수정 중...' : '수정 완료'}
												</button>
											</div>
										</div>
									{:else}
										<!-- 조회 모드 -->
										<div class="inquiry-content">
											<div class="flex justify-between items-start mb-2">
												<div class="inquiry-info">
													<h3 class="text-xl font-semibold text-gray-900 mb-2">{inquiry.name}</h3>
													<div class="flex gap-4 flex-wrap">
														<span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{___date(inquiry.reg_date)}</span>
													</div>
												</div>
												<div class="flex gap-2">
													<button class="btn-edit" onclick={() => startEdit(inquiry)}>
														✏️ 수정
													</button>
												</div>
											</div>
											
											<div class="bg-gray-50 rounded-lg py-5 px-2">
												<div class="flex items-start justify-start gap-1 md:gap-3 mb-2">
													<span class="font-bold text-gray-700 min-w-0 md:min-w-24 text-sm text-right">연락처 :</span>
													<span class="text-gray-600 flex-1">{inquiry.c_phone}</span>
												</div>
												{#if inquiry.c_email}
													<div class="flex items-start justify-start gap-1 md:gap-3 mb-2">
														<span class="font-bold text-gray-700 min-w-0 md:min-w-24 text-sm text-right">이메일 :</span>
														<span class="text-gray-600 flex-1">{inquiry.c_email}</span>
													</div>
												{/if}
												{#if inquiry.c_date}
													<div class="flex items-start justify-start gap-1 md:gap-3 mb-2">
														<span class="font-bold text-gray-700 min-w-0 md:min-w-24 text-sm text-right">상담 희망 일시 :</span>
														<span class="text-gray-600 flex-1">{formatDate(inquiry.c_date)}</span>
													</div>
												{/if}
												<div class="flex items-start justify-start gap-1 md:gap-3">
													<span class="font-bold text-gray-700 min-w-0 md:min-w-24 text-sm text-right">문의 내용 :</span>
													<div class="text-gray-700 leading-relaxed whitespace-pre-wrap flex-1" style="max-height: 200px; overflow-y: auto;">{@html inquiry.content.replace(/\n/g, '<br />')}</div>
												</div>
											</div>
										</div>
									{/if}
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		{/if}
	</div>
</div>

<style>
	.counseling-page {
		min-height: 100vh;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 40px 0 40px;
	}

	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 0 20px;
	}

	.page-header {
		text-align: center;
		margin-bottom: 40px;
		color: white;
	}

	.page-header h1 {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 16px;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.page-description {
		font-size: 1.1rem;
		opacity: 0.9;
		max-width: 600px;
		margin: 0 auto;
		line-height: 1.6;
	}

	.inquiry-search-card {
		background: white;
		border-radius: 16px;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
		overflow: hidden;
	}

	.card-header {
		background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
		color: white;
		padding: 30px;
		text-align: center;
	}

	.card-header h2 {
		font-size: 1.8rem;
		font-weight: 600;
		margin-bottom: 8px;
	}

	.card-header p {
		opacity: 0.9;
		font-size: 1rem;
	}

	.search-form {
		padding: 40px;
	}

	.form-group label {
		display: block;
		margin-bottom: 4px;
		font-weight: 600;
		color: #374151;
		font-size: 0.95rem;
	}

	.form-group input,
	.form-group select,
	.form-group textarea {
		width: 100%;
		padding: 12px 16px;
		border: 2px solid #e5e7eb;
		border-radius: 8px;
		font-size: 1rem;
		transition: all 0.3s ease;
		box-sizing: border-box;
	}

	.form-group input:focus,
	.form-group select:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: #48bb78;
		box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.1);
	}

	.form-group input:disabled,
	.form-group select:disabled,
	.form-group textarea:disabled {
		background-color: #ddd;
		cursor: not-allowed;
	}

	.form-actions {
		text-align: center;
		margin-top: 32px;
	}

	.btn-primary,
	.btn-secondary,
	.btn-edit,
	.btn-cancel {
		padding: 12px 24px;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		border: none;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}

	.btn-primary {
		background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
		color: white;
		box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
	}

	.btn-primary:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(72, 187, 120, 0.4);
	}

	.btn-primary:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.btn-secondary {
		background: #f3f4f6;
		color: #374151;
		border: 2px solid #e5e7eb;
	}

	.btn-secondary:hover {
		background: #e5e7eb;
		border-color: #d1d5db;
	}

	.btn-edit {
		background: #3b82f6;
		color: white;
		font-size: 0.9rem;
		padding: 8px 16px;
	}

	.btn-edit:hover {
		background: #2563eb;
		transform: translateY(-1px);
	}

	.btn-cancel {
		background: #ef4444;
		color: white;
		font-size: 0.9rem;
		padding: 8px 16px;
	}

	.btn-cancel:hover {
		background: #dc2626;
	}

	.inquiry-list-section {
		background: white;
		border-radius: 16px;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
		overflow: hidden;
	}


	.empty-state {
		text-align: center;
		padding: 60px 40px;
		color: #6b7280;
	}

	.empty-icon {
		font-size: 4rem;
		margin-bottom: 20px;
	}

	.empty-state h3 {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 12px;
		color: #374151;
	}

	.empty-state p {
		font-size: 1rem;
		line-height: 1.6;
	}

	.inquiry-list {
		padding: 0;
	}

	.inquiry-item {
		border-bottom: 1px solid #e5e7eb;
	}

	.inquiry-item:last-child {
		border-bottom: none;
	}

	.inquiry-content {
		padding: 30px;
	}




	.edit-form {
		padding: 30px;
		background: #f9fafb;
	}


	/* 반응형 디자인 */
	@media (max-width: 768px) {
		.counseling-page {
			padding: 40px 0 40px;
		}

		.container {
			padding: 0 16px;
		}

		.page-header h1 {
			font-size: 2rem;
		}

		.page-description {
			font-size: 1rem;
		}

		.search-form,
		.inquiry-content,
		.edit-form {
			padding: 20px;
		}

		.card-header {
			padding: 20px;
		}


	}
</style>
