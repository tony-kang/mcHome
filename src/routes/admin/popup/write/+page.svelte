<script>
    import AdminBbsEditor from '$lib/components/AdminBbsEditor.svelte';
	import AdminPageHeader from '$prj/C/admin/AdminPageHeader.svelte';
	
</script>

<svelte:head>
	<title>시스템 팝업 작성 - 마인드코딩</title>
	<meta name="description" content="마인드코딩 시스템 팝업 작성 페이지" />
</svelte:head>

<main class="popup-write-page">
	<div class="container">
		<AdminPageHeader title="시스템 팝업 작성" />
		<div class="write-form-container">
            <AdminBbsEditor bbsId="popup" postId={0} redirectTo="/admin/popup" title="시스템 팝업 작성" />
		</div>
	</div>
</main>

<style>
	.write-form-container {
		background: #fff;
		border-radius: 12px;
		padding: 40px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}
	
	/* Responsive Design */
	@media (max-width: 768px) {
		.write-form-container {
			padding: 25px 20px;
		}
	}
</style>
