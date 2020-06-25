/* eslint-disable no-new */
import { StoreonModule } from 'storeon';
// eslint-disable-next-line import/no-cycle
import { State, Events, KitNavigatorEvents, DummyKit, IOEvents } from './types/types';
import { createNewKit } from '../../classes/KitFactory';
import { createDndPadWaves } from '../utils/createDndPadWaves';
import { Kit } from '../../classes/Kit';

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

    store.on(KitNavigatorEvents.reorder, (_: State, list: (Kit | DummyKit)[]) => {
        console.log('reordering in store');
        console.log(list);
        [...list].forEach((kit, i) => {
            if (kit.id !== i) {
                console.log(kit.id, i, list);
                switch (kit.type) {
                    case 'Kit':
                        // eslint-disable-next-line no-case-declarations
                        const castedKit = kit as Kit;
                        castedKit.setId(i);
                        store.dispatch(IOEvents.saveKitToDevice, castedKit);
                        break;
                    case 'EmptyKit':
                        store.dispatch(IOEvents.removeKit, i);
                        break;
                    default:
                        break;
                }
            }
        });
        return {
            kitList: list
        };
    });
};
