<!--
  카카오톡 채널 연결 예시 페이지
  KakaoTalk Channel Connection Example Page
-->
<script>
  import KakaoChannel from '$lib/components/KakaoChannel.svelte';
  
  // 카카오톡 채널 ID (실제 채널 ID로 변경 필요)
  const channelId = '_your_channel_id'; // 예: '_mindcoding'
</script>

<svelte:head>
  <title>카카오톡 채널 연결 예시 - 마인드코딩</title>
  <meta name="description" content="카카오톡 채널 연결 방법과 예시를 보여주는 페이지입니다." />
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-center mb-8">카카오톡 채널 연결 예시</h1>
    
    <!-- 기본 사용법 -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-6">1. 기본 사용법</h2>
      
      <div class="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 class="text-lg font-medium mb-4">채널 추가 (추천)</h3>
        <p class="text-gray-600 mb-4">
          사용자가 카카오톡에서 채널을 추가할 수 있습니다.
        </p>
        <KakaoChannel 
          channelId={channelId}
          buttonType="add"
          buttonText="카카오톡 채널 추가"
          buttonStyle="primary"
          size="medium"
        />
      </div>
      
      <div class="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 class="text-lg font-medium mb-4">채팅 열기</h3>
        <p class="text-gray-600 mb-4">
          카카오톡 채널 채팅을 바로 열 수 있습니다.
        </p>
        <KakaoChannel 
          channelId={channelId}
          buttonType="chat"
          buttonText="카카오톡 채팅하기"
          buttonStyle="secondary"
          size="medium"
        />
      </div>
      
      <div class="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 class="text-lg font-medium mb-4">직접 링크</h3>
        <p class="text-gray-600 mb-4">
          카카오톡 채널 페이지로 직접 이동합니다.
        </p>
        <KakaoChannel 
          channelId={channelId}
          buttonType="link"
          buttonText="채널 페이지 보기"
          buttonStyle="outline"
          size="medium"
        />
      </div>
    </section>
    
    <!-- 다양한 스타일 예시 -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-6">2. 다양한 스타일</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center">
          <h3 class="text-lg font-medium mb-4">Primary (기본)</h3>
          <KakaoChannel 
            channelId={channelId}
            buttonText="Primary 버튼"
            buttonStyle="primary"
            size="medium"
          />
        </div>
        
        <div class="text-center">
          <h3 class="text-lg font-medium mb-4">Secondary</h3>
          <KakaoChannel 
            channelId={channelId}
            buttonText="Secondary 버튼"
            buttonStyle="secondary"
            size="medium"
          />
        </div>
        
        <div class="text-center">
          <h3 class="text-lg font-medium mb-4">Outline</h3>
          <KakaoChannel 
            channelId={channelId}
            buttonText="Outline 버튼"
            buttonStyle="outline"
            size="medium"
          />
        </div>
      </div>
    </section>
    
    <!-- 다양한 크기 예시 -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-6">3. 다양한 크기</h2>
      
      <div class="flex flex-wrap gap-4 items-center">
        <KakaoChannel 
          channelId={channelId}
          buttonText="Small"
          buttonStyle="primary"
          size="small"
        />
        
        <KakaoChannel 
          channelId={channelId}
          buttonText="Medium"
          buttonStyle="primary"
          size="medium"
        />
        
        <KakaoChannel 
          channelId={channelId}
          buttonText="Large"
          buttonStyle="primary"
          size="large"
        />
      </div>
    </section>
    
    <!-- 아이콘 없이 -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-6">4. 아이콘 없이</h2>
      
      <KakaoChannel 
        channelId={channelId}
        buttonText="아이콘 없는 버튼"
        buttonStyle="primary"
        size="medium"
        showIcon={false}
      />
    </section>
    
    <!-- 사용법 가이드 -->
    <section class="bg-blue-50 p-6 rounded-lg">
      <h2 class="text-2xl font-semibold mb-6">📋 사용법 가이드</h2>
      
      <div class="space-y-4">
        <div>
          <h3 class="font-medium text-blue-800">1. 카카오 개발자 콘솔 설정</h3>
          <p class="text-blue-700">- <a href="https://developers.kakao.com/" target="_blank" class="underline">카카오 개발자 콘솔</a>에서 앱 생성</p>
          <p class="text-blue-700">- 카카오톡 채널 연결</p>
          <p class="text-blue-700">- 채널 ID 확인</p>
        </div>
        
        <div>
          <h3 class="font-medium text-blue-800">2. 컴포넌트 사용</h3>
          <pre class="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto"><code>&lt;KakaoChannel 
  channelId="_your_channel_id"
  buttonType="add"
  buttonText="카카오톡 채널 추가"
  buttonStyle="primary"
  size="medium"
/&gt;</code></pre>
        </div>
        
        <div>
          <h3 class="font-medium text-blue-800">3. Props 설명</h3>
          <ul class="text-blue-700 space-y-1">
            <li><strong>channelId</strong>: 카카오톡 채널 ID (필수)</li>
            <li><strong>buttonType</strong>: 'add' | 'chat' | 'link'</li>
            <li><strong>buttonText</strong>: 버튼에 표시될 텍스트</li>
            <li><strong>buttonStyle</strong>: 'primary' | 'secondary' | 'outline'</li>
            <li><strong>size</strong>: 'small' | 'medium' | 'large'</li>
            <li><strong>showIcon</strong>: 아이콘 표시 여부 (기본값: true)</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</div>

<style>
  .container {
    min-height: 100vh;
  }
  
  pre {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  }
  
  code {
    font-family: inherit;
  }
</style>
