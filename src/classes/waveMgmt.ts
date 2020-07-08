import { join } from 'path';
import LocalWave from './LocalWave';
import { assignPath } from '../renderer/utils/assignPath';
import Device from './Device';
import io from './IO';
import DeviceWave from './DeviceWave';

/**
 * write a file from pc storage to the selected (spdsx) device
 * @param wave LocalWave class instance
 * @param device
 */
export const addWaveToDevice = (wave: LocalWave, device: Device): DeviceWave => {
    const { path, WvNr } = assignPath(device);
    if (!path) {
        throw new Error('Cannot add wave to device. Incorrect path.');
    }
    // write wave
    const folder = path?.split('/')[0];
    const wavePath = `${folder}/${wave.name.name}`;

    io.createIfNotExists(join(device.path, `Roland/SPD-SX/WAVE/PRM/${path}`));
    io.createIfNotExists(join(device.path, `Roland/SPD-SX/WAVE/DATA/${path}`));
    io.writeWaveFile(wave.wave.toBuffer(), wavePath, device);
    // write wvPrm
    const deviceWave = new DeviceWave(device, WvNr, wave);
    io.writeWvPrm(deviceWave.WvPrmObject, WvNr, device);
    return deviceWave;
};
