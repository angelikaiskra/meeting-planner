import { notifyError } from '@/components/ui/notifications/notification-handler';
import Axios, { InternalAxiosRequestConfig } from 'axios';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
    if (config.headers) {
        config.headers.Accept = 'application/json';
    }

    return config;
}

export const api = Axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        console.log('error in response', error);
        const message = error.response?.data?.message || error.message;

        notifyError(message);

        return Promise.reject(error);
    },
);