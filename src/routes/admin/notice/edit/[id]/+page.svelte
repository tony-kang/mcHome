<script>
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import NoticeForm from '$lib/components/NoticeForm.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import ___prjConst from '$prj/prjConst';
	import ___prj from '$prj/prjMain';
	import ___const from '$prj/lib/i_const';
	import { ___decodeHtml } from '$prj/lib/i_telepasi';
	
	let submitting = $state(false);	// 제출 중인지 여부
	let loading = $state(true);
	
	// URL에서 ID 가져오기
	const noticeId = parseInt($page.params.id || 0);
	const bbsId = 'notice';
	const postId = noticeId;

	let noticeData = $state(null);
	
	async function handleSubmit(data) {
		console.log('handleSubmit : data', $state.snapshot(data));

		const r = await ___prj.api.post(___const.API_BBS, 'write.post', null, data);
		if (r.data.result === ___const.OK) {
			alert('공지사항이 성공적으로 수정되었습니다.');
			goto('/notice');
		}

		// 목록 페이지로 이동
		//goto('/notice');
	}
	
	function handleCancel() {
		if (confirm('수정사항이 저장되지 않습니다. 정말 취소하시겠습니까?')) {
			goto('/notice');
		}
	}

	onMount(async () => {
		const r = await ___prj.api.post(___const.API_BBS, 'get.post', { bbsId, postId }, null);
		if (r.data.result === ___const.OK) {
			const n = r.data.content[0];
			noticeData = {
				bbsId : 'notice',
				postId : n.id,
				postTitle : n.title,
				postData : ___decodeHtml(n.content),
				postTag : n.tag,
				postStartDate : n.start_date,
				postEndDate : n.end_date,
				uploadId : n.upload_id,
				postCategory : n.category,
				important : n.important
			};

			console.log('edit : noticeData', $state.snapshot(noticeData));
			loading = false;
		}
	});
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
				{:else if noticeData}
					<NoticeForm 
						noticeData={noticeData}
						submitting={submitting}
						onSubmit={handleSubmit}
						onCancel={handleCancel}
						submitButtonText="수정 완료"
						cancelButtonText="취소"
						showResetButton={false}
					/>
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
	
	.loading {
		text-align: center;
		padding: 40px;
		font-size: 1.1rem;
		color: #666;
	}
	
	
	/* Responsive Design */
	@media (max-width: 768px) {
		.edit-form-container {
			padding: 25px 20px;
		}
		
		.edit-form-container h1 {
			font-size: 1.5rem;
		}
	}
</style>
