/* eslint-disable no-new */
import { StoreonModule } from 'storeon';
// eslint-disable-next-line import/no-cycle
import { State, Events, KitNavigatorEvents } from './types/types';
import { createNewKit } from '../../classes/KitFactory';
import { createDndPadWaves } from '../utils/createDndPadWaves';

export const kitNavigator: StoreonModule<State, Events> = store => {
    // @init happens in deviceConnector.ts

    store.on(KitNavigatorEvents.selectKit, (_, kit) => {
        if (!kit) return {};
        return { selectedKit: kit, dndPadWaves: createDndPadWaves(kit) };
    });

    store.on(KitNavigatorEvents.addKit, ({ kitList }, kit) => {
        const index = kit.id;
        const kitListCopy = [...kitList];
        kitListCopy[index] = kit;
        return {
            kitList: kitListCopy
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
            kitList: newKitList
        };
    });
};
