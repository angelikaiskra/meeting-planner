import { createContext, useContext, useState, PropsWithChildren, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { Notification } from './notifications-types';
import { setNotificationHandler } from './notification-handler';

export type NotificationsContextType = {
    notifications: Notification[];
    addNotification: (notification: Omit<Notification, 'id'>) => void;
    dismissNotification: (id: string) => void;
};

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const NotificationsProvider = ({ children }: PropsWithChildren) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = (notification: Omit<Notification, 'id'>) => {
        setNotifications((prev) => [
            ...prev,
            { id: nanoid(), ...notification },
        ]);
    };

    const dismissNotification = (id: string) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    };

    // Set global notification handler when the component mounts
    useEffect(() => {
        setNotificationHandler(addNotification);
    }, []);

    return (
        <NotificationsContext.Provider value={{ notifications, addNotification, dismissNotification }}>
            {children}
        </NotificationsContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationsContext);

    if (!context) {
        throw new Error('useNotifications must be used within a NotificationsProvider');
    }

    return context;
};
