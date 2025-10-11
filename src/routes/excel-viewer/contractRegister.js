export const contractRegister = {
    workName: '계약 등록',
    sheetWorkList: [
        {
            name: '선택항목 일괄등록',
            icon: '📤',
            callback: handleSelectedImpose
        },
        {
            name: '선택항목 일괄삭제',
            icon: '📤',
            callback: handleSelectedDelete
        }
    ],
    workList: [
        {
            name: '수정',
            icon: '✏️',
            callback: handleEdit
        },
        {
            name: '내보내기',
            icon: '📤',
            callback: handleExport
        }
    ]
};

function handleEdit(rowData) {
    console.log('수정 작업:', rowData);
    alert(`데이터 수정\n\n행 번호: ${rowData.index + 1}\n\n데이터:\n${JSON.stringify(rowData.data, null, 2)}`);
}

function handleSelectedImpose(selectedRowsData) {
    console.log('선택항목 일괄등록 작업:', selectedRowsData);
}

function handleSelectedDelete(selectedRowsData) {
    console.log('선택항목 일괄삭제 작업:', selectedRowsData);    
}

function handleExport(rowData) {
    console.log('내보내기 작업:', rowData);
    const jsonStr = JSON.stringify(rowData.data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `row_${rowData.index + 1}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

export default contractRegister;
