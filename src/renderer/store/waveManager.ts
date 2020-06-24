/* eslint-disable no-new */
import { StoreonModule } from 'storeon';
// eslint-disable-next-line import/no-cycle
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import {
    State,
    Events,
    WaveManagerEvents,
    NotificationEvents,
    KitNavigatorEvents
} from './types/types';
import LocalWave from '../../classes/LocalWave';
import io from '../../classes/IO';
import DeviceWave, { DndObject } from '../../classes/DeviceWave';
import { pathToWvNr } from '../utils/waveUtils';
import { Kit } from '../../classes/Kit';
import { createKitFromPath } from '../../classes/KitFactory';

export const waveManager: StoreonModule<State, Events> = store => {
    // first, import waves
    store.on('@changed', (_, { deviceIsConnected }) => {
        if (deviceIsConnected) {
            // import waves from device
            store.dispatch(WaveManagerEvents.importFromDevice);
            store.dispatch(NotificationEvents.showSuccess, 'Connected');
        }
    });

    // second, import all kits
    store.on(
        '@changed',
        // eslint-disable-next-line consistent-return
        ({ device, deviceWaves, kitList }, { deviceIsConnected, device: deviceHasChanged }) => {
            if (deviceIsConnected || (deviceHasChanged && deviceHasChanged.path)) {
                const pathToKits = join(device.path, 'Roland/SPD-SX/KIT');
                const fileNames = io.listFileNames(pathToKits);
                const kitListCopy = [...kitList];

                // easier rewritten with a reduce
                fileNames.forEach((file: string) => {
                    try {
                        const kit = createKitFromPath(join(pathToKits, file), device, deviceWaves);
                        kitListCopy[kit.id] = kit;
                    } catch (e) {
                        store.dispatch(
                            NotificationEvents.showError,
                            `Failed to read kit. ${e.message}`
                        );
                    }
                });

                // select first kit, if exists
                const firstRealKit = kitListCopy.find(kit => kit.type === 'Kit');
                if (firstRealKit) {
                    const typedAsKit = firstRealKit as Kit;
                    store.dispatch(KitNavigatorEvents.selectKit, typedAsKit);
                }

                return {
                    kitList: kitListCopy
                };
            }
        }
    );

    store.on(WaveManagerEvents.import, ({ localWaves }: State, paths) => {
        // prevent duplicate entries
        paths.forEach(path => {
            if (localWaves.find(wave => wave.fullPath === path)) {
                // we could dispatch a message action here
                store.dispatch(NotificationEvents.showInfo, 'This wave is already imported');
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

        const acc2: { deviceWaves: DeviceWave[]; dndDeviceWaves: DndObject<DeviceWave>[] } = {
            deviceWaves: [],
            dndDeviceWaves: []
        };
        // eslint-disable-next-line no-shadow
        const result = fileNames.reduce((acc2, path2: string) => {
            try {
                const deviceWave = new DeviceWave(device, pathToWvNr(path2));
                acc2.deviceWaves.push(deviceWave);
                acc2.dndDeviceWaves.push({
                    item: deviceWave,
                    id: uuidv4()
                });
            } catch (e) {
                store.dispatch(
                    NotificationEvents.showError,
                    `Failed to import a wave from your device. Path ${path2}`
                );
            }
            return acc2;
        }, acc2);

        return result;
    });

    // TODO: remove this, it's unused
    // store.on(
    //     WaveManagerEvents.addNewDeviceWave,
    //     ({ device, deviceWaves, dndDeviceWaves }, path) => {
    //         try {
    //             const deviceWave = new DeviceWave(device, pathToWvNr(path));
    //             return {
    //                 deviceWaves: [...deviceWaves, deviceWave],
    //                 dndDeviceWaves: [...dndDeviceWaves, { item: deviceWave, id: uuidv4() }]
    //             };
    //         } catch (e) {
    //             console.log('#### ERROR: ', e);
    //             store.dispatch(
    //                 NotificationEvents.showError,
    //                 `Failed to import a wave from your device. Path ${path}`
    //             );
    //             return {
    //                 deviceWaves,
    //                 dndDeviceWaves
    //             };
    //         }
    //     }
    // );

    store.on(
        WaveManagerEvents.addExistingDeviceWave,
        ({ deviceWaves, dndDeviceWaves }, deviceWave) => {
            return {
                deviceWaves: [deviceWave, ...deviceWaves],
                dndDeviceWaves: [{ item: deviceWave, id: uuidv4() }, ...dndDeviceWaves]
            };
        }
    );
};
