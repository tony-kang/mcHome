import axios from "axios";
import { sampleEvent } from "./sampleEvent";

export async function ___getCalendarEvent(info) {
    const url = 'https://my-api.com';
    const path = '/v2/calendar/'
    const eStart = info.startStr;
    const eEnd = info.endStr;

    // eStart ~ eEnd 까지의 일정을 읽어 온다.
    try {
        // const response = await axios.get(`${url}${path}?start=${eStart}&end=${eEnd}`);
        // const events = response.data;
        
        // events 배열이 성공적으로 로드되면,
        console.log('달력 데이타 API로 불러오기');
        return [ ...sampleEvent ];
    } catch (error) {
        // error.response는 서버의 응답입니다. 
        // 에러 코드와 메시지를 확인하기 위해 사용할 수 있습니다.
        if (error.response) {
            console.log('Error status', error.response.status); 
            console.log('Error message', error.response.data);
            
            // API 호출에 실패하면,
            // failureCallback 함수를 오류와 함께 호출합니다.
            failureCallback(error);
        } else if (error.request) {
            // 요청이 만들어졌지만 응답을 받지 못한 경우
            console.log('No response was received', error.request);
            failureCallback(error);
        } else {
            // 그 외의 에러 처리
            console.log('Error', error.message);
            failureCallback(error);
        }
    }
}