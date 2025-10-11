import ___prj from '$prj/prjMain';
import ___const from '$prj/lib/i_const';
import ___ec from './i_excelColumn';

export const giFee = {
    workName: '보증보험 부과',
    columnAlignments: {
        '계약번호': 'center',
        '동': 'center',
        '호수': 'center',
        '금액': 'right',
    },
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
