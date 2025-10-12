<script>
	import { page } from '$app/stores';
	import ExcelLoader from '$lib/components/ExcelLoader.svelte';
	import ___excelWorkOptions from './excelWorkOptions';
	
	const work = $page.url.searchParams.get('work');
	// workOption 설정
	const workOption = ___excelWorkOptions[work];
</script>

<svelte:head>
	<title>엑셀 작업</title>
</svelte:head>

<div class="container">
	<div class="header">
		<h1>{workOption.workName}</h1>
		<p class="description">
			엑셀 파일(.xlsx, .xls, .csv)을 업로드하면 
			<span class="work-name">{workOption.workName}</span> 
			작업을 진행할 수 있습니다.
		</p>
	</div>

	<ExcelLoader {workOption} />
</div>

<style>
	.container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 40px 20px;
	}

	.header {
		text-align: center;
		margin-bottom: 40px;
	}

	.header h1 {
		font-size: 2.5rem;
		color: #333;
		margin-bottom: 10px;
	}

	.description {
		font-size: 1.1rem;
		color: #666;
	}

	.instructions {
		margin-top: 40px;
		padding: 20px;
		background-color: #f8f9fa;
		border-radius: 8px;
	}

	.instructions h3 {
		color: #333;
		margin-bottom: 15px;
	}

	.instructions ul {
		list-style: none;
		padding: 0;
	}

	.instructions li {
		padding: 8px 0;
		padding-left: 25px;
		position: relative;
		color: #555;
	}

	.instructions li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: #4CAF50;
		font-weight: bold;
	}

	.work-name {
		color: #4012e7;
		font-weight: bold;
	}
</style>

