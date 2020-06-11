import { DropResult } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import DeviceWave, { DndObject } from '../../classes/DeviceWave';
import { State, PadNames, WaveManagerEvents, PadWaveTypes } from '../store/types/types';
import Device from '../../classes/Device';
import { Kit } from '../../classes/Kit';
import io from '../../classes/IO';
import { parseDroppableId } from './parseDroppableId';
import { addWaveToDevice } from '../../classes/waveMgmt';
import { store } from '../store';
import { Pad } from '../../classes/Pad';

const updateWavePad = (pad: Pad, wave: DeviceWave | undefined, padWaveType?: PadWaveTypes) => {
    // 1 update class
    if (padWaveType === PadWaveTypes.sub) {
        pad.setSubWave(wave);
    } else {
        pad.setWave(wave);
    }
};

export const handleListToPadDrop = (
    { dndDeviceWaves, selectedKit, device, dndPadWaves }: State,
    { draggableId, source, destination }: DropResult
) => {
    const dest = parseDroppableId(destination?.droppableId);

    if (
        source.droppableId === destination?.droppableId ||
        !dest.padName ||
        !dest.padWaveType ||
        !dest.type ||
        !selectedKit
    ) {
        return {};
    }

    const dndObject = dndDeviceWaves.find(deviceWave => deviceWave.id === draggableId);
    if (!dndObject?.item) {
        // throw new Error('invalid wave found');
        console.error('invalid wave found');
        return {};
    }
    // update dndObject for pad
    updateWavePad(selectedKit[dest.padName], dndObject.item, dest.padWaveType);
    io.writeKitPrm(selectedKit.kitPrmObject, selectedKit.shortPath, device);

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
};

// drop from pad to other pad, switch or move
export const handlePadToPadDrop = (
    { selectedKit, device, dndPadWaves }: State,
    { source, destination }: DropResult
) => {
    const dest = parseDroppableId(destination?.droppableId);
    const src = parseDroppableId(source.droppableId);

    if (
        source.droppableId === destination?.droppableId ||
        !dest.padName ||
        !dest.padWaveType ||
        !dest.type ||
        !selectedKit
    ) {
        return {};
    }

    if (!src.padName || !src.padWaveType || !src.type) {
        console.error('Wrongly assuming you are dragging from a pad to a pad');
        return {};
        // throw new Error('Wrongly assuming you are dragging from a pad to a pad');
    }

    const srcObj = dndPadWaves[src.padName][src.padWaveType];
    const destObj = dndPadWaves[dest.padName][dest.padWaveType];

    if (!srcObj?.item) {
        console.error('something horribly wrong here!');
        return {};
    }
    // TODO: test if this works in all situations: e.g. main to sub
    updateWavePad(selectedKit[src.padName], destObj?.item, src.padWaveType);
    updateWavePad(selectedKit[dest.padName], srcObj.item, dest.padWaveType);
    io.writeKitPrm(selectedKit.kitPrmObject, selectedKit.shortPath, device);
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
};

export const handleLocalToPadDrop = (
    { dndLocalWaves, selectedKit, device, dndPadWaves }: State,
    { draggableId, source, destination }: DropResult
) => {
    const dest = parseDroppableId(destination?.droppableId);

    if (
        source.droppableId === destination?.droppableId ||
        !dest.padName ||
        !dest.padWaveType ||
        !dest.type ||
        !selectedKit
    ) {
        return {};
    }

    const dndObject = dndLocalWaves.find(localWave => localWave.id === draggableId);
    if (!dndObject?.item) {
        // throw new Error('invalid wave found');
        console.error('invalid wave found');
        return {};
    }
    // copy wave to device
    const deviceWave = addWaveToDevice(dndObject.item, device);
    store.dispatch(WaveManagerEvents.addExistingDeviceWave, deviceWave);
    // update dndObject for pad
    updateWavePad(selectedKit[dest.padName], deviceWave, dest.padWaveType);
    io.writeKitPrm(selectedKit.kitPrmObject, selectedKit.shortPath, device);

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
};
