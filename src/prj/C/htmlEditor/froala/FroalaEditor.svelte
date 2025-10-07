<script>
/***
 * Froala Editor
 * 작성자 : 강병우 | bluein007@gmail.com
 */
	import { onMount, onDestroy } from 'svelte';
	import { getToolbarButtons } from './froalaOptions';
	import { imageUploader, fileUploader } from './froalaUploader';

	let {
		value = '',
		cssClass = '',
		onChange,  //편집데이타 Trigger
		option = {},
	} = $props();


	let editor;
	let editorContainer;

	async function loadFroala() {
		/**
		 * 매우 중요한 부분
		 * froala-editor 및 관련 플러그인의 Import 위치 변경: 
		 * SSR 환경에서는 import 구문이 최상위 수준에서 실행되므로, 
		 * froala-editor 및 관련 플러그인의 import를 onMount 내부에서 실행될 수 있도록 해야 합니다.
		*/
		//await import('roala-editor/js/froala_editor.pkgd.min.js');

		await import('froala-editor/css/froala_editor.pkgd.min.css');
		await import('font-awesome/css/font-awesome.min.css');
		await import('./froala.css');
		// await import('froala-editor/js/plugins/font_size.min.js');		// 툴바에 폰트 사이즈 아이콘이 나오게 하려면 필요
		// await import('froala-editor/js/plugins/image.min.js');			// 툴바에 이미지 아이콘이 나오게 하려면 필요
		// await import('froala-editor/js/plugins/file.min.js');			// 툴바에 파일 아이콘이 나오게 하려면 필요

		const FroalaEditorModule = await import('froala-editor/js/froala_editor.pkgd.min.js');
		const FroalaEditor = FroalaEditorModule.default;

		// SVG 아이콘 정의
		// FroalaEditor.DefineIcon('readOnlyOn', { svg: '<path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0 1c-4.962 0-9 4.037-9 9s4.038 9 9 9 9-4.037 9-9-4.038-9-9-9zm0 2c3.855 0 7 3.145 7 7s-3.145 7-7 7-7-3.145-7-7 3.145-7 7-7zm0 1c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6z"/>'});
		// FroalaEditor.DefineIcon('readOnlyOff', { svg: '<path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0 1c-4.962 0-9 4.037-9 9s4.038 9 9 9 9-4.037 9-9-4.038-9-9-9zm-5 9c0-2.761 2.239-5 5-5 .553 0 1-.447 1-1s-.447-1-1-1c-3.855 0-7 3.145-7 7s3.145 7 7 7c.553 0 1-.447 1-1s-.447-1-1-1c-2.761 0-5-2.239-5-5z"/>'});		
		
		// FroalaEditor.DefineIcon('readOnlyOn', { NAME: '🔘'});
		// FroalaEditor.DefineIcon('readOnlyOff', { NAME: '⚪'});
		// FroalaEditor.RegisterCommand('readOnlyToggle', {
		// 	title: 'Toggle Read-Only',
		// 	icon: 'readOnlyOff', // 초기 아이콘 설정
		// 	focus: false,
		// 	undo: false,
		// 	refreshAfterCallback: true,

		// 	callback: function () {
		// 		if (this.opts.readOnly) {
		// 			this._edit.on();
		// 			this.opts.readOnly = false;
		// 			// 아이콘 정의 및 교체
		// 			this.icon.replace('readOnlyOn', 'readOnlyOff'); 
		// 		} else {
		// 			this._edit.off();
		// 			this.opts.readOnly = true;
		// 			this.icon.replace('readOnlyOff', 'readOnlyOn');
		// 		}
		// 	}
		// });

		// console.log('loadFroala option',$state.snapshot(option));

		editor = new FroalaEditor(editorContainer, {
			// 여기에 Froala 에디터 옵션을 추가할 수 있습니다.

			// 정식 라이센스 키가 있으면 입력
			key: 'froala editor license key정보 입력',

			// 이미지 URL을 Link로 입력하는 경우 proxy를 사용하지 않도록 한다.
			imageCORSProxy: '',//'https://cors-anywhere.herokuapp.com' 
			placeholderText: '내용을 입력해 주세요',
			html: value,
			toolbarButtons: getToolbarButtons(option, 'large'),										//
      		toolbarButtonsMD: getToolbarButtons(option, 'medium'),	//화면이 작아 지면 동작하는 버튼
			toolbarButtonsSM: getToolbarButtons(option, 'small'),	//화면이 작아 지면 동작하는 버튼
			toolbarButtonsXS: getToolbarButtons(option, 'extra-small'),	//화면이 작아 지면 동작하는 버튼
			tooltips: true,
			// imageMultipleUpload: true,
			// imageMultipleStyles: true,
			linkAlwaysBlank: true,
			imageMaxSize: 1024 * 1024 * 3,	// 3MB
			fontSize: [ '8', '10', '12', '14', '16', '18', '20', '24', '30', '36', '48', '60', '72', '96' ],
			fontSizeDefaultSelection: '16', // 기본 폰트 크기
			fontSizeSelection: true,
			fontSizeUnit: 'px',

			// 플러그인 명시적 활성화
			pluginsEnabled: [
				'fontSize',
				'align',
				'colors',
				'image',
				'link',
				'lists',
				// ... 기타 필요한 플러그인들
			],
			
			height: option.editorHeight || 'calc(90vh - 300px)',
			events: {
				// 사용자가 이미지를 업로드하기 전에 호출됩니다. 
				// 이 이벤트에서 imageUploader 함수를 호출하여 이미지를 서버에 업로드합니다. 이 함수는 파일을 처리하고, 서버에 업로드하는 로직을 포함해야 합니다.
				'image.beforeUpload': async (files) => {
					return await imageUploader(files, editor);
				},
				// 이미지가 성공적으로 업로드된 후 호출됩니다. 이곳에서 추가적인 처리를 할 수 있습니다. 
				// 예를 들어, 업로드된 이미지의 URL을 편집기에 삽입할 수 있습니다.
				'image.uploaded': (response) => {
					console.log('이미지 업로드 후 처리 로직');
					// 예: 업로드된 이미지의 URL을 편집기에 삽입
    				editor.image.insert(response.imageUrl); // response.imageUrl은 서버에서 반환된 이미지 URL
				},
				// 이미지 업로드 오류가 발생한 경우 호출됩니다. 이곳에서 오류를 처리할 수 있습니다. 
				'image.error': (error, response) => {
					alert('이미지 업로드 중 오류가 발생했습니다.');
				},
				// 사용자가 파일을 업로드하기 전에 호출됩니다. 
				// 이 이벤트에서 fileUploader 함수를 호출하여 파일을 서버에 업로드합니다. 이 함수는 파일을 처리하고, 서버에 업로드하는 로직을 포함해야 합니다.
				'file.beforeUpload': (files) => {
					return fileUploader(files, editor);
				},
				// 파일이 성공적으로 업로드된 후 호출됩니다. 이곳에서 추가적인 처리를 할 수 있습니다. 
				'file.inserted': (file,response) => {
					// file 요소의 부모 요소 가져오기
					const parent = file[0].parentElement;
					if (!parent) return;
					console.log('file[0].parentElement',file,parent);
					console.log('parent.children',parent.children);
					console.log('response',response);

					const iFile = file[0];
					iFile.classList.add('telepasi-file');
					iFile.setAttribute('download', file[0].innerHTML);
					//iFile.setAttribute('href', response.fileUrl); // 파일 URL 설정

					// parent 내에서 blob:로 시작하는 href 속성을 가진 모든 <a> 태그 선택
					const blobLinks = parent.querySelectorAll('a[href^="blob:"]');

					// 선택된 모든 <a> 태그 삭제
					blobLinks.forEach(blobLink => {
						parent.removeChild(blobLink);
					});
				},
				// 파일이 성공적으로 업로드된 후 호출됩니다. 이곳에서 추가적인 처리를 할 수 있습니다. 
				'file.uploaded': (response) => {
					console.log('파일 업로드 후 처리 로직');
					// 예: 업로드된 파일의 URL을 편집기에 삽입
    				editor.file.insert(response.fileUrl); // response.fileUrl은 서버에서 반환된 파일 URL
				},
				// 파일 업로드 오류가 발생한 경우 호출됩니다. 이곳에서 오류를 처리할 수 있습니다. 
				'file.error': (error, response) => {
					alert('파일 업로드 중 오류가 발생했습니다.');
				},
				// 에디터가 초기화되고 준비되면 호출됩니다. 이곳에서 초기화 처리를 할 수 있습니다. 
				initialized: () => {
					editor.html.set(value);

					// 실시간 입력 반응을 위한 input 이벤트 추가
					editor.events.on('input', () => {
						value = editor.html.get();
						if (onChange) onChange(value);
					});

					editor.events.on('contentChanged', () => {
						value = editor.html.get();
						editor.events.trigger('valueUpdated');
					});
				},
				// 편집데이타가 변경되면 호출됩니다. 이곳에서 변경된 데이타를 처리할 수 있습니다. 
				// valueUpdated: () => {
				// 	//편집데이타 trigger
				// 	console.log('Value updated:', value);
				// 	if (onChange) onChange(value);
				// },
				linkOpen: function (link) {
					console.log('Link opened:', link);
				},

			},
		});
	}

	function toggleReadOnly() {
		if (editor.opts.readOnly) {
			// 현재 readOnly 상태이면 편집을 활성화
			editor._edit.on();
			editor.opts.readOnly = false;
		} else {
			// 현재 편집 상태이면 readOnly로 설정
			editor._edit.off();
			editor.opts.readOnly = true;
		}
	}

	onMount(async () => {
		await loadFroala();
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div bind:this={editorContainer} class={cssClass}></div>
<style>
	:global(.fr-wrapper div a) {
        padding:0px !important;
        height:0px !important;
	}

	:global(.fr-view) {
		font-size: 16px !important; /* 원하는 폰트 사이즈로 변경 */
	}

	/**
	 * 드롭다운 메뉴 잘려서 안보이는 문제 해결 CSS
	 */
	:global(.fr-dropdown-wrapper) {
		height: auto;
	}

	:global(ul.fr-dropdown-list li) {
		height: 24px;
		padding-left: 3px !important;
	}

	/* 이미지 편집 팝업을 아래로 내리기 */
	:global(.fr-popup.fr-active) {
        margin-top: 30px !important;  /* 이 값을 조정하여 원하는 만큼 아래로 내릴 수 있습니다 */
		margin-left: 120px !important;
    }
</style>  