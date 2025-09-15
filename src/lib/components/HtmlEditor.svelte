<script>
  import { onMount, onDestroy } from 'svelte';
  
  let editorElement;
  let editor;
  let content = '';
  let editorId = `editor-${Math.random().toString(36).substr(2, 9)}`;
  
  export { content as value };
  export let height = 400;
  export let placeholder = '내용을 입력하세요...';
  
  onMount(() => {
    // TinyMCE 동적 로드
    const script = document.createElement('script');
    script.src = 'https://cdn.tiny.cloud/1/YOUR-API-KEY-HERE/tinymce/6/tinymce.min.js';
    script.onload = () => {
      if (window.tinymce) {
        initEditor();
      }
    };
    document.head.appendChild(script);
    
    // 이미 로드된 경우
    if (window.tinymce) {
      initEditor();
    }
  });
  
  function initEditor() {
    window.tinymce.init({
      selector: `#${editorId}`,
      height: height,
      menubar: false,
      plugins: [
        'advlist', 'autolink', 'lists', 'link', 'charmap', 'preview',
        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime', 'table', 'help', 'wordcount', 'paste'
      ],
      toolbar: 'undo redo | blocks | ' +
        'bold italic forecolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
      license_key: 'gpl',
      content_style: `
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          font-size: 14px; 
          line-height: 1.6;
          color: #333;
        }
        p { margin: 0 0 16px 0; }
        h1, h2, h3, h4, h5, h6 { 
          margin: 24px 0 16px 0; 
          font-weight: 600;
          color: #333;
        }
        ul, ol { margin: 0 0 16px 0; padding-left: 24px; }
        li { margin-bottom: 8px; }
        blockquote { 
          border-left: 4px solid #28a745; 
          margin: 16px 0; 
          padding: 0 16px; 
          color: #666;
        }
      `,
      placeholder: placeholder,
      paste_as_text: true,
      paste_remove_styles: true,
      paste_remove_empty_paragraphs: true,
      branding: false,
      statusbar: false,
      setup: (ed) => {
        editor = ed;
        ed.on('change', () => {
          content = ed.getContent();
        });
        ed.on('init', () => {
          if (content) {
            ed.setContent(content);
          }
        });
      }
    });
  }
  
  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });
  
  // content 변경 시 에디터 업데이트
  $: if (editor && content !== editor.getContent()) {
    editor.setContent(content);
  }
</script>

<div class="html-editor-container">
  <textarea id={editorId} bind:value={content}></textarea>
</div>

<style>
  .html-editor-container {
    margin: 20px 0;
  }
  
  textarea {
    width: 100%;
    min-height: 400px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 0;
    font-family: inherit;
    resize: none;
  }
  
  /* TinyMCE 에디터 스타일링 */
  :global(.tox-tinymce) {
    border-radius: 8px !important;
    border: 1px solid #ddd !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
  }
  
  :global(.tox-editor-header) {
    border-bottom: 1px solid #e9ecef !important;
  }
  
  :global(.tox-toolbar__primary) {
    background: #f8f9fa !important;
  }
  
  :global(.tox-edit-area) {
    border: none !important;
  }
  
  :global(.tox-edit-area__iframe) {
    border-radius: 0 0 8px 8px !important;
  }
</style>
