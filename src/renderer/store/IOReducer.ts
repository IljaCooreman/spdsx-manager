/* eslint-disable consistent-return */
/* eslint-disable no-new */
import { StoreonModule } from 'storeon';
import { join } from 'path';
// eslint-disable-next-line import/no-cycle
import { existsSync } from 'fs';
import { State, Events, IOEvents } from './types/types';
import { Kit } from '../../classes/Kit';
import io from '../../classes/IO';
import { kitIndexToShortPath } from '../utils/kitUtils';

export const IOReducer: StoreonModule<State, Events> = store => {
    store.on(IOEvents.saveKitToDevice, (_: State, kit: Kit) => {
        io.writeKitPrm(kit.kitPrmObject, kit.shortPath, kit.device);
    });

    store.on(IOEvents.removeKit, ({ device }: State, index: number) => {
        const path = join(device.path, `Roland/SPD-SX/KIT/${kitIndexToShortPath(index)}`);
        if (existsSync(path)) {
            io.removeFile(path);
        }
    });
};
