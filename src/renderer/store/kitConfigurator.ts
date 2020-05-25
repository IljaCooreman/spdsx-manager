/* eslint-disable consistent-return */
/* eslint-disable no-new */
import { StoreonModule } from 'storeon';
// eslint-disable-next-line import/no-cycle

import { DropResult } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import {
    State,
    Events,
    KitConfiguratorEvents,
    PadNames,
    DroppableTypes,
    PadWaveTypes
} from './types/types';

import io from '../../classes/IO';
import { parseDroppableId } from '../utils/parseDroppableId';
import Device from '../../classes/Device';
import { Kit } from '../../classes/Kit';
import DeviceWave from '../../classes/DeviceWave';
import { handleListToPadDrop, handlePadToPadDrop, handleLocalToPadDrop } from '../utils/dndUtils';

const updateWavePad = (
    device: Device,
    selectedKit: Kit,
    padName: PadNames,
    wave: DeviceWave | undefined
) => {
    // 1 update class
    selectedKit[padName].updateWave(wave);
    // 2 write on spdsx
    io.writeKitPrm(selectedKit.kitPrmObject, selectedKit.shortPath, device);
    // error: undo changes on class
    // TODO: see above
};

export const kitConfigurator: StoreonModule<State, Events> = store => {
    store.on(KitConfiguratorEvents.dropOnPad, (state: State, dropResult: DropResult) => {
        const { droppableId } = dropResult.source;

        switch (parseDroppableId(droppableId).type) {
            case DroppableTypes.list:
                return handleListToPadDrop(state, dropResult);

            case DroppableTypes.pad:
                return handlePadToPadDrop(state, dropResult);

            case DroppableTypes.local:
                return handleLocalToPadDrop(state, dropResult);

            default:
                console.error('unknown source!');
                return {};
        }
    });

    store.on(KitConfiguratorEvents.clickOnPad, (_: State, padName: PadNames) => {
        return {
            selectedPad: padName
        };
    });

    store.on(
        KitConfiguratorEvents.removeWaveFromPad,
        ({ device, selectedKit, dndPadWaves }: State, { draggableId, source }) => {
            const src = parseDroppableId(source.droppableId);
            if (!selectedKit || !src.padName || !src.padWaveType) return {};
            updateWavePad(device, selectedKit, src.padName, undefined);
            return {
                dndPadWaves: {
                    ...dndPadWaves,
                    [src.padName]: {
                        ...dndPadWaves[src.padName],
                        [src.padWaveType]: undefined
                    }
                }
            };
        }
    );
};
