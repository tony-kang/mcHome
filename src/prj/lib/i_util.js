import ___jwt from './i_jwt';
import ___encDec from './i_encDec';
import ___localStorage from './i_localStorage';
import ___const from './i_const';

const _pageDebug = false;

export function getTokenUser(aToken) {
    if (!aToken) {
        aToken = ___localStorage.getItem(___const.A_TOKEN);
    };

    const payload = ___jwt.decodeJwt(aToken);
    if (payload) {
        const decPayload = ___encDec.telepasiDecrypt(payload.encInfo);
        return JSON.parse(decPayload);
    }
    return null;
}

export function base64Decode(encodedString) {
    const decodedString = atob(encodedString);
    const utf8Decoder = new TextDecoder("utf-8");
    return utf8Decoder.decode(new Uint8Array(decodedString.split("").map(c => c.charCodeAt(0))));
}

export function extractBaseUrl(url) {
    if (!url) return '';
    const questionMarkIndex = url.indexOf('?');
    if (questionMarkIndex !== -1) {
        return url.slice(0, questionMarkIndex);
    }
    return url;
}

/**
 * 날짜를 지정된 형식으로 포맷팅합니다.
 * @param {Date|string|number} date - 날짜 객체, ISO 문자열 또는 타임스탬프
 * @param {string} format - 날짜 형식 (예: 'YYYY-MM-DD HH:mm:ss')
 * @returns {string} 포맷팅된 날짜 문자열
 * 
 * 사용 예시:
 * nowDateTime(new Date(), 'YYYY-MM-DD') => '2024-03-14'
 * nowDateTime(new Date(), 'YYYY.MM.DD HH:mm') => '2024.03.14 15:30'
 * nowDateTime(new Date(), 'YY/MM/DD') => '24/03/14'
 * nowDateTime(new Date(), 'M월 D일 HH시 mm분') => '3월 14일 15시 30분'
 */
export function nowDateTime(format = 'YYYY-MM-DD hh:mm:ss') {
    const d = new Date();

    const tokens = {
        Y: d.getFullYear(),
        m: String(d.getMonth() + 1).padStart(2, '0'),
        d: String(d.getDate()).padStart(2, '0'),
        H: String(d.getHours()).padStart(2, '0'),
        h: String(d.getHours()).padStart(2, '0'),
        i: String(d.getMinutes()).padStart(2, '0'),
        s: String(d.getSeconds()).padStart(2, '0'),
        YYYY: d.getFullYear(),
        YY: String(d.getFullYear()).slice(-2),
        MM: String(d.getMonth() + 1).padStart(2, '0'),
        DD: String(d.getDate()).padStart(2, '0'),
        hh: String(d.getHours()).padStart(2, '0'),
        mm: String(d.getMinutes()).padStart(2, '0'),
        ss: String(d.getSeconds()).padStart(2, '0'),
    };

    return format.replace(/YYYY|YY|MM|DD|hh|mm|ss|Y|m|d|H|h|i|s/g, match => tokens[match]);
}

/**
 * 문자열에서 숫자만 추출
 * @param {string} str - 원본 문자열
 * @returns {string} 숫자만 포함된 문자열
 */
export function getOnlyNumbers(str) {
    if (!str) return '';
    return str.replace(/[^0-9]/g, '');
}

/**
 * 전화번호 형식화 (옵션)
 * @param {string} num - 숫자로만 된 문자열
 * @returns {string} 형식화된 전화번호
 */
export function formatPhoneNumber(num) {
    if (!num) return '';
    
    const numbers = num.replace(/[^0-9]/g, '');
    
    if (numbers.length === 11) {
        // 휴대폰 번호
        return numbers.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else if (numbers.length === 10) {
        // 지역 번호가 있는 일반 전화
        return numbers.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    } else if (numbers.length === 8) {
        // 지역 번호가 없는 일반 전화
        return numbers.replace(/(\d{4})(\d{4})/, '$1-$2');
    }
    
    return numbers;
}

/**
 * 통화 문자열을 숫자로 변환한다.
 * 원화 문자열 : '₩10,000.0' -> 10000
 * 달러 문자열 : '$1,234.56' -> 1234.56
 * 유로 문자열 : '€3.456,78' -> 3456.78
 * 부호 문자열 : '-$5,678.90' -> -5678.90
 * 복잡한 문자열 : 'Total: ¥12,345.67 (including tax)' -> 12345.67
 * @param {*} currency 
 * @returns 
 */
export function currencyToNumber(currency) {
    return Number(currency.replace(/[^0-9.-]+/g, ''));
}

/**
 * 천단위 콤마를 추가한다.
 * @param {*} x 
 * @returns 
 */
export function commaNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function searchInit() {
    return {
        items: {
            page: 1,
            pageSize: 20,
        },	// 콤포넌트가 아닌것
        options: []	    // 콤포넌트인 것 = Database field인 것
    };
}

export function getSearch(item,defaultValue='') {
    const params = new URLSearchParams(window.location.search);
    return params.get(item) || defaultValue;
}

export function setSearch(item,value,clearItems) {
    const params = new URLSearchParams(window.location.search);
    params.set(item, value);

    if (typeof clearItems === "string") {
        params.delete(clearItems);
    } else if (Array.isArray(clearItems)) {
        clearItems.forEach(item => {
            params.delete(item);
        });
    }

    // 변경된 query 문자열을 구합니다.
    const newQueryString = params.toString();
    if (_pageDebug) {
        console.log('newQueryString',newQueryString);
    }
    // 새로운 주소를 구성합니다.
    const newUrl = `${window.location.pathname}?${newQueryString}`;
    window.history.pushState({}, '', newUrl); // 주소를 변경합니다. -> 새로고침 없이 URL만 변경됩니다. -> 이전화면으로 돌아가기 가능하도록 스택에 쌓임
    return true;
}

export function clearSearch(clearItems) {
    // 현재 URL의 search 파라미터를 추출합니다.
    const params = new URLSearchParams(window.location.search);
    let newUrl;

    if (typeof clearItems === "string") {
        params.delete(clearItems);

        const newQueryString = params.toString();
        // newQueryString 이 비어있으면 ? 를 제거합니다.
        newUrl = newQueryString ? `${window.location.pathname}?${newQueryString}` : window.location.pathname;
    } else if (Array.isArray(clearItems)) {
        clearItems.forEach(item => {
            params.delete(item);
        });

        const newQueryString = params.toString();
        // newQueryString 이 비어있으면 ? 를 제거합니다.
        newUrl = newQueryString ? `${window.location.pathname}?${newQueryString}` : window.location.pathname;
    } else {
        //모든 항목 삭제
        for (let key of params.keys()) {
            params.delete(key);
        }
        newUrl = window.location.pathname;
    }

    window.history.pushState({}, '', newUrl);   // 주소를 변경합니다. -> 새로고침 없이 URL만 변경됩니다. -> 이전화면으로 돌아가기 가능하도록 스택에 쌓임

    return true;
}

export function setSearchReset(searchItemObj,defaultObj) {
    // 속성을 바꾸는 것이므로 리턴이 필요없음
    Object.keys(searchItemObj).forEach(key => {
        searchItemObj[key] = defaultObj[key];	// 초기화
        clearSearch(key);
    });
    clearSearch('page');
}

export function searchUpdate() {
    console.log('searchUpdate',window.location.pathname);
    navigate(window.location.pathname);
}

// 문자열의 마지막 N자리를 소문자로 변환하는 함수
export function toLowerLastN(str, n) {
    if (!str || typeof str !== 'string' || n <= 0) return str;
    
    const length = str.length;
    if (n > length) n = length;
    
    return str.slice(0, length - n) + str.slice(length - n).toLowerCase();
}

/**
 * 최근 12개월의 년월 목록을 배열로 반환합니다.
 * @returns {string[]} 최근 12개월의 년월 목록
 */
export function getLast12Months() {
    const months = [];
    const today = new Date();
    
    for (let i = 0; i < 12; i++) {
        const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        months.push({ value: `${year}-${month}`, text: `${year}년 ${month}월` });
    }
    
    return months;
}