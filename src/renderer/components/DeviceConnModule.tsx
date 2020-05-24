import * as React from 'react';
import { useStoreon } from 'storeon/react';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import { openImportDialog } from '../utils/openDialog';
import { State, WaveManagerEvents, DeviceConnectorEvents } from '../store/types/types';

const DeviceConnModule: React.FunctionComponent = () => {
    const { deviceIsConnected } = useStoreon<State, WaveManagerEvents>('deviceIsConnected');
    const connectButton = (
        <Button
            variant="contained"
            color={deviceIsConnected ? 'default' : 'primary'}
            disableElevation={deviceIsConnected}
            onClick={() =>
                openImportDialog(DeviceConnectorEvents.connect, {
                    title: 'Select path to device',
                    ButtonLabel: 'Select',
                    properties: ['openDirectory'],
                    filters: []
                })
            }
        >
            {deviceIsConnected ? 'Other device' : 'Connect to device'}
        </Button>
    );

    return (
        <Grid item xs={2}>
            <div>{deviceIsConnected ? 'connected to device' : 'no connection with device'}</div>
            {connectButton}
            <hr />
        </Grid>
    );
};

export default DeviceConnModule;
