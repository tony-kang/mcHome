# 카카오 로그인 설정 가이드

## 1. 카카오 개발자 콘솔에서 앱 생성

1. [카카오 개발자 콘솔](https://developers.kakao.com/)에 접속
2. 카카오 계정으로 로그인
3. "내 애플리케이션" > "애플리케이션 추가하기" 클릭
4. 앱 이름: "마인드코딩" 입력
5. 생성 완료

## 2. 플랫폼 설정

### 웹 플랫폼 추가
1. 생성된 앱 선택
2. "플랫폼" > "Web 플랫폼 등록" 클릭
3. 사이트 도메인 입력:
   - 개발환경: `http://localhost:5173`
   - 운영환경: `https://yourdomain.com`

## 3. 카카오 로그인 활성화

1. "제품 설정" > "카카오 로그인" 클릭
2. "카카오 로그인 활성화" ON
3. "Redirect URI" 설정:
   - 개발환경: `http://localhost:5173/s/oauth`
   - 운영환경: `https://yourdomain.com/s/oauth`
4. "동의항목" 설정:
   - 필수 동의항목: 닉네임, 프로필 사진
   - 선택 동의항목: 이메일 주소

## 4. 앱 키 설정

### JavaScript 키 복사
1. "앱 설정" > "앱 키" 클릭
2. "JavaScript 키" 복사

### 코드에 적용
`src/lib/utils/kakaoLogin.js` 파일의 5번째 줄을 수정:

```javascript
const KAKAO_APP_KEY = 'your_actual_kakao_app_key_here';
```

예시:
```javascript
const KAKAO_APP_KEY = '1234567890abcdef1234567890abcdef';
```

## 5. 테스트

1. 개발 서버 실행: `yarn dev`
2. 로그인 페이지 접속: `http://localhost:5173/s/signIn`
3. "카카오로 로그인" 버튼 클릭
4. 카카오 로그인 팝업에서 로그인 진행

## 6. 주의사항

- **보안**: 실제 운영환경에서는 환경변수를 사용하여 앱 키를 관리하세요
- **도메인**: 운영환경 배포 시 반드시 사이트 도메인과 Redirect URI를 업데이트하세요
- **동의항목**: 필요한 사용자 정보만 요청하도록 동의항목을 설정하세요

## 7. 환경변수 사용 (권장)

`.env` 파일 생성:
```
VITE_KAKAO_APP_KEY=your_actual_kakao_app_key_here
```

`src/lib/utils/kakaoLogin.js` 수정:
```javascript
const KAKAO_APP_KEY = import.meta.env.VITE_KAKAO_APP_KEY;
```

## 8. 문제 해결

### "앱 키가 올바르지 않습니다" 에러
- JavaScript 키가 올바른지 확인
- 사이트 도메인이 등록되었는지 확인

### "리다이렉트 URI가 일치하지 않습니다" 에러
- Redirect URI가 정확히 설정되었는지 확인
- HTTP/HTTPS 프로토콜 확인

### 팝업이 차단되는 경우
- 브라우저 팝업 차단 설정 확인
- 개발자 도구 콘솔에서 에러 메시지 확인
