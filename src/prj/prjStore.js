import { writable, derived } from 'svelte/store';
/*
Svelte 파일이 아닌 js 파일에서 전역 상태 관리를 하기 위해서는 writable 함수를 사용해야 한다.
*/

/**
 * localStorage에 저장된 값을 관리하는 스토어를 생성하는 함수
 * @param {string} key - 저장소의 키
 * @param {any} initialValue - 초기값
 * @returns {Object} 저장소 객체
 */
function createLocalStorageStore(key, initialValue) {
    const storedValue = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    const data = storedValue ? JSON.parse(storedValue) : initialValue;

    const { subscribe, set, update } = writable(data);

    return {
        subscribe,
        set: (value) => {
            if (typeof window !== 'undefined') {
                localStorage.setItem(key, JSON.stringify(value));
            }
            set(value);
        },
        update: (updater) => {
            const newValue = updater(data); // 현재 데이터를 업데이트
            if (typeof window !== 'undefined') {
                localStorage.setItem(key, JSON.stringify(newValue)); // 업데이트된 값을 localStorage에 저장
            }
            set(newValue); // 스토어의 값을 업데이트
        },
    };
}

// 전역 상태 관리
export let g_logedIn = writable(false);
export let g_theme = writable('light');  // 기본값은 light로 설정
export let g_keepLoggedIn = writable(false);  // 로그인 유지 상태

// localStorage에서 로그인 유지 상태 복원
if (typeof window !== 'undefined') {
    const savedKeepLoggedIn = localStorage.getItem('keepLoggedIn') === 'true';
    g_keepLoggedIn.set(savedKeepLoggedIn);
}

// 로그인 유지 상태가 변경될 때 localStorage에 저장
g_keepLoggedIn.subscribe(value => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('keepLoggedIn', value);
    }
});

// 로고 설정
export const g_logos = {
    light: {
        squareType: [
            '/resource/code/logo/mc_mindcoding_pattern_light.png',
            '/resource/code/logo/mc_mindcoding_basic_light.png',
            '/resource/code/logo/mc_mindcoding_pattern_1_light.png',
            '/resource/code/logo/mc_mindcoding_basic_1_light.png',
            '/resource/code/logo/mc_pattern_light.png',
            '/resource/code/logo/mc_basic_light.png',
        ],
        horizontalType: [
            '/resource/code/logo/mindcoding_pattern_light.png',
            '/resource/code/logo/mindcoding_basic_light.png',
        ],
    },
    dark: {
        squareType: [
            '/resource/code/logo/mc_mindcoding_pattern_dark.png',
            '/resource/code/logo/mc_mindcoding_basic_dark.png',
            '/resource/code/logo/mc_mindcoding_pattern_1_dark.png',
            '/resource/code/logo/mc_mindcoding_basic_1_dark.png',
            '/resource/code/logo/mc_pattern_dark.png',
            '/resource/code/logo/mc_basic_dark.png',
        ],
        horizontalType: [
            '/resource/code/logo/mindcoding_pattern_dark.png',
            '/resource/code/logo/mindcoding_basic_dark.png',
        ]
    }
};

export const g_logosText = {
    light: `<img src="${g_logos.light.horizontalType[0]}" alt="Logo" class="h-5">`,
    dark: `<img src="${g_logos.dark.horizontalType[0]}" alt="Logo" class="h-5">`
};

// 로고 크기 설정
export const g_logoSizes = {
    header: 'h-[40px]',
    login: 'h-16',
    default: 'h-8'
};

export const user = writable(null);
export const googleCalendarConnected = writable(false);

// 현재 테마에 따른 로고 경로를 반환하는 derived 스토어
export const g_brandLogo = derived(g_theme, $theme => g_logos[$theme].squareType[0] || g_logos.light.squareType[0]);
export const g_brandLogoText = derived(g_theme, $theme => g_logosText[$theme] || g_logosText.light);

export const storeMemberCnt = writable({
    groupNo: 0,
    memberCnt: 0 
});

export let _pageTotal = writable(0);
export let _pageNumber = writable(1);
export let _profileInfo = writable({});

/**
 * localStorage에 저장된 값을 관리하는 스토어
 */
export let g_storage = createLocalStorageStore('g_storage', {
    serverTabIndex: 0,
    // 필요한 데이터 추가
});
