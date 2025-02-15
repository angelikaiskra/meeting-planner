export type Notification = {
    id?: string;
    type: 'info' | 'warning' | 'success' | 'error';
    title: string;
    message?: string;
};