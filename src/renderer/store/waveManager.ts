/* eslint-disable no-new */
import { StoreonModule } from 'storeon';
// eslint-disable-next-line import/no-cycle
import { join } from 'path';
import { State, Events, WaveManagerEvents } from './types/types';
import LocalWave from '../../classes/LocalWave';
import io from '../../classes/IO';
import DeviceWave from '../../classes/DeviceWave';
import { pathToWvNr } from '../utils/waveUtils';
import { addWaveToDevice } from '../../classes/waveManager';

const initialState = { localWaves: [], deviceWaves: [] };

export const waveManager: StoreonModule<State, Events> = store => {
    store.on('@init', () => initialState);

    store.on('@changed', (_, { deviceIsConnected }) => {
        if (deviceIsConnected) {
            store.dispatch(WaveManagerEvents.importFromDevice);
        }
    });

    store.on(WaveManagerEvents.import, (state: State, paths) => {
        // prevent duplicate entries
        paths.forEach(path => {
            if (store.get().localWaves.find(wave => wave.path === path)) {
                // we could dispatch a message action here
                console.log('this is already imported');
                return;
            }
            store.dispatch(WaveManagerEvents.createWave, path);
        });
    });

    store.on(WaveManagerEvents.createWave, ({ localWaves }, path) => {
        const wave = new LocalWave(path);
        return {
            localWaves: [...localWaves, wave]
        };
    });

    store.on(WaveManagerEvents.importFromDevice, ({ device }, _) => {
        const path = join(device.path, 'Roland/SPD-SX/WAVE/PRM');
        const acc: string[] = [];
        const files = io.listFileNames(path);
        const fileNames = files.reduce((result, folder) => {
            return [
                ...result,
                ...io.listFileNames(join(path, folder)).map(file => {
                    return `${folder}/${file}`;
                })
            ];
        }, acc);

        const deviceWaveArray = fileNames.map(file => {
            console.log(device, file);
            return new DeviceWave(device, pathToWvNr(file));
        });
        return {
            deviceWaves: deviceWaveArray
        };
    });

    store.on(WaveManagerEvents.addWaveToDevice, ({ device }, wave) => {
        addWaveToDevice(wave, device);
    });
};
