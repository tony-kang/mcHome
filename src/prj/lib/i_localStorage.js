import { browser } from '$app/environment';

const i_localStorage = {
    setItem(item, data) {
        if (!browser) return null;
        return localStorage.setItem(item, data);
    },
    
    getItem(item) {
        if (!browser) return null;
        return localStorage.getItem(item);
    },
    
    clear() {
        if (!browser) return;
        localStorage.clear();
    },
    
    deleteAllCookies() {
        if (!browser) return;
        const cookies = document.cookie.split(';');
      
        for (let cookie of cookies) {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.slice(0, eqPos).trim() : cookie.trim();
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
        }
    },

    // URL 파라미터 저장/관리 기능
    urlParams: {
        // URL 파라미터를 로컬스토리지에 저장 (만료시간 포함)
        // expirationTime: 시간 단위 (24시간) 또는 분 단위 (5분)
        saveParams(params, expirationTime = 24, isMinutes = false) {
            if (!browser) return null;
            
            const paramData = {
                params: params,
                timestamp: Date.now(),
                expiration: isMinutes ? 
                    expirationTime * 60 * 1000 : // 분을 밀리초로 변환
                    expirationTime * 60 * 60 * 1000, // 시간을 밀리초로 변환
                isMinutes: isMinutes,
                expirationTime: expirationTime
            };
            
            return localStorage.setItem('url_params', JSON.stringify(paramData));
        },

        // 저장된 URL 파라미터를 가져오기 (만료 확인 포함)
        getParams() {
            if (!browser) return null;
            
            const stored = localStorage.getItem('url_params');
            if (!stored) return null;
            
            try {
                const paramData = JSON.parse(stored);
                const now = Date.now();
                
                // 만료 시간 확인
                if (now - paramData.timestamp > paramData.expiration) {
                    localStorage.removeItem('url_params');
                    return null;
                }
                
                return paramData.params;
            } catch (error) {
                console.error('URL 파라미터 파싱 오류:', error);
                localStorage.removeItem('url_params');
                return null;
            }
        },

        // URL 파라미터 삭제
        clearParams() {
            if (!browser) return;
            localStorage.removeItem('url_params');
        },

        // 현재 URL에서 파라미터 추출
        extractParamsFromUrl() {
            if (!browser) return {};
            
            const urlParams = new URLSearchParams(window.location.search);
            const params = {};
            
            // pP (파트너) 파라미터
            if (urlParams.has('pP')) {
                params.pP = urlParams.get('pP');
            }
            
            // pC (상담사) 파라미터
            if (urlParams.has('pC')) {
                params.pC = urlParams.get('pC');
            }
            
            return params;
        },

        // 파라미터가 있는지 확인
        hasParams() {
            const params = this.getParams();
            return params && (params.pP || params.pC);
        },

        // 파라미터를 URL에 추가하여 새 URL 생성
        buildUrlWithParams(baseUrl, params) {
            if (!params || (!params.pP && !params.pC)) return baseUrl;
            
            const url = new URL(baseUrl);
            
            if (params.pP) {
                url.searchParams.set('pP', params.pP);
            }
            
            if (params.pC) {
                url.searchParams.set('pC', params.pC);
            }
            
            return url.toString();
        }
    },

    // 쿠키 관련 기능 (URL 파라미터용)
    cookies: {
        // 쿠키 설정 (만료시간 포함)
        setCookie(name, value, expirationTime = 24, isMinutes = false) {
            if (!browser) return;
            
            const date = new Date();
            const timeToAdd = isMinutes ? 
                expirationTime * 60 * 1000 : // 분을 밀리초로 변환
                expirationTime * 60 * 60 * 1000; // 시간을 밀리초로 변환
            date.setTime(date.getTime() + timeToAdd);
            const expires = "expires=" + date.toUTCString();
            
            document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax`;
        },

        // 쿠키 가져오기
        getCookie(name) {
            if (!browser) return null;
            
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            
            return null;
        },

        // 쿠키 삭제
        deleteCookie(name) {
            if (!browser) return;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;`;
        },

        // URL 파라미터를 쿠키에 저장
        saveUrlParamsToCookie(params, expirationTime = 24, isMinutes = false) {
            if (!browser) return;
            
            const paramString = JSON.stringify(params);
            this.setCookie('url_params', paramString, expirationTime, isMinutes);
        },

        // 쿠키에서 URL 파라미터 가져오기
        getUrlParamsFromCookie() {
            if (!browser) return null;
            
            const paramString = this.getCookie('url_params');
            if (!paramString) return null;
            
            try {
                return JSON.parse(paramString);
            } catch (error) {
                console.error('쿠키 URL 파라미터 파싱 오류:', error);
                this.deleteCookie('url_params');
                return null;
            }
        }
    }
};

export default i_localStorage;
