import { join } from 'path';
import { Name } from './Name';
import { paramLookup, wvNrToPath } from '../renderer/utils/waveUtils';
import { decimalToString } from './xmlUtils';
import Wave from './Wave';
import Device from './Device';
import { WvPrmType } from '../renderer/store/types/WvPrm';

export default class DeviceWave {
    name: Name;
    device: Device;
    wvNr: number; // 120
    tag: number;
    wavePath: string;

    constructor(device: Device, wvNr: number) {
        this.device = device;
        this.wvNr = Number(wvNr);
        const path = wvNrToPath(wvNr);
        if (!path) {
            throw new Error('Cannot reference wave on device. Maybe it doesnt exist? (-1)');
        }

        const wvPrmObject: WvPrmType = paramLookup(wvNr, device).WvPrm;
        const { Tag, Nm0, Nm1, Nm2, Nm3, Nm4, Nm5, Nm6, Nm7, Path } = wvPrmObject;
        this.tag = Tag;
        this.name = new Name(decimalToString([Nm0, Nm1, Nm2, Nm3, Nm4, Nm5, Nm6, Nm7]), 'Nm');
        this.wavePath = Path;
    }

    get filePathOnDevice() {
        // '00/20'
        return wvNrToPath(this.wvNr);
    }

    get basePath() {
        return join(this.device.path, 'Roland/SPD_SX/WAVE');
    }

    get paramPath() {
        return join(this.basePath, `PRM/${this.filePathOnDevice}.spd`);
    }

    get fullWavePath() {
        return join(this.basePath, `DATA/${this.wavePath}`);
    }

    // eslint-disable-next-line class-methods-use-this
    static new(wave: Wave) {
        // create path
        // copy new wave file to path
        // create WvPrm file
        // return new DeviceWave()
    }
}