<script>
	import AdminBbsEditor from '$lib/components/AdminBbsEditor.svelte';
	import AdminPageHeader from '$prj/C/admin/AdminPageHeader.svelte';
	import { page } from '$app/stores';

	// URL에서 ID 가져오기
	const postId = parseInt($page.params.id || 0);
</script>

<svelte:head>
	<title>시스템 팝업 수정 - 마인드코딩</title>
	<meta name="description" content="마인드코딩 시스템 팝업 수정 페이지" />
</svelte:head>

<main class="popup-edit-page">
	<!-- Popup Edit Form -->
	<section class="popup-edit-section">
		<div class="container">
			<AdminPageHeader title="시스템 팝업 수정" />
			<div class="edit-form-container">
				<AdminBbsEditor bbsId="popup" {postId} redirectTo="/admin/popup" title="시스템 팝업 수정" />
			</div>
		</div>
	</section>
</main>

<style>
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
