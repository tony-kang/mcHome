import * as jose from 'jose';
import { telepasiTimeToDate } from './i_telepasi';
const secretKey = 'ilovetelepasibluein007';
const i_jwt = {
    decodeJwt(jwtToken,secretKey) {
        if (!jwtToken || jwtToken === "undefined") return null;
        //let jwtKey = secretKey ?? ___const.JWT;
        const jwt = jose.decodeJwt(jwtToken);    // Front에서는 서명검증없이 디코딩한다.(일반적인 방법)
        return jwt;
    },

    jwtTime(iatOrExp,tail = '') {
        return telepasiTimeToDate(iatOrExp*1000,tail);
    },

    tokenExpired(jwtToken) {
        const payLoad = this.decodeJwt(jwtToken);
        if (payLoad === null) return true;  // 토큰이 변조되었거나 만료된 토큰
        
        const { exp, iat } = payLoad; // 토큰의 만료 시간 (Unix timestamp 형식) , 토큰 발급시간

        const iatTime = new Date(iat * 1000); // iat를 밀리초로 변환
        const currentTime = new Date();
        const timeDifference = currentTime - iatTime; // 시간 차이 계산

        console.log('currentTime:', currentTime.toISOString());
        console.log('iatTime:', iatTime.toISOString());
        console.log('timeDifference:', timeDifference);

        if (timeDifference < 0) {
            console.warn(`토큰발생시간이 클라이언트 시간보다 ${timeDifference} ms 빠릅니다.`);
        }

        // console.log('exp:', exp); // 토큰 만료 시간(초 단위)
        // console.log('iat:', iat); // 토큰 발급 시간(초 단위)

        // exp와 iat는 초 단위이기 때문에 현재시간도 초단위로 변환하여 비교
        let currentTimestamp = Math.floor(Date.now() / 1000);
        if (timeDifference < 0) {
            console.log('시간 조정 전:', currentTimestamp.toISOString(), iat.toISOString());
            // 서버 시간이 클라이언트 시간보다 빠름
            currentTimestamp = currentTimestamp - Math.floor(timeDifference / 1000);
            console.log('시간 조정 후:', currentTimestamp.toISOString(), iat.toISOString());
        }

        const expiresInSec = exp - iat;
        const currentAgeSec = currentTimestamp - iat;   // 현재 시간과 토큰 발급 시간의 경과 시간 (초 단위)

        // console.log('currentTimestamp:', currentTimestamp);
        // console.log('expiresInSec:', expiresInSec);
        // console.log('currentAgeSec:', currentAgeSec);
        // console.log('토큰만료',(currentAgeSec < 0 || currentAgeSec > expiresInSec)); 

        // 현재 토큰의 나이가 토큰의 만료 시간을 초과했는지 확인
        // currentAgeSec < 0 : 토큰이 발급되기 전 => 변조된 토큰
        // currentAgeSec > expiresInSec : 만료된 토큰
        return (currentAgeSec < 0 || currentAgeSec > expiresInSec);
    },

    async createToken() {
        const secret = new TextEncoder().encode(secretKey); // 비밀 키
        const jwt = await new jose.SignJWT({ foo: 'bar' })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('2h')
            .sign(secret);

        return jwt; // 토큰 생성
    },
};

export default i_jwt;
