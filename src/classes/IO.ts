/* eslint-disable class-methods-use-this */
import {
    writeFileSync,
    existsSync,
    mkdirSync,
    readFileSync,
    readdirSync,
    unlinkSync,
    PathLike
} from 'fs';
import { join, dirname } from 'path';
// eslint-disable-next-line import/no-cycle
import { wvNrToPath } from '../renderer/utils/waveUtils';
import { objectToXml, stripExtension } from './xmlUtils';
import Device from './Device';
import { WvPrmType } from '../renderer/store/types/WvPrm';
import { KitPrmType } from '../renderer/store/types/KitPrm';

const io = {
    localReadFile(path: string): string | undefined {
        try {
            return readFileSync(path, 'utf8');
        } catch (e) {
            console.log(e);
            return undefined;
        }
    },

    listFileNames(pathToFolder: string) {
        return readdirSync(pathToFolder);
    },

    writeFile(fullPath: string, content: string) {
        try {
            writeFileSync(fullPath, content);
        } catch (e) {
            throw new Error('unable to write file');
        }
    },

    createIfNotExists(path: string) {
        if (!existsSync(dirname(path))) {
            console.log(`path creator:`, dirname(path));
            mkdirSync(dirname(path));
            console.log(existsSync(dirname(path)));
        }
    },

    writeWvPrm(contentObject: WvPrmType, file: string | number, device: Device) {
        const path = typeof file === 'number' || Number(file) ? wvNrToPath(file) : file;
        this.writeFile(
            join(device.path, `Roland/SPD-SX/WAVE/PRM/${path}.spd`),
            objectToXml({ WvPrm: contentObject })
        );
    },

    writeKitPrm(contentObject: KitPrmType, fileName: string, device: Device) {
        this.writeFile(
            join(device.path, `Roland/SPD-SX/KIT/${stripExtension(fileName)}.spd`),
            objectToXml(contentObject)
        );
    },

    writeWaveFile(buffer: any, fileName: string, device: Device) {
        const path =
            typeof fileName === 'number' || Number(fileName) ? wvNrToPath(fileName) : fileName;
        writeFileSync(join(device.path, `Roland/SPD-SX/WAVE/DATA/${path}`), buffer);
    },

    removeFile(fullPath: PathLike) {
        try {
            unlinkSync(fullPath);
        } catch (e) {
            throw new Error('Failed to delete file');
        }
    }
};

export default io;
