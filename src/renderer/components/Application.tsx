import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import styled from 'styled-components';
import { Container } from '@material-ui/core';
import DeviceConnModule from './DeviceConnModule';
import DndContainer from './DndContainer';
import Notification from './Notification';
import Version from './Version';

require('./Main.scss');

const Outer = styled.div`
    height: 100vh;
    display: flex;
    margin: 0 auto;
    flex-flow: column;
    position: relative;
    overflow: auto;
    max-width: 1200px;
`;

const Application = () => {
    return (
        <Outer>
            <DeviceConnModule />
            <DndContainer />
            <Notification />
            <Version />
        </Outer>
    );
};

export default hot(Application);
