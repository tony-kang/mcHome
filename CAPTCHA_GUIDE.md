# CAPTCHA 인증 가이드

## 📋 개요

SignIn.svelte에 Google reCAPTCHA v2를 사용한 보안 인증 시스템이 구현되어 있습니다.

## 🔐 주요 기능

### 1. **스마트 CAPTCHA 활성화**
- 로그인 실패 3회 이상 시 자동으로 CAPTCHA 표시
- 로컬 스토리지를 통한 시도 횟수 추적
- 로그인 성공 시 시도 횟수 자동 초기화

### 2. **보안 기능**
- 무차별 대입 공격(Brute Force Attack) 방지
- 봇 자동화 로그인 차단
- 사용자 친화적인 점진적 보안 강화

### 3. **사용자 경험**
- 처음 2회까지는 CAPTCHA 없이 로그인 가능
- 3회 실패 시에만 CAPTCHA 요구
- 실패 횟수 표시 (예: "1/3", "2/3")

## 🚀 구현 상세

### **상태 관리**

```javascript
let captchaToken = $state('');        // CAPTCHA 토큰
let captchaWidgetId = $state(null);   // CAPTCHA 위젯 ID
let showCaptcha = $state(false);      // CAPTCHA 표시 여부
let loginAttempts = $state(0);        // 로그인 시도 횟수
```

### **CAPTCHA 초기화**

```javascript
function initRecaptcha() {
    captchaWidgetId = window.grecaptcha.render('recaptcha-container', {
        'sitekey': '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
        'callback': onCaptchaSuccess,
        'expired-callback': onCaptchaExpired,
        'error-callback': onCaptchaError
    });
}
```

### **로그인 검증 로직**

```javascript
async function doLogin(event) {
    // 1. 기본 검증
    if (!username || !password) {
        errorMessage = '아이디와 비밀번호를 입력해주세요.';
        return;
    }

    // 2. CAPTCHA 검증 (3회 이상 실패 시)
    if (showCaptcha && !captchaToken) {
        errorMessage = 'CAPTCHA 인증을 완료해주세요.';
        return;
    }

    // 3. 로그인 시도
    try {
        const result = await signIn(username, password, keepLoggedIn, userType);
        
        // 성공 시 시도 횟수 초기화
        if (result) {
            localStorage.setItem('loginAttempts', '0');
        }
    } catch (error) {
        // 실패 시 시도 횟수 증가
        loginAttempts++;
        localStorage.setItem('loginAttempts', loginAttempts.toString());
        
        // 3회 이상 실패 시 CAPTCHA 표시
        if (loginAttempts >= 3 && !showCaptcha) {
            showCaptcha = true;
            initRecaptcha();
        }
    }
}
```

## 🔧 설정 방법

### **1. Google reCAPTCHA 키 발급**

1. [Google reCAPTCHA](https://www.google.com/recaptcha/admin) 접속
2. 새 사이트 등록
3. reCAPTCHA v2 선택 (체크박스 유형)
4. 도메인 추가
5. Site Key와 Secret Key 발급

### **2. Site Key 교체**

현재 테스트용 키가 설정되어 있습니다:

```javascript
'sitekey': '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' // 테스트용
```

**실제 운영 시 반드시 교체해야 합니다:**

```javascript
'sitekey': 'YOUR_ACTUAL_SITE_KEY' // 실제 발급받은 키
```

### **3. 서버 측 검증 (중요!)**

클라이언트에서 받은 `captchaToken`을 서버에서 검증해야 합니다:

```javascript
// 서버 측 검증 예시 (Node.js)
const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=YOUR_SECRET_KEY&response=${captchaToken}`
});

const data = await response.json();
if (!data.success) {
    throw new Error('CAPTCHA 검증 실패');
}
```

## 📱 반응형 디자인

### **PC 화면**
- CAPTCHA 원본 크기 표시 (scale: 1)
- 중앙 정렬

### **태블릿 (768px 이하)**
- 약간 축소 (scale: 0.95)
- 패딩 조정

### **모바일 (480px 이하)**
- 더 축소 (scale: 0.85)
- 작은 폰트 크기
- 최소 패딩

## 🎨 UI 구성

```svelte
{#if showCaptcha}
    <div class="captcha-container">
        <div class="captcha-info">
            <svg><!-- 정보 아이콘 --></svg>
            <span>보안을 위해 CAPTCHA 인증이 필요합니다.</span>
        </div>
        <div id="recaptcha-container" class="recaptcha-wrapper"></div>
    </div>
{/if}
```

## ⚠️ 주의사항

### **1. 테스트 키 사용 금지**
- 현재 코드의 테스트 키는 개발/테스트 용도만 사용
- 실제 운영 환경에서는 반드시 실제 키로 교체

### **2. 서버 검증 필수**
- 클라이언트 검증만으로는 보안이 불충분
- 서버에서 반드시 `captchaToken` 검증 필요

### **3. 로컬 스토리지 제한**
- 로컬 스토리지는 브라우저별로 독립적
- 시크릿 모드에서는 초기화됨
- 서버 측 IP 기반 추적 병행 권장

### **4. 접근성 고려**
- CAPTCHA는 일부 사용자에게 접근성 문제 발생 가능
- 오디오 CAPTCHA 옵션 제공 (reCAPTCHA 기본 제공)

## 🔄 동작 흐름

```
1. 페이지 로드
   ↓
2. 로컬 스토리지에서 시도 횟수 확인
   ↓
3. 로그인 시도
   ↓
4. 실패 시 시도 횟수 증가
   ↓
5. 3회 이상 실패?
   ├─ Yes → CAPTCHA 표시
   └─ No  → 일반 로그인 계속
   ↓
6. CAPTCHA 인증 완료
   ↓
7. 로그인 성공 시 시도 횟수 초기화
```

## 📊 에러 메시지

| 상황 | 메시지 |
|------|--------|
| 1-2회 실패 | "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요. (1/3)" |
| 3회 이상 실패 | "로그인 시도가 3회 이상 실패했습니다. CAPTCHA 인증을 완료해주세요." |
| CAPTCHA 미완료 | "CAPTCHA 인증을 완료해주세요." |
| CAPTCHA 만료 | "CAPTCHA가 만료되었습니다. 다시 확인해주세요." |
| CAPTCHA 오류 | "CAPTCHA 검증 중 오류가 발생했습니다." |

## 🛠️ 커스터마이징

### **시도 횟수 변경**

```javascript
// 3회 → 5회로 변경
if (loginAttempts >= 5 && !showCaptcha) {
    showCaptcha = true;
}
```

### **CAPTCHA 테마 변경**

```javascript
window.grecaptcha.render('recaptcha-container', {
    'sitekey': 'YOUR_SITE_KEY',
    'theme': 'dark', // 'light' 또는 'dark'
    'size': 'normal' // 'normal' 또는 'compact'
});
```

## 🧪 테스트 방법

### **1. 로컬 테스트**
```bash
# 개발 서버 실행
npm run dev

# 브라우저에서 접속
http://localhost:5173/s/signIn
```

### **2. CAPTCHA 테스트**
1. 의도적으로 로그인 3회 실패
2. CAPTCHA 표시 확인
3. CAPTCHA 완료 후 로그인 시도
4. 성공 시 시도 횟수 초기화 확인

### **3. 로컬 스토리지 확인**
```javascript
// 개발자 도구 콘솔에서
localStorage.getItem('loginAttempts')
```

## 📝 TODO

- [ ] 서버 측 CAPTCHA 검증 구현
- [ ] IP 기반 시도 횟수 추적 추가
- [ ] 실제 reCAPTCHA 키로 교체
- [ ] CAPTCHA 우회 시도 로깅
- [ ] 관리자 대시보드에 실패 로그 표시

## 🔗 참고 자료

- [Google reCAPTCHA 문서](https://developers.google.com/recaptcha/docs/display)
- [reCAPTCHA v2 가이드](https://developers.google.com/recaptcha/docs/v2)
- [보안 모범 사례](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

