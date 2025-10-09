# 🔧 CAPTCHA 오류 해결 가이드

## 현재 오류: "CAPTCHA 검증 중 오류가 발생했습니다"

이 메시지는 `onCaptchaError()` 콜백이 호출될 때 표시됩니다.

---

## 📋 원인별 해결 방법

### 1️⃣ 도메인 불일치 (가장 흔한 원인)

#### 증상
```
ERROR for site owner: Invalid domain for site key
```

#### 원인
- Site Key에 현재 도메인이 등록되지 않음
- `localhost` 또는 `127.0.0.1` 미등록

#### 해결 방법

**Step 1: Google reCAPTCHA 관리 콘솔 접속**
```
https://www.google.com/recaptcha/admin
```

**Step 2: 해당 Site Key 찾기**
```
Site Key: 6Lcp1eMrAAAAAAvkwp1WOuD8thGufKCdQ2Asb5bu
```

**Step 3: 설정(⚙️) 클릭**

**Step 4: 도메인 섹션에서 추가**
```
┌─────────────────────────────────────┐
│ 도메인                               │
│ ┌─────────────────────────────────┐ │
│ │ localhost          [추가]       │ │ ← 이것 추가
│ │ 127.0.0.1          [추가]       │ │ ← 이것도 추가
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Step 5: 저장**

**Step 6: 브라우저 새로고침 (Ctrl+F5 또는 Cmd+Shift+R)**

---

### 2️⃣ Site Key 오류

#### 증상
```
ERROR for site owner: Invalid site key
```

#### 원인
- Site Key가 잘못 입력됨
- 복사 시 공백이나 특수문자 포함

#### 해결 방법

**현재 설정 확인:**
```javascript
// src/lib/config/recaptcha.js
export const RECAPTCHA_SITE_KEY = '6Lcp1eMrAAAAAAvkwp1WOuD8thGufKCdQ2Asb5bu';
```

**확인 사항:**
- [ ] 키 앞뒤에 공백 없음
- [ ] 따옴표 안에 정확히 입력됨
- [ ] 대소문자 정확히 일치
- [ ] 특수문자 누락 없음

**재확인 방법:**
1. Google reCAPTCHA 관리 콘솔에서 Site Key 재복사
2. 메모장에 붙여넣기
3. 앞뒤 공백 제거
4. 다시 코드에 붙여넣기

---

### 3️⃣ 네트워크 문제

#### 증상
```
Failed to load resource: net::ERR_BLOCKED_BY_CLIENT
Failed to load resource: net::ERR_CONNECTION_REFUSED
```

#### 원인
- 광고 차단기가 reCAPTCHA 차단
- 방화벽 설정
- 프록시 문제
- 네트워크 불안정

#### 해결 방법

**Step 1: 광고 차단기 비활성화**
- uBlock Origin
- AdBlock Plus
- Privacy Badger
등을 임시로 비활성화

**Step 2: 시크릿 모드에서 테스트**
```
Chrome: Ctrl+Shift+N (Windows) / Cmd+Shift+N (Mac)
Firefox: Ctrl+Shift+P (Windows) / Cmd+Shift+P (Mac)
```

**Step 3: 다른 브라우저에서 테스트**
- Chrome
- Firefox
- Edge
- Safari

**Step 4: 네트워크 확인**
```bash
# 터미널에서 실행
ping www.google.com
ping www.gstatic.com
```

---

### 4️⃣ CORS 문제

#### 증상
```
Access to XMLHttpRequest has been blocked by CORS policy
```

#### 원인
- localhost 포트 불일치
- 프로토콜 불일치 (http vs https)

#### 해결 방법

**현재 접속 URL 확인:**
```
✅ http://localhost:5173
✅ http://127.0.0.1:5173
❌ http://localhost:3000 (다른 포트)
```

**도메인 등록 시:**
```
localhost          ← 모든 포트에서 작동
127.0.0.1          ← 모든 포트에서 작동
```

---

### 5️⃣ 스크립트 로딩 실패

#### 증상
```
Uncaught ReferenceError: grecaptcha is not defined
```

#### 원인
- reCAPTCHA 스크립트가 로드되기 전에 실행
- 네트워크 타임아웃

#### 해결 방법

**현재 구현 확인:**
```javascript
// SignIn.svelte의 onMount
const script = document.createElement('script');
script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit';
script.async = true;
script.defer = true;
document.head.appendChild(script);

window.onRecaptchaLoad = () => {
    if (showCaptcha) {
        initRecaptcha();
    }
};
```

**개선된 버전 (에러 핸들링 추가):**
```javascript
const script = document.createElement('script');
script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit';
script.async = true;
script.defer = true;

// 로드 성공
script.onload = () => {
    console.log('✅ reCAPTCHA 스크립트 로드 완료');
};

// 로드 실패
script.onerror = () => {
    console.error('❌ reCAPTCHA 스크립트 로드 실패');
    errorMessage = 'CAPTCHA를 로드할 수 없습니다. 네트워크를 확인해주세요.';
};

document.head.appendChild(script);
```

---

## 🔍 디버깅 방법

### 1. 브라우저 콘솔 확인

**개발자 도구 열기:**
- Windows/Linux: `F12` 또는 `Ctrl+Shift+I`
- Mac: `Cmd+Option+I`

**콘솔 탭에서 확인할 내용:**
```javascript
// reCAPTCHA 객체 확인
console.log('grecaptcha:', window.grecaptcha);

// Site Key 확인
console.log('RECAPTCHA_SITE_KEY:', RECAPTCHA_SITE_KEY);

// 현재 도메인 확인
console.log('현재 도메인:', window.location.hostname);
console.log('현재 URL:', window.location.href);
```

### 2. 네트워크 탭 확인

**Network 탭에서 확인:**
1. `recaptcha` 검색
2. 빨간색 요청이 있는지 확인
3. 실패한 요청 클릭
4. Response 탭에서 오류 메시지 확인

### 3. 상세 로그 추가

**SignIn.svelte에 디버깅 코드 추가:**
```javascript
function initRecaptcha() {
    console.log('🔧 initRecaptcha 호출됨');
    console.log('📍 현재 도메인:', window.location.hostname);
    console.log('🔑 Site Key:', RECAPTCHA_SITE_KEY);
    
    if (typeof window !== 'undefined' && window.grecaptcha) {
        console.log('✅ grecaptcha 객체 존재');
        try {
            captchaWidgetId = window.grecaptcha.render('recaptcha-container', {
                'sitekey': RECAPTCHA_SITE_KEY,
                'theme': RECAPTCHA_CONFIG.THEME,
                'size': RECAPTCHA_CONFIG.SIZE,
                'callback': onCaptchaSuccess,
                'expired-callback': onCaptchaExpired,
                'error-callback': onCaptchaError
            });
            console.log('✅ CAPTCHA 렌더링 완료, Widget ID:', captchaWidgetId);
        } catch (error) {
            console.error('❌ reCAPTCHA 초기화 실패:', error);
        }
    } else {
        console.error('❌ grecaptcha 객체가 없음');
    }
}

function onCaptchaError() {
    console.error('❌ CAPTCHA 에러 발생');
    console.log('현재 도메인:', window.location.hostname);
    console.log('Site Key:', RECAPTCHA_SITE_KEY);
    captchaToken = '';
    errorMessage = 'CAPTCHA 검증 중 오류가 발생했습니다.';
}
```

---

## ✅ 체크리스트

### 즉시 확인할 사항

- [ ] **Google reCAPTCHA 관리 콘솔에서 도메인 확인**
  - `localhost` 등록 여부
  - `127.0.0.1` 등록 여부

- [ ] **Site Key 정확성**
  - 복사 시 공백 없음
  - 대소문자 정확히 일치

- [ ] **브라우저 콘솔 오류 확인**
  - F12 → Console 탭
  - 빨간색 오류 메시지 확인

- [ ] **네트워크 탭 확인**
  - F12 → Network 탭
  - recaptcha 요청 상태 확인

- [ ] **광고 차단기 비활성화**
  - uBlock Origin
  - AdBlock Plus
  - 기타 확장 프로그램

- [ ] **시크릿 모드 테스트**
  - 확장 프로그램 없이 테스트

---

## 🚀 빠른 해결 방법

### 방법 1: 테스트 키로 확인

**임시로 테스트 키 사용:**
```javascript
// src/lib/config/recaptcha.js
export const RECAPTCHA_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // 테스트 키
```

**테스트 키 특징:**
- 모든 도메인에서 작동
- 항상 성공 반환
- 실제 검증은 하지 않음

**결과:**
- ✅ 작동함 → 원래 키의 도메인 설정 문제
- ❌ 여전히 오류 → 다른 원인 (네트워크, 브라우저 등)

### 방법 2: 새 Site Key 발급

1. https://www.google.com/recaptcha/admin
2. "새 사이트 등록"
3. 도메인에 `localhost` 명시적으로 추가
4. 새 Site Key 복사
5. 코드에 적용

---

## 📞 추가 지원

여전히 문제가 해결되지 않으면:

1. **브라우저 콘솔의 정확한 오류 메시지 확인**
2. **Network 탭의 실패한 요청 상세 정보 확인**
3. **Google reCAPTCHA 관리 콘솔의 설정 스크린샷 확인**

이 정보들을 가지고 더 정확한 진단이 가능합니다.

