import ___prj from '../prjMain';
import { googleCalendarConnected } from '../prjStore';

const i_googleCalendar = {
    async initGoogleAuth() {
        if (!window.gapi) return;
        
        try {
            await window.gapi.client.init({
                apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
                clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                scope: 'https://www.googleapis.com/auth/calendar.readonly'
            });

            const isSignedIn = window.gapi.auth2.getAuthInstance().isSignedIn.get();
            googleCalendarConnected.set(isSignedIn);
            
            return isSignedIn;
        } catch (error) {
            console.error('Google Calendar 초기화 실패:', error);
            return false;
        }
    },

    async saveGoogleAuthToken(userId, token) {
        try {
            const response = await ___prj.api.post('/api/calendar/save-token', {
                userId,
                googleToken: token
            });
            return response.data;
        } catch (error) {
            console.error('Google 토큰 저장 실패:', error);
            throw error;
        }
    },

    async getCalendarEvents(startDate, endDate) {
        try {
            const response = await ___prj.api.get('/api/calendar/events', {
                params: { startDate, endDate }
            });
            return response.data;
        } catch (error) {
            console.error('캘린더 이벤트 조회 실패:', error);
            throw error;
        }
    }
};

export default i_googleCalendar; 