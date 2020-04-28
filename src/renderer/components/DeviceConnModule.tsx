import * as React from 'react';
import { useStoreon } from 'storeon/react';
import { openImportDialog } from '../utils/openDialog';
import { State, WaveManagerEvents, DeviceConnectorEvents } from '../store/types/types';

const DeviceConnModule: React.FunctionComponent = () => {
    const { deviceIsConnected, dispatch } = useStoreon<State, WaveManagerEvents>(
        'deviceIsConnected'
    );
    const connectButton = (
        <button
            onClick={() =>
                openImportDialog(DeviceConnectorEvents.connect, {
                    title: 'Select path to device',
                    buttonLabel: 'Select',
                    properties: ['openDirectory'],
                    filters: []
                })
            }>
            Connect to device
        </button>
    );

    return (
        <div>
            <div>{deviceIsConnected ? 'connected to device' : 'no connection with device'}</div>
            {deviceIsConnected ? connectButton : connectButton}
            <hr />
        </div>
    );
};

export default DeviceConnModule;
