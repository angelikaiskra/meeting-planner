import { Notification } from './notifications-types';

let notify: ((notification: Notification) => void) | null = null;

export const setNotificationHandler = (handler: typeof notify) => {
    notify = handler;
};

export const notifyError = (message: string) => {
    if (notify) {
        notify({
            type: 'error',
            title: 'Error',
            message,
        });
    } else {
        console.warn('Notification handler is not set.');
    }
};