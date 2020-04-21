import * as React from 'react';
import { useStoreon } from 'storeon/react';
import { openImportDialog } from '../utils/openDialog';
import { State, WaveManagerEvents } from '../store/types';

const WaveManager: React.FunctionComponent = () => {
    const { waves } = useStoreon<State, WaveManagerEvents>('waves');
    return (
        <div>
            <button onClick={openImportDialog}>import</button>
            <ul>
                {waves.map((wave: any) => (
                    <li key={wave.path}>{wave.fileName}</li>
                ))}
            </ul>
            <button>Export all</button>
        </div>
    );
};

export default WaveManager;
