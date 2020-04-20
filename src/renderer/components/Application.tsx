import { hot } from 'react-hot-loader/root';
import * as React from 'react';

import { readFileSync } from 'fs';
import CounterContainer from '../containers/CounterContainer';
import { Wave } from '../../classes/Wave';
import io from '../../classes/IO';

const Application = () => {
    const buffer = readFileSync('./data/samples/Clap.wav');
    const resampled = new Wave(buffer).resampleForSpdsx();
    io.localWriteFile(resampled, 'clap_resampled');

    const { dialog } = require('electron').remote;
    const promise = dialog.showOpenDialog({
        title: 'Import wave samples',
        buttonLabel: 'Import',
        properties: ['openFile', 'openDirectory', 'multiSelections'],
        filters: [{ name: 'Wave files', extensions: ['wav', 'wave'] }]
    });
    const dialogResult = promise;
    console.log(dialogResult);
    // dialog.showOpenDialog({ properties: ['openFile'] }))
    return (
        <div>
            <CounterContainer />
        </div>
    );
};

export default hot(Application);
