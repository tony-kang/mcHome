import ___const from '$prj/lib/i_const';
import ___prj from '$prj/prjMain';
import { ___downloadExcel } from '$prj/lib/i_telepasi';

export const pccCheck = {
    workName: '쿠팡엑셀로 통관고유부호 검증 및 타베용 엑셀 다운로드',
    pccColumn: {
        NAME: '구매자',
        PCC_NUMBER: '개인통관번호(PCCC)',
        PHONE: '통관용수취인전화번호'
    },
    requiredColumns: {
        // 필수 컬럼 검증을 비활성화하려면 비워두세요
        // 활성화하려면 아래 주석을 해제하세요
        '구매자': 'center',
        '개인통관번호(PCCC)': 'center',
        '통관용수취인전화번호': 'center',
    },
    columnWidths: {
        '개인통관번호(PCCC)': '150px',
        '통관용수취인전화번호': '140px'
    },
    ignoreColumns: [
        '배송완료일', '구매확정일자', '바코드', '기타', '결제위치', '배송유형', 
        '분리배송 출고예정일', '운송장번호', '분리배송 Y/N', '출고일(발송일)',
        '최초등록등록상품명/옵션명', '도서산간 추가배송비', '배송비구분', '배송비',
        '상품별 추가메시지', '주문자 추가메시지'
    ], // 엑셀에 있어도 화면에 표시하지 않을 컬럼
    sheetWorkList: [
        {
            name: '선택항목 통관번호 일괄검증',
            icon: '✅',
            callback: handlePcccCheck
        },
        {
            name: '타베(Tabae)용 엑셀로 저장',
            icon: '✅',
            callback: handleChangeTabaeExcel
        }
    ],
    workList: [
        {
            name: '통관번호 개별검증',
            icon: '🔍',
            callback: handleSingleCheck
        }
    ]
};

/**
 * 개별 통관고유부호 검증
 * @param {Object} rowData - 행 데이터
 */
async function handleSingleCheck(rowData) {
    try {
        console.log('개별검증 시작:', rowData);
        
        const data = rowData.data || rowData;
        const name = data['이름'] || data['성명'] || '';
        const pccNumber = data['통관고유부호'] || data['통관부호'] || '';
        const phone = data['전화번호'] || data['휴대폰'] || data['핸드폰'] || '';

        if (!name || !pccNumber || !phone) {
            alert('이름, 통관고유부호, 전화번호가 모두 필요합니다.');
            return;
        }

        // 검증 시작 알림
        const loadingMsg = `검증 중...\n\n이름: ${name}\n통관고유부호: ${pccNumber}\n전화번호: ${phone}`;
        console.log(loadingMsg);

        // API 호출
        const results = await ___prj.api.post('/s/excel', 'pcc.check', null, {
            name: name,
            pccNumber: pccNumber,
            phone: phone
        });

    } catch (error) {
        console.error('검증 오류:', error);
        alert('검증 중 오류가 발생했습니다.\n' + error.message);
    }
}

/**
 * 선택된 항목 일괄 통관고유부호 검증
 * @param {Array} selectedRowsData - 선택된 행 데이터 배열
 */
async function handlePcccCheck(selectedRowsData) {
    try {
        console.log('일괄검증 시작:', selectedRowsData);

        if (!selectedRowsData || selectedRowsData.length === 0) {
            alert('검증할 항목을 선택해주세요.');
            return;
        }

        // Excel 데이터에서 검증 데이터 추출
        const pccDataList = extractPccDataFromExcel(selectedRowsData);
        
        // 필수 항목 체크
        const invalidData = pccDataList.filter(item => !item.name || !item.pccNumber || !item.phone);
        if (invalidData.length > 0) {
            alert(`일부 데이터에 필수 정보가 누락되었습니다.\n누락된 항목: ${invalidData.length}개\n\n이름, 통관고유부호, 전화번호가 모두 필요합니다.`);
            return;
        }

        console.log('검증할 데이터:', pccDataList);

        // API 호출
        const r = await ___prj.api.post('/s/etc', 'check.pccc', null, {
            pccDataList: pccDataList
        });

        if (r.data.result !== ___const.OK) {
            throw new Error('통관번호 검증 오류');
        }

        const results = r.data.content;

        // 오류가 있는 항목만 필터링
        const errorItems = results.filter(item => item.result !== '정상');

        if (errorItems.length > 0) {
            // 오류 결과 반환 (HTML로 표시)
            return {
                type: 'error',
                title: `✅ 검증 완료! 총 ${results.length - errorItems.length}건 정상, ⚠️ 통관번호 검증 오류 ${errorItems.length}건 / 전체 ${results.length}건`,
                items: errorItems
            };
        } else {
            // 성공 결과 반환
            return {
                type: 'success',
                title: `✅ 검증 완료! 총 ${results.length}건 모두 정상입니다.`,
                items: []
            };
        }

    } catch (error) {
        console.error('일괄 검증 오류:', error);
        // 에러 결과 반환
        return {
            type: 'error',
            title: '⚠️ 일괄 검증 중 오류가 발생했습니다',
            items: [{
                name: 'API 오류',
                pccNumber: '',
                result: '오류',
                error: error.message
            }]
        };
    }
}

/**
 * Excel 데이터에서 통관고유부호 검증 데이터 추출
 * @param {Array} selectedRowsData - ExcelLoader에서 전달받은 선택된 행 데이터
 * @returns {Array} 검증용 데이터 배열
 */
function extractPccDataFromExcel(selectedRowsData) {
    return selectedRowsData.map(row => {
        const data = row.data || row;
        return {
            name: data[pccCheck.pccColumn.NAME],
            pccNumber: data[pccCheck.pccColumn.PCC_NUMBER],
            phone: data[pccCheck.pccColumn.PHONE],
        };
    });
}

const ccNumberList = [
    { 
        productId: '8595704858', 
        productName: '亚马逊手摇太阳能充电收音机 迷你应急带照明功能收音机批发', 
        productUrl: 'https://detail.1688.com/offer/540745863032.html?spm=a360q.8274423%2Fnew.goods.productname',
        shppingMall: '1688.com',
        brand: 'HAOYI',
        ccNumber: '649' ,
        hsCode: '852712'
    }
];
function _searchCCNumberItem(productId) {
    if (ccNumberList.some(item => item.productId === productId)) {
        return ccNumberList.find(item => item.productId === productId);
    }
    //alert(`[${productId}]의 통관품목 번호가 없습니다.`);
    return '';
}

function extractTabaeDataFromExcel(selectedRowsData) {
    return selectedRowsData.map(row => {
        const data = row.data || row;
        const ccNumberItem = _searchCCNumberItem(data['노출상품ID']);
        return {
            '묶음번호': data['묶음배송번호'],
            '자동결제 여부\n( 자동결제 = 1, 수동결제 = 2 )': '1',
            '바로포장 여부\n(바로포장 = 1, 선택안함 = 공백)': '',
            '수취인(한글)': data['수취인이름'],
            '수취인(영문)': '',
            '휴대폰 번호': data['수취인전화번호'],
            '우편번호': data['우편번호'],
            '수취인 주소': data['수취인 주소'],
            '수취인 주소(영문)': '',
            '통관구분\n( 개인 = 1, 사업자 = 2 )': '1',
            '개인통관번호 또는 사업자번호': data[pccCheck.pccColumn.PCC_NUMBER],
            '센터 요청사항': '',
            '국내택배 요청사항': data['배송메세지'],
            '통관품목 번호': ccNumberItem.ccNumber,
            '쇼핑몰 URL': ccNumberItem.shppingMall,
            '쇼핑몰 오더번호': '',
            '상품명': ccNumberItem.productName,
            '브랜드': ccNumberItem.brand,
            '색상': data['등록옵션명'],
            '사이즈': '',
            '수량': data['구매수(수량)'],
            '단가': data['옵션판매가(판매단가)'],
            '이미지 URL': '',
            '상품URL': ccNumberItem.productUrl,
            '트래킹번호\n(중국 운송장번호)': '',
            '재고번호': '',
            '부가서비스': '',
            '화물 선착불\n선불 =1, 착불 =0 용달차=3, 본인픽업 =4': '1',
            'HS CODE': ccNumberItem.hsCode,
            '오픈마켓 이름': 'Cupang',
            '오픈마켓 결제수단': '',
            '오픈마켓 주문번호': data['주문번호'],
            '오픈마켓 판매금액': data['결제액'],
        };
    });
}

function handleChangeTabaeExcel(selectedRowsData) {
    const tabaeData = extractTabaeDataFromExcel(selectedRowsData);
    // console.log('tabaeData',tabaeData);

    // 엑셀 다운로드
    ___downloadExcel(tabaeData, null, 'tabae');
}


export default pccCheck;

