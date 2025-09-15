<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import HtmlEditor from '$prj/C/htmlEditor/HtmlEditor.svelte';
	
	let title = '';
	let category = 'general';
	let important = false;
	let submitting = false;

    let noticeData = '';
	
	const categories = [
		{ value: 'general', label: '일반' },
		{ value: 'service', label: '서비스' },
		{ value: 'education', label: '교육' },
		{ value: 'event', label: '이벤트' }
	];

    function onChangeHandler(data) {
        noticeData = data;
    }
	
	async function submitNotice(event) {
		event.preventDefault();
		
		if (!title.trim() || !noticeData.trim()) {
			alert('제목과 내용을 입력해주세요.');
			return;
		}
		
		submitting = true;
		
		try {
			// 실제 API 호출 부분
			console.log('공지사항 저장:', {
				title,
				noticeData,
				category,
				important,
				date: new Date().toISOString()
			});
			
			// 임시로 성공 처리
			alert('공지사항이 성공적으로 저장되었습니다.');
			
			// 폼 초기화
			title = '';
			noticeData = '';
			category = 'general';
			important = false;
			
		} catch (error) {
			console.error('저장 오류:', error);
			alert('저장 중 오류가 발생했습니다.');
		} finally {
			submitting = false;
		}
	}
	
	function resetForm() {
		title = '';
		noticeData = '';
		category = 'general';
		important = false;
	}
</script>

<svelte:head>
	<title>공지사항 작성 - 마인드코딩</title>
	<meta name="description" content="마인드코딩 공지사항 작성 페이지" />
</svelte:head>

<Header />

<main class="notice-write-page">
	<!-- Breadcrumb -->
	<section class="breadcrumb-section">
		<div class="container">
			<nav class="breadcrumb">
				<a href="/">홈</a>
				<span class="separator">></span>
				<a href="/notice">공지사항</a>
				<span class="separator">></span>
				<span class="current">작성</span>
			</nav>
		</div>
	</section>

	<!-- Notice Write Form -->
	<section class="notice-write-section">
		<div class="container">
			<div class="write-form-container">
				<h1>공지사항 작성</h1>
				
				<form onsubmit={submitNotice}>
					<!-- 제목 입력 -->
					<div class="form-group">
						<label for="title">제목 *</label>
						<input 
							type="text" 
							id="title" 
							bind:value={title}
							placeholder="공지사항 제목을 입력하세요"
							required
						/>
					</div>
					
					<!-- 카테고리 선택 -->
					<div class="form-group">
						<label for="category">카테고리</label>
						<select id="category" bind:value={category}>
							{#each categories as cat}
								<option value={cat.value}>{cat.label}</option>
							{/each}
						</select>
					</div>
					
					<!-- 중요 공지 체크박스 -->
					<div class="form-group checkbox-group">
						<label class="checkbox-label">
							<input type="checkbox" bind:checked={important} />
							<span class="checkmark"></span>
							중요 공지사항으로 설정
						</label>
					</div>
					
					<!-- 내용 입력 -->
					<div class="form-group">
						<label>내용 *</label>
						<!-- <SimpleEditor bind:value={content} height={500} placeholder="공지사항 내용을 입력하세요..." /> -->
                        <HtmlEditor bind:value={noticeData} onChange={onChangeHandler} cssClass="mt-1"/>
					</div>
					
					<!-- 버튼 그룹 -->
					<div class="form-actions">
						<button type="button" class="btn-secondary" onclick={resetForm}>
							초기화
						</button>
						<button type="submit" class="btn-primary" disabled={submitting}>
							{submitting ? '저장 중...' : '저장'}
						</button>
					</div>
				</form>
			</div>
		</div>
	</section>
</main>

<Footer />

<style>
	.notice-write-page {
		margin-top: 70px;
		min-height: calc(100vh - 70px);
		background: #f8f9fa;
	}
	
	.breadcrumb-section {
		padding: 20px 0;
		background: #fff;
		border-bottom: 1px solid #e9ecef;
	}
	
	.container {
		max-width: 1000px;
		margin: 0 auto;
		padding: 0 20px;
	}
	
	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 0.9rem;
		color: #666;
	}
	
	.breadcrumb a {
		color: #666;
		text-decoration: none;
		transition: color 0.3s ease;
	}
	
	.breadcrumb a:hover {
		color: #28a745;
	}
	
	.separator {
		color: #ccc;
	}
	
	.current {
		color: #333;
		font-weight: 500;
	}
	
	.notice-write-section {
		padding: 40px 0;
	}
	
	.write-form-container {
		background: #fff;
		border-radius: 12px;
		padding: 40px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}
	
	.write-form-container h1 {
		font-size: 2rem;
		font-weight: 700;
		color: #333;
		margin: 0 0 30px 0;
		text-align: center;
	}
	
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
	.form-group select {
		width: 100%;
		padding: 12px 16px;
		border: 1px solid #ddd;
		border-radius: 6px;
		font-size: 1rem;
		transition: border-color 0.3s ease;
	}
	
	.form-group input[type="text"]:focus,
	.form-group select:focus {
		outline: none;
		border-color: #28a745;
		box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);
	}
	
	.checkbox-group {
		display: flex;
		align-items: center;
	}
	
	.checkbox-label {
		display: flex;
		align-items: center;
		cursor: pointer;
		font-weight: 500;
		color: #333;
	}
	
	.checkbox-label input[type="checkbox"] {
		margin-right: 10px;
		transform: scale(1.2);
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
		.write-form-container {
			padding: 25px 20px;
		}
		
		.write-form-container h1 {
			font-size: 1.5rem;
		}
		
		.form-actions {
			flex-direction: column;
		}
		
		.btn-primary,
		.btn-secondary {
			width: 100%;
		}
		
		.container {
			padding: 0 15px;
		}
	}
</style>
