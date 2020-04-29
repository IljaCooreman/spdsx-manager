import * as React from 'react';
import { useStoreon } from 'storeon/react';
import { openImportDialog } from '../utils/openDialog';
import { State, WaveManagerEvents } from '../store/types/types';
import LocalWave from '../../classes/LocalWave';
import { store } from '../store';

const WaveManager: React.FunctionComponent = () => {
    const { localWaves } = useStoreon<State, WaveManagerEvents>('localWaves');
    const onAddWaveClick = (wave: LocalWave) => {
        store.dispatch(WaveManagerEvents.addWaveToDevice, wave);
    };
    return (
        <div>
            <button onClick={() => openImportDialog(WaveManagerEvents.import, {})}>import</button>
            <ul>
                {localWaves.map((wave: LocalWave) => (
                    <li key={wave.path}>
                        {wave.fileName} <button onClick={() => onAddWaveClick(wave)}>add</button>
                    </li>
                ))}
            </ul>
            <button>Export all</button>
        </div>
    );
};

export default WaveManager;
