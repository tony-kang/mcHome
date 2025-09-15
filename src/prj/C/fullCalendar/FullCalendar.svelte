<script>
	import { onMount } from "svelte";
	import { ___makeId } from "$prj/lib/i_telepasi";
	import { _edit} from '$prj/lib/i_etc';
	
	import { Calendar } from "@fullcalendar/core";
	import dayGridPlugin from "@fullcalendar/daygrid";
	import timeGridPlugin from "@fullcalendar/timegrid";
	import interactionPlugin from "@fullcalendar/interaction";
	import koLocale from "@fullcalendar/core/locales/ko"; 

	import CalendarEventEditor from "./CalendarEventEditor.svelte";
	import {___getCalendarEvent} from './calendarEventApi';

	let calendarEventEditor;
	let calendarEl;
	let calendar;
	let cDate = null;	//특정날짜 형식 : 주소창 입력 : cDate=2023-01-01
	let calStartDate;
	let calEndDate;

	function ___makeDataForEventEditor(info) {
		const editorData = {
			allDay: info.allDay,
			id : info.publicId,
			title: info.title,
			...info.extendedProps,
			backgroundColor: info.backgroundColor,
			textColor: info.textColor,
			borderColor: info.borderColor,
		};

		console.log('달력 데이타 ',editorData);
		return editorData;
	}

	onMount(() => {
		calendar = new Calendar(calendarEl, {
			plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
			firstDay: 0,	//일요일부터 시작
			initialView: "dayGridMonth",
			expandRows: true,
			handleWindowResize: false,
			headerToolbar: {
				left: "prev,next today",
				center: "title",
				right: "dayGridMonth,timeGridWeek,timeGridDay",
			},
			events: async function(info,successCallback,failCallback) {
				return ___getCalendarEvent(info);
			},
			dateClick: function (info) {
				const newCalendarEvent = {
					id : ___makeId(___date()),
					title: "새 일정",
					sDate: info.dateStr,
					eDate: info.dateStr,
					allDay: info.allDay,
					backgroundColor: '#ff0000FF', // 이벤트의 배경색
					textColor: '#ffffffFF', 		// 이벤트의 텍스트 색상
					borderColor: '#1a1a1aFF', 	// 이벤트의 테두리 색상
				}
				console.log('dateClick: newCalendarEvent',newCalendarEvent);

				if (confirm("[" + info.dateStr + "]의 이벤트를 생성하시겠습니까?")) {
					calendarEventEditor.show({
						editor : _edit.editor.new('일정등록'),
						data : newCalendarEvent
					});
				}
			},
			eventClick: function(info) {
				if (confirm("[" + info.event.title + "]의 이벤트를 수정 하시겠습니까?")) {
					console.log('달력 일정 수정 ',info.event);
					calendarEventEditor.show({
						editor : _edit.editor.edit('일정수정'),
						data : ___makeDataForEventEditor(info.event)
					});
				}
			},
			datesSet: function(info) {
				calStartDate = info.start;
				calEndDate = info.end;
				console.log('Start date: ', info.start);
				console.log('End date: ', info.end);
			},
			locale: koLocale, // 한글 지역화 설정 추가
		});

		calendar.render();
	});

	function toggleWeekends() {
		calendar.setOption("weekends", !calendar.getOption("weekends"));
	}

	function calendarActionHandler(event) {
		//달력 일정 추가
		let addDay = 0;
		if (event.detail.sDate !== event.detail.eDate) {
			addDay = 1;
		}

		if (event.detail.sTime) {
			event.detail.start = event.detail.sDate+"T"+event.detail.sTime;
			event.detail.allDay = false;
		}

		if (event.detail.eTime) {
			event.detail.end += event.detail.eDate+"T"+event.detail.eTime;
			event.detail.allDay = false;
		}

		const calEvent = { ...event.detail };
		calEvent.start = new Date(calEvent.sDate);
		calEvent.end = new Date(calEvent.eDate);
		if (addDay) calEvent.end = calEvent.end.setDate(calEvent.end.getDate()+1);	//종료일이 시작일과 다르면 종료일 + 1

		console.log('calendarActionHandler',calEvent);
		if (calEvent.btnId === _edit.button.NEW) {
			calendar.addEvent(calEvent);
		} else if (calEvent.btnId === _edit.button.SAVE) {
			console.log('FullCalendar를 갱신');
			calendar.refetchEvents();
		}
	}

</script>

<div>
	<CalendarEventEditor bind:this={calendarEventEditor} on:calendarAction={calendarActionHandler}/>
	<div class="full-calendar">
		<div bind:this="{calendarEl}"></div>
	</div>
</div>

<style>
    /* :global(.fc-event-title)  { 
      	font-family: "나눔고딕", "Nanum Gothic", sans-serif;
      	font-weight: bold;
    }
	:global(.fc-daygrid-block-event .fc-event-title) {
    	padding: 1px;
    	font-weight: 900;
	} */
</style>