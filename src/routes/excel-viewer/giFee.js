export const giFee = {
    workName: '보증보험 부과',
    columnAlignments: {
        '전체번호': 'center',
        'group_no': 'center',
        '구분번호': 'center',
        'survey': 'left',
        'type': 'center',
        '확인항목': 'center',
        '확인항목2': 'center'
    },
    sheetWorkList: [
        {
            name: '선택항목 일괄부과',
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
            name: '개별부과',
            icon: '📤',
            callback: handleIndividualImpose
        }
    ]
};

// 작업 콜백 함수들
function handleEdit(rowData) {
    console.log('수정 작업:', rowData);
    alert(`데이터 수정\n\n행 번호: ${rowData.index + 1}\n\n데이터:\n${JSON.stringify(rowData.data, null, 2)}`);
}

function handleIndividualImpose(rowData) {
    console.log('개별부과 작업:', rowData);
    alert(`개별부과\n\n행 번호: ${rowData.index + 1}\n\n데이터:\n${JSON.stringify(rowData.data, null, 2)}`);
}

function handleSelectedImpose(selectedRowsData) {
    console.log('선택항목 일괄부과 작업:', selectedRowsData);
    alert(`선택항목 일괄부과\n\n행 번호: ${rowData.index + 1}\n\n데이터:\n${JSON.stringify(rowData.data, null, 2)}`);
}

function handleSelectedDelete(selectedRowsData) {
    console.log('선택항목 일괄삭제 작업:', selectedRowsData);
    
}

export default giFee;
