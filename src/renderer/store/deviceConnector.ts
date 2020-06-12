/* eslint-disable no-new */
import { StoreonModule } from 'storeon';
// eslint-disable-next-line import/no-cycle
import { v4 as uuidv4 } from 'uuid';
import { State, Events, DeviceConnectorEvents, NotificationEvents } from './types/types';
import Device from '../../classes/Device';
import { Name } from '../../classes/Name';

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
                '/Users/coorem43/Documents/projects/prive/spdsx2/data/filestructure backup'
            ]);
            store.dispatch(NotificationEvents.showInfo, 'Connected to playground');
        }
    });

    store.on(DeviceConnectorEvents.connect, ({ deviceIsConnected }, [path]) => {
        if (deviceIsConnected) {
            store.dispatch(DeviceConnectorEvents.disconnect);
        }
        return {
            device: new Device(path),
            deviceIsConnected: true
        };
    });

    store.on(DeviceConnectorEvents.disconnect, ({ deviceIsConnected }, _) => ({
        ...initialState
    }));
};
