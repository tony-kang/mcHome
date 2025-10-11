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
		<h1>엑셀작업 ({workOption.workName})</h1>
		<p class="description">
			엑셀 파일(.xlsx, .xls, .csv)을 업로드하면 
			<span class="work-name">{workOption.workName}</span> 
			작업을 진행할 수 있습니다.
		</p>
	</div>

	<ExcelLoader {workOption} />

	<div class="instructions">
		<h3>사용 방법</h3>
		<ul>
			<li>파일 선택 버튼을 클릭하여 엑셀 파일을 업로드하세요</li>
			<li>여러 시트가 있는 경우 시트를 선택할 수 있습니다</li>
			<li>테이블을 스크롤하여 전체 데이터를 확인할 수 있습니다</li>
			<li>초기화 버튼을 클릭하면 데이터를 지우고 새 파일을 업로드할 수 있습니다</li>
		</ul>
		
		<h3>새로운 기능</h3>
		<ul>
			<li>각 행의 체크박스를 클릭하여 행을 선택할 수 있습니다</li>
			<li>헤더의 체크박스로 전체 행을 토글할 수 있습니다</li>
			<li>작업 컬럼의 ⋮ 버튼을 클릭하여 메뉴를 열 수 있습니다</li>
			<li>삭제 버튼으로 특정 행을 삭제할 수 있습니다</li>
			<li>커스텀 작업(수정, 상세보기, 내보내기 등)을 수행할 수 있습니다</li>
			<li>빈 행과 빈 컬럼은 자동으로 제거됩니다</li>
		</ul>
		
		<h3>workOption 커스터마이징</h3>
		<ul>
			<li>workOption props를 통해 사용자 정의 작업을 추가할 수 있습니다</li>
			<li>각 작업에 name(이름), icon(아이콘), callback(콜백 함수)를 설정할 수 있습니다</li>
			<li>콜백 함수는 rowData(행 정보)를 파라미터로 받습니다</li>
		</ul>
	</div>
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

