<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import HtmlEditor from '$src/prj/C/htmlEditor/HtmlEditor.svelte';
	import { page } from '$app/stores';
	
	let title = '';
	let content = '';
	let category = 'general';
	let important = false;
	let submitting = false;
	let loading = true;
	
	// URL에서 ID 가져오기
	const noticeId = parseInt($page.params.id || '0');
	
	const categories = [
		{ value: 'general', label: '일반' },
		{ value: 'service', label: '서비스' },
		{ value: 'education', label: '교육' },
		{ value: 'event', label: '이벤트' }
	];
	
	// 기존 공지사항 데이터 로드 (실제로는 API에서 가져옴)
	const existingNotice = {
		id: 1,
		title: "마인드코딩 PTI:CODE 검사 서비스 오픈 안내",
		content: `
			<p>안녕하세요. 마인드코딩입니다.</p>
			
			<p>마인드코딩의 핵심 서비스인 PTI:CODE 검사가 정식으로 오픈되었습니다.</p>
			
			<h3>PTI:CODE 검사란?</h3>
			<p>PTI:CODE는 개인의 심리재능을 정밀하게 진단하여 맞춤형 성장 전략을 제시하는 혁신적인 검사 도구입니다.</p>
			
			<h3>서비스 특징</h3>
			<ul>
				<li>과학적 근거에 기반한 정확한 진단</li>
				<li>개인별 맞춤형 결과 해석</li>
				<li>전문가 상담을 통한 심화 분석</li>
				<li>실생활 적용 가능한 구체적 가이드</li>
			</ul>
			
			<p>더 자세한 내용은 고객센터(02-1234-5678)로 문의해주시기 바랍니다.</p>
		`,
		category: "service",
		important: true,
		date: "2024-01-15"
	};
	
	// 페이지 로드 시 기존 데이터 설정
	$effect(() => {
		if (noticeId && existingNotice.id === noticeId) {
			title = existingNotice.title;
			content = existingNotice.content;
			category = existingNotice.category;
			important = existingNotice.important;
			loading = false;
		}
	});
	
	async function updateNotice(event) {
		event.preventDefault();
		
		if (!title.trim() || !content.trim()) {
			alert('제목과 내용을 입력해주세요.');
			return;
		}
		
		submitting = true;
		
		try {
			// 실제 API 호출 부분
			console.log('공지사항 수정:', {
				id: noticeId,
				title,
				content,
				category,
				important,
				updatedAt: new Date().toISOString()
			});
			
			// 임시로 성공 처리
			alert('공지사항이 성공적으로 수정되었습니다.');
			
			// 목록 페이지로 이동
			window.location.href = '/notice';
			
		} catch (error) {
			console.error('수정 오류:', error);
			alert('수정 중 오류가 발생했습니다.');
		} finally {
			submitting = false;
		}
	}
	
	function cancelEdit() {
		if (confirm('수정사항이 저장되지 않습니다. 정말 취소하시겠습니까?')) {
			window.location.href = '/notice';
		}
	}
</script>

<svelte:head>
	<title>공지사항 수정 - 마인드코딩</title>
	<meta name="description" content="마인드코딩 공지사항 수정 페이지" />
</svelte:head>

<Header />

<main class="notice-edit-page">
	<!-- Breadcrumb -->
	<section class="breadcrumb-section">
		<div class="container">
			<nav class="breadcrumb">
				<a href="/">홈</a>
				<span class="separator">></span>
				<a href="/notice">공지사항</a>
				<span class="separator">></span>
				<span class="current">수정</span>
			</nav>
		</div>
	</section>

	<!-- Notice Edit Form -->
	<section class="notice-edit-section">
		<div class="container">
			<div class="edit-form-container">
				<h1>공지사항 수정</h1>
				
				{#if loading}
					<div class="loading">데이터를 불러오는 중...</div>
				{:else if !existingNotice || existingNotice.id !== noticeId}
					<div class="error">공지사항을 찾을 수 없습니다.</div>
				{:else}
					<form onsubmit={updateNotice}>
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
							<HtmlEditor bind:value={content} height={500} placeholder="공지사항 내용을 입력하세요..." />
						</div>
						
						<!-- 버튼 그룹 -->
						<div class="form-actions">
							<button type="button" class="btn-secondary" onclick={cancelEdit}>
								취소
							</button>
							<button type="submit" class="btn-primary" disabled={submitting}>
								{submitting ? '수정 중...' : '수정 완료'}
							</button>
						</div>
					</form>
				{/if}
			</div>
		</div>
	</section>
</main>

<Footer />

<style>
	.notice-edit-page {
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
	
	.notice-edit-section {
		padding: 40px 0;
	}
	
	.edit-form-container {
		background: #fff;
		border-radius: 12px;
		padding: 40px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}
	
	.edit-form-container h1 {
		font-size: 2rem;
		font-weight: 700;
		color: #333;
		margin: 0 0 30px 0;
		text-align: center;
	}
	
	.loading, .error {
		text-align: center;
		padding: 40px;
		font-size: 1.1rem;
		color: #666;
	}
	
	.error {
		color: #dc3545;
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
		.edit-form-container {
			padding: 25px 20px;
		}
		
		.edit-form-container h1 {
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
