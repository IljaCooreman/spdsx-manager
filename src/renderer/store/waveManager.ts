/* eslint-disable no-new */
import { StoreonModule } from 'storeon';
// eslint-disable-next-line import/no-cycle
import { State, Events, WaveManagerEvents } from './types';
import { Wave } from '../../classes/Wave';

const initialState = { waves: [] };

export const waveManager: StoreonModule<State, Events> = store => {
    store.on('@init', () => initialState);

    store.on(WaveManagerEvents.import, (state: State, paths) => {
        // prevent duplicate entries
        paths.forEach(path => {
            if (store.get().waves.find(wave => wave.path === path)) {
                // we could dispatch a message action here
                console.log('this is already imported');
                return;
            }
            store.dispatch('waveManager/createNewWave', path);
        });
    });

    store.on('waveManager/createNewWave', ({ waves }, path) => {
        const wave = new Wave(path);
        return {
            waves: [...waves, wave]
        };
    });
};
