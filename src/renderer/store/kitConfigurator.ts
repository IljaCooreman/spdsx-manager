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
    store.on(
        KitConfiguratorEvents.dropOnPad,
        (
            { dndDeviceWaves, selectedKit, device, dndPadWaves }: State,
            { draggableId, source, destination }: DropResult
        ) => {
            const dest = parseDroppableId(destination?.droppableId);
            const src = parseDroppableId(source.droppableId);

            // drop on self, do nothing
            if (
                source.droppableId === destination?.droppableId ||
                !dest.padName ||
                !dest.padWaveType ||
                !dest.type ||
                !selectedKit
            ) {
                return {};
            }

            // drop from list to pad, copy
            if (parseDroppableId(source.droppableId).type === DroppableTypes.list) {
                const dndObject = dndDeviceWaves.find(deviceWave => deviceWave.id === draggableId);
                if (!dndObject?.item) {
                    // throw new Error('invalid wave found');
                    console.error('invalid wave found');
                    return {};
                }
                // update dndObject for pad
                updateWavePad(device, selectedKit, dest.padName, dndObject.item);

                return {
                    dndPadWaves: {
                        ...dndPadWaves,
                        [dest.padName]: {
                            ...dndPadWaves[dest.padName],
                            [dest.padWaveType]: {
                                id: uuidv4(),
                                item: dndObject.item
                            }
                        }
                    }
                };
            }

            // drop from pad to other pad, switch or move
            if (parseDroppableId(source.droppableId).type === DroppableTypes.pad) {
                if (!src.padName || !src.padWaveType || !src.type) {
                    console.error('Wrongly assuming you are dragging from a pad to a pad');
                    return {};
                    // throw new Error('Wrongly assuming you are dragging from a pad to a pad');
                }

                const srcObj = dndPadWaves[src.padName][src.padWaveType];
                const destObj = dndPadWaves[dest.padName][dest.padWaveType];

                if (!srcObj?.item) {
                    console.error('something horrably wrong here!');
                    return {};
                    // throw new Error('something horrably wrong here!');
                }
                // TODO: test if this works in all situations: e.g. main to sub
                updateWavePad(device, selectedKit, src.padName, destObj?.item);
                updateWavePad(device, selectedKit, dest.padName, srcObj.item);
                // drop from main to sub pad
                if (src.padName === dest.padName) {
                    return {
                        dndPadWaves: {
                            ...dndPadWaves,
                            [src.padName]: {
                                ...dndPadWaves[src.padName],
                                [src.padWaveType]: destObj,
                                [dest.padWaveType]: srcObj
                            }
                        }
                    };
                }

                return {
                    dndPadWaves: {
                        ...dndPadWaves,
                        [dest.padName]: {
                            ...dndPadWaves[dest.padName],
                            [dest.padWaveType]: srcObj
                        },
                        [src.padName]: {
                            ...dndPadWaves[src.padName],
                            [src.padWaveType]: destObj
                        }
                    }
                };
            }
        }
    );

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
