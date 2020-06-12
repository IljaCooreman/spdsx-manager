import { StoreonModule } from 'storeon';
import { State, Events, IOEvents, NotificationEvents } from './types/types';

export const notificationReducer: StoreonModule<State, Events> = store => {
    store.on(NotificationEvents.showError, (_: State, message: string) => {
        return {
            notification: {
                type: 'error',
                message
            }
        };
    });
    store.on(NotificationEvents.showSuccess, (_: State, message: string) => {
        return {
            notification: {
                type: 'success',
                message
            }
        };
    });
    store.on(NotificationEvents.showInfo, (_: State, message: string) => {
        return {
            notification: {
                type: 'info',
                message
            }
        };
    });
};
