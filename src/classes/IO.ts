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
import { store } from '../renderer/store';
import { NotificationEvents, DeviceConnectorEvents } from '../renderer/store/types/types';

const io = {
    localReadFile(path: string): string | undefined {
        try {
            return readFileSync(path, 'utf8');
        } catch (e) {
            if (existsSync(store.get().device?.path)) {
                store.dispatch(NotificationEvents.showError, `Failed to read file ${path}.`);
            } else {
                store.dispatch(DeviceConnectorEvents.disconnect);
            }
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
            if (existsSync(store.get().device?.path)) {
                store.dispatch(NotificationEvents.showError, `unable to save. ${fullPath}.`);
            } else {
                store.dispatch(DeviceConnectorEvents.disconnect);
            }
            console.log(e);
        }
    },

    exists(path: string) {
        return existsSync(path);
    },

    createIfNotExists(path: string) {
        if (!existsSync(dirname(path))) {
            try {
                console.log(`path creator:`, dirname(path));
                mkdirSync(dirname(path));
            } catch (e) {
                throw new Error(`Failed while trying to create a folder at ${dirname(path)}`);
            }
        }
    },

    /**
     * write a wave param to a file
     * @param contentObject waveParamType
     * @param file the number of the file OR the short wave path
     * @param device
     */
    writeWvPrm(contentObject: WvPrmType, file: string | number, device: Device) {
        const path = typeof file === 'number' || Number(file) ? wvNrToPath(file) : file;
        this.writeFile(
            join(device.path, `Roland/SPD-SX/WAVE/PRM/${path}.spd`),
            objectToXml({ WvPrm: contentObject })
        );
    },

    /**
     * overwrite a complete kit file to the device
     * @param contentObject a KitPrmType object
     * @param shortPath short shortPath, e.g. kit01 or kit01.spd
     * @param device
     */
    writeKitPrm(contentObject: KitPrmType, shortPath: string, device: Device) {
        this.writeFile(
            join(device.path, `Roland/SPD-SX/KIT/${stripExtension(shortPath)}.spd`),
            objectToXml({ KitPrm: contentObject })
        );
    },

    /**
     * Write an actual .wav to the device
     * @param buffer the buffer containing the sound data
     * @param fileName the number of the file OR the short wave path
     * @param device
     */
    writeWaveFile(buffer: any, fileName: string, device: Device) {
        const path =
            typeof fileName === 'number' || Number(fileName) ? wvNrToPath(fileName) : fileName;
        writeFileSync(join(device.path, `Roland/SPD-SX/WAVE/DATA/${path}.wav`), buffer);
    },

    removeFile(fullPath: PathLike) {
        try {
            unlinkSync(fullPath);
        } catch (e) {
            if (existsSync(store.get().device?.path)) {
                store.dispatch(NotificationEvents.showError, `Failed to remove file ${fullPath}.`);
            } else {
                store.dispatch(DeviceConnectorEvents.disconnect);
            }
        }
    }
};

export default io;
