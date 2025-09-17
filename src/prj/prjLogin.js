import ___const from './lib/i_const';
import ___prj from './prjMain';
import ___jwt from './lib/i_jwt';
import { ___elapsedTime } from './lib/i_telepasi';
import { apiAlert, apiConfirm } from './lib/i_alert';
import { g_logedIn } from './prjStore';

import { goto } from '$app/navigation';
import axios from 'axios';

async function signIn(id, pw, keepLoggedIn = false, userType = 0) {
    ___prj.log.dev('로그인 시작', id, pw, userType, keepLoggedIn);
    
    const loginApi = axios.create({ baseURL: ___prj.apiUrl });   //별도의 axios 객체를 생성하여 baseURL을 지정함
    try {
        let apiPath = '/v1/login';

        const accessToken = ___prj.storage.getItem(___const.A_TOKEN);
        let apiPara = {
            username: id,
            password: pw,
            curDeviceLogin: false,
            userType: userType,
            keepLoggedIn: keepLoggedIn,
            accessToken: accessToken,   // 정상적인 Logout이 아닌 경우에는 accessToken이 있을 수 있음
            //현재기기에서의 로그인을 강제하는 경우 true, 
            // false이면 중복로그인을 금지하는 경우에 중복로그인을 검사하여 응답을 받아서 true로 만들어서 다시 로그인시킴
        };
        ___prj.log.dev('로그인 API', apiPath, apiPara);
        const r = await loginApi.post(apiPath, apiPara);
        ___prj.log.dev('로그인 API 호출결과(2)', r.data);

        if (r.data.result === ___const.OK) {
            ___prj.storage.setItem(___const.A_TOKEN, r.data.accessToken);
            
            if (keepLoggedIn) {
                ___prj.storage.setItem(___const.R_TOKEN, r.data.refreshToken);
            }
            
            ___prj.storage.setItem(___const.A_COUNT, 1);  // For debug
            ___prj.storage.setItem(___const.PACKAGE, r.data.package);  // For debug
            ___prj.storage.setItem(___const.API_VERSION, r.data.apiVersion); 
            
            ___prj.log.info('로그인 API 멤버 호출결과', r.data.accessToken, r.data.refreshToken);
            g_logedIn.set(true);    // 전역 상태 관리
            location.href = ___const.START_PAGE;   // goto( ___const.START_PAGE);
            
        } else {
            ___prj.log.error('로그인 Fail', r.data);
            if (r.data.alert) {
                const { windowType } = r.data.alert;
                if (windowType === ___const.WINDOW_TYPE_CONFIRM) {
                    let c = apiConfirm(r.data.alert);
                    if (c) {
                        apiPara.curDeviceLogin = true;
                        ___prj.log.dev('로그인 API(경고 confirm) - 현재기기 로그인', apiPath,apiPara);

                        const r = await loginApi.post(apiPath, apiPara);
                        ___prj.log.dev('로그인 API 호출결과(1)', r.data);

                        if (r.data.result === ___const.OK) {
                            ___prj.storage.setItem(___const.A_TOKEN, r.data.accessToken);
                            ___prj.storage.setItem(___const.R_TOKEN, r.data.refreshToken);
                            ___prj.storage.setItem(___const.A_COUNT, 1);  // For debug
                            ___prj.storage.setItem(___const.PACKAGE, r.data.package);  // For debug

                            ___prj.log.info('로그인 AccessToken, RefreshToken', r.data.accessToken, r.data.refreshToken);
                            location.href = '/';
                        }
                    } else {
                        //취소
                    }
                } else {
                    apiAlert(r.data.alert);
                }
            } else if (r.data.error) {
                if (r.data.error.message) {
                    alert(r.data.error.message);
                }
            } else {
                ___prj.log.info('로그인 : 알수 없는 에러');
            }
        }
    } catch (e) {
        ___prj.log.error(e);
        //console.log('로그인 API Error(1) :',e);
    }
}

async function checkLogedIn() {
    try {
        ___prj.log.info('checkLogedIn Start');
        const accessToken = ___prj.storage.getItem(___const.A_TOKEN);
        const refreshToken = ___prj.storage.getItem(___const.R_TOKEN);
        //console.log('checkLogedIn accessToken', accessToken, accessToken ? '있음' : '없음', accessToken?.length);
        if (!accessToken) {
            return false;
        }

        const loginUserInfo = ___jwt.decodeJwt(accessToken);
        // ___prj.log.info('loginUserInfo', loginUserInfo);
        if (!loginUserInfo) return false;

        //for debug
        const { exp, iat } = loginUserInfo; // 토큰의 만료 시간 (Unix timestamp 형식) , 토큰 발급시간
        const currentTimestamp = Math.floor(Date.now() / 1000); // 현재 시간의 Unix timestamp
        const elapsedSeconds = currentTimestamp - iat; // 현재 시간과 토큰 발급 시간의 경과 시간 (초 단위)
        const elapsedMinutes = Math.floor(elapsedSeconds / 60); // 경과 시간을 분 단위로 변환
        ___prj.log.info('마지막 로그인',
            ___jwt.jwtTime(iat), ',',
            ___elapsedTime(Math.floor((exp - iat) / 60), ' 설정'), ',',
            ___elapsedTime(elapsedMinutes, ' 지남')
        );
        ___prj.log.info('로그인 유효기간', ___jwt.jwtTime(exp));

        let tokenExpired = ___jwt.tokenExpired(accessToken);
        if (accessToken && tokenExpired) {
            if (refreshToken) {
                tokenExpired = ___jwt.tokenExpired(refreshToken);
                if (tokenExpired) {
                    ___prj.log.info("로그인 유지시간이 만료되었습니다.(1) - 갱신처리 필요", location.pathname);
                    //alert('로그인 유지시간이 만료되었습니다.(1)');
                    // signOut();
                    ___prj.storage.clear();
                    ___prj.log.info('prjMain logout(1) - localStorage.clear() ');
                    return false;
                } else {
                    ___prj.log.info("AccessToken 재발행 필요");
                }
            } else {
                ___prj.log.info("로그인 유지시간이 만료되었습니다.(2) - 로그아웃 처리", location.pathname);
                //alert('로그인 유지시간이 만료되었습니다.(2) 다시 로그인 해주세요.');
                // signOut();
                ___prj.storage.clear();
                ___prj.log.info('prjMain logout(2) - localStorage.clear() ');
                return false;
            }
        }

        // 로그인 상태 유지
        ___prj.log.info('checkLogedIn End');
        return true;
    } catch (error) {
        // console.error("Error occurred while checking login expiration:", error);
        // return false;
        if (error.code === "ERR_JWT_EXPIRED") {
            // refreshToken이 만료된 경우
            // 클라이언트에게 유효하지 않은 토큰 오류 응답을 전송하거나, 적절한 처리를 수행
            ___prj.log.info('ERR_JWT_EXPIRED');
            return true;
        }
        // 그 외의 오류 처리
        return false;
    }

}

async function signOut() {
    ___prj.log.info('___prj.logout');
    const accessToken = ___prj.storage.getItem(___const.A_TOKEN);
    let logoutWorkDone = false;
    try {
        if (accessToken) {
            const logoutApi = axios.create({ baseURL: ___prj.apiUrl });   //별도의 axios 객체를 생성하여 baseURL을 지정함
            const apiPath = '/v1/logout';
            const apiPara = {
                accessToken: accessToken,
            };
            
            const r = await logoutApi.post(apiPath, apiPara);
            ___prj.log.dev('로그아웃', r.data);

            if (r.data.result === ___const.OK) {
                //console.log('로그아웃 성공(쿠키)',document.cookie);
                ___prj.storage.clear();
                ___prj.storage.deleteAllCookies();
                logoutWorkDone = true;
                if (r.data.alert) {
                    ___prj.log.info('r.data.alert',r.data.alert);
                    apiAlert(r.data.alert); 
                }
            } else {
                ___prj.log.info('로그아웃 Fail', r.data);
                if (r.data.alert) {
                    apiAlert(r.data.alert); 
                } else if (r.data.error) {
                    ___prj.log.info('로그인 API Error(2)', r.data);
                } else {
                    ___prj.log.info('로그인 : 알수 없는 에러');
                }
            }
        } else {
            ___prj.log.info('로그아웃 : accessToken이 없음');
            logoutWorkDone = true;
        }
    } catch (e) {
        ___prj.log.info('An error occurred while logout :', e);
    } finally {
        if (logoutWorkDone) {
            alert('logoutWorkDone');
            ___prj.storage.clear();
            ___prj.log.info('prjMain logout() - localStorage.clear() ');
            alert('로그아웃 완료');
            window.location.href = '/'; // 로그아웃 후 홈으로 이동 (goto 로 하지 않음 : 초기 접속처럼 처리)
        }
    }
}

export { signIn, checkLogedIn, signOut };
