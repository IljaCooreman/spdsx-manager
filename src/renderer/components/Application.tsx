import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Grid } from '@material-ui/core';
import DeviceConnModule from './DeviceConnModule';
import Kits from './Kits';
import DndContainer from './DndContainer';

require('./Main.scss');

const Application = () => {
    // const resampled = new Wave('./data/samples/Clap.wav').resampleForSpdsx();
    // io.localWriteFile(resampled, 'clap_resampled');

    return (
        <Grid container alignItems="stretch" style={{ maxHeight: '100vh' }} spacing={2}>
            <Grid item>
                <h1>SPD-SX wave manager</h1>
            </Grid>
            <DeviceConnModule />
            <DndContainer />
            {/* <Kits /> */}
        </Grid>
    );
};

export default hot(Application);
