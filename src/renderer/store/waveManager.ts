/* eslint-disable no-new */
import { StoreonModule } from 'storeon';
// eslint-disable-next-line import/no-cycle
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { State, Events, WaveManagerEvents } from './types/types';
import LocalWave from '../../classes/LocalWave';
import io from '../../classes/IO';
import DeviceWave from '../../classes/DeviceWave';
import { pathToWvNr } from '../utils/waveUtils';
import { addWaveToDevice } from '../../classes/waveMgmt';

const initialState = { localWaves: [], deviceWaves: [], dndDeviceWaves: [], dndLocalWaves: [] };

export const waveManager: StoreonModule<State, Events> = store => {
    store.on('@init', () => initialState);

    store.on('@changed', (_, { deviceIsConnected }) => {
        if (deviceIsConnected) {
            store.dispatch(WaveManagerEvents.importFromDevice);
        }
    });

    store.on(WaveManagerEvents.import, ({ localWaves }: State, paths) => {
        // prevent duplicate entries
        paths.forEach(path => {
            if (localWaves.find(wave => wave.fullPath === path)) {
                // we could dispatch a message action here
                console.log('this is already imported');
                return;
            }
            store.dispatch(WaveManagerEvents.createWave, path);
        });
    });

    store.on(WaveManagerEvents.createWave, ({ localWaves, dndLocalWaves }, path) => {
        const wave = new LocalWave(path);
        return {
            localWaves: [...localWaves, wave],
            dndLocalWaves: [...dndLocalWaves, { id: uuidv4(), item: wave }]
        };
    });

    // bulk import all waves on device
    store.on(WaveManagerEvents.importFromDevice, ({ device }, _) => {
        // get the list of files
        const path = join(device.path, 'Roland/SPD-SX/WAVE/PRM');
        const acc: string[] = [];
        const files = io.listFileNames(path);
        // create the correct path to the files
        const fileNames = files.reduce((result, folder) => {
            return [
                ...result,
                ...io.listFileNames(join(path, folder)).map(file => {
                    return `${folder}/${file}`;
                })
            ];
        }, acc);
        fileNames.forEach(file => {
            store.dispatch(WaveManagerEvents.addNewDeviceWave, file);
        });
    });

    store.on(
        WaveManagerEvents.addNewDeviceWave,
        ({ device, deviceWaves, dndDeviceWaves }, path) => {
            const deviceWave = new DeviceWave(device, pathToWvNr(path));
            return {
                deviceWaves: [...deviceWaves, deviceWave],
                dndDeviceWaves: [...dndDeviceWaves, { item: deviceWave, id: uuidv4() }]
            };
        }
    );

    store.on(
        WaveManagerEvents.addExistingDeviceWave,
        ({ deviceWaves, dndDeviceWaves }, deviceWave) => {
            return {
                deviceWaves: [...deviceWaves, deviceWave],
                dndDeviceWaves: [...dndDeviceWaves, { item: deviceWave, id: uuidv4() }]
            };
        }
    );
};
