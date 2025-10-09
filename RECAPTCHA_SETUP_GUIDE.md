# 🔑 Google reCAPTCHA Site Key 발급 및 설정 가이드

## 📋 목차
1. [Site Key 발급 방법](#1-site-key-발급-방법)
2. [키 적용 방법](#2-키-적용-방법)
3. [서버 측 검증 설정](#3-서버-측-검증-설정)
4. [테스트 방법](#4-테스트-방법)
5. [문제 해결](#5-문제-해결)

---

## 1. Site Key 발급 방법

### Step 1: Google reCAPTCHA 관리 콘솔 접속

1. **웹브라우저에서 접속**
   ```
   https://www.google.com/recaptcha/admin
   ```

2. **Google 계정으로 로그인**
   - Gmail 계정 사용
   - 조직 계정도 가능

### Step 2: 새 사이트 등록

#### 2-1. 레이블 입력
```
┌─────────────────────────────────────────────┐
│ 레이블                                       │
│ ┌─────────────────────────────────────────┐ │
│ │ 마인드코딩 로그인                        │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```
- 프로젝트를 구분할 수 있는 이름 입력
- 예: "마인드코딩 로그인", "홈페이지 CAPTCHA" 등

#### 2-2. reCAPTCHA 유형 선택

```
┌─────────────────────────────────────────────┐
│ reCAPTCHA 유형                               │
│                                              │
│ ⦿ reCAPTCHA v2                              │
│   ⦿ "로봇이 아닙니다" 체크박스 ✅ (권장)     │
│   ○ Invisible reCAPTCHA 배지                │
│                                              │
│ ○ reCAPTCHA v3                              │
│ ○ reCAPTCHA Enterprise                      │
└─────────────────────────────────────────────┘
```

**✅ 선택: reCAPTCHA v2 → "로봇이 아닙니다" 체크박스**

이유:
- 현재 구현이 v2 체크박스 방식
- 사용자 친화적
- 안정적인 보안 수준

#### 2-3. 도메인 추가

```
┌─────────────────────────────────────────────┐
│ 도메인                                       │
│ ┌─────────────────────────────────────────┐ │
│ │ localhost                                │ │ ← 개발 환경
│ │ 127.0.0.1                                │ │ ← 로컬 테스트
│ │ mindcoding.co.kr                         │ │ ← 운영 도메인
│ │ www.mindcoding.co.kr                     │ │ ← www 포함
│ └─────────────────────────────────────────┘ │
│ [+ 도메인 추가]                              │
└─────────────────────────────────────────────┘
```

**중요 사항:**
- 각 도메인을 별도 줄에 입력
- 프로토콜(http://, https://)은 입력하지 않음
- 포트 번호도 입력하지 않음
- 서브도메인은 별도로 추가

**예시:**
```
✅ 올바른 입력:
   localhost
   mindcoding.co.kr
   www.mindcoding.co.kr

❌ 잘못된 입력:
   http://localhost
   localhost:5173
   https://mindcoding.co.kr
```

#### 2-4. 소유자 추가 (선택사항)

```
┌─────────────────────────────────────────────┐
│ 소유자                                       │
│ ┌─────────────────────────────────────────┐ │
│ │ teammate@gmail.com                       │ │
│ └─────────────────────────────────────────┘ │
│ [+ 소유자 추가]                              │
└─────────────────────────────────────────────┘
```
- 팀원의 Google 계정 추가 가능
- 여러 명 추가 가능

#### 2-5. 약관 동의

```
┌─────────────────────────────────────────────┐
│ ☑ reCAPTCHA 서비스 약관에 동의합니다         │
│ ☑ Google에 알림 보내기 (선택사항)            │
└─────────────────────────────────────────────┘

          [제출]
```

### Step 3: 키 확인 및 복사

제출 후 다음 화면이 표시됩니다:

```
╔═══════════════════════════════════════════════════════════════╗
║                    마인드코딩 로그인                           ║
╠═══════════════════════════════════════════════════════════════╣
║                                                                ║
║  📌 사이트 키 (Site Key)                                      ║
║  ┌──────────────────────────────────────────────────────────┐ ║
║  │ 6LdXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX │ ║
║  └──────────────────────────────────────────────────────────┘ ║
║  [📋 복사]                                                    ║
║                                                                ║
║  ℹ️ 이 키를 클라이언트 측 HTML 코드에 사용하세요.              ║
║                                                                ║
║ ─────────────────────────────────────────────────────────────  ║
║                                                                ║
║  🔒 비밀 키 (Secret Key)                                      ║
║  ┌──────────────────────────────────────────────────────────┐ ║
║  │ 6LdYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY │ ║
║  └──────────────────────────────────────────────────────────┘ ║
║  [📋 복사]                                                    ║
║                                                                ║
║  ⚠️ 이 키를 서버 측 코드에 사용하세요.                         ║
║     절대 공개하지 마세요!                                      ║
║                                                                ║
╚═══════════════════════════════════════════════════════════════╝
```

**두 개의 키를 각각 복사하여 안전한 곳에 보관하세요!**

---

## 2. 키 적용 방법

### 방법 1: 설정 파일 수정 (권장)

**파일 위치:** `src/lib/config/recaptcha.js`

```javascript
// 클라이언트 측 Site Key (공개 가능)
export const RECAPTCHA_SITE_KEY = 'YOUR_ACTUAL_SITE_KEY_HERE'; // ← 여기에 발급받은 Site Key 입력

// reCAPTCHA 설정
export const RECAPTCHA_CONFIG = {
    // 로그인 실패 몇 회부터 CAPTCHA 표시할지
    LOGIN_FAIL_THRESHOLD: 3, // ← 원하는 횟수로 변경 가능
    
    // CAPTCHA 테마
    THEME: 'light', // 'light' 또는 'dark'
    
    // CAPTCHA 크기
    SIZE: 'normal', // 'normal' 또는 'compact'
    
    // 언어 설정
    LANGUAGE: 'ko' // 한국어
};
```

**실제 적용 예시:**
```javascript
export const RECAPTCHA_SITE_KEY = '6LdRealKeyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
```

### 방법 2: 환경변수 사용 (더 안전)

#### 2-1. `.env` 파일 생성

프로젝트 루트에 `.env` 파일 생성:

```bash
# .env
PUBLIC_RECAPTCHA_SITE_KEY=6LdRealKeyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

#### 2-2. `.gitignore` 확인

`.env` 파일이 Git에 커밋되지 않도록 확인:

```bash
# .gitignore
.env
.env.local
.env.production
```

#### 2-3. 설정 파일 수정

`src/lib/config/recaptcha.js`:

```javascript
export const RECAPTCHA_SITE_KEY = import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY || 
    '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // 테스트용 키 (fallback)
```

---

## 3. 서버 측 검증 설정

### 3-1. Secret Key 보관

**절대 클라이언트 코드에 포함하지 마세요!**

서버 환경변수에 저장:

```bash
# 서버 .env
RECAPTCHA_SECRET_KEY=6LdYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
```

### 3-2. 서버 측 검증 API 구현

**Node.js/Express 예시:**

```javascript
// server/routes/auth.js
import fetch from 'node-fetch';

app.post('/api/verify-captcha', async (req, res) => {
    const { token } = req.body;
    
    try {
        const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
        });
        
        const data = await response.json();
        
        if (data.success) {
            res.json({ success: true, message: 'CAPTCHA 검증 성공' });
        } else {
            res.status(400).json({ 
                success: false, 
                message: 'CAPTCHA 검증 실패',
                errors: data['error-codes']
            });
        }
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: '서버 오류' 
        });
    }
});
```

### 3-3. 로그인 API에 CAPTCHA 검증 추가

```javascript
// server/routes/auth.js
app.post('/api/login', async (req, res) => {
    const { username, password, captchaToken } = req.body;
    
    // CAPTCHA 검증 (3회 이상 실패 시)
    if (captchaToken) {
        const captchaVerified = await verifyCaptcha(captchaToken);
        if (!captchaVerified) {
            return res.status(400).json({ 
                success: false, 
                message: 'CAPTCHA 검증 실패' 
            });
        }
    }
    
    // 로그인 로직 계속...
});
```

---

## 4. 테스트 방법

### 4-1. 로컬 테스트

1. **개발 서버 실행**
   ```bash
   npm run dev
   ```

2. **브라우저에서 접속**
   ```
   http://localhost:5173/s/signIn
   ```

3. **CAPTCHA 테스트**
   - 의도적으로 로그인 3회 실패
   - CAPTCHA 표시 확인
   - CAPTCHA 완료 후 로그인 시도

### 4-2. 개발자 도구 확인

**콘솔에서 확인:**
```javascript
// Site Key 확인
console.log('RECAPTCHA_SITE_KEY:', RECAPTCHA_SITE_KEY);

// 로그인 시도 횟수 확인
localStorage.getItem('loginAttempts')

// CAPTCHA 토큰 확인 (검증 후)
console.log('captchaToken:', captchaToken);
```

### 4-3. 테스트 키 동작 확인

**테스트 키 특징:**
- Site Key: `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`
- Secret Key: `6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe`
- **항상 성공을 반환**
- 실제 검증은 하지 않음
- 개발/테스트 용도로만 사용

---

## 5. 문제 해결

### 문제 1: "ERROR for site owner: Invalid site key"

**원인:**
- Site Key가 잘못 입력됨
- 도메인이 등록되지 않음

**해결:**
1. Site Key 재확인
2. Google reCAPTCHA 관리 콘솔에서 도메인 확인
3. `localhost` 추가 여부 확인

### 문제 2: CAPTCHA가 표시되지 않음

**원인:**
- 스크립트 로드 실패
- 네트워크 오류
- 브라우저 확장 프로그램 차단

**해결:**
1. 개발자 도구 콘솔 확인
2. 네트워크 탭에서 `recaptcha` 요청 확인
3. 광고 차단기 비활성화
4. 다른 브라우저에서 테스트

### 문제 3: "Uncaught ReferenceError: grecaptcha is not defined"

**원인:**
- reCAPTCHA 스크립트가 로드되기 전에 실행

**해결:**
```javascript
// 스크립트 로드 완료 대기
window.onRecaptchaLoad = () => {
    if (showCaptcha) {
        initRecaptcha();
    }
};
```

### 문제 4: 서버 검증 실패

**원인:**
- Secret Key 오류
- 토큰 만료 (2분)
- 네트워크 오류

**해결:**
1. Secret Key 재확인
2. 토큰 즉시 검증
3. 에러 코드 확인:
   ```javascript
   {
     "success": false,
     "error-codes": [
       "missing-input-secret",    // Secret Key 누락
       "invalid-input-secret",    // 잘못된 Secret Key
       "missing-input-response",  // 토큰 누락
       "invalid-input-response",  // 잘못된 토큰
       "timeout-or-duplicate"     // 만료 또는 중복
     ]
   }
   ```

### 문제 5: 프로덕션에서 작동하지 않음

**원인:**
- 도메인이 등록되지 않음
- 테스트 키 사용 중

**해결:**
1. Google reCAPTCHA 관리 콘솔에서 프로덕션 도메인 추가
2. 실제 발급받은 키로 교체 확인
3. 환경변수 설정 확인

---

## 📚 추가 리소스

- [Google reCAPTCHA 공식 문서](https://developers.google.com/recaptcha/docs/display)
- [reCAPTCHA v2 가이드](https://developers.google.com/recaptcha/docs/v2)
- [서버 측 검증 가이드](https://developers.google.com/recaptcha/docs/verify)

---

## ⚠️ 보안 체크리스트

- [ ] 실제 Site Key로 교체 완료
- [ ] Secret Key는 서버에만 저장
- [ ] `.env` 파일이 `.gitignore`에 포함됨
- [ ] 서버 측 검증 구현 완료
- [ ] 프로덕션 도메인 등록 완료
- [ ] HTTPS 사용 (프로덕션)
- [ ] 로그인 실패 로그 기록
- [ ] IP 기반 제한 추가 (선택사항)

---

**마지막 업데이트:** 2025-01-09

