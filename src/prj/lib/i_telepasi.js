import moment from 'moment';
import * as XLSX from 'xlsx';

export function telepasiTimeToDate(time,tail) {
    const date = new Date(time); // 밀리초 단위의 시간을 Date 객체로 변환

    // 년, 월, 일, 시간, 분, 초를 추출
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth()의 반환 값은 0부터 시작하므로 1을 더해줍니다.
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // "YYYY년 MM월 DD일 HH시 MM분 SS초" 형식으로 출력
    const formattedTime = `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분 ${seconds}초` + tail;
    return formattedTime;
}

export function ___makeDateObj() {
    const now = new Date();
    const year = String(now.getFullYear());
    const thisYear = year;
    const lastYear = String(now.getFullYear() - 1);

    const month = String(now.getMonth() + 1).padStart(2, '0');
    const thisMonth = month;
    const lastMonth = now.getMonth() === 0 ? '12' : String(now.getMonth()).padStart(2, '0');

    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    const millisecond = String(now.getMilliseconds()).padStart(3, '0');
    
    // 요일의 첫 글자
    const dayFirstChar = now.toLocaleString('en-US', {weekday: 'short'}).charAt(0);
    // 월의 첫 글자
    const monthFirstChar = now.toLocaleString('en-US', {month: 'short'}).charAt(0);
    const encDate = `${dayFirstChar}${monthFirstChar}${second}${millisecond}`;
    
    return { year, lastYear, thisYear, month, lastMonth, thisMonth, day, hour, minute, second, millisecond, encDate };
}

/**
 * 경과 시간을 계산합니다.
 * @param {number} minutes 
 * @param {string} tail 
 * @returns 
 */
export function ___elapsedTime(minutes,tail = '') {
    if (!minutes) return '0 minute';

    let result = "";
    const minutesPerHour = 60;
    const minutesPerDay = 60 * 24;
    
    const days = Math.floor(minutes / minutesPerDay);
    const hours = Math.floor((minutes % minutesPerDay) / minutesPerHour);
    const remainingMinutes = minutes % minutesPerHour;
    
    if (days > 0) {
        result += `${days} day${days > 1 ? "s" : ""} `;
    }
    if (hours > 0) {
        result += `${hours} hour${hours > 1 ? "s" : ""} `;
    }
    if (remainingMinutes > 0) {
        result += `${remainingMinutes} minute${remainingMinutes > 1 ? "s" : ""}`;
    }
  
    return result.trim() + tail;
}

/**
 * 배열에 특정 값들이 포함되어 있는지 확인합니다.
 * @param {*} sourceArray 
 * @param {*} checkArray 
 * @returns 
 */
export function ___isInArray(sourceArray, checkArray) {
    if (!sourceArray || !checkArray) return false;
    return checkArray.some((item) => sourceArray.includes(item));
}

/**
 * 숫자를 통화 형식으로 포맷팅합니다.
 * @param {number} number 
 * @param {string} currencyCode 
 * @param {boolean} showDecimals 
 * @param {string} locale 
 * @returns 
 */
export function ___toCurrency(number, currencyCode = 'KRW', showDecimals = true, locale = 'ko-KR') {
    if (typeof number !== 'number' || isNaN(number)) number = 0;
    // 소수점 자릿수를 설정
    const maximumFractionDigits = showDecimals ? 2 : 0;
    
    // Intl.NumberFormat 객체를 사용하여 숫자를 포맷
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: maximumFractionDigits,
    }).format(number);
}

/**
 * 객체를 쿼리 문자열로 변환합니다.
 * @param {*} objOrStr 
 * @returns 
 */
export function ___objQuery(objOrStr) {
    if (typeof objOrStr === 'object') {
        const keyValuePairs = [];
        for (const key in objOrStr) {
            keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(objOrStr[key]));
        }
        return '/?' + keyValuePairs.join('&');
    }

    return objOrStr;
}

// 랜덤 아이디 생성
export function ___domId() {
    return `id-${Math.random().toString(36).substring(2, 9)}`;
}

export function ___makeId(prefix) {
    if (prefix) id = prefix + '.' + ___domId();
    return id;
}

export function ___uniqueId(prefix) {
    return prefix+'-' + Math.random().toString(16).slice(2);
}

export function ___jsonClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

const textColorList = {
    normal: 'text-black-500',
    warning: 'text-orange-500',
    error: 'text-red-500',

    black: 'text-black-500',
    red: 'text-red-500',
    green: 'text-green-500',
    blue: 'text-blue-500',
}

/**
 * 날짜를 원하는 형식으로 바꿉니다.
 * @param {*} dateStr   : 입력 날짜
 * @param {*} inFormat  : 입력 날짜 형식
 * @param {*} outFormat : 출력 날짜 형식
 * @returns 
 */
export function ___date(dateStr, inFormat = "YYYYMMDDHHmmss", outFormat = "YYYY-MM-DD HH:mm:ss") {
    if (!dateStr) return '';
    return moment(dateStr, inFormat).format(outFormat);
}

export function ___formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
};

export function ___currency(number, currencyCode = 'KRW', showDecimals = true, locale = 'ko-KR') {
    if (!number) number = 0;
    // 소수점 자릿수를 설정
    const maximumFractionDigits = showDecimals ? 2 : 0;
    
    // Intl.NumberFormat 객체를 사용하여 숫자를 포맷
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: maximumFractionDigits,
    }).format(number);
}

export function ___birthday(yyyy,mm,dd,hh,mi) {
    if (!yyyy || !mm || !dd) return '';
    return `${yyyy}.${String(mm).padStart(2, '0')}.${String(dd).padStart(2, '0')} ${String(hh).padStart(2, '0')}:${String(mi).padStart(2, '0')}`;
}

export function ___text(str) {
    if (!str) return '';
    return str;
}

export function ___colorText(str, colorStyle = 'normal') {
    const color = textColorList[colorStyle] || textColorList['normal'];
    return `<my class="${color}}">${str}</my>`;
}

/**
 * 파일크기를 적당한 단위로 변환합니다.
 * @param {*} size 
 * @returns 
 */
export function ___fileSize(size) {
    const units = ["Bytes", "K", "M", "G", "T"];
    let unitIndex = 0;

    while (size > 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex += 1;
    }

    return `${parseFloat(size).toLocaleString(undefined, { maximumFractionDigits: 2 })} ${units[unitIndex]}`;
}

/**
 * 파일크기를 적당한 단위로 변환합니다.
 * @param {*} size 
 * @returns 
 */
export function ___fileExt(filename) {
    if (!filename) return '';
    return filename.split('.').pop().toLowerCase();
}

export function ___commaNumber(num) {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? "0";
  }
  
export function ___downloadExcel(data, headerArr,filename = 'download') {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    let downloadFileName = `${filename}_${year}${month}${day}.xlsx`;
    
    // headerArr가 null이거나 빈 배열이면 첫 번째 data의 key를 사용
    if (!headerArr || headerArr.length === 0) {
        if (data && data.length > 0) {
            headerArr = Object.keys(data[0]);
        }
    }
    
    const wb = XLSX.utils.book_new();   // 워크북 생성
    const ws = XLSX.utils.json_to_sheet(data, { header: headerArr });  // JSON 데이터를 시트로 변환
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  // 시트를 워크북에 추가
    XLSX.writeFile(wb, downloadFileName);  // 엑셀 파일 다운로드
}
  
  
/**
 * 두 날짜의 차이를 일수로 반환합니다.
 * @param {*} cDate 비교할 날짜
 * @param {*} bDate 기준 날짜
 * @returns 
 */
export function ___dateDiff(cDate,bDate = null) {
    const compareDate = new Date(cDate,);
    const baseDate = bDate ? new Date(bDate) : new Date();

    console.log('compareDate',cDate,baseDate);
    const diffTime = Math.abs(compareDate - baseDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}
  
export function ___decodeHtml(encodedHtml) {
    const entities = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'",
        '&nbsp;': ' ',
        '&copy;': '©',
        '&reg;': '®',
        '&trade;': '™'
    };
    
    return encodedHtml.replace(/&[a-zA-Z0-9#]+;/g, (entity) => {
        return entities[entity] || entity;
    });
}

/**
 * 16진수를 ASCII 문자로 변환합니다.
 * @param {*} hex 
 * @returns 
 */
export function ___hexToAscii(hex) {
    let result = '';

    // 2자리씩 잘라서 변환
    for (let i = 0; i < hex.length; i += 2) {
        // 16진수를 10진수로 변환한 후, 해당 ASCII 문자로 변환
        result += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }

    return result;
}

/**
 * 
 * @param {*} elementArr 검사할 항목의 배열
 *  [
        { item: 'user_id', alert: '사용자ID를 입력하세요.', regExp: /^.{5,}$/, regExpMsg: '최소 5글자이어야 합니다.' },
        { item: 'user_name' ,alert: '사용자이름을 입력하세요.' },
    ]
 * @param {*} testData 검사할 데이터
 * @returns 
 */
export function ___checkValidator(elementArr, testData) {
    for (const element of elementArr) {
        const cV = element;
        const mV = testData[cV.item];
        if (mV === undefined) continue; //항목이 없으면 Skip
        if (mV === null || (typeof mV === 'string' && mV.trim() === '')) {
            if (cV.alert) {
                // 경고 메시지가 있으면 경고 메시지를 출력하고 false를 반환합니다.
                // 경고 메시지가 없는 경우 해당사항 없음(=> 필수항목이 아닌 경우 입력하지 않아도 됨)
                alert(cV.alert);
                return false;
            }
        }

        if (mV && cV.regExp && !cV.regExp.test(mV)) {
            // 데이터가 있음 + 정규식 있음 --> 정규식 검사
            alert(cV.regExpMsg);
            return false;
        }
    }
    
    return true;
}

/**
 * 상대적인 시간을 표시합니다.
 * @param {Date|string|number} date - 날짜 객체, ISO 문자열 또는 타임스탬프
 * @returns {string} 상대 시간 문자열
 * 
 * 사용 예시:
 * getRelativeTime('2024-03-14') => '방금 전'
 * getRelativeTime('2024-03-13') => '1일 전'
 * getRelativeTime('2024-02-14') => '1개월 전'
 */
export function ___relativeTime(date) {
    if (!date) return '';
    
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';

    const tOffset = d.getTimezoneOffset() * 60000;
    // console.log('tOffset',d.getTimezoneOffset());
    d.setTime(d.getTime() - tOffset);

    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    if (weeks < 4) return `${weeks}주 전`;
    if (months < 12) return `${months}개월 전`;
    return `${years}년 전`;
}

export function ___timeStamp(date) {
    if (!date) return '';
    return new Date(date).toISOString().replace('T', ' ').substring(0, 19);
}

export function ___dialogValidation(dialogLayout,modifiedData) {
    //console.log('___dialogValidation dialogLayout:',dialogLayout,modifiedData);
    let r = true;
    dialogLayout.forEach((row) => {
        row.column.forEach((col) => {
            if (r && col.editObj.required && !modifiedData[col.editObj.name]) {
                alert(`${col.label}은(는) 필수 입력 항목입니다.`);
                r = false; // 하나라도 입력하지 않은 항목이 있으면 false를 반환합니다.
            }
        });
    });

    return r;
}

/**
 * 문자열에 대시(-)를 삽입합니다.
 * @param {string} str - 대시를 삽입할 문자열
 * @param {number} gapWidth - 대시를 삽입할 간격(기본값: 5)
 * @returns {string} 대시가 삽입된 문자열
 */
export function ___insertDash(str, gapWidth = 5) {
    var result = '';
    for (var i = 0; i < str.length; i++) {
      if (i > 0 && i % gapWidth === 0) {
        result += ' ';
      }
      result += str[i];
    }
    return result;
}

/**
 * 배열에 특정 값들이 포함되어 있는지 확인합니다.
 * @param {*} sourceArray 
 * @param {*} checkArray 
 * @returns 
 */
export function ___some(sourceArray, checkArray) {
    if (!sourceArray || !checkArray) return false;
    return checkArray.some((item) => sourceArray.includes(item));
}


export function ___gotoNewTab(pagePath) {
    window.open(pagePath, '_blank');
}


/**
 * 문자열을 배열로 변환합니다.
 * @param {string} str 
 * @param {string} delimiter 
 * @returns 
 */
export function ___strToArray(str,delimiter = ',') {
    const arr = str.split(delimiter).map((word) => word.trim());

    return arr;
}

/**
 * 오늘 날짜에 일수를 더한 날짜를 반환합니다.
 * @param {*} daysToAdd 
 * @returns 
 */
export function ___futureDate(daysToAdd) {
    const today = new Date(); // 오늘 날짜 가져오기
    const futureDate = new Date(today); // 오늘 날짜를 복사하여 새로운 Date 객체 생성
    futureDate.setDate(today.getDate() + daysToAdd); // 오늘 날짜에 daysToAdd 만큼 더하기
    return futureDate.toISOString().split('T')[0]; // 계산된 미래 날짜 반환 (YYYY-MM-DD)
}

/**
 * 특정 날짜가 지났는지 확인합니다.
 * @param {string} limitDay : YYYY-MM-DD
 * @param {string} compareDate : YYYY-MM-DD
 * @returns 
 */
export function ___dayExpired(limitDay, compareDate = null) {
    // 날짜 형식 검증
    if (typeof limitDay !== 'string' || !limitDay) return false;

    let today = compareDate ? new Date(compareDate) : new Date(); // 오늘 날짜 가져오기

    const limitDate = new Date(limitDay); // qrLimitDay를 Date 객체로 변환

    // 유효한 날짜인지 확인
    if (isNaN(limitDate.getTime())) return false;

    // 날짜 비교: limitDate가 today보다 이전이면 true 반환
    return limitDate.getTime() < today.getTime();
}

/**
 * 문자열을 키-값 쌍의 객체로 변환합니다.
 * @param {*} inputString 
 * @returns 
 */
export function ___createObjectArray(inputString, selectDesc = null) {
    const valueArr = inputString.split(','); // 콤마로 분리
    const result = [];

    valueArr.forEach(v => {
        result.push({text: v.trim(), value: v.trim()}); // 키와 값을 같게 설정
    });

    if (selectDesc) {
        result.unshift({text: selectDesc.text, value: selectDesc.value});
    }

    return result;
}