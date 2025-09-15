import { toast } from '@zerodevx/svelte-toast';
import { goto } from '$app/navigation';

function apiAlert(objAlert) {
    if (!objAlert) return;

    const { mainMessage, subMessage } = objAlert;
    let alertMsg;
    if (subMessage && typeof subMessage === 'object') {
        alertMsg = `${mainMessage}`;
        if (subMessage.code) alertMsg += `\n[${subMessage.code}]`;
        if (subMessage.message) alertMsg += ` ${subMessage.message}`;
    } else {
        alertMsg = `${mainMessage}`;
        if (subMessage) alertMsg += `\n${subMessage}`;
    }
    alert(alertMsg);
}

function apiConfirm(objConfirm) {
    if (!objConfirm) return;
    
    const { mainMessage, subMessage } = objConfirm;
    let alertMsg;
    if (subMessage && typeof subMessage === 'object') {
        alertMsg = `${mainMessage}`;
        if (subMessage.code) alertMsg += `\n[${subMessage.code}]`;
        if (subMessage.message) alertMsg += ` ${subMessage.message}`;
    } else {
        alertMsg = `${mainMessage}`;
        if (subMessage) alertMsg += `\n${subMessage}`;
    }
    const c = confirm(alertMsg);
    return c;
}

function toastAlert(message, gotoUrl, options) {
    if (!message) return;
    if (!options) options = {
        position: "top-right",
        duration: 700,
        theme: {
            '--toastBackground': 'cyan',
            '--toastColor': 'black',
        },
        ...options,
    };

    toast.push(message, { ...options });

    if (gotoUrl) {
        setTimeout(() => {
            goto(gotoUrl);
        }, options.duration);
    }
}

function toastError(message, gotoUrl, options) {
    toastAlert(message, gotoUrl, {
        position: "top-right",
        duration: 700,
        theme: {
            '--toastBackground': 'red',
            '--toastColor': 'white',
        }
    });
}

export { apiAlert, apiConfirm, toastAlert, toastError };
