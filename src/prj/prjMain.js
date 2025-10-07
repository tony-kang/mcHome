import { dev, browser } from '$app/environment';
import ___const from './lib/i_const.js';
import ___localStorage from './lib/i_localStorage.js';
import ___encDec from './lib/i_encDec.js';
import ___api from './lib/i_axios.js';
import ___log from './lib/i_log.js';
import { checkLogedIn } from './prjLogin.js';
import { g_logedIn } from './prjStore.js';
import { prjDomains } from './prjDomain.js';

import { getTokenUser, base64Decode } from '$prj/lib/i_util';
import { ___some } from '$prj/lib/i_telepasi.js';
// import prjEnv from '@prjEnv';

function isMobileDevice() {
    const userAgent = navigator.userAgent;
    const mobileKeywords = [
      'Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone'
    ];
  
    return mobileKeywords.some(keyword => userAgent.includes(keyword));
}

const ___prj = {
    //----------------------------------------------------------
    // 프로젝트 정보
    //----------------------------------------------------------
    name: 'CODE',
    framework: 'SvelteKit 5.0.1',
    version: '0.0.8',
    author: 'bluein007',
    authorEmail: 'bluein007@gmail.com',

    //----------------------------------------------------------
    // 프로젝트 환경
    //----------------------------------------------------------
    dev: dev,
    isAdmin: false,
    isMaster: false,
    isMaintenance: false,
    isDeveloper: false,
    //----------------------------------------------------------
    log: ___log,
    api: ___api,
    storage: ___localStorage,
    storageServer: null,   // 이미지, 파일 저장소
    storageId: null,     // 이미지, 파일 저장소 사용자
    storageFolder: null, // 이미지, 파일 저장소 폴더
    //----------------------------------------------------------
    // 프로젝트 초기화
    //----------------------------------------------------------
    apiUrl: '',
    protocol: '',
    domain: '',
    landingDomain: '',
    timeZone: '',
    user: null,
    window: {},
    isLogedIn: false,
    isMobile: false,
    isMobileDevice: false,
    async init() {
        if (!browser) return;

        ___log.info(___prj.name + ' , version : ' + ___prj.version + ' Start');
        if (process.env.NODE_ENV === 'production') {
            //___log.disable();
        }
        this.window = {
            domain: window.location.hostname,
            hostname: window.location.hostname,
            host: window.location.host,
            query: window.location.search,
            port: window.location.port,
            path: window.location.pathname,
            protocol: window.location.protocol,
            origin: window.location.origin,
        };

        this.isMobile = window.innerWidth < 768;
        this.isMobileDevice = isMobileDevice();
        this.landingDomain = this.window.host;
        this.protocol = this.window.protocol;
        let connectedDomain = this.window.host;     ___log.dev('window',this.window);
        if (connectedDomain?.startsWith('localhost')) connectedDomain = 'localhost';
        if (connectedDomain === undefined) {
            throw new Error('알려지지 않은 도메인의 접근은 허용되지 않습니다.');
        }

        this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Seoul';
        this.domain = prjDomains.find(c => c.domain === connectedDomain);
        //___log.dev('DomainInfo',this.domain);
        this.apiUrl = this.domain.apiUrl;
        this.storageServer = this.domain.storageServer;
        this.storageId = this.domain.storageId;
        this.storageFolder = this.domain.storageFolder;
        this.storageInfo = ___encDec.reqEncode(JSON.stringify({
            server: this.storageServer, // 이미지, 파일 저장소 서버 도메인
            id: this.storageId,          // 이미지, 파일 저장소 ID
            folder: this.storageFolder,  // 이미지, 파일 저장소 폴더
        }));
        this.api.init(this.apiUrl);

        this.isLogedIn = await checkLogedIn();
        g_logedIn.set(this.isLogedIn);    // 전역 상태 관리
        ___log.dev('isLogedIn',this.isLogedIn);

        this.user = getTokenUser();
        if (this.user) {
            this.user.loginUserName = base64Decode(this.user.userName);
            this.user.pLevel ??= '';
            this.isMaster = ___some(this.user.pLevel, [___const.P_MASTER]);
            this.isDeveloper = ___some(this.user.pLevel, [___const.P_DEVELOPER]);
            this.isAdmin = this.isMaster || this.isDeveloper || ___some(this.user.pLevel, [___const.P_ADMIN]);
        } else {
            this.user = {
                id: 0,
                name: '비회원',
                email: null,
                phone: null,
                ip: null,
            }
        }
        ___log.dev('Login user',this.user);
    },
};

export default ___prj;