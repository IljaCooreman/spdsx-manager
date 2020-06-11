import { v4 as uuidv4 } from 'uuid';
import { Kit } from '../../classes/Kit';
import { PadNames, DndPadWaves } from '../store/types/types';

export const createDndPadWaves = (kit: Kit): DndPadWaves => {
    return {
        [PadNames.pad1]: {
            main: { id: uuidv4(), item: kit[PadNames.pad1].wave },
            sub: { id: uuidv4(), item: kit[PadNames.pad1].SubWv }
        },
        [PadNames.pad2]: {
            main: { id: uuidv4(), item: kit[PadNames.pad2].wave },
            sub: { id: uuidv4(), item: kit[PadNames.pad2].SubWv }
        },
        [PadNames.pad3]: {
            main: { id: uuidv4(), item: kit[PadNames.pad3].wave },
            sub: { id: uuidv4(), item: kit[PadNames.pad3].SubWv }
        },
        [PadNames.pad4]: {
            main: { id: uuidv4(), item: kit[PadNames.pad4].wave },
            sub: { id: uuidv4(), item: kit[PadNames.pad4].SubWv }
        },
        [PadNames.pad5]: {
            main: { id: uuidv4(), item: kit[PadNames.pad5].wave },
            sub: { id: uuidv4(), item: kit[PadNames.pad5].SubWv }
        },
        [PadNames.pad6]: {
            main: { id: uuidv4(), item: kit[PadNames.pad6].wave },
            sub: { id: uuidv4(), item: kit[PadNames.pad6].SubWv }
        },
        [PadNames.pad7]: {
            main: { id: uuidv4(), item: kit[PadNames.pad7].wave },
            sub: { id: uuidv4(), item: kit[PadNames.pad7].SubWv }
        },
        [PadNames.pad8]: {
            main: { id: uuidv4(), item: kit[PadNames.pad8].wave },
            sub: { id: uuidv4(), item: kit[PadNames.pad8].SubWv }
        },
        [PadNames.pad9]: {
            main: { id: uuidv4(), item: kit[PadNames.pad9].wave },
            sub: { id: uuidv4(), item: kit[PadNames.pad9].SubWv }
        },
        [PadNames.trigger1]: {
            main: { id: uuidv4(), item: kit[PadNames.trigger1].wave },
            sub: { id: uuidv4(), item: kit[PadNames.trigger1].SubWv }
        },
        [PadNames.trigger2]: {
            main: { id: uuidv4(), item: kit[PadNames.trigger2].wave },
            sub: { id: uuidv4(), item: kit[PadNames.trigger2].SubWv }
        },
        [PadNames.trigger3]: {
            main: { id: uuidv4(), item: kit[PadNames.trigger3].wave },
            sub: { id: uuidv4(), item: kit[PadNames.trigger3].SubWv }
        },
        [PadNames.trigger4]: {
            main: { id: uuidv4(), item: kit[PadNames.trigger4].wave },
            sub: { id: uuidv4(), item: kit[PadNames.trigger4].SubWv }
        },
        [PadNames.footSwitch1]: {
            main: { id: uuidv4(), item: kit[PadNames.footSwitch1].wave },
            sub: { id: uuidv4(), item: kit[PadNames.footSwitch1].SubWv }
        },
        [PadNames.footSwitch2]: {
            main: { id: uuidv4(), item: kit[PadNames.footSwitch2].wave },
            sub: { id: uuidv4(), item: kit[PadNames.footSwitch2].SubWv }
        }
    };
};
