import { v4 as uuidv4 } from 'uuid';
import { Pad } from './Pad';
import { KitPrmType } from '../renderer/store/types/KitPrm';
import { Name } from './Name';
import { decimalToString } from './xmlUtils';
import Device from './Device';
import DeviceWave from './DeviceWave';
import { NameType, SubNameType } from '../renderer/store/types/NameTypes';
import { PadNames } from '../renderer/store/types/types';

export class Kit {
    id: string = uuidv4();
    device: Device;
    path = '';
    kitName = new Name('New Kit', 'Nm');
    kitSubName = new Name('new kit Subname', 'SubNm');
    Level = 100;
    Tempo = 120;
    [PadNames.pad1] = new Pad(this.device);
    [PadNames.pad2] = new Pad(this.device);
    [PadNames.pad3] = new Pad(this.device);
    [PadNames.pad4] = new Pad(this.device);
    [PadNames.pad5] = new Pad(this.device);
    [PadNames.pad6] = new Pad(this.device);
    [PadNames.pad7] = new Pad(this.device);
    [PadNames.pad8] = new Pad(this.device);
    [PadNames.pad9] = new Pad(this.device);
    [PadNames.trigger1] = new Pad(this.device);
    [PadNames.trigger2] = new Pad(this.device);
    [PadNames.trigger3] = new Pad(this.device);
    [PadNames.trigger4] = new Pad(this.device);
    [PadNames.footSwitch1] = new Pad(this.device);
    [PadNames.footSwitch2] = new Pad(this.device);

    constructor(kitPrm: KitPrmType, path: string, device: Device, deviceWaveList: DeviceWave[]) {
        this.path = path;
        this.device = device;
        try {
            this.assignPads(kitPrm, deviceWaveList);
            this.assignNames(kitPrm);
            this.assignParams(kitPrm);
        } catch (e) {
            throw new Error(`Failed to initiate Kit class. ${e.message}`);
        }
    }

    reassignPad(pad: Pad, targetPad: PadNames) {
        this[targetPad] = pad;
    }

    assignPads(kitPrm: KitPrmType, deviceWaveList: DeviceWave[]) {
        const findWave = (WvNr: number, waveList: DeviceWave[]): DeviceWave | undefined => {
            if (WvNr < 0) return undefined;
            return waveList.find(deviceWave => deviceWave.wvNr === WvNr);
        };
        const { PadPrm } = kitPrm;
        this[PadNames.pad1] = new Pad(
            this.device,
            PadPrm['0'],
            findWave(PadPrm['0'].Wv, deviceWaveList)
        );
        this[PadNames.pad2] = new Pad(
            this.device,
            PadPrm['1'],
            findWave(PadPrm['1'].Wv, deviceWaveList)
        );
        this[PadNames.pad3] = new Pad(
            this.device,
            PadPrm['2'],
            findWave(PadPrm['2'].Wv, deviceWaveList)
        );
        this[PadNames.pad4] = new Pad(
            this.device,
            PadPrm['3'],
            findWave(PadPrm['3'].Wv, deviceWaveList)
        );
        this[PadNames.pad5] = new Pad(
            this.device,
            PadPrm['4'],
            findWave(PadPrm['4'].Wv, deviceWaveList)
        );
        this[PadNames.pad6] = new Pad(
            this.device,
            PadPrm['5'],
            findWave(PadPrm['5'].Wv, deviceWaveList)
        );
        this[PadNames.pad7] = new Pad(
            this.device,
            PadPrm['6'],
            findWave(PadPrm['6'].Wv, deviceWaveList)
        );
        this[PadNames.pad8] = new Pad(
            this.device,
            PadPrm['7'],
            findWave(PadPrm['7'].Wv, deviceWaveList)
        );
        this[PadNames.pad9] = new Pad(
            this.device,
            PadPrm['8'],
            findWave(PadPrm['8'].Wv, deviceWaveList)
        );
        this[PadNames.trigger1] = new Pad(
            this.device,
            PadPrm['9'],
            findWave(PadPrm['9'].Wv, deviceWaveList)
        );
        this[PadNames.trigger2] = new Pad(
            this.device,
            PadPrm['10'],
            findWave(PadPrm['10'].Wv, deviceWaveList)
        );
        this[PadNames.trigger3] = new Pad(
            this.device,
            PadPrm['11'],
            findWave(PadPrm['11'].Wv, deviceWaveList)
        );
        this[PadNames.trigger4] = new Pad(
            this.device,
            PadPrm['12'],
            findWave(PadPrm['12'].Wv, deviceWaveList)
        );
        this[PadNames.footSwitch1] = new Pad(
            this.device,
            PadPrm['13'],
            findWave(PadPrm['13'].Wv, deviceWaveList)
        );
        this[PadNames.footSwitch2] = new Pad(
            this.device,
            PadPrm['14'],
            findWave(PadPrm['14'].Wv, deviceWaveList)
        );
    }

    assignNames(kitPrm: KitPrmType) {
        const {
            Nm0,
            Nm1,
            Nm2,
            Nm3,
            Nm4,
            Nm5,
            Nm6,
            Nm7,
            SubNm0,
            SubNm1,
            SubNm2,
            SubNm3,
            SubNm4,
            SubNm5,
            SubNm6,
            SubNm7,
            SubNm8,
            SubNm9,
            SubNm10,
            SubNm11,
            SubNm12,
            SubNm13,
            SubNm14,
            SubNm15
        } = kitPrm;

        this.kitName = new Name(decimalToString([Nm0, Nm1, Nm2, Nm3, Nm4, Nm5, Nm6, Nm7]), 'Nm');
        this.kitSubName = new Name(
            decimalToString([
                SubNm0,
                SubNm1,
                SubNm2,
                SubNm3,
                SubNm4,
                SubNm5,
                SubNm6,
                SubNm7,
                SubNm8,
                SubNm9,
                SubNm10,
                SubNm11,
                SubNm12,
                SubNm13,
                SubNm14,
                SubNm15
            ]),
            'SubNm'
        );
    }

    assignParams(kitPrm: KitPrmType) {
        const { Level, Tempo, Fx2Asgn, LinkPad0, LinkPad1, Fx2Sw, Fx1Sw } = kitPrm; // TODO: there is so much more to assign!!
        this.Level = Level;
        this.Tempo = Tempo;
    }

    get kitPrmObject(): KitPrmType {
        return {
            ...(this.kitName.encodedObject as NameType),
            ...(this.kitSubName.encodedObject as SubNameType),
            Tempo: this.Tempo,
            Level: this.Level,
            PadPrm: {
                '0': this[PadNames.pad1].padPrmObject,
                '1': this[PadNames.pad2].padPrmObject,
                '2': this[PadNames.pad3].padPrmObject,
                '3': this[PadNames.pad4].padPrmObject,
                '4': this[PadNames.pad5].padPrmObject,
                '5': this[PadNames.pad6].padPrmObject,
                '6': this[PadNames.pad7].padPrmObject,
                '7': this[PadNames.pad8].padPrmObject,
                '8': this[PadNames.pad9].padPrmObject,
                '9': this[PadNames.trigger1].padPrmObject,
                '10': this[PadNames.trigger2].padPrmObject,
                '11': this[PadNames.trigger3].padPrmObject,
                '12': this[PadNames.trigger4].padPrmObject,
                '13': this[PadNames.footSwitch1].padPrmObject,
                '14': this[PadNames.footSwitch2].padPrmObject
            },
            // TODO: map further from here
            Fx2Asgn: 0,
            LinkPad0: 0,
            LinkPad1: 0,
            Fx1Sw: 0,
            Fx1Type: 0,
            Fx1Prm0: 0,
            Fx1Prm1: 0,
            Fx1Prm2: 0,
            Fx1Prm3: 0,
            Fx1Prm4: 0,
            Fx1Prm5: 0,
            Fx1Prm6: 0,
            Fx1Prm7: 0,
            Fx1Prm8: 0,
            Fx1Prm9: 0,
            Fx1Prm10: 0,
            Fx1Prm11: 0,
            Fx1Prm12: 0,
            Fx1Prm13: 0,
            Fx1Prm14: 0,
            Fx1Prm15: 0,
            Fx1Prm16: 0,
            Fx1Prm17: 0,
            Fx1Prm18: 0,
            Fx1Prm19: 0,
            Fx2Sw: 0,
            Fx2Type: 0,
            Fx2Prm0: 0,
            Fx2Prm1: 0,
            Fx2Prm2: 0,
            Fx2Prm3: 0,
            Fx2Prm4: 0,
            Fx2Prm5: 0,
            Fx2Prm6: 0,
            Fx2Prm7: 0,
            Fx2Prm8: 0,
            Fx2Prm9: 0,
            Fx2Prm10: 0,
            Fx2Prm11: 0,
            Fx2Prm12: 0,
            Fx2Prm13: 0,
            Fx2Prm14: 0,
            Fx2Prm15: 0,
            Fx2Prm16: 0,
            Fx2Prm17: 0,
            Fx2Prm18: 0,
            Fx2Prm19: 0
        };
    }
}
