/**
 * 카카오 로그인 유틸리티 함수
 */
import ___prj from '$prj/prjMain';
import ___const from '$prj/lib/i_const.js';

// 카카오 앱 키 (실제 사용시 환경변수로 관리해야 함)
const KAKAO_APP_KEY = '374e3247febf8eef0f26568246ceb38e'; // 데이트브 앱 키로 업데이트
const KAKAO_JS_KEY = 'b81faa6fcafc3a2489dc740356b34180';

// 카카오 로그인 리다이렉트 URI
const KAKAO_REDIRECT_URI = 'http://localhost:5173/s/oauth';

/**
 * 카카오 SDK 초기화
 */
export function initKakaoSDK() {
    return new Promise((resolve, reject) => {
        // 이미 로드된 경우
        if (window.Kakao && window.Kakao.isInitialized()) {
            console.log('카카오 SDK 이미 초기화됨');
            resolve(window.Kakao);
            return;
        }

        // 여러 소스로 SDK 로드 시도
        const loadSDK = (sources, index = 0) => {
            if (index >= sources.length) {
                reject(new Error('모든 카카오 SDK 소스 로드 실패'));
                return;
            }

            const source = sources[index];
            // console.log(`카카오 SDK 로드 시도 ${index + 1}: ${source.name}`);
            
            const script = document.createElement('script');
            script.src = source.url;
            
            if (source.integrity) {
                script.integrity = source.integrity;
            }
            
            if (source.crossOrigin) {
                script.crossOrigin = source.crossOrigin;
            }
            
            script.onload = () => {
                // console.log(`✅ 카카오 SDK 로드 성공: ${source.name}`);
                try {
                    if (!window.Kakao.isInitialized()) {
                        window.Kakao.init(KAKAO_JS_KEY);
                        // console.log('카카오 SDK 초기화 완료');
                    }
                    resolve(window.Kakao);
                } catch (error) {
                    console.error('카카오 SDK 초기화 실패:', error);
                    // 다음 소스로 시도
                    loadSDK(sources, index + 1);
                }
            };
            
            script.onerror = () => {
                console.warn(`❌ 카카오 SDK 로드 실패: ${source.name}`);
                // 다음 소스로 시도
                loadSDK(sources, index + 1);
            };
            
            document.head.appendChild(script);
        };

        // 성공한 소스만 사용 (개발자 사이트 CDN)
        const sources = [
            {
                name: '개발자 사이트 CDN',
                url: 'https://developers.kakao.com/sdk/js/kakao.js'
            }
        ];

        loadSDK(sources);
    });
}

/**
 * 카카오 로그인 실행 (공식 데모 코드 방식)
 */
export async function loginWithKakao() {
    try {
        console.log('카카오 로그인 시작...');
        
        // 환경에 따른 리다이렉트 URI 설정
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const redirectUri = isLocalhost 
            ? 'http://localhost:5173/s/oauth'
            : 'https://mind-coding.com/s/oauth';
        
        console.log('현재 환경:', isLocalhost ? '로컬 개발' : '프로덕션');
        console.log('리다이렉트 URI:', redirectUri);
        
        // 카카오 SDK가 로드되었는지 확인
        if (typeof window.Kakao !== 'undefined' && window.Kakao.isInitialized()) {
            console.log('카카오 SDK 준비됨, 로그인 실행...');
            
            // 공식 데모 코드 방식으로 로그인
            window.Kakao.Auth.authorize({
                redirectUri: redirectUri
            });
            
        } else {
            console.error('카카오 SDK가 준비되지 않았습니다.');
            alert('카카오 로그인 서비스를 사용할 수 없습니다. 페이지를 새로고침해주세요.');
        }
    } catch (error) {
        console.error('카카오 로그인 처리 중 오류:', error);
        alert('로그인 처리 중 오류가 발생했습니다.');
    }
}

/**
 * 카카오 로그인 성공 처리
 */
function handleKakaoLoginSuccess(userInfo, authObj) {
    // 카카오 사용자 정보를 시스템에 맞게 변환
    const userData = {
        id: userInfo.id,
        email: userInfo.kakao_account?.email || '',
        nickname: userInfo.kakao_account?.profile?.nickname || userInfo.properties?.nickname || '',
        profileImage: userInfo.kakao_account?.profile?.profile_image_url || '',
        accessToken: authObj.access_token,
        refreshToken: authObj.refresh_token,
        loginType: 'kakao'
    };

    // 세션 스토리지에 저장
    sessionStorage.setItem('kakaoUser', JSON.stringify(userData));
    
    // 전역 상태 업데이트 (프로젝트의 로그인 시스템에 맞게 수정 필요)
    if (window.___prj && window.___prj.user) {
        window.___prj.user = {
            ...window.___prj.user,
            ...userData,
            isLoggedIn: true
        };
    }

    // 로그인 성공 알림
    alert(`${userData.nickname}님, 카카오 로그인에 성공했습니다!`);
    
    // 메인 페이지로 리다이렉트
    window.location.href = '/';
}

/**
 * 카카오 로그인 에러 처리
 */
function handleKakaoLoginError(error) {
    console.error('카카오 로그인 에러:', error);
    
    let errorMessage = '카카오 로그인에 실패했습니다.';
    
    if (error.error === 'access_denied') {
        errorMessage = '로그인이 취소되었습니다.';
    } else if (error.error === 'invalid_request') {
        errorMessage = '잘못된 요청입니다.';
    }
    
    alert(errorMessage);
}

/**
 * 카카오 로그아웃
 */
export async function logoutFromKakao() {
    try {
        const Kakao = await initKakaoSDK();
        
        Kakao.Auth.logout(function() {
            console.log('카카오 로그아웃 완료');
            
            // 세션 스토리지에서 카카오 사용자 정보 제거
            sessionStorage.removeItem('kakaoUser');
            
            // 전역 상태 초기화
            if (window.___prj && window.___prj.user) {
                window.___prj.user.isLoggedIn = false;
            }
        });
    } catch (error) {
        console.error('카카오 로그아웃 실패:', error);
    }
}

/**
 * 카카오 로그인 상태 확인
 */
export function isKakaoLoggedIn() {
    const kakaoUser = sessionStorage.getItem('kakaoUser');
    return kakaoUser !== null;
}

/**
 * 서버 API를 통한 사용자 등록/로그인 처리
 */
async function handleLocalUserRegistration(userData) {
    try {
        console.log('서버 API를 통한 사용자 등록/로그인 처리 시작...', userData);

        // 서버에 사용자 정보 전송
        const response = await fetch('/api/users/kakao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                kakao_id: userData.id,
                email: userData.email,
                nickname: userData.nickname,
                profile_image: userData.profileImage,
                access_token: userData.accessToken,
                phone: userData.phone,
                gender: userData.gender,
                birthday: userData.birthday
            })
        });

        if (response.ok) {
            const result = await response.json();
            console.log('서버 응답:', result);
            
            if (result.success) {
                const serverUser = result.user;
                
                // JWT 토큰 발급 요청
                const jwtResponse = await fetch('/api/auth/jwt', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: serverUser.user_id,
                        login_type: 'kakao'
                    })
                });

                if (jwtResponse.ok) {
                    const jwtResult = await jwtResponse.json();
                    console.log('JWT 토큰 발급:', jwtResult);
                    
                    // JWT 토큰을 세션 스토리지에 저장
                    sessionStorage.setItem('jwt_token', jwtResult.jwt_token);
                    
                    // 사용자 정보를 세션 스토리지에 저장
                    sessionStorage.setItem('currentUser', JSON.stringify(serverUser));
                    
                    // 전역 상태 업데이트
                    updateGlobalUserState(serverUser);
                    
                    // 성공 메시지
                    if (result.is_new_user) {
                        alert(`${serverUser.nickname}님, 회원가입 및 로그인에 성공했습니다!`);
                    } else {
                        alert(`${serverUser.nickname}님, 로그인에 성공했습니다!`);
                    }
                } else {
                    console.error('JWT 토큰 발급 실패');
                    alert('인증 토큰 발급에 실패했습니다.');
                }
            } else {
                console.error('사용자 등록/로그인 실패:', result);
                alert('사용자 등록/로그인에 실패했습니다.');
            }
        } else {
            const errorData = await response.json();
            console.error('서버 API 호출 실패:', errorData);
            alert('서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
        
        // 메인 페이지로 리다이렉트
        window.location.href = '/';
        
    } catch (error) {
        console.error('서버 API 호출 중 오류:', error);
        
        // 서버가 없을 경우 로컬 폴백 처리
        console.warn('서버 API가 없어 로컬 폴백으로 처리합니다.');
        await handleLocalFallback(userData);
    }
}

/**
 * 서버 API가 없을 경우 로컬 폴백 처리
 */
async function handleLocalFallback(userData) {
    try {
        console.log('로컬 폴백 처리 시작...', userData);

        // 기존 사용자 확인 (로컬 스토리지에서)
        const existingUsers = JSON.parse(localStorage.getItem('localUsers') || '[]');
        let existingUser = existingUsers.find(user => user.userId === userData.userId);

        if (existingUser) {
            // 기존 사용자 로그인
            console.log('기존 사용자 로그인 (로컬):', existingUser);
            
            // 사용자 정보 업데이트
            const updatedUser = { ...existingUser, ...userData, lastLogin: new Date().toISOString() };
            const updatedUsers = existingUsers.map(user => 
                user.userId === userData.userId ? updatedUser : user
            );
            localStorage.setItem('localUsers', JSON.stringify(updatedUsers));
            
            // 현재 세션에 저장
            sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
            
            // 전역 상태 업데이트
            updateGlobalUserState(updatedUser);
            
            alert(`${userData.nickname}님, 로그인에 성공했습니다! (로컬 모드)`);
        } else {
            // 신규 사용자 회원가입
            console.log('신규 사용자 회원가입 (로컬):', userData);
            
            const newUser = {
                ...userData,
                userType: 'general',
                userTypeLabel: '일반 사용자',
                joinDate: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
                isActive: true
            };
            
            // 로컬 스토리지에 추가
            existingUsers.push(newUser);
            localStorage.setItem('localUsers', JSON.stringify(existingUsers));
            
            // 현재 세션에 저장
            sessionStorage.setItem('currentUser', JSON.stringify(newUser));
            
            // 전역 상태 업데이트
            updateGlobalUserState(newUser);
            
            alert(`${userData.nickname}님, 회원가입 및 로그인에 성공했습니다! (로컬 모드)`);
        }
        
        // 메인 페이지로 리다이렉트
        window.location.href = '/';
        
    } catch (error) {
        console.error('로컬 폴백 처리 중 오류:', error);
        alert('사용자 등록/로그인 처리 중 오류가 발생했습니다.');
        window.location.href = '/';
    }
}

/**
 * 전역 사용자 상태 업데이트
 */
function updateGlobalUserState(userData) {
    if (window.___prj && window.___prj.user) {
        window.___prj.user = {
            ...window.___prj.user,
            ...userData,
            isLoggedIn: true
        };
    }
    
    // 로그인 상태 전역 변수 업데이트
    if (window.$g_logedIn !== undefined) {
        window.$g_logedIn = true;
    }
}

/**
 * 카카오 사용자 정보 가져오기
 */
export function getKakaoUserInfo() {
    const kakaoUser = sessionStorage.getItem('kakaoUser');
    return kakaoUser ? JSON.parse(kakaoUser) : null;
}

/**
 * 현재 로그인된 사용자 정보 가져오기
 */
export function getCurrentUser() {
    const currentUser = sessionStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
}

/**
 * JWT 토큰 가져오기
 */
export function getJwtToken() {
    return sessionStorage.getItem('jwt_token');
}

/**
 * 인증된 API 요청 헬퍼
 */
export async function authenticatedFetch(url, options = {}) {
    const token = getJwtToken();
    
    if (!token) {
        throw new Error('인증 토큰이 없습니다. 다시 로그인해주세요.');
    }
    
    const defaultOptions = {
        ...options,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            ...options.headers
        }
    };
    
    const response = await fetch(url, defaultOptions);
    
    // 토큰 만료 시 로그아웃 처리
    if (response.status === 401) {
        await logoutFromKakao();
        window.location.href = '/s/signIn';
        throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
    }
    
    return response;
}

/**
 * URL에서 인가코드 추출
 */
export function getAuthorizationCodeFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('code');
}

/**
 * 인가코드로 토큰 교환 및 사용자 정보 가져오기
 */
export async function handleKakaoCallback() {
    try {
        const code = getAuthorizationCodeFromUrl();
        
        if (!code) {
            console.error('인가코드가 없습니다.');
            return;
        }

        console.log('인가코드 받음:', code);
        
        // 인증코드를 액세스 토큰으로 교환
        await exchangeCodeForToken(code);
        
    } catch (error) {
        console.error('카카오 콜백 처리 실패:', error);
        handleKakaoLoginError(error);
    }
}

/**
 * 인증 코드를 서버로 전송하여 로그인 처리
 */
export async function exchangeCodeForToken(code) {
    try {
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const redirectUri = isLocalhost 
            ? 'http://localhost:5173/s/oauth'
            : 'https://mind-coding.com/s/oauth';

        console.log('서버에 인가코드 전송 중...', { code, redirectUri });
        
        // 서버에서 모든 카카오 처리 담당 (보안 강화)
        ___prj.api.post('', 'kakao.login', null, { 
            authorization_code: code, 
            redirect_uri: redirectUri 
        });
        ___log.dev('___submitBtn r:', r);

        if (r.data.result === ___const.OK) {
        }
        
        // const response = await fetch('/api/auth/kakao/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         code: code,
        //         redirect_uri: redirectUri
        //     })
        // });

        // if (response.ok) {
        //     const result = await response.json();
        //     console.log('서버에서 로그인 처리 완료:', result);
            
        //     if (result.success) {
        //         // 서버에서 처리된 사용자 정보와 JWT 토큰 사용
        //         await handleServerLoginResult(result);
        //     } else {
        //         throw new Error(result.message || '서버 로그인 처리 실패');
        //     }
        // } else {
        //     const errorData = await response.json().catch(() => ({}));
        //     throw new Error(errorData.message || `서버 오류: ${response.status}`);
        // }
    } catch (error) {
        console.error('서버 API 호출 중 오류:', error);
        alert(`로그인 처리 중 오류가 발생했습니다: ${error.message}`);
        window.location.href = '/';
        throw error;
    }
}

/**
 * 서버에서 받은 로그인 결과 처리
 */
async function handleServerLoginResult(result) {
    try {
        console.log('서버 로그인 결과 처리 시작:', result);
        
        // 1. JWT 토큰 저장
        if (result.jwt_token) {
            sessionStorage.setItem('jwt_token', result.jwt_token);
        }
        
        // 2. 사용자 정보 저장
        if (result.user) {
            sessionStorage.setItem('currentUser', JSON.stringify(result.user));
            
            // 3. 전역 상태 업데이트
            if (window.___prj && window.___prj.user) {
                window.___prj.user = {
                    ...window.___prj.user,
                    userId: result.user.userId,
                    username: result.user.username,
                    nickname: result.user.nickname,
                    email: result.user.email,
                    profileImage: result.user.profileImage,
                    userType: result.user.userType,
                    userTypeLabel: result.user.userTypeLabel,
                    isLoggedIn: true,
                    loginType: 'kakao'
                };
            }
            
            // 4. 로그인 상태 전역 변수 업데이트
            if (window.$g_logedIn !== undefined) {
                window.$g_logedIn = true;
            }
            
            // 5. 성공 메시지
            alert(`${result.user.nickname}님, 마인드코딩에 로그인되었습니다!`);
            
            // 6. 메인 페이지로 리다이렉트
            window.location.href = '/';
        } else {
            throw new Error('사용자 정보가 없습니다.');
        }
        
    } catch (error) {
        console.error('서버 로그인 결과 처리 중 오류:', error);
        alert('로그인 처리 중 오류가 발생했습니다.');
        window.location.href = '/';
        throw error;
    }
}


