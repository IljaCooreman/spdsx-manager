/* eslint-disable no-new */
import { StoreonModule } from 'storeon';
// eslint-disable-next-line import/no-cycle
import { v4 as uuidv4 } from 'uuid';
import { State, Events, DeviceConnectorEvents, NotificationEvents } from './types/types';
import Device from '../../classes/Device';
import { Name } from '../../classes/Name';
import { validateDevicePath } from '../utils/validateDevicePath';

const initialState = {
    deviceIsConnected: false,
    device: undefined,
    selectedKit: undefined,
    kitList: [...new Array(100)].map((_, i) => ({
        id: i,
        uuid: uuidv4(),
        kitName: new Name('<empty>', 'Nm'),
        type: 'EmptyKit'
    })),
    localWaves: [],
    deviceWaves: [],
    dndDeviceWaves: [],
    dndLocalWaves: []
};

export const deviceConnector: StoreonModule<State, Events> = store => {
    store.on('@init', () => initialState);

    // connect automatically to a (virtual) device in dev mode
    store.on('@init', () => {
        if (process.env.NODE_ENV !== 'production') {
            store.dispatch(DeviceConnectorEvents.connect, [
                '/Users/coorem43/Documents/projects/prive/spdsx2/data/playground'
            ]);
            store.dispatch(NotificationEvents.showInfo, 'Connected to playground');
        }
    });

    store.on(DeviceConnectorEvents.connect, ({ deviceIsConnected }, [path]) => {
        if (deviceIsConnected) {
            store.dispatch(DeviceConnectorEvents.disconnect);
        }
        const strippedPath = validateDevicePath(path);
        if (!strippedPath) {
            store.dispatch(
                NotificationEvents.showError,
                'Could not connect to device. Wrong path?'
            );
            return {};
        }
        return {
            device: new Device(strippedPath),
            deviceIsConnected: true
        };
    });

    store.on(DeviceConnectorEvents.disconnect, ({ deviceIsConnected }, _) => {
        store.dispatch(NotificationEvents.showInfo, 'Disconnected from device');
        return {
            ...initialState
        };
    });
};
