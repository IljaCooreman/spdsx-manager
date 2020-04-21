import { hot } from 'react-hot-loader/root';
import * as React from 'react';

import { Wave } from '../../classes/Wave';
import io from '../../classes/IO';
import { WaveManagerEvents } from '../store/types';
import { store } from '../store';
import WaveManager from './WaveManager';

const { dialog } = require('electron').remote;

const Application = () => {
    const resampled = new Wave('./data/samples/Clap.wav').resampleForSpdsx();
    io.localWriteFile(resampled, 'clap_resampled');

    return (
        <div>
            <WaveManager />
        </div>
    );
};

export default hot(Application);
