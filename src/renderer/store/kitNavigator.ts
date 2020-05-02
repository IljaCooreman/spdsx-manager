/* eslint-disable no-new */
import { StoreonModule } from 'storeon';
// eslint-disable-next-line import/no-cycle
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { State, Events, KitNavigatorEvents } from './types/types';
import { createKitFromPath, createNewKit } from '../../classes/KitFactory';
import io from '../../classes/IO';
import { Name } from '../../classes/Name';

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

    // if connection status is changed, import all kits
    store.on(
        '@changed',
        ({ device, deviceWaves }, { deviceIsConnected, device: deviceHasChanged }) => {
            if (deviceIsConnected || (deviceHasChanged && deviceHasChanged.path)) {
                const pathToKits = join(device.path, 'Roland/SPD-SX/KIT');
                const fileNames = io.listFileNames(pathToKits);
                fileNames.forEach((file: string) => {
                    store.dispatch(
                        KitNavigatorEvents.addKit,
                        createKitFromPath(join(pathToKits, file), device, deviceWaves)
                    );
                });
            }
        }
    );

    store.on(KitNavigatorEvents.selectKit, ({ kitList }, kit) => {
        // const filteredKitList = kitList.filter(kit => kit.type === 'Kit') as Kit[]
        return { selectedKit: kit };
    });

    store.on(KitNavigatorEvents.addKit, ({ kitList }, kit) => {
        const index = kit.id;
        const kitListCopy = [...kitList];
        kitListCopy[index] = kit;
        return { kitList: kitListCopy };
    });

    store.on(KitNavigatorEvents.createNewKit, ({ kitList, device, deviceWaves }, id) => {
        const kit = createNewKit(device, id, deviceWaves);
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
