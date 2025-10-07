<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import AdminBbsEditor from '$lib/components/AdminBbsEditor.svelte';
	import { page } from '$app/stores';

	// URL에서 ID 가져오기
	const postId = parseInt($page.params.id || 0);
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
				<a href="/community">커뮤니티</a>
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
				<AdminBbsEditor bbsId="notice" {postId} redirectTo="/notice" title="공지사항 수정" />
			</div>
		</div>
	</section>
</main>

<Footer />

<style>
	.notice-edit-page {
		margin-top: var(--header-height, 100px);
		min-height: calc(100vh - 70px);
		background: #f8f9fa;
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
	
	/* Responsive Design */
	@media (max-width: 768px) {
		.edit-form-container {
			padding: 25px 20px;
		}
	}
</style>
