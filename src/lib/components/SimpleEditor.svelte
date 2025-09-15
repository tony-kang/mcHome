<script>
  import { onMount } from 'svelte';
  
  let content = '';
  let editorId = `editor-${Math.random().toString(36).substr(2, 9)}`;
  
  export { content as value };
  export let height = 400;
  export let placeholder = '내용을 입력하세요...';

  onMount(() => {
    // 전역 함수로 resizeImage 등록
    window.resizeImage = resizeImage;
    
    return () => {
      // 컴포넌트가 제거될 때 전역 함수 정리
      delete window.resizeImage;
    };
  });
  
  function toggleFormat(command) {
    document.execCommand(command, false, null);
    updateContent();
  }
  
  function updateContent() {
    const editor = document.getElementById(editorId);
    content = editor.innerHTML;
  }
  
  function insertLink() {
    const url = prompt('링크 URL을 입력하세요:');
    if (url) {
      document.execCommand('createLink', false, url);
      updateContent();
    }
  }
  
  function insertImage() {
    const url = prompt('이미지 URL을 입력하세요:');
    if (url) {
      // 이미지 크기 선택 옵션
      const sizeOptions = [
        { label: '작게 (200px)', value: '200' },
        { label: '중간 (400px)', value: '400' },
        { label: '크게 (600px)', value: '600' },
        { label: '원본 크기', value: 'auto' }
      ];
      
      let sizeChoice = prompt('이미지 크기를 선택하세요:\n1. 작게 (200px)\n2. 중간 (400px)\n3. 크게 (600px)\n4. 원본 크기\n\n번호를 입력하세요 (1-4):');
      
      let imgStyle = '';
      if (sizeChoice) {
        const choice = parseInt(sizeChoice);
        if (choice >= 1 && choice <= 4) {
          const selectedSize = sizeOptions[choice - 1];
          if (selectedSize.value === 'auto') {
            imgStyle = 'max-width: 100%; height: auto;';
          } else {
            imgStyle = `width: ${selectedSize.value}px; height: auto; max-width: 100%;`;
          }
        } else {
          imgStyle = 'max-width: 100%; height: auto;';
        }
      } else {
        imgStyle = 'max-width: 100%; height: auto;';
      }
      
      const img = `<img src="${url}" alt="이미지" style="${imgStyle}" ondblclick="resizeImage(this)" />`;
      document.execCommand('insertHTML', false, img);
      updateContent();
    }
  }
  
  function resizeImage(imgElement) {
    const sizeOptions = [
      { label: '작게 (200px)', value: '200' },
      { label: '중간 (400px)', value: '400' },
      { label: '크게 (600px)', value: '600' },
      { label: '원본 크기', value: 'auto' }
    ];
    
    let sizeChoice = prompt('이미지 크기를 선택하세요:\n1. 작게 (200px)\n2. 중간 (400px)\n3. 크게 (600px)\n4. 원본 크기\n\n번호를 입력하세요 (1-4):');
    
    if (sizeChoice) {
      const choice = parseInt(sizeChoice);
      if (choice >= 1 && choice <= 4) {
        const selectedSize = sizeOptions[choice - 1];
        if (selectedSize.value === 'auto') {
          imgElement.style.width = 'auto';
          imgElement.style.height = 'auto';
          imgElement.style.maxWidth = '100%';
        } else {
          imgElement.style.width = selectedSize.value + 'px';
          imgElement.style.height = 'auto';
          imgElement.style.maxWidth = '100%';
        }
        updateContent();
      }
    }
  }

  function changeFontSize(size) {
    document.execCommand('fontSize', false, size);
    // font 태그를 span으로 변경하여 더 나은 스타일링
    setTimeout(() => {
      const fonts = document.querySelectorAll('font[size]');
      fonts.forEach(font => {
        const span = document.createElement('span');
        const sizeValue = font.getAttribute('size');
        let fontSize;
        
        switch(sizeValue) {
          case '1': fontSize = '12px'; break;
          case '2': fontSize = '14px'; break;
          case '3': fontSize = '16px'; break;
          case '4': fontSize = '18px'; break;
          case '5': fontSize = '24px'; break;
          case '6': fontSize = '32px'; break;
          case '7': fontSize = '48px'; break;
          default: fontSize = '14px';
        }
        
        span.style.fontSize = fontSize;
        span.innerHTML = font.innerHTML;
        font.parentNode.replaceChild(span, font);
      });
      updateContent();
    }, 10);
  }
  
  function insertHeading(level) {
    if (level === 'div') {
      document.execCommand('formatBlock', false, 'div');
    } else {
      document.execCommand('formatBlock', false, `h${level}`);
    }
    updateContent();
  }
  
  function insertUnorderedList() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      
      if (range.collapsed) {
        // 커서만 있는 경우 - 현재 줄에 * 추가
        const container = range.commonAncestorContainer;
        const textNode = container.nodeType === Node.TEXT_NODE ? container : null;
        
        if (textNode) {
          const text = textNode.textContent;
          const caretOffset = range.startOffset;
          
          // 현재 줄의 시작 위치 찾기
          let lineStart = text.lastIndexOf('\n', caretOffset - 1) + 1;
          const lineText = text.substring(lineStart, caretOffset);
          
          // 이미 *로 시작하는지 확인
          if (!lineText.trim().startsWith('*')) {
            // * 추가
            const newText = text.substring(0, lineStart) + '* ' + text.substring(lineStart);
            textNode.textContent = newText;
            
            // 커서를 * 뒤로 이동
            const newOffset = caretOffset + 2;
            range.setStart(textNode, newOffset);
            range.setEnd(textNode, newOffset);
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }
      } else {
        // 텍스트가 선택된 경우 - HTML 구조를 고려한 방법
        const selectedText = range.toString();
        console.log('선택된 텍스트:', selectedText);
        
        // 선택된 영역의 HTML 내용 가져오기
        const selectedContents = range.cloneContents();
        console.log('선택된 HTML 내용:', selectedContents);
        
        // 텍스트 노드들을 순서대로 수집
        const textNodes = [];
        const walker = document.createTreeWalker(
          selectedContents,
          NodeFilter.SHOW_TEXT,
          null,
          false
        );
        
        let node;
        while (node = walker.nextNode()) {
          if (node.textContent.trim()) {
            textNodes.push(node.textContent.trim());
          }
        }
        
        console.log('추출된 텍스트 노드들:', textNodes);
        
        // 각 텍스트에 * 추가
        const listItems = textNodes.map(text => {
          if (text && !text.startsWith('*')) {
            return '* ' + text;
          }
          return text || '* ';
        });
        
        console.log('목록 항목들:', listItems);
        
        // 선택된 영역을 삭제
        range.deleteContents();
        
        // 각 항목을 개별적으로 삽입
        listItems.forEach((item, index) => {
          if (index > 0) {
            // 줄바꿈 추가
            const br = document.createElement('br');
            range.insertNode(br);
            range.setStartAfter(br);
            range.setEndAfter(br);
          }
          
          // 텍스트 삽입
          const textNode = document.createTextNode(item);
          range.insertNode(textNode);
          range.setStartAfter(textNode);
          range.setEndAfter(textNode);
        });
        
        // 커서를 마지막에 위치
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      
      updateContent();
    }
  }
  
  function insertOrderedList() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      
      if (range.collapsed) {
        // 커서만 있는 경우 - 현재 줄에 1. 추가
        const container = range.commonAncestorContainer;
        const textNode = container.nodeType === Node.TEXT_NODE ? container : null;
        
        if (textNode) {
          const text = textNode.textContent;
          const caretOffset = range.startOffset;
          
          // 현재 줄의 시작 위치 찾기
          let lineStart = text.lastIndexOf('\n', caretOffset - 1) + 1;
          const lineText = text.substring(lineStart, caretOffset);
          
          // 이미 숫자로 시작하는지 확인
          if (!lineText.trim().match(/^\d+\./)) {
            // 1. 추가
            const newText = text.substring(0, lineStart) + '1. ' + text.substring(lineStart);
            textNode.textContent = newText;
            
            // 커서를 1. 뒤로 이동
            const newOffset = caretOffset + 3;
            range.setStart(textNode, newOffset);
            range.setEnd(textNode, newOffset);
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }
      } else {
        // 텍스트가 선택된 경우 - HTML 구조를 고려한 방법
        const selectedText = range.toString();
        console.log('선택된 텍스트 (순서):', selectedText);
        
        // 선택된 영역의 HTML 내용 가져오기
        const selectedContents = range.cloneContents();
        console.log('선택된 HTML 내용 (순서):', selectedContents);
        
        // 텍스트 노드들을 순서대로 수집
        const textNodes = [];
        const walker = document.createTreeWalker(
          selectedContents,
          NodeFilter.SHOW_TEXT,
          null,
          false
        );
        
        let node;
        while (node = walker.nextNode()) {
          if (node.textContent.trim()) {
            textNodes.push(node.textContent.trim());
          }
        }
        
        console.log('추출된 텍스트 노드들 (순서):', textNodes);
        
        // 각 텍스트에 번호 추가
        let counter = 1;
        const listItems = textNodes.map(text => {
          if (text && !text.match(/^\d+\./)) {
            return counter++ + '. ' + text;
          } else if (text.match(/^\d+\./)) {
            // 이미 번호가 있으면 그대로 유지
            return text;
          } else {
            return counter++ + '. ';
          }
        });
        
        console.log('목록 항목들 (순서):', listItems);
        
        // 선택된 영역을 삭제
        range.deleteContents();
        
        // 각 항목을 개별적으로 삽입
        listItems.forEach((item, index) => {
          if (index > 0) {
            // 줄바꿈 추가
            const br = document.createElement('br');
            range.insertNode(br);
            range.setStartAfter(br);
            range.setEndAfter(br);
          }
          
          // 텍스트 삽입
          const textNode = document.createTextNode(item);
          range.insertNode(textNode);
          range.setStartAfter(textNode);
          range.setEndAfter(textNode);
        });
        
        // 커서를 마지막에 위치
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      
      updateContent();
    }
  }
  
  function handleKeyDown(event) {
    // Enter 키 처리
    if (event.key === 'Enter') {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const container = range.commonAncestorContainer;
        
        // 현재 요소가 li인지 확인
        let listItem = container.nodeType === Node.TEXT_NODE ? container.parentElement : container;
        
        // li 요소까지 올라가기
        while (listItem && listItem.tagName !== 'LI') {
          listItem = listItem.parentElement;
        }
        
        if (listItem) {
          // 리스트 항목 안에서 Enter를 누른 경우
          const list = listItem.parentElement;
          const newListItem = document.createElement('li');
          newListItem.innerHTML = '&nbsp;';
          
          // 새로운 li 삽입
          if (listItem.nextSibling) {
            list.insertBefore(newListItem, listItem.nextSibling);
          } else {
            list.appendChild(newListItem);
          }
          
          // 커서를 새로운 li로 이동
          const newRange = document.createRange();
          newRange.selectNodeContents(newListItem);
          newRange.collapse(false);
          selection.removeAllRanges();
          selection.addRange(newRange);
          
          event.preventDefault();
          updateContent();
          return;
        }
      }
    }
  }
</script>

<div class="simple-editor-container">
  <!-- 툴바 -->
  <div class="editor-toolbar">
    <div class="toolbar-group">
      <button type="button" onclick={() => toggleFormat('bold')} title="굵게" aria-label="굵게">
        <i class="fas fa-bold"></i>
      </button>
      <button type="button" onclick={() => toggleFormat('italic')} title="기울임" aria-label="기울임">
        <i class="fas fa-italic"></i>
      </button>
      <button type="button" onclick={() => toggleFormat('underline')} title="밑줄" aria-label="밑줄">
        <i class="fas fa-underline"></i>
      </button>
    </div>
    
    <div class="toolbar-group">
      <select onchange={(e) => changeFontSize(e.target.value)} title="폰트 크기" aria-label="폰트 크기 선택">
        <option value="">폰트 크기</option>
        <option value="1">12px</option>
        <option value="2">14px</option>
        <option value="3">16px</option>
        <option value="4">18px</option>
        <option value="5">24px</option>
        <option value="6">32px</option>
        <option value="7">48px</option>
      </select>
    </div>
    
    <div class="toolbar-group">
      <select onchange={(e) => insertHeading(e.target.value)} title="제목 스타일" aria-label="제목 스타일 선택">
        <option value="">제목 스타일</option>
        <option value="1">제목 1</option>
        <option value="2">제목 2</option>
        <option value="3">제목 3</option>
        <option value="4">제목 4</option>
        <option value="5">제목 5</option>
        <option value="6">제목 6</option>
        <option value="div">일반 텍스트</option>
      </select>
    </div>
    
    <div class="toolbar-group">
      <button type="button" onclick={() => toggleFormat('justifyLeft')} title="왼쪽 정렬" aria-label="왼쪽 정렬">
        <i class="fas fa-align-left"></i>
      </button>
      <button type="button" onclick={() => toggleFormat('justifyCenter')} title="가운데 정렬" aria-label="가운데 정렬">
        <i class="fas fa-align-center"></i>
      </button>
      <button type="button" onclick={() => toggleFormat('justifyRight')} title="오른쪽 정렬" aria-label="오른쪽 정렬">
        <i class="fas fa-align-right"></i>
      </button>
    </div>
    
    <div class="toolbar-group">
      <button type="button" onclick={insertUnorderedList} title="순서 없는 목록" aria-label="순서 없는 목록">
        <i class="fas fa-list-ul"></i>
      </button>
      <button type="button" onclick={insertOrderedList} title="순서 있는 목록" aria-label="순서 있는 목록">
        <i class="fas fa-list-ol"></i>
      </button>
    </div>
    
    <div class="toolbar-group">
      <button type="button" onclick={insertLink} title="링크 삽입" aria-label="링크 삽입">
        <i class="fas fa-link"></i>
      </button>
      <button type="button" onclick={insertImage} title="이미지 삽입" aria-label="이미지 삽입">
        <i class="fas fa-image"></i>
      </button>
    </div>
    
    <div class="toolbar-group">
      <button type="button" onclick={() => toggleFormat('removeFormat')} title="서식 제거" aria-label="서식 제거">
        <i class="fas fa-remove-format"></i>
      </button>
    </div>
  </div>
  
  <!-- 에디터 영역 -->
  <div 
    id={editorId}
    class="editor-content"
    contenteditable="true"
    role="textbox"
    tabindex="0"
    aria-label="텍스트 편집기"
    aria-multiline="true"
    oninput={updateContent}
    onpaste={updateContent}
    onkeydown={handleKeyDown}
    style="height: {height}px;"
    data-placeholder={placeholder}
  ></div>
</div>

<style>
  .simple-editor-container {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .editor-toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 12px;
    background: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
  }
  
  .toolbar-group {
    display: flex;
    gap: 5px;
    padding-right: 10px;
    border-right: 1px solid #dee2e6;
  }
  
  .toolbar-group:last-child {
    border-right: none;
  }
  
  .toolbar-group button,
  .toolbar-group select {
    padding: 6px 10px;
    border: 1px solid #dee2e6;
    background: #fff;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s ease;
  }
  
  .toolbar-group select {
    min-width: 120px;
  }
  
  .toolbar-group button:hover,
  .toolbar-group select:hover {
    background: #e9ecef;
    border-color: #adb5bd;
  }
  
  .toolbar-group button:active {
    background: #dee2e6;
  }
  
  .toolbar-group select:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
  
  .toolbar-group i {
    font-size: 1rem;
    color: #333;
  }
  
  .toolbar-group button:hover i {
    color: #007bff;
  }
  
  .editor-content {
    padding: 15px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    line-height: 1.6;
    color: #333;
    outline: none;
    overflow-y: auto;
    min-height: 200px;
    white-space: pre-wrap;
  }
  
  .editor-content:empty:before {
    content: attr(data-placeholder);
    color: #999;
    font-style: italic;
  }
  
  .editor-content p {
    margin: 0 0 16px 0;
  }
  
  .editor-content p:last-child {
    margin-bottom: 0;
  }
  
  .editor-content h1, .editor-content h2, .editor-content h3,
  .editor-content h4, .editor-content h5, .editor-content h6 {
    margin: 24px 0 16px 0;
    font-weight: 600;
    color: #333;
  }
  
  .editor-content ul, .editor-content ol {
    margin: 0 0 16px 0;
    padding-left: 24px;
  }
  
  .editor-content li {
    margin-bottom: 8px;
  }
  
  .editor-content img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    margin: 10px 0;
  }
  
  .editor-content a {
    color: #007bff;
    text-decoration: underline;
  }
  
  .editor-content a:hover {
    color: #0056b3;
  }
  
  .editor-content blockquote {
    border-left: 4px solid #28a745;
    margin: 16px 0;
    padding: 0 16px;
    color: #666;
    font-style: italic;
  }
  
  /* 반응형 */
  @media (max-width: 768px) {
    .editor-toolbar {
      flex-direction: column;
      gap: 8px;
    }
    
    .toolbar-group {
      justify-content: flex-start;
      border-right: none;
      border-bottom: 1px solid #dee2e6;
      padding-bottom: 8px;
      padding-right: 0;
    }
    
    .toolbar-group:last-child {
      border-bottom: none;
    }
  }
</style>
