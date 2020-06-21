import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Container } from '@material-ui/core';
import DeviceConnModule from './DeviceConnModule';
import DndContainer from './DndContainer';
import Notification from './Notification';

require('./Main.scss');

const Application = () => {
    return (
        <Container
            style={{ height: '100vh', display: 'flex', flexFlow: 'column', position: 'relative' }}
        >
            <DeviceConnModule />
            <DndContainer />
            <Notification />
        </Container>
    );
};

export default hot(Application);
