/* eslint-disable no-new */
import { StoreonModule } from 'storeon';
// eslint-disable-next-line import/no-cycle
import { join } from 'path';
import { State, Events, KitNavigatorEvents } from './types/types';
import { createKitFromPath } from '../../classes/KitFactory';
import io from '../../classes/IO';

const initialState = {
    selectedKit: '',
    kitList: []
};

export const kitNavigator: StoreonModule<State, Events> = store => {
    store.on('@init', () => initialState);

    // if connection status is changed, import all kits
    store.on(
        '@changed',
        ({ device, deviceWaves }, { deviceIsConnected, device: deviceHasChanged }) => {
            if (deviceIsConnected || (deviceHasChanged && deviceHasChanged.path)) {
                const pathToKits = join(device.path, 'Roland/SPD-SX/KIT');
                const fileNames = io.listFileNames(pathToKits);
                console.log(fileNames, fileNames.length);
                fileNames.forEach((file: string) => {
                    store.dispatch(
                        KitNavigatorEvents.createKit,
                        createKitFromPath(join(pathToKits, file), device, deviceWaves)
                    );
                });
            }
        }
    );

    store.on(KitNavigatorEvents.createKit, ({ kitList }, kit) => {
        return {
            kitList: [...kitList, kit]
        };
    });

    store.on(KitNavigatorEvents.selectKit, (_, kitId) => {
        return {
            selectedKit: kitId
        };
    });
};
