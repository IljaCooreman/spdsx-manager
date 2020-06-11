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
    PadWaveTypes,
    PadPrmSpdTags
} from './types/types';

import io from '../../classes/IO';
import { parseDroppableId } from '../utils/parseDroppableId';
import Device from '../../classes/Device';
import { Kit } from '../../classes/Kit';
import DeviceWave from '../../classes/DeviceWave';
import { handleListToPadDrop, handlePadToPadDrop, handleLocalToPadDrop } from '../utils/dndUtils';
import { Pad } from '../../classes/Pad';

const updateWavePad = (
    device: Device,
    selectedKit: Kit,
    padName: PadNames,
    padWaveType?: PadWaveTypes
) => {
    // 1 update class
    if (padWaveType === PadWaveTypes.sub) {
        selectedKit[padName].setSubWave(undefined);
    } else {
        selectedKit[padName].setWave(undefined);
    }
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
            updateWavePad(device, selectedKit, src.padName, src.padWaveType);
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

    store.on(
        KitConfiguratorEvents.setPadParam,
        (
            { selectedPad }: State,
            { pad, paramType, value }: { pad: Pad; paramType: PadPrmSpdTags; value: number }
        ) => {
            switch (paramType) {
                case 'WvLevel':
                    pad.setWvLevel(value);
                    break;
                case 'WvPan':
                    pad.setWvPan(value);
                    break;
                case 'PlayMode':
                    pad.setPlayMode(value);
                    break;
                case 'OutAsgn':
                    pad.setOutAsgn(value);
                    break;
                case 'MuteGrp':
                    pad.setMuteGrp(value);
                    break;
                case 'TempoSync':
                    pad.setTempoSync(value);
                    break;
                // case 'PadMidiCh': pad.setPadMidiCh(value); break;
                // case 'NoteNum': pad.setNoteNum(value); break;
                // case 'MidiCtrl': pad.setMidiCtrl(value); break;
                case 'Loop':
                    pad.setLoop(value);
                    break;
                case 'TrigType':
                    pad.setTrigType(value);
                    break;
                // case 'GateTime': pad.setGateTime(value); break;
                case 'Dynamics':
                    pad.setDynamics(value);
                    break;
                case 'VoiceAsgn':
                    pad.setVoiceAsgn(value);
                    break;
                // case 'Reverse': pad.setReverse(value); break;
                case 'SubWvLevel':
                    pad.setSubWvLevel(value);
                    break;
                case 'SubWvPan':
                    pad.setSubWvPan(value);
                    break;

                default:
                    break;
            }
            // TODO: this is hacky, only to cause a retrigger
            return {
                selectedPad
            };
        }
    );
};
