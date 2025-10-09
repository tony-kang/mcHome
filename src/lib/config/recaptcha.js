/**
 * Google reCAPTCHA 설정
 * 
 * Site Key 발급 방법:
 * 1. https://www.google.com/recaptcha/admin 접속
 * 2. Google 계정으로 로그인
 * 3. "새 사이트 등록" 클릭
 * 4. 레이블 입력 (예: 마인드코딩 로그인)
 * 5. reCAPTCHA v2 선택 → "로봇이 아닙니다" 체크박스
 * 6. 도메인 추가:
 *    - 개발: localhost, 127.0.0.1
 *    - 운영: yourdomain.com, www.yourdomain.com
 * 7. 약관 동의 후 제출
 * 8. Site Key와 Secret Key 복사
 */

// 클라이언트 측 Site Key (공개 가능)
export const RECAPTCHA_SITE_KEY = import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY || 
    '6LfE2OMrAAAAAEA1MoMhmMnbFwm-P0g9k8Eis_vu'; // 강병우 구글 계정

// reCAPTCHA 설정
export const RECAPTCHA_CONFIG = {
    // 로그인 실패 몇 회부터 CAPTCHA 표시할지
    LOGIN_FAIL_THRESHOLD: 1,
    
    // CAPTCHA 테마
    THEME: 'light', // 'light' 또는 'dark'
    
    // CAPTCHA 크기
    SIZE: 'normal', // 'normal' 또는 'compact'
    
    // 언어 설정
    LANGUAGE: 'ko', // 한국어

    // 토큰 유효시간(ms). Google v2 기본 120초이므로 약간 보수적으로 60초로 재노출
    TOKEN_TTL_MS: 60000
};

/**
 * 테스트용 키 정보:
 * Site Key: 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
 * Secret Key: 6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
 * 
 * 주의: 테스트 키는 항상 성공을 반환합니다.
 *       실제 운영 환경에서는 반드시 실제 키로 교체하세요!
 */

/**
 * 실제 운영 환경 설정 예시:
 * 
 * 1. .env 파일 생성:
 *    PUBLIC_RECAPTCHA_SITE_KEY=your_actual_site_key_here
 * 
 * 2. 또는 이 파일에서 직접 교체:
 *    export const RECAPTCHA_SITE_KEY = 'your_actual_site_key_here';
 */

