import { join, basename } from 'path';
import { Name } from './Name';
import { paramLookup, wvNrToPath } from '../renderer/utils/waveUtils';
import { decimalToString } from './xmlUtils';
import Device from './Device';
import { WvPrmType } from '../renderer/store/types/WvPrm';
import { NameType } from '../renderer/store/types/NameTypes';
import LocalWave from './LocalWave';

export default class DeviceWave {
    name: Name;
    device: Device;
    wvNr: number; // 120
    tag: number;
    wavePath: string; // '00/clap__.wav'
    localWave: LocalWave | undefined = undefined;

    constructor(device: Device, wvNr: number, localWave?: LocalWave) {
        this.device = device;
        this.wvNr = Number(wvNr);
        const path = wvNrToPath(wvNr);
        if (!path) {
            throw new Error('Cannot reference wave on device. Maybe it doesnt exist? (-1)');
        }

        const wvPrmObject: WvPrmType | undefined = paramLookup(wvNr, device)?.WvPrm;
        if (!wvPrmObject) {
            if (!localWave) {
                throw new Error(
                    'cannot create new deviceWave instance with an invalid wave number'
                );
            }
            this.tag = 0;
            this.name = new Name(localWave.fileName, 'Nm');
            this.wavePath = `${path?.split('/')[0]}/${basename(localWave.path)}`;
            this.localWave = localWave;
        } else {
            const { Tag, Nm0, Nm1, Nm2, Nm3, Nm4, Nm5, Nm6, Nm7, Path } = wvPrmObject;
            this.tag = Tag;
            this.name = new Name(decimalToString([Nm0, Nm1, Nm2, Nm3, Nm4, Nm5, Nm6, Nm7]), 'Nm');
            this.wavePath = Path;
        }
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

    get WvPrmObject(): WvPrmType {
        const encodedNameObject = this.name.encodedObject;
        return {
            ...(encodedNameObject as NameType),
            Tag: this.tag,
            Path: this.wavePath
        };
    }

    // eslint-disable-next-line class-methods-use-this
    static new(deviceWave: DeviceWave) {
        // create path
        // copy new wave file to path
        // create WvPrm file
        // return new DeviceWave()
    }
}
