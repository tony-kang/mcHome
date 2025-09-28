<script>
	import ___prj from '$prj/prjMain';
	import ___const from '$prj/lib/i_const';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import NoticeForm from '$lib/components/NoticeForm.svelte';
	import { goto } from '$app/navigation';
	
	let submitting = $state(false);

	let noticeContent = $state({
		bbsId : 'notice',
		postId : 0,
		postTitle : '',
		postData : '',
		postTag : '',
		postStartDate : '',
		postEndDate : '',
		uploadId : null,
		postCategory : 'general',
		important : true
	});
	
	async function handleSubmit(data) {
		const r = await ___prj.api.post(___const.API_BBS, 'write.post', null, data);
		if (r.data.result === ___const.OK) {
			// 폼 초기화
			resetForm();
			alert('공지사항이 성공적으로 저장되었습니다.');
			goto('/notice');
		}
	}
	
	function resetForm() {
		noticeContent.postTitle = '';
		noticeContent.postCategory = 'general';
		noticeContent.important = false;
		noticeContent.postData = '';
		console.log('공지사항 초기화', $state.snapshot(noticeContent));
	}
	
	function handleCancel() {
		if (confirm('작성 중인 내용이 저장되지 않습니다. 정말 취소하시겠습니까?')) {
			goto('/notice');
		}
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
				
				<NoticeForm 
					bind:noticeData={noticeContent}
					bind:submitting={submitting}
					onSubmit={handleSubmit}
					onCancel={handleCancel}
					onReset={resetForm}
					submitButtonText="저장"
					cancelButtonText="취소"
					showResetButton={true}
				/>
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
	
	
	/* Responsive Design */
	@media (max-width: 768px) {
		.write-form-container {
			padding: 25px 20px;
		}
		
		.write-form-container h1 {
			font-size: 1.5rem;
		}
	}
</style>
