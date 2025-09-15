<script>
	import ___element from '$prj/lib/i_formElement';
	import { _edit, _color } from '$prj/lib/i_etc';
	import ModalForm from '$lib/C/etc/ModalForm.svelte';

	import { getContext, setContext } from 'svelte';
	const ___telepasi = getContext('___telepasi');

	let {
		calendarAction = null,
	} = $props();
	//==================================================
	let calendarEventForm;
	let editorLayoutData = []; // null로 하지 마세요.
	let editData = null; //수정대상 데이타
	let backupData = null; //수정하기전 데이타 복사본

	/**
	 * 편집할 데이타를 셋팅한다.
	 * Obj 데이타의 Property 가 없는 경우, 초기값 설정 등
	 * @param data          편집데이타
	 */
	function dataNormalize(data) {
		editData = { ...data }; // 복사해서 원본(함수 호출시의 Data)은 유지한다.
		backupData = { ...data }; // 콤포넌트 내에서 Data Reset 필요한 경우를 대비 복사본을 만듦
	}

	function hexColorPercent(percent) {
		const x = Math.round((256 * percent) / 100) - 1; //100% 일 때 255가 되게 함
		return x.toString(16);
	}
	function getOpacityList() {
		return [
			{ value: hexColorPercent(100), text: '100%' },
			{ value: hexColorPercent(90), text: '90%' },
			{ value: hexColorPercent(80), text: '80%' },
			{ value: hexColorPercent(70), text: '70%' },
			{ value: hexColorPercent(60), text: '60%' },
			{ value: hexColorPercent(50), text: '50%' }
		];
	}

	/**
	 * Modal Popup Activation
	 * @param editMode  : New [ Edit ] [ Delete ]
	 * @param title     : Title color
	 * @param color     : window background color
	 * @param place     : display position
	 */
	export function show(calendarEvent) {
		dataNormalize(calendarEvent.data);
		editorLayoutData = [
			{
				group: null,
				column: [
					___element
						.col(12, 'TelepasiInput', '제목', editData.title)
						.required()
						.focus()
						.add((r) => {
							editData.title = r;
						})
				]
			},
			{
				group: null,
				column: [
					___element
						.col(3, 'TelepasiDateInput', '시작 날짜', editData.sDate).add((r) => {
						editData.sDate = r;
					}),
					___element
						.col(3, 'TelepasiTimeSelect', '시작 시간', editData.sTime)
						.note('필요한 경우만 입력해 주세요.')
						.add((r) => {
							editData.sTime = r;
						}),
					___element
						.col(3, 'TelepasiDateInput', '종료 날짜', editData.eDate).add((r) => {
						editData.eDate = r;
					}),
					___element
						.col(3, 'TelepasiTimeSelect', '종료 시간', editData.eTime)
						.note('필요한 경우만 입력해 주세요.')
						.add((r) => {
							editData.eTime = r;
						})
				]
			},
			{
				group: '칼라',
				column: [
					___element
						.col(3, 'TelepasiColorSelect', '배경', editData.backgroundColor)
						.setColor(100, 15, editData.backgroundColor)
						.add((r) => {
							editData.backgroundColor = r;
						}),
					___edit
						.col(3, 'TelepasiColorSelect', '글자', editData.textColor)
						.setColor(100, 15, editData.textColor)
						.add((r) => {
							editData.textColor = r;
						}),
					___edit
						.col(3, 'TelepasiColorSelect', '테두리', editData.borderColor)
						.setColor(100, 15, editData.borderColor)
						.add((r) => {
							editData.borderColor = r;
						})
				]
			}
		];
		if (calendarEvent.editor.editorMode === _edit.mode.DELETE) {
			editorLayoutData.forEach((row) => {
				row.column.forEach((col) => {
					col.editObj.disabled = true;
				});
			});
		}
		console.log('editorLayoutData',editorLayoutData);
		calendarEventForm.show(calendarEvent, editorLayoutData);
	}

	/**
	 * Modal submit (취소/등록/수정/삭제/무시/...) 클릭
	 * @param btnId
	 */
	function calendarEventHandler(btnId) {
		editData.btnId = btnId;
		console.log('calendarEventHandler Data', btnId, editData);

		if (calendarAction) calendarAction(editData);
	}
</script>

<ModalForm bind:this={calendarEventForm} onClick={calendarEventHandler} width="800" />
