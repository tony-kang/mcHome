import { goto } from '$app/navigation';
import axios from 'axios';
import ___log from './i_log';
import ___const from './i_const';
import ___localStorage from './i_localStorage';
import ___encDec from './i_encDec';
import { apiAlert, apiConfirm } from './i_alert';
import { ___objQuery } from './i_telepasi';
import { signOut } from '../prjLogin';

const i_axios = {
    window: {},
    apiUrl: '',
    api: null,

    /**
     * 전송파라미터를 제어부분과 데이터 부분으로 구분하여 전송한다.
     * @param {*} ctrl  : api 제어부분으로 주로 쿼리제 등의 정보를 포함한다.
     * @param {*} data : api 호출시 전달할 데이터
     * @returns 
     */
    reqBody(apiCmd, reqPara, reqData = null) {
        return {
            ctrl: {
                // cmd: ___encDec.reqEncode(apiCmd),
                // cmdEncoded: true,
                cmd: apiCmd,
                cmdEncoded: false,
            },
            reqPara: { ...reqPara },
            reqData: { ...reqData }
        };
    },
    
    async postForm(qObj, formData) {
        let apiUrl = this.apiUrl;
        apiUrl += ___objQuery(qObj);

        try {
            // ___log.dev('apiUrl formData', apiUrl, formData);
            const r = await this.api.post(apiUrl, formData);
            ___log.dev('postForm R:', r);
            return r;
        } catch (error) {
            ___log.dbError(error);
            throw new Error('API 호출 중 에러가 발생했습니다.');
        }
    },

    async post(qObj, cmd, para, data) {
        //___log.dev('API post', qObj, cmd, para, data);

        let apiUrl = this.apiUrl;
        apiUrl += ___objQuery(qObj);

        const rBody = this.reqBody(cmd ,para ,data);
        //___log.dbApi(apiUrl);
        const r = await this.api.post(apiUrl, rBody);
        //___log.dev('postData R:', r);
        return r;
    },

    /**
     * 특정 정보를 읽어온다.
     * paging 등을 하려면 qObj를 이용해서 파라미터를 만든다.
     * @param qObj
     * @returns {Promise<*>}
     */
    async get(qObj, cmd, para, data) {
        //___log.dev('API get', qObj, cmd, para, data);

        let apiUrl = this.apiUrl;
        apiUrl += ___objQuery(qObj);

        const rBody = this.reqBody(cmd, para, data);
        //___log.dev('apiUrl get', apiUrl, rBody);
        const r = await this.api.get(apiUrl, rBody);
        //___log.dev('postData R:', r);
        return r
    },

    getAccessToken() {
        return ___localStorage.getItem(___const.A_TOKEN);
    },
    setAccessToken(token) {
        document.cookie = `${___const.A_TOKEN}=${token}; path=/`;
        ___localStorage.setItem(___const.A_TOKEN, token);
    },
    setRefreshToken(token) {
        document.cookie = `${___const.R_TOKEN}=${token}; path=/`;
        ___localStorage.setItem(___const.R_TOKEN, token);
    },

    /**
     * AccessToken 재발행
     * @param {*} refreshToken 
     */
    async makeNewAccessToken(refreshToken) {
        const refreshApi = axios.create({ baseURL: this.apiUrl });   //별도의 axios 객체를 생성하여 baseURL을 지정함
        const r = await refreshApi.post('/s/refreshToken', null, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            });

        if (r.data.result === ___const.OK) {
            const newAccessToken = r.data.content.accessToken;
            this.setAccessToken(newAccessToken);

            const aCount = parseInt(___localStorage.getItem(___const.A_COUNT), 10);     // For debug
            ___localStorage.setItem(___const.A_COUNT, aCount + 1);                      // For debug
            //___log.dbInfo('refreshToken 으로 생성된 newAccessToken ', newAccessToken);
        }

        return r;
    },
    
    async init(apiUrl) {
        this.apiUrl = apiUrl;
        this.api = axios.create({
            baseURL: this.apiUrl,
            //withCredentials: true, // credentials 옵션 추가
        });

        // ------------------------------------------------------------------------------------------------
        // API 요청 전에 인터셉터를 등록하여 access token 갱신
        // 불필요한 오버헤드를 없애기 위해 요청전에는 Token만료를 체크하지 않는다.
        // ------------------------------------------------------------------------------------------------
        const noTokenApi = [ '/s/blog' ];
        const noTokenApiCmd = [ 'signup.partner' ];
        this.api.interceptors.request.use(
            (config) => {
                const accessToken = ___localStorage.getItem(___const.A_TOKEN);
                if (accessToken) {
                    //토큰이 있으면 헤더에 넣어준다.
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                    //console.log('interceptors.request : Authorization 토큰 추가 ');
                } else if (noTokenApi.some(path => config.url.endsWith(path))) {
                    //console.log(`No Token`);
                } else if (noTokenApiCmd.some(cmd => config.data.ctrl.cmd)) {
                    //console.log(`No Token`);
                } else {
                    console.log('interceptors.request : Access token이 없습니다. config.data.ctrl = ', config.data.ctrl);
                    alert('다시 로그인 해주세요.');
                    window.location.href = '/';
                    return Promise.reject(new Error('Access token이 없습니다.'));
                }

                return config;
            },
            (error) => {
                /**
                 * Case 1. 요청 전처리 과정에서 오류가 발생한 경우
                 * Case 2. 네트워크 오류: 서버에 도달하기 전에 에러가 나는 경우
                 * Case 3. Interceptor chain에서 다른 interceptor에서 에러가 발생한 경우
                 */
                console.log('interceptors.request : error ',error);
                return Promise.reject(error);
            }
        );

        // ------------------------------------------------------------------------------------------------
        // 응답 인터셉터
        // ------------------------------------------------------------------------------------------------
        this.api.interceptors.response.use(
            (response) => {
                /**
                 * Case 1. 응답 성공 (status code: 2xx)
                 */
                const alert = response.data.alert;
                if (alert && alert.windowType === ___const.WINDOW_TYPE_ALERT) {
                    if (response.data.result === ___const.FAIL) {
                        console.log('response.data.alert : ',response.data.alert);
                        if (response.data.alert?.windowControl === 'close') {
                            window.close();
                        } else if (response.data.alert?.windowControl === 'goto') {
                            if (response.data.alert?.gotoUrl) {
                                goto(response.data.alert.gotoUrl);
                            }
                        }
                    }
                    apiAlert(response.data.alert);
                }
                return response;
            },
            async (error) => {
                const originalRequest = error.config;
                const rememberMe = true;

                // 401 Unauthorized 에러 처리
                if (error.response?.status === 401) {
                    // 이미 재시도했던 요청인 경우 더 이상 시도하지 않고 에러만 반환
                    if (originalRequest._retry) {
                        return Promise.reject(error);
                    }

                    // RememberMe가 활성화된 경우에만 refreshToken으로 재시도
                    if (rememberMe) {
                        const refreshToken = ___localStorage.getItem(___const.R_TOKEN);
                        if (refreshToken) {
                            try {
                                originalRequest._retry = true;

                                // refreshToken으로 새 accessToken 발급 시도
                                const r = await this.makeNewAccessToken(refreshToken);
                                if (r.data.result === ___const.OK) {
                                    // 새로운 accessToken으로 원래 요청 재시도
                                    const newAccessToken = r.data.content.accessToken;
                                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                                    return this.api(originalRequest);
                                }
                            } catch (refreshError) {
                                ___log.error('Token 갱신 실패:', refreshError);
                            }
                        }
                    }

                    // 여기서 로그아웃 처리 (모든 재시도가 실패한 경우)
                    console.log('모든 재시도 실패 : 로그아웃 처리 : originalRequest',originalRequest);
                    alert('로그인 유지시간이 만료되었습니다. 다시 로그인 해주세요.');
                    // await signOut();
                    ___localStorage.clear();
                    ___log.info('prjMain logout(4) - localStorage.clear() ');
                    window.location.href = '/';
                    return Promise.reject(error);
                }

                // 다른 에러 처리
                if (error?.response?.status) {
                    switch (error.response.status) {
                        case 400:   // Bad Request
                        case 403:   // Forbidden
                        case 404:   // Not Found
                        case 500:   // Internal Server Error
                            // ___log.dbError(error.response.data);
                            // ___error.message = error.response.data;
                            // goto('/error/500');
                            // break;
                        case 404:   // Not Found : 토큰 처리는 필요하지 않음
                            // ___log.dbError(error.response.data);
                            // ___error.message = error.response.data;
                            // goto('/error/404');
                            // break;
                        case 400:   // Bad Request : 토큰 처리는 필요하지 않음
                        case 403:   // Forbidden : 토큰 처리는 필요하지 않음
                        case 503:   // Service Unavailable : 토큰 처리는 필요하지 않음
                            const errAlert = error.response.data.alert;
                            if (errAlert && errAlert.windowType === ___const.WINDOW_TYPE_ALERT) {
                                apiAlert(error.response.data.alert);
                            }
                            break;
                    }
                }

                return Promise.reject(error);
            }
        );
    }
};

export default i_axios;
