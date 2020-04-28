import { v4 as uuidv4 } from 'uuid';
import { Pad } from './Pad';
import { KitPrmType } from '../renderer/store/types/KitPrm';
import { Name } from './Name';
import { decimalToString } from './xmlUtils';
import Device from './Device';
import DeviceWave from './DeviceWave';

export class Kit {
    id: string = uuidv4();
    device: Device;
    object = {};
    path = '';
    kitName = new Name('New Kit', 'Nm');
    kitSubName = new Name('new kit Subname', 'SubNm');
    Level = 100;
    Tempo = 120;
    pad1 = new Pad(this.device);
    pad2 = new Pad(this.device);
    pad3 = new Pad(this.device);
    pad4 = new Pad(this.device);
    pad5 = new Pad(this.device);
    pad6 = new Pad(this.device);
    pad7 = new Pad(this.device);
    pad8 = new Pad(this.device);
    pad9 = new Pad(this.device);
    trigger1 = new Pad(this.device);
    trigger2 = new Pad(this.device);
    trigger3 = new Pad(this.device);
    trigger4 = new Pad(this.device);
    footSwitch1 = new Pad(this.device);
    footSwitch2 = new Pad(this.device);

    constructor(kitPrm: KitPrmType, path: string, device: Device, deviceWaveList: DeviceWave[]) {
        this.path = path;
        this.device = device;
        try {
            this.assignPads(kitPrm, deviceWaveList);
            this.assignNames(kitPrm);
            this.assignParams(kitPrm);
            this.object = kitPrm;
        } catch (e) {
            throw new Error(`Failed to initiate Kit class. ${e.message}`);
        }
    }

    assignPads(kitPrm: KitPrmType, deviceWaveList: DeviceWave[]) {
        const findWave = (WvNr: number, waveList: DeviceWave[]): DeviceWave | undefined => {
            if (WvNr < 0) return undefined;
            return waveList.find(deviceWave => deviceWave.wvNr === WvNr);
        };
        const { PadPrm } = kitPrm;
        this.pad1 = new Pad(this.device, PadPrm['0'], findWave(PadPrm['0'].Wv, deviceWaveList));
        this.pad2 = new Pad(this.device, PadPrm['1'], findWave(PadPrm['1'].Wv, deviceWaveList));
        this.pad3 = new Pad(this.device, PadPrm['2'], findWave(PadPrm['2'].Wv, deviceWaveList));
        this.pad4 = new Pad(this.device, PadPrm['3'], findWave(PadPrm['3'].Wv, deviceWaveList));
        this.pad5 = new Pad(this.device, PadPrm['4'], findWave(PadPrm['4'].Wv, deviceWaveList));
        this.pad6 = new Pad(this.device, PadPrm['5'], findWave(PadPrm['5'].Wv, deviceWaveList));
        this.pad7 = new Pad(this.device, PadPrm['6'], findWave(PadPrm['6'].Wv, deviceWaveList));
        this.pad8 = new Pad(this.device, PadPrm['7'], findWave(PadPrm['7'].Wv, deviceWaveList));
        this.pad9 = new Pad(this.device, PadPrm['8'], findWave(PadPrm['8'].Wv, deviceWaveList));
        this.trigger1 = new Pad(this.device, PadPrm['9'], findWave(PadPrm['9'].Wv, deviceWaveList));
        this.trigger2 = new Pad(
            this.device,
            PadPrm['10'],
            findWave(PadPrm['10'].Wv, deviceWaveList)
        );
        this.trigger3 = new Pad(
            this.device,
            PadPrm['11'],
            findWave(PadPrm['11'].Wv, deviceWaveList)
        );
        this.trigger4 = new Pad(
            this.device,
            PadPrm['12'],
            findWave(PadPrm['12'].Wv, deviceWaveList)
        );
        this.footSwitch1 = new Pad(
            this.device,
            PadPrm['13'],
            findWave(PadPrm['13'].Wv, deviceWaveList)
        );
        this.footSwitch2 = new Pad(
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

    asObject() {
        return this.object;
    }
}
