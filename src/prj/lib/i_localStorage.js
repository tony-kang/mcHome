import { browser } from '$app/environment';

const i_localStorage = {
    setItem(item, data) {
        if (!browser) return null;
        return localStorage.setItem(item, data);
    },
    
    getItem(item) {
        if (!browser) return null;
        return localStorage.getItem(item);
    },
    
    clear() {
        if (!browser) return;
        localStorage.clear();
    },
    
    deleteAllCookies() {
        if (!browser) return;
        const cookies = document.cookie.split(';');
      
        for (let cookie of cookies) {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.slice(0, eqPos).trim() : cookie.trim();
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
        }
    }
};

export default i_localStorage;
