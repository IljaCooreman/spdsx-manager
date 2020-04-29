import { basename } from 'path';
import { xmlToObject } from './xmlUtils';
import io from './IO';
import { hasWeirdFileName } from '../renderer/utils/hasWeirdFileName';
import { Kit } from './Kit';
import Device from './Device';
import DeviceWave from './DeviceWave';

export function createKitFromPath(path: string, device: Device, deviceWaveList: DeviceWave[]): Kit {
    try {
        if (hasWeirdFileName(basename(path))) {
            console.log(`Abnormal filename. skipping ${basename(path)}`);
        } // TODO: fix this issue
        const object = xmlToObject(io.localReadFile(path));

        return new Kit(object.KitPrm, path, device, deviceWaveList);
    } catch (e) {
        throw new Error(`Failed to initiate Kit class. ${e.message}`);
    }
}
