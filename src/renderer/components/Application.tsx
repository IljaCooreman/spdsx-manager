import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Grid, Container } from '@material-ui/core';
import DeviceConnModule from './DeviceConnModule';
import Kits from './Kits';
import DndContainer from './DndContainer';

require('./Main.scss');

const Application = () => {
    return (
        <Container style={{ height: '100vh', display: 'flex', flexFlow: 'column' }}>
            <DeviceConnModule />
            <DndContainer />
        </Container>
    );
};

export default hot(Application);
