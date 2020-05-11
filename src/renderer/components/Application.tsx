import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Grid, Container } from '@material-ui/core';
import DeviceConnModule from './DeviceConnModule';
import Kits from './Kits';
import DndContainer from './DndContainer';

require('./Main.scss');

const Application = () => {
    return (
        <Container fixed style={{ height: '100vh', display: 'flex', flexFlow: 'column' }}>
            <Grid item>
                <h1>SPD-SX wave manager</h1>
            </Grid>
            <DeviceConnModule />
            <DndContainer />
        </Container>
    );
};

export default hot(Application);
