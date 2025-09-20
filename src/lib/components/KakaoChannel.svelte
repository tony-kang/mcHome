<!--
  카카오톡 채널 연결 컴포넌트
  KakaoTalk Channel Connection Component
-->
<script>
  import { onMount } from 'svelte';
  
  // Props
  export let channelId = ''; // 카카오톡 채널 ID (예: '_your_channel_id')
  export let buttonText = '카카오톡 채널 문의';
  export let buttonType = 'add'; // 'add' | 'chat' | 'link'
  export let buttonStyle = 'primary'; // 'primary' | 'secondary' | 'outline'
  export let showIcon = true;
  export let size = 'medium'; // 'small' | 'medium' | 'large'
  
  // 카카오 SDK 로드 상태
  let kakaoLoaded = false;
  let loading = false;
  
  onMount(async () => {
    await loadKakaoSDK();
  });
  
  // 카카오 SDK 로드 함수
  async function loadKakaoSDK() {
    if (window.Kakao) {
      kakaoLoaded = true;
      return;
    }
    
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
      script.onload = () => {
        if (window.Kakao) {
          // 앱 키 설정 (실제 앱 키로 변경 필요)
          window.Kakao.init('YOUR_APP_KEY');
          kakaoLoaded = true;
          resolve();
        } else {
          reject(new Error('카카오 SDK 로드 실패'));
        }
      };
      script.onerror = () => reject(new Error('카카오 SDK 로드 실패'));
      document.head.appendChild(script);
    });
  }
  
  // 카카오톡 채널 추가
  function addKakaoChannel() {
    if (!kakaoLoaded || !window.Kakao) {
      alert('카카오 SDK가 로드되지 않았습니다.');
      return;
    }
    
    loading = true;
    
    try {
      window.Kakao.Channel.addChannel({
        channelPublicId: channelId
      });
    } catch (error) {
      console.error('카카오톡 채널 추가 실패:', error);
      alert('카카오톡 채널 추가에 실패했습니다.');
    } finally {
      loading = false;
    }
  }
  
  // 카카오톡 채널 채팅
  function openKakaoChat() {
    if (!kakaoLoaded || !window.Kakao) {
      // SDK가 로드되지 않은 경우 직접 링크로 이동
      window.open(`https://pf.kakao.com/${channelId}`, '_blank');
      return;
    }
    
    loading = true;
    
    try {
      window.Kakao.Channel.chat({
        channelPublicId: channelId
      });
    } catch (error) {
      console.error('카카오톡 채팅 열기 실패:', error);
      // 실패 시 직접 링크로 이동
      window.open(`https://pf.kakao.com/${channelId}`, '_blank');
    } finally {
      loading = false;
    }
  }
  
  // 직접 링크로 이동
  function openDirectLink() {
    window.open(`https://pf.kakao.com/${channelId}`, '_blank');
  }
  
  // 버튼 클릭 핸들러
  function handleClick() {
    if (loading) return;
    
    switch (buttonType) {
      case 'add':
        addKakaoChannel();
        break;
      case 'chat':
        openKakaoChat();
        break;
      case 'link':
        openDirectLink();
        break;
      default:
        openKakaoChat();
    }
  }
</script>

<button 
  class="kakao-channel-btn {buttonStyle} {size}"
  class:loading={loading}
  on:click={handleClick}
  disabled={loading || !channelId}
  title={buttonText}
>
  {#if loading}
    <div class="loading-spinner"></div>
  {:else if showIcon}
    <svg class="kakao-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3C6.48 3 2 6.48 2 11c0 2.38 1.19 4.47 3 5.74V21l4-2.5c.5.06 1 .09 1.5.09 5.52 0 10-3.48 10-8S17.52 3 12 3z"/>
    </svg>
  {/if}
  
  <span class="button-text">
    {loading ? '연결 중...' : buttonText}
  </span>
</button>

<style>
  .kakao-channel-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    font-family: inherit;
    position: relative;
    overflow: hidden;
  }
  
  .kakao-channel-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  /* 크기별 스타일 */
  .small {
    padding: 8px 16px;
    font-size: 14px;
  }
  
  .medium {
    padding: 12px 20px;
    font-size: 16px;
  }
  
  .large {
    padding: 16px 24px;
    font-size: 18px;
  }
  
  /* 스타일별 색상 */
  .primary {
    background: #FEE500;
    color: #3C1E1E;
  }
  
  .primary:hover:not(:disabled) {
    background: #FFD700;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(254, 229, 0, 0.3);
  }
  
  .secondary {
    background: #FF6B35;
    color: white;
  }
  
  .secondary:hover:not(:disabled) {
    background: #E55A2B;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
  }
  
  .outline {
    background: transparent;
    color: #333;
    border: 2px solid #FEE500;
  }
  
  .outline:hover:not(:disabled) {
    background: #FEE500;
    color: #3C1E1E;
  }
  
  /* 아이콘 스타일 */
  .kakao-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
  
  .small .kakao-icon {
    width: 16px;
    height: 16px;
  }
  
  .large .kakao-icon {
    width: 24px;
    height: 24px;
  }
  
  /* 로딩 스피너 */
  .loading-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* 반응형 */
  @media (max-width: 768px) {
    .kakao-channel-btn {
      width: 100%;
      justify-content: center;
    }
    
    .medium {
      padding: 10px 16px;
      font-size: 14px;
    }
    
    .large {
      padding: 12px 20px;
      font-size: 16px;
    }
  }
  
  /* 다크 모드 지원 */
  @media (prefers-color-scheme: dark) {
    .outline {
      color: white;
      border-color: #FEE500;
    }
    
    .outline:hover:not(:disabled) {
      background: #FEE500;
      color: #3C1E1E;
    }
  }
</style>
