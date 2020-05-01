import { basename, parse } from 'path';
import { xmlToObject } from './xmlUtils';
import io from './IO';
import { hasWeirdFileName } from '../renderer/utils/hasWeirdFileName';
import { Kit } from './Kit';
import Device from './Device';
import DeviceWave from './DeviceWave';
import { kitPathToNumber } from '../renderer/utils/kitUtils';

export function createKitFromPath(path: string, device: Device, deviceWaveList: DeviceWave[]): Kit {
    try {
        if (hasWeirdFileName(basename(path))) {
            console.log(`Abnormal filename. skipping ${basename(path)}`);
        } // TODO: fix this issue
        const file = io.localReadFile(path);
        if (!file) throw new Error('Not a file');
        const object = xmlToObject(file);

        return new Kit(kitPathToNumber(path), device, deviceWaveList, object.KitPrm);
    } catch (e) {
        throw new Error(`Failed to initiate Kit class. ${e.message}`);
    }
}

export function createNewKit(device: Device, id: number, deviceWaveList: DeviceWave[]): Kit {
    const kit = new Kit(id, device, deviceWaveList);
    io.writeKitPrm(kit.kitPrmObject, kit.path, device);
    return kit;
}
