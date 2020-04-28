/* eslint-disable no-new */
import { StoreonModule } from 'storeon';
// eslint-disable-next-line import/no-cycle
import { State, Events, WaveManagerEvents, DeviceConnectorEvents } from './types/types';
import Device from '../../classes/Device';

const initialState = {
    deviceIsConnected: false,
    device: undefined
};

export const deviceConnector: StoreonModule<State, Events> = store => {
    store.on('@init', () => initialState);

    store.on(DeviceConnectorEvents.connect, (_, [path]) => {
        return {
            device: new Device(path),
            deviceIsConnected: true
        };
    });

    store.on(DeviceConnectorEvents.disconnect, ({ deviceIsConnected }, _) => ({
        deviceIsConnected: false
    }));
};
