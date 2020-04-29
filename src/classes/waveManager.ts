import { join } from 'path';
import LocalWave from './LocalWave';
import { assignPath } from '../renderer/utils/assignPath';
import Device from './Device';
import io from './IO';
import DeviceWave from './DeviceWave';

export const addWaveToDevice = (wave: LocalWave, device: Device) => {
    const { path, WvNr } = assignPath(device);
    if (!path) {
        throw new Error('Cannot add wave to device. Incorrect path.');
    }
    // write wave
    const folder = path?.split('/')[0];
    const wavePath = `${folder}/${wave.fileName}`;

    io.createIfNotExists(join(device.path, `Roland/SPD-SX/WAVE/PRM/${path}`));
    io.createIfNotExists(join(device.path, `Roland/SPD-SX/WAVE/DATA/${wavePath}`));
    io.writeWaveFile(wave.wave.getSamples(), wavePath, device);
    console.log(path, WvNr, wavePath, folder);
    // write wvPrm
    io.writeWvPrm(new DeviceWave(device, WvNr, wavePath).WvPrmObject, WvNr, device);
};
