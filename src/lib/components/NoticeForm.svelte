<script>
	import ___prj from '$prj/prjMain';
	import ___const from '$prj/lib/i_const';
	import HtmlEditor from '$prj/C/htmlEditor/HtmlEditor.svelte';
	import { ___decodeHtml } from '$prj/lib/i_telepasi';
	
	// Props
	let { 
		noticeData = null,
		submitting = false,
		onSubmit = () => {},
		onCancel = () => {},
		submitButtonText = '저장',
		cancelButtonText = '취소',
		showResetButton = false,
		onReset = () => {}
	} = $props();

	// console.log('noticeForm : noticeData', $state.snapshot(noticeData));
	
	const categories = [
		{ value: 'general', label: '일반' },
		{ value: 'service', label: '서비스' },
		{ value: 'education', label: '교육' },
		{ value: 'event', label: '이벤트' },
		{ value: 'system', label: '시스템' },
		{ value: 'policy', label: '정책' },
		{ value: 'company', label: '회사' }
	];

	function onChangeHandler(data) {
		noticeData.postData = data;
	}
	
	async function handleSubmit(event) {
		event.preventDefault();
		
		if (!noticeData.postTitle.trim() || !noticeData.postData.trim()) {
			alert('제목과 내용을 입력해주세요.');
			return;
		}
		
		submitting = true;
		
		try {
			await onSubmit(noticeData);
		} catch (error) {
			console.error('처리 오류:', error);
			alert('처리 중 오류가 발생했습니다.');
		} finally {
			submitting = false;
		}
	}
	
	function handleCancel() {
		if (onCancel) {
			onCancel();
		}
	}
	
	function handleReset() {
		if (onReset) {
			onReset();
		}
	}
</script>

{#if noticeData}
	<form class="telepasi-form notice-form" onsubmit={handleSubmit}>
		<!-- 제목 입력 -->
		<div class="form-group">
			<label for="title">제목 *</label>
			<input 
				type="text" 
				id="title" 
				bind:value={noticeData.postTitle}
				placeholder="공지사항 제목을 입력하세요"
				required
			/>
		</div>
		
		<!-- 카테고리 선택 -->
		<div class="form-group">
			<label for="category">카테고리</label>
			<select id="category" bind:value={noticeData.postCategory}>
				{#each categories as cat}
					<option value={cat.value}>{cat.label}</option>
				{/each}
			</select>
		</div>
		
		<!-- 중요 공지 체크박스 -->
		<div class="checkbox-group">
			<input type="checkbox" id="important" bind:checked={noticeData.important} />
			<label for="important" class="checkbox-label">중요 공지사항으로 설정</label>
		</div>

		<!-- 게시 기간 -->
		<div class="form-row">
			<div class="form-group small">
				<label for="postStartDate" class="text-right">게시 시작일</label>
				<input id="postStartDate" type="date" bind:value={noticeData.postStartDate} />
			</div>
			<div class="form-group small">
				<label for="postEndDate" class="text-right">게시 종료일</label>
				<input id="postEndDate" type="date" bind:value={noticeData.postEndDate} />
			</div>
		</div>
		
		<!-- 내용 입력 -->
		<div class="form-group">
			<label for="content">내용 *</label>
			<HtmlEditor bind:value={noticeData.postData} onChange={onChangeHandler} cssClass="mt-1"/>
		</div>
		
		<!-- 버튼 그룹 -->
		<div class="form-actions">
			{#if showResetButton}
				<button type="button" class="btn-secondary" onclick={handleReset}>
					초기화
				</button>
			{/if}
			<button type="button" class="btn-secondary" onclick={handleCancel}>
				{cancelButtonText}
			</button>
			<button type="submit" class="btn-primary" disabled={submitting}>
				{submitting ? '처리 중...' : submitButtonText}
			</button>
		</div>
	</form>
{/if}
<style>
	.form-group {
		margin-bottom: 25px;
	}
	
	.form-group label {
		display: block;
		margin-bottom: 8px;
		font-weight: 600;
		color: #333;
		font-size: 1rem;
	}
	
	.form-group input[type="text"],
	.form-group input[type="date"],
	.form-group select {
		width: 100%;
		padding: 12px 16px;
		border: 1px solid #ddd;
		border-radius: 6px;
		font-size: 1rem;
		transition: border-color 0.3s ease;
	}
	
	.form-group input[type="text"]:focus,
	.form-group input[type="date"]:focus,
	.form-group select:focus {
		outline: none;
		border-color: #28a745;
		box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);
	}

	.form-row {
		display: flex;
		gap: 12px;
	}

	.form-group.small {
		flex: 1;
	}

	/* 날짜 두 필드를 한 라인에서 라벨-입력 가로 정렬 */
	.form-row .form-group {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 8px;
	}

	.form-row .form-group label {
		margin-bottom: 0;
		min-width: 100px;
	}

	.form-row .form-group input[type="date"] {
		flex: 1;
		width: auto;
	}
	
	.checkbox-group {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 10px;
		margin-bottom: 25px;
	}
	
	.checkbox-label {
		margin-top: 1px;
		cursor: pointer;
		font-weight: 500;
		color: #333;
	}
	
	.form-actions {
		display: flex;
		gap: 15px;
		justify-content: center;
		margin-top: 40px;
		padding-top: 30px;
		border-top: 1px solid #e9ecef;
	}
	
	.btn-primary,
	.btn-secondary {
		padding: 12px 30px;
		border-radius: 6px;
		font-weight: 600;
		font-size: 1rem;
		transition: all 0.3s ease;
		border: none;
		cursor: pointer;
		min-width: 120px;
	}
	
	.btn-primary {
		background: #28a745;
		color: #fff;
	}
	
	.btn-primary:hover:not(:disabled) {
		background: #20c997;
		transform: translateY(-2px);
	}
	
	.btn-primary:disabled {
		background: #6c757d;
		cursor: not-allowed;
		transform: none;
	}
	
	.btn-secondary {
		background: #6c757d;
		color: #fff;
	}
	
	.btn-secondary:hover {
		background: #5a6268;
		transform: translateY(-2px);
	}
	
	/* Responsive Design */
	@media (max-width: 768px) {
		.form-row { flex-direction: column; }
		.form-row .form-group { flex-direction: column; align-items: stretch; }
		.form-row .form-group label { margin-bottom: 8px; min-width: 0; }
		.form-row .form-group input[type="date"] { width: 100%; flex: initial; }
		.form-actions {
			flex-direction: column;
		}
		
		.btn-primary,
		.btn-secondary {
			width: 100%;
		}
	}
</style>
