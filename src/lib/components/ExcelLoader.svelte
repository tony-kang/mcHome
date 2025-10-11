<script>
	import * as XLSX from 'xlsx';
	
	let fileInput;
	let workbook = $state(null);
	let sheetNames = $state([]);
	let selectedSheet = $state('');
	let headers = $state([]);
	let rows = $state([]);
	let fileName = $state('');
	let error = $state('');
	let validationError = $state('');
	let isValidExcel = $state(false);
	let selectedRows = $state(new Set());
	let openMenuRowIndex = $state(null);
	
	// Props
	let { 
		workOption = { 
			workList: [],
			columnAlignments: {} // 헤더명: 정렬(left/center/right) - key가 필수 컬럼
		} 
	} = $props();

	function handleFileUpload(event) {
		error = '';
		const file = event.target.files[0];
		
		if (!file) {
			return;
		}

		console.log('File selected:', file.name);
		fileName = file.name;
		const reader = new FileReader();

		reader.onload = (e) => {
			try {
				const data = new Uint8Array(e.target.result);
				workbook = XLSX.read(data, { type: 'array' });
				sheetNames = workbook.SheetNames;
				
				console.log('Workbook loaded, sheets:', sheetNames);
				
				if (sheetNames.length > 0) {
					selectedSheet = sheetNames[0];
					loadSheet(selectedSheet);
				}
			} catch (err) {
				error = '엑셀 파일을 읽는 중 오류가 발생했습니다: ' + err.message;
				console.error('Error reading file:', err);
			}
		};

		reader.onerror = () => {
			error = '파일을 읽는 중 오류가 발생했습니다.';
		};

		reader.readAsArrayBuffer(file);
	}

	function loadSheet(sheetName) {
		if (!workbook || !sheetName) return;

		const worksheet = workbook.Sheets[sheetName];
		const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

		console.log('Sheet loaded:', sheetName);
		console.log('JSON Data:', jsonData);

		// 빈 행 제거 함수
		const isRowEmpty = (row) => {
			if (!row || row.length === 0) return true;
			return row.every(cell => cell === '' || cell === null || cell === undefined);
		};

		// 빈 행이 아닌 데이터만 필터링
		const filteredData = jsonData.filter(row => !isRowEmpty(row));
		
		console.log('Filtered Data:', filteredData);

		if (filteredData.length > 0) {
			const tempHeaders = filteredData[0] || [];
			const tempRows = filteredData.slice(1);
			
			// 빈 컬럼 식별 (헤더가 비어있고 모든 행이 해당 컬럼에서 비어있는 경우)
			const nonEmptyColumnIndices = [];
			tempHeaders.forEach((header, index) => {
				const isColumnEmpty = (header === '' || header === null || header === undefined) &&
					tempRows.every(row => !row[index] || row[index] === '' || row[index] === null || row[index] === undefined);
				
				if (!isColumnEmpty) {
					nonEmptyColumnIndices.push(index);
				}
			});
			
			// 빈 컬럼 제거
			headers = nonEmptyColumnIndices.map(i => tempHeaders[i]);
			rows = tempRows.map(row => nonEmptyColumnIndices.map(i => row[i]));
			
			console.log('Headers set:', headers);
			console.log('Rows set:', rows);
			console.log('Rows count:', rows.length);
			
			// 엑셀 컬럼 검증
			validateExcelColumns(headers);
		} else {
			headers = [];
			rows = [];
			validationError = '';
			isValidExcel = false;
			console.log('No data after filtering');
		}
		
		// 선택 초기화
		selectedRows = new Set();
	}
	
	function validateExcelColumns(currentHeaders) {
		validationError = '';
		isValidExcel = true;
		
		// columnAlignments가 없거나 비어있으면 검증 통과
		if (!workOption.columnAlignments || Object.keys(workOption.columnAlignments).length === 0) {
			console.log('필수 컬럼이 지정되지 않았습니다. 검증을 생략합니다.');
			return;
		}
		
		const requiredColumns = Object.keys(workOption.columnAlignments);
		
		console.log('===== 엑셀 컬럼 검증 시작 =====');
		console.log('필수 컬럼:', requiredColumns);
		console.log('실제 헤더:', currentHeaders);
		
		// 필수 컬럼이 모두 있는지 확인
		const missingColumns = [];
		const extraColumns = [];
		
		// 대소문자 구분 없이 비교하기 위해 소문자로 변환
		const requiredLower = requiredColumns.map(col => col.toLowerCase());
		const headersLower = currentHeaders.map(col => String(col).toLowerCase());
		
		// 누락된 컬럼 찾기
		requiredColumns.forEach((required, index) => {
			if (!headersLower.includes(requiredLower[index])) {
				missingColumns.push(required);
			}
		});
		
		// 추가 컬럼 찾기 (경고용)
		currentHeaders.forEach((header, index) => {
			if (!requiredLower.includes(headersLower[index])) {
				extraColumns.push(header);
			}
		});
		
		if (missingColumns.length > 0) {
			isValidExcel = false;
			validationError = `필수 컬럼이 누락되었습니다.\n\n누락된 컬럼:\n${missingColumns.join(', ')}\n\n올바른 엑셀 파일을 업로드해주세요.`;
			console.error('검증 실패 - 누락된 컬럼:', missingColumns);
			alert(validationError);
		} else {
			console.log('검증 성공! 모든 필수 컬럼이 존재합니다.');
			if (extraColumns.length > 0) {
				console.warn('추가 컬럼:', extraColumns);
			}
		}
		
		console.log('===== 엑셀 컬럼 검증 완료 =====');
	}

	function handleSheetChange(event) {
		selectedSheet = event.target.value;
		loadSheet(selectedSheet);
	}

	function clearData() {
		workbook = null;
		sheetNames = [];
		selectedSheet = '';
		headers = [];
		rows = [];
		fileName = '';
		error = '';
		validationError = '';
		isValidExcel = false;
		selectedRows = new Set();
		openMenuRowIndex = null;
		if (fileInput) {
			fileInput.value = '';
		}
	}
	
	function toggleRowSelection(rowIndex) {
		const newSelected = new Set(selectedRows);
		if (newSelected.has(rowIndex)) {
			newSelected.delete(rowIndex);
		} else {
			newSelected.add(rowIndex);
		}
		selectedRows = newSelected;
	}
	
	function toggleAllRows() {
		// 각 행의 현재 선택 상태를 반대로 토글
		const newSelected = new Set();
		rows.forEach((_, index) => {
			if (!selectedRows.has(index)) {
				newSelected.add(index);
			}
		});
		selectedRows = newSelected;
	}
	
	function toggleMenu(rowIndex) {
		openMenuRowIndex = openMenuRowIndex === rowIndex ? null : rowIndex;
	}
	
	function deleteRow(rowIndex) {
		rows = rows.filter((_, i) => i !== rowIndex);
		selectedRows.delete(rowIndex);
		selectedRows = new Set([...selectedRows].map(i => i > rowIndex ? i - 1 : i));
		openMenuRowIndex = null;
	}
	
	function executeWork(rowIndex, work) {
		const rowData = {
			// index: rowIndex,
			// headers: headers,
			// values: rows[rowIndex],
			data: headers.reduce((obj, header, i) => {
				obj[header] = rows[rowIndex][i];
				return obj;
			}, {})
		};
		
		if (work.callback && typeof work.callback === 'function') {
			work.callback(rowData);
		}
		
		openMenuRowIndex = null;
	}
	
	function executeSheetWork(work) {
		const selectedRowsData = Array.from(selectedRows).map(rowIndex => {
			return {
				// index: rowIndex,
				// headers: headers,
				// values: rows[rowIndex],
				data: headers.reduce((obj, header, i) => {
					obj[header] = rows[rowIndex][i];
					return obj;
				}, {})
			};
		});
		
		if (work.callback && typeof work.callback === 'function') {
			work.callback(selectedRowsData);
		}
	}
	
	function closeMenu() {
		openMenuRowIndex = null;
	}
</script>

<div class="excel-loader">
	<div class="upload-section">
		<div class="upload-controls">
			<input
				type="file"
				accept=".xlsx,.xls,.csv"
				bind:this={fileInput}
				onchange={handleFileUpload}
				class="file-input-hidden"
			/>
			<button onclick={() => fileInput?.click()} class="upload-btn">
				📁 {fileName || '파일 선택'}
			</button>
			{#if fileName}
				<button onclick={clearData} class="clear-btn">
					초기화
				</button>
			{/if}
		</div>

		{#if error}
			<div class="error-message">
				{error}
			</div>
		{/if}

		{#if fileName}
			<div class="file-info-row">
				<div class="file-name">
					<strong>파일명:</strong> {fileName}
				</div>
				
				{#if sheetNames.length > 1}
					<div class="sheet-selector">
						<label for="sheet-select">시트 선택:</label>
						<select id="sheet-select" value={selectedSheet} onchange={handleSheetChange}>
							{#each sheetNames as sheet}
								<option value={sheet}>{sheet}</option>
							{/each}
						</select>
					</div>
				{/if}
				
				{#if headers.length > 0}
					<div class="debug-info">
						Headers: {headers.length} | Rows: {rows.length}
					</div>
				{/if}
			</div>
		{/if}
		
		{#if validationError}
			<div class="validation-error">
				<strong>⚠️ 엑셀 파일 검증 실패</strong>
				<p>{validationError}</p>
			</div>
		{/if}
	</div>

    <!-- 시트 작업 버튼 - 검증 성공 시에만 표시 -->
    {#if isValidExcel && rows.length > 0}
        {#if workOption.sheetWorkList && workOption.sheetWorkList.length > 0}
            <div class="sheet-work-buttons">
                {#each workOption.sheetWorkList as work}
                    <button class="sheet-work-btn" onclick={() => executeSheetWork(work)}>{work.icon || '⚙️'} {work.name || '작업'}</button>
                {/each}
            </div>
        {/if}
    {/if}
    
	{#if headers.length > 0}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div 
			class="table-container" 
			onclick={closeMenu}
		>
			<table class="excel-table">
				<thead>
					<tr>
						{#if isValidExcel}
							<th class="checkbox-col">
								<input 
									type="checkbox" 
									checked={selectedRows.size === rows.length && rows.length > 0}
									onchange={toggleAllRows}
								/>
							</th>
							<th class="menu-col">작업</th>
						{/if}
						{#each headers as header}
							<th style="text-align: {workOption.columnAlignments?.[header] || 'left'}">{header}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each rows as row, rowIndex}
						<tr class:selected={selectedRows.has(rowIndex)}>
							{#if isValidExcel}
								<td class="checkbox-col">
									<input 
										type="checkbox" 
										checked={selectedRows.has(rowIndex)}
										onchange={() => toggleRowSelection(rowIndex)}
									/>
								</td>
								<td class="menu-col">
									<div class="menu-wrapper">
										<button 
											class="menu-btn"
											onclick={(e) => { e.stopPropagation(); toggleMenu(rowIndex); }}
											aria-label="메뉴 열기"
										>
											⋮
										</button>
										{#if openMenuRowIndex === rowIndex}
											<!-- svelte-ignore a11y_no_static_element_interactions -->
											<!-- svelte-ignore a11y_click_events_have_key_events -->
											<div 
												class="context-menu" 
												onclick={(e) => e.stopPropagation()}
											>
												<button 
													class="menu-item delete"
													onclick={() => deleteRow(rowIndex)}
													role="menuitem"
												>
													🗑️ 삭제
												</button>
												{#if workOption.workList && workOption.workList.length > 0}
													{#each workOption.workList as work}
														<button 
															class="menu-item custom"
															onclick={() => executeWork(rowIndex, work)}
															role="menuitem"
														>
															{work.icon || '⚙️'} {work.name || '작업'}
														</button>
													{/each}
												{/if}
											</div>
										{/if}
									</div>
								</td>
							{/if}
							{#each headers as header, colIndex}
								<td style="text-align: {workOption.columnAlignments?.[header] || 'left'}">{row[colIndex] ?? ''}</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<div class="no-data">
			{#if fileName}
				<p>데이터를 불러오는 중이거나 빈 시트입니다.</p>
			{:else}
				<p>엑셀 파일을 업로드해주세요.</p>
			{/if}
		</div>
	{/if}
</div>

<style>
	.excel-loader {
		width: 100%;
		padding: 20px;
	}

	.upload-section {
		margin-bottom: 20px;
	}

	.upload-controls {
		display: flex;
		gap: 10px;
		align-items: center;
		margin-bottom: 10px;
	}

	.file-input-hidden {
		display: none;
	}

	.upload-btn {
		flex: 1;
		padding: 10px 20px;
		background-color: #d4eed5;
		color: rgb(65, 62, 62);
		border: 1px solid #ddd;
		border-radius: 4px;
		cursor: pointer;
		font-weight: 500;
		font-size: 14px;
		transition: all 0.3s;
		text-align: left;
	}

	.upload-btn:hover {
		background-color: #c5e5c6;
		border-color: #aaa;
	}

	.clear-btn {
		padding: 10px 20px;
		background-color: #dc3545;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-weight: 500;
		transition: background-color 0.3s;
		font-size: 14px;
	}

	.clear-btn:hover {
		background-color: #c82333;
	}

	.file-info-row {
		display: flex;
		align-items: center;
		gap: 20px;
		padding: 10px;
		background-color: #e7f3ff;
		border-left: 4px solid #2196F3;
		margin-top: 10px;
		border-radius: 4px;
		flex-wrap: wrap;
	}

	.file-name {
		flex-shrink: 0;
	}

	.file-name strong {
		margin-right: 5px;
	}

	.error-message {
		padding: 10px;
		background-color: #ffe7e7;
		border-left: 4px solid #dc3545;
		color: #721c24;
		margin-top: 10px;
		border-radius: 4px;
	}

	.validation-error {
		padding: 15px;
		background-color: #fff3cd;
		border: 2px solid #ff9800;
		border-radius: 4px;
		margin-top: 10px;
		color: #856404;
	}

	.validation-error strong {
		display: block;
		margin-bottom: 10px;
		font-size: 1.1rem;
		color: #d84315;
	}

	.validation-error p {
		margin: 5px 0;
		white-space: pre-line;
		line-height: 1.6;
	}

	.sheet-selector {
		display: flex;
		align-items: center;
		gap: 10px;
		flex-shrink: 0;
	}

	.sheet-selector label {
		font-weight: 500;
		white-space: nowrap;
	}

	.sheet-selector select {
		padding: 6px 10px;
		border: 1px solid #ddd;
		border-radius: 4px;
		cursor: pointer;
		background-color: white;
		font-size: 0.9rem;
	}

	.table-container {
		overflow-x: auto;
		border: 1px solid #ddd;
		border-radius: 4px;
		max-height: 600px;
		overflow-y: auto;
		margin-top: 10px;
	}

	.excel-table {
		width: 100%;
		border-collapse: collapse;
		background-color: white;
		font-size: 14px;
		line-height: 1.3;
	}

	.excel-table thead {
		position: sticky;
		top: 0;
		background-color: #f8f9fa;
		z-index: 10;
	}

	.excel-table th {
		padding: 6px 10px;
		text-align: left;
		border: 1px solid #ddd;
		font-weight: 600;
		background-color: #4CAF50;
		color: white;
		line-height: 1.2;
	}

	.excel-table td {
		padding: 3px 8px;
		border: 1px solid #ddd;
		line-height: 1.3;
	}

	.excel-table tbody tr:hover {
		background-color: #f5f5f5;
	}

	.excel-table tbody tr:nth-child(even) {
		background-color: #fafafa;
	}

	.excel-table tbody tr.selected {
		background-color: #e3f2fd !important;
	}

	.checkbox-col {
		width: 40px;
		text-align: center !important;
		padding: 4px !important;
	}

	.checkbox-col input[type="checkbox"] {
		cursor: pointer;
		width: 16px;
		height: 16px;
	}

	.menu-col {
		width: 50px;
		text-align: center !important;
		padding: 4px !important;
		position: relative;
	}

	.menu-wrapper {
		position: relative;
		display: inline-block;
	}

	.menu-btn {
		background: none;
		border: none;
		font-size: 18px;
		cursor: pointer;
		padding: 0px 6px;
		border-radius: 4px;
		transition: background-color 0.2s;
		color: #666;
		line-height: 1;
	}

	.menu-btn:hover {
		background-color: #e0e0e0;
	}

	.context-menu {
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		background: white;
		border: 1px solid #ddd;
		border-radius: 4px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
		z-index: 1000;
		min-width: 150px;
		margin-top: 4px;
	}

	.menu-item {
		display: block;
		width: 100%;
		padding: 8px 14px;
		border: none;
		background: white;
		text-align: left;
		cursor: pointer;
		transition: background-color 0.2s;
		font-size: 13px;
		white-space: nowrap;
		line-height: 1.4;
	}

	.menu-item:first-child {
		border-radius: 4px 4px 0 0;
	}

	.menu-item:last-child {
		border-radius: 0 0 4px 4px;
	}

	.menu-item:hover {
		background-color: #f5f5f5;
	}

	.menu-item.delete:hover {
		background-color: #ffebee;
		color: #c62828;
	}

	.menu-item.custom:hover {
		background-color: #e3f2fd;
		color: #1976d2;
	}

	.debug-info {
		padding: 6px 12px;
		background-color: #fff3cd;
		border: 1px solid #ffc107;
		border-radius: 4px;
		font-size: 0.85rem;
		white-space: nowrap;
		font-weight: 500;
		margin-left: auto;
		flex-shrink: 0;
	}

	.no-data {
		padding: 40px;
		text-align: center;
		color: #666;
		background-color: #f8f9fa;
		border-radius: 4px;
		border: 2px dashed #ddd;
		margin-top: 10px;
	}

	.no-data p {
		margin: 0;
		font-size: 1.1rem;
	}

	.sheet-work-buttons {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
		margin-bottom: 10px;
	}

	.sheet-work-btn {
		padding: 8px 16px;
		background-color: #27285b;
		color: white;
		border: none;
		border-radius: 10px;
		cursor: pointer;
		font-size: 14px;
	}

	.sheet-work-btn:hover {
		background-color: #45a049;
	}
</style>

