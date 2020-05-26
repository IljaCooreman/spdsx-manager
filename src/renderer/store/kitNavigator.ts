/* eslint-disable no-new */
import { StoreonModule } from 'storeon';
// eslint-disable-next-line import/no-cycle
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import {
    State,
    Events,
    KitNavigatorEvents,
    DeviceConnectorEvents,
    KitConfiguratorEvents
} from './types/types';
import { createKitFromPath, createNewKit } from '../../classes/KitFactory';
import io from '../../classes/IO';
import { Name } from '../../classes/Name';
import { createDndPadWaves } from '../utils/createDndPadWaves';

const initialState = {
    selectedKit: undefined,
    kitList: [...new Array(100)].map((_, i) => ({
        id: i,
        uuid: uuidv4(),
        kitName: new Name('<empty>', 'Nm'),
        type: 'EmptyKit'
    }))
};

export const kitNavigator: StoreonModule<State, Events> = store => {
    store.on('@init', () => initialState);
    // TODO: do only in development
    // connect automatically to a (virtual) device
    store.on('@init', () => {
        store.dispatch(DeviceConnectorEvents.connect, [
            '/Users/coorem43/Documents/projects/prive/spdsx2/data/playground'
        ]);
    });

    // if connection status is changed, import all kits
    store.on(
        '@changed',
        ({ device, deviceWaves }, { deviceIsConnected, device: deviceHasChanged }) => {
            if (deviceIsConnected || (deviceHasChanged && deviceHasChanged.path)) {
                const pathToKits = join(device.path, 'Roland/SPD-SX/KIT');
                const fileNames = io.listFileNames(pathToKits);
                fileNames.forEach((file: string) => {
                    const kit = createKitFromPath(join(pathToKits, file), device, deviceWaves);
                    store.dispatch(KitNavigatorEvents.addKit, kit);
                });
            }
        }
    );

    store.on(KitNavigatorEvents.selectKit, ({ kitList }, kit) => {
        if (!kit) return {};
        return { selectedKit: kit, dndPadWaves: createDndPadWaves(kit) };
    });

    store.on(KitNavigatorEvents.addKit, ({ kitList }, kit) => {
        const index = kit.id;
        const kitListCopy = [...kitList];
        kitListCopy[index] = kit;
        return {
            kitList: kitListCopy,
            dndPadWaves: createDndPadWaves(kit)
        };
    });

    store.on(KitNavigatorEvents.createNewKit, ({ kitList, device, deviceWaves }, id) => {
        const kit = createNewKit(device, id, deviceWaves);
        const index = kitList.findIndex(kt => kt.id === id);
        const newKitList = [...kitList];
        if (index !== -1) {
            newKitList[index] = kit;
        }
        return {
            kitList: newKitList,
            dndPadWaves: createDndPadWaves(kit)
        };
    });
};
