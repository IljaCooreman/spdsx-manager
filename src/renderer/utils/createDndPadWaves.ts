import { v4 as uuidv4 } from 'uuid';
import { Kit } from '../../classes/Kit';
import { PadNames, DndPadWaves } from '../store/types/types';

export const createDndPadWaves = (kit: Kit): DndPadWaves => {
    return {
        [PadNames.pad1]: { main: { id: uuidv4(), item: kit[PadNames.pad1].wave }, sub: undefined },
        [PadNames.pad2]: { main: { id: uuidv4(), item: kit[PadNames.pad2].wave }, sub: undefined },
        [PadNames.pad3]: { main: { id: uuidv4(), item: kit[PadNames.pad3].wave }, sub: undefined },
        [PadNames.pad4]: { main: { id: uuidv4(), item: kit[PadNames.pad4].wave }, sub: undefined },
        [PadNames.pad5]: { main: { id: uuidv4(), item: kit[PadNames.pad5].wave }, sub: undefined },
        [PadNames.pad6]: { main: { id: uuidv4(), item: kit[PadNames.pad6].wave }, sub: undefined },
        [PadNames.pad7]: { main: { id: uuidv4(), item: kit[PadNames.pad7].wave }, sub: undefined },
        [PadNames.pad8]: { main: { id: uuidv4(), item: kit[PadNames.pad8].wave }, sub: undefined },
        [PadNames.pad9]: { main: { id: uuidv4(), item: kit[PadNames.pad9].wave }, sub: undefined },
        [PadNames.trigger1]: {
            main: { id: uuidv4(), item: kit[PadNames.trigger1].wave },
            sub: undefined
        },
        [PadNames.trigger2]: {
            main: { id: uuidv4(), item: kit[PadNames.trigger2].wave },
            sub: undefined
        },
        [PadNames.trigger3]: {
            main: { id: uuidv4(), item: kit[PadNames.trigger3].wave },
            sub: undefined
        },
        [PadNames.trigger4]: {
            main: { id: uuidv4(), item: kit[PadNames.trigger4].wave },
            sub: undefined
        },
        [PadNames.footSwitch1]: {
            main: { id: uuidv4(), item: kit[PadNames.footSwitch1].wave },
            sub: undefined
        },
        [PadNames.footSwitch2]: {
            main: { id: uuidv4(), item: kit[PadNames.footSwitch2].wave },
            sub: undefined
        }
    };
};
