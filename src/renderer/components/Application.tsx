import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import DeviceConnModule from './DeviceConnModule';
import Kits from './Kits';
import DndContainer from './DndContainer';

require('./Main.scss');

const Application = () => {
    // const resampled = new Wave('./data/samples/Clap.wav').resampleForSpdsx();
    // io.localWriteFile(resampled, 'clap_resampled');

    return (
        <div>
            <h1>SPD-SX wave manager</h1>
            <DeviceConnModule />
            <DndContainer />
            <Kits />
        </div>
    );
};

export default hot(Application);
