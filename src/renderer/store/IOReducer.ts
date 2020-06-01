/* eslint-disable consistent-return */
/* eslint-disable no-new */
import { StoreonModule } from 'storeon';
// eslint-disable-next-line import/no-cycle
import { State, Events, IOEvents } from './types/types';
import { Kit } from '../../classes/Kit';
import io from '../../classes/IO';

export const IOReducer: StoreonModule<State, Events> = store => {
    store.on(IOEvents.saveKitToDevice, (_: State, kit: Kit) => {
        io.writeKitPrm(kit.kitPrmObject, kit.shortPath, kit.device);
    });
};
