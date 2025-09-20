# 카카오톡 채널 연결 가이드

웹사이트에서 카카오톡 채널에 연결하는 완전한 가이드입니다.

## 🚀 빠른 시작

### 1단계: 카카오 개발자 콘솔 설정

1. [카카오 개발자 콘솔](https://developers.kakao.com/) 접속
2. **내 애플리케이션** → **애플리케이션 추가하기** 클릭
3. 앱 이름 입력 후 **저장** 클릭
4. **카카오 로그인** → **활성화 설정** → **ON** 설정
5. **카카오톡 채널** → **카카오톡 채널 연결** 클릭
6. 기존 채널 선택 또는 새 채널 생성
7. **채널 공개 ID** 확인 (예: `_mindcoding`)

### 2단계: 앱 키 설정

생성된 컴포넌트에서 `YOUR_APP_KEY`를 실제 앱 키로 변경:

```javascript
// KakaoChannel.svelte 파일에서
window.Kakao.init('YOUR_APP_KEY'); // 여기에 실제 앱 키 입력
```

### 3단계: 컴포넌트 사용

```svelte
<script>
  import KakaoChannel from '$lib/components/KakaoChannel.svelte';
</script>

<!-- 기본 사용 -->
<KakaoChannel channelId="_your_channel_id" />

<!-- 커스텀 설정 -->
<KakaoChannel 
  channelId="_mindcoding"
  buttonType="add"
  buttonText="카카오톡 채널 추가"
  buttonStyle="primary"
  size="medium"
/>
```

## 📱 연결 방법별 차이점

### 1. **채널 추가 (추천)**
```svelte
<KakaoChannel 
  channelId="_your_channel_id"
  buttonType="add"
  buttonText="카카오톡 채널 추가"
/>
```
- **동작**: 사용자가 카카오톡에서 채널을 추가
- **장점**: 사용자가 채널을 구독하여 알림 받을 수 있음
- **사용 시기**: 정기적인 소식이나 업데이트를 전달하고 싶을 때

### 2. **채팅 열기**
```svelte
<KakaoChannel 
  channelId="_your_channel_id"
  buttonType="chat"
  buttonText="카카오톡 채팅하기"
/>
```
- **동작**: 카카오톡 채널 채팅을 바로 열기
- **장점**: 즉시 상담이나 문의 가능
- **사용 시기**: 고객 상담이나 문의 받을 때

### 3. **직접 링크**
```svelte
<KakaoChannel 
  channelId="_your_channel_id"
  buttonType="link"
  buttonText="채널 페이지 보기"
/>
```
- **동작**: 카카오톡 채널 페이지로 직접 이동
- **장점**: SDK 로드 실패 시에도 작동
- **사용 시기**: 간단한 연결이 필요할 때

## 🎨 스타일 커스터마이징

### 버튼 스타일
- **primary**: 카카오톡 브랜드 컬러 (노란색)
- **secondary**: 주황색 계열
- **outline**: 투명 배경에 테두리

### 버튼 크기
- **small**: 작은 버튼 (모바일에서 유용)
- **medium**: 기본 크기
- **large**: 큰 버튼 (메인 CTA용)

## 📍 실제 사용 예시

### 헤더에 추가
```svelte
<!-- Header.svelte -->
<KakaoChannel 
  channelId="_mindcoding"
  buttonType="chat"
  buttonText="상담 문의"
  buttonStyle="primary"
  size="small"
/>
```

### 푸터에 추가
```svelte
<!-- Footer.svelte -->
<KakaoChannel 
  channelId="_mindcoding"
  buttonType="add"
  buttonText="카카오톡 채널 추가"
  buttonStyle="outline"
  size="small"
/>
```

### 문의 페이지에 추가
```svelte
<!-- contact/+page.svelte -->
<div class="contact-methods">
  <KakaoChannel 
    channelId="_mindcoding"
    buttonType="chat"
    buttonText="카카오톡으로 문의하기"
    buttonStyle="primary"
    size="large"
  />
</div>
```

## ⚠️ 주의사항

### 1. **앱 키 보안**
- 앱 키를 클라이언트 사이드에 노출하지 마세요
- 프로덕션에서는 환경 변수 사용 권장

### 2. **채널 ID 확인**
- 채널 공개 ID는 `_`로 시작합니다
- 예: `_mindcoding`, `_your_channel_id`

### 3. **테스트**
- 실제 카카오톡 앱에서 테스트해보세요
- 다양한 기기와 브라우저에서 확인하세요

## 🔧 문제 해결

### SDK 로드 실패
```javascript
// 자동으로 직접 링크로 대체됩니다
window.open(`https://pf.kakao.com/${channelId}`, '_blank');
```

### 채널 추가 실패
- 채널 ID가 올바른지 확인
- 카카오톡 앱이 설치되어 있는지 확인
- 네트워크 연결 상태 확인

### 스타일 문제
- Tailwind CSS와 충돌 시 `!important` 사용
- 커스텀 CSS로 오버라이드 가능

## 📊 분석 및 추적

### 카카오 애널리틱스 연동
```javascript
// 버튼 클릭 시 이벤트 추적
function handleClick() {
  // Google Analytics
  gtag('event', 'kakao_channel_click', {
    channel_id: channelId,
    button_type: buttonType
  });
  
  // 기본 동작 실행
  // ...
}
```

## 🚀 고급 활용

### 조건부 표시
```svelte
{#if userAgent === 'mobile'}
  <KakaoChannel 
    channelId="_mindcoding"
    buttonType="chat"
    buttonText="카카오톡 채팅"
    size="large"
  />
{:else}
  <KakaoChannel 
    channelId="_mindcoding"
    buttonType="add"
    buttonText="채널 추가"
    size="medium"
  />
{/if}
```

### 다국어 지원
```svelte
<script>
  import { page } from '$app/stores';
  
  const buttonTexts = {
    ko: '카카오톡 채널 추가',
    en: 'Add KakaoTalk Channel',
    ja: 'カカオトークチャンネル追加'
  };
  
  $: buttonText = buttonTexts[$page.params.lang] || buttonTexts.ko;
</script>

<KakaoChannel 
  channelId="_mindcoding"
  buttonText={buttonText}
/>
```

이제 웹사이트에서 카카오톡 채널을 쉽게 연결할 수 있습니다! 🎉
