import * as React from 'react';
import { useStoreon } from 'storeon/react';
import { openImportDialog } from '../utils/openDialog';
import { State, WaveManagerEvents } from '../store/types/types';

const WaveManager: React.FunctionComponent = () => {
    const { localWaves } = useStoreon<State, WaveManagerEvents>('localWaves');
    return (
        <div>
            <button onClick={() => openImportDialog(WaveManagerEvents.import, {})}>import</button>
            <ul>
                {localWaves.map((wave: any) => (
                    <li key={wave.path}>{wave.fileName}</li>
                ))}
            </ul>
            <button>Export all</button>
        </div>
    );
};

export default WaveManager;
