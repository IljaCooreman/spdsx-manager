import { PadPrmType } from '../renderer/store/types/PadPrm';
import Device from './Device';
import DeviceWave from './DeviceWave';

export class Pad {
    wave: DeviceWave | undefined;
    level = 100;
    pan = 'center'; // L15 - center - R15
    muteGroup = 0;
    tempoSync = false;

    constructor(device: Device, pad?: PadPrmType, deviceWave?: DeviceWave) {
        if (pad) {
            const { WvPan, Wv, WvLevel } = pad;
            this.pan = String(WvPan);
            this.level = WvLevel;
            this.wave = Wv < 0 ? undefined : deviceWave;
        }
    }
}
