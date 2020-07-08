import { Kit } from '../../classes/Kit';
import { PadNames } from '../store/types/types';
import { Pad, PadWaveLocations } from '../../classes/Pad';

type WaveInPadMsg = { pad: Pad; location: PadWaveLocations };

export const findAllPadsWithWave = (kitList: Kit[], uuid: string): WaveInPadMsg[] => {
    const ac: WaveInPadMsg[] = [];
    return kitList.reduce((acc, kit) => {
        return [...acc, ...findWavesInKit(kit, uuid)];
    }, ac);
};

const findWavesInKit = (kit: Kit, uuid: string) => {
    const pads = [
        kit[PadNames.pad1],
        kit[PadNames.pad2],
        kit[PadNames.pad3],
        kit[PadNames.pad4],
        kit[PadNames.pad5],
        kit[PadNames.pad6],
        kit[PadNames.pad7],
        kit[PadNames.pad8],
        kit[PadNames.pad9],
        kit[PadNames.trigger1],
        kit[PadNames.trigger2],
        kit[PadNames.trigger3],
        kit[PadNames.trigger4],
        kit[PadNames.footSwitch1],
        kit[PadNames.footSwitch2]
    ];
    const result: WaveInPadMsg[] = [];
    return pads.reduce((acc, pad) => {
        switch (uuid) {
            case pad.SubWv?.uuid:
                return [...acc, { pad, location: PadWaveLocations.SubWv }];

            case pad.wave?.uuid:
                return [...acc, { pad, location: PadWaveLocations.wave }];

            default:
                return acc;
        }
    }, result);
};
