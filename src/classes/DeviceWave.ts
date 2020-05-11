import { join, basename } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Name } from './Name';
import { paramLookup, wvNrToPath } from '../renderer/utils/waveUtils';
import Device from './Device';
import { WvPrmType } from '../renderer/store/types/WvPrm';
import { NameType } from '../renderer/store/types/NameTypes';
import LocalWave from './LocalWave';

export interface DndObject<T> {
    id: string;
    item: T;
}
export default class DeviceWave {
    device: Device;
    uuid: string;
    wvNr: number; // 120
    tag: number;
    wavePath: string; // '00/clap__.wav'
    localWave: LocalWave | undefined = undefined;

    constructor(device: Device, wvNr: number, localWave?: LocalWave) {
        this.uuid = uuidv4();
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
            // this.name = new Name(localWave.fileName, 'Nm');
            this.wavePath = `${path?.split('/')[0]}/${basename(localWave.path)}`;
            this.localWave = localWave;
        } else {
            const { Tag, Nm0, Nm1, Nm2, Nm3, Nm4, Nm5, Nm6, Nm7, Path } = wvPrmObject;
            this.tag = Tag;
            // this.name = new Name(decimalToString([Nm0, Nm1, Nm2, Nm3, Nm4, Nm5, Nm6, Nm7]), 'Nm');
            this.wavePath = Path;
        }
    }

    get name() {
        return basename(this.wavePath);
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
        const encodedNameObject = new Name(this.name, 'Nm').encodedObject;
        return {
            ...(encodedNameObject as NameType),
            Tag: this.tag,
            Path: this.wavePath
        };
    }
}
