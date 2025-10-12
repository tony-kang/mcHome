import ___prj from '$prj/prjMain';
import ___const from '$prj/lib/i_const';

export const giFee = {
    workName: '보증보험 부과',
    requiredColumns: {
        // 필수 컬럼 검증을 비활성화하려면 비워두세요
        // 활성화하려면 아래 주석을 해제하세요
        '계약번호': 'center',
        '동': 'center',
        '호수': 'center',
        '금액': 'right',
    },
    columnWidths: {
        // '금액': '100px',
        // '호수': '100px',
    },
    ignoreColumns: [
    ], // 엑셀에 있어도 화면에 표시하지 않을 컬럼
    sheetWorkList: [
        {
            name: '선택항목 일괄부과',
            icon: '✅',
            callback: handleSelectedImpose
        },
        {
            name: '선택항목 삭제',
            icon: '❌',
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
}

function handleIndividualImpose(rowData) {
    console.log('개별부과 작업:', rowData);
    _giImpose(rowIdx, [...rowData]);
}

function handleSelectedImpose(selectedRowsData) {
    console.log('선택항목 일괄부과 작업:', selectedRowsData);
    _giImpose(selectedRowsData);
}

function handleSelectedDelete(selectedRowsData) {
    console.log('선택항목 일괄삭제 작업:', selectedRowsData);
    _giDelete(selectedRowsData);
}

/**
 * 보증보험 부과
 * @param {*} selectedRowsData 
 */
function _giImpose(selectedRowsData) {
    const r = ___prj.api.post('/s/excel', 'gi.impose', null, {
        giData: selectedRowsData,
    });
}

/**
 * 보증보험 부과 취소
 * @param {*} selectedRowsData 
 */
function _giDelete(selectedRowsData) {
    const r = ___prj.api.post('/s/excel', 'gi.delete', null, {
        giData: selectedRowsData,
    });
}

export default giFee;
