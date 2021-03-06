import { join, basename } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Name } from './Name';
import { paramLookup, wvNrToPath } from '../renderer/utils/waveUtils';
import Device from './Device';
import { WvPrmType } from '../renderer/store/types/WvPrm';
import { WaveNameType } from '../renderer/store/types/NameTypes';
import LocalWave from './LocalWave';
import { decimalToString, stripExtension } from './xmlUtils';

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
    name: Name;

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
            // this is a new wave, created from pc import
            if (!localWave) {
                throw new Error(
                    'cannot create new deviceWave instance with an invalid wave number'
                );
            }
            this.tag = 0;
            this.name = new Name(stripExtension(localWave.fileName), 'waveNm');
            this.wavePath = `${path?.split('/')[0]}/${basename(localWave.fullPath)}`;
            this.localWave = localWave;
        } else {
            // this is a wave that's already on device
            const {
                Tag,
                Nm0,
                Nm1,
                Nm2,
                Nm3,
                Nm4,
                Nm5,
                Nm6,
                Nm7,
                Nm8,
                Nm9,
                Nm10,
                Nm11,
                Path
            } = wvPrmObject;
            this.tag = Tag;
            this.name = new Name(
                decimalToString([Nm0, Nm1, Nm2, Nm3, Nm4, Nm5, Nm6, Nm7, Nm8, Nm9, Nm10, Nm11]),
                'waveNm'
            );
            this.wavePath = Path;
        }
    }

    get fileName() {
        return basename(this.wavePath);
    }

    get filePathOnDevice() {
        // '00/20'
        return wvNrToPath(this.wvNr);
    }

    get basePath() {
        return join(this.device.path, 'Roland/SPD-SX/WAVE');
    }

    get paramPath() {
        return join(this.basePath, `PRM/${this.filePathOnDevice}.spd`);
    }

    get fullPath() {
        return join(this.basePath, `DATA/${this.wavePath}`);
    }

    get WvPrmObject(): WvPrmType {
        const encodedNameObject = this.name.encodedObject;
        return {
            ...(encodedNameObject as WaveNameType),
            Tag: this.tag,
            Path: this.wavePath
        };
    }
}
