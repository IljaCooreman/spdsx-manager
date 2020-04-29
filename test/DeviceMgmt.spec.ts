import { join } from 'path';
import { existsSync } from 'fs';
import device, { createDevice, deleteDevice } from './mock/Device';
import { addWaveToDevice } from '../src/classes/waveManager';
import LocalWave from '../src/classes/LocalWave';
import io from '../src/classes/IO';

beforeEach(async () => {
    await createDevice();
});

describe('interact with the device', () => {
    it('copy a local wave to device', () => {
        const wave = new LocalWave(join(__dirname, './mock/test.wav'));
        const deviceWave = addWaveToDevice(wave, device);
        // console.log(io.listFileNames(join(__dirname, `./mock/temp/Roland/SPD-SX/WAVE/DATA/00`)));
        expect(existsSync(join(__dirname, `./mock/temp/Roland/SPD-SX/WAVE/PRM/00/00.spd`))).toBe(
            true
        );
        expect(existsSync(join(__dirname, `./mock/temp/Roland/SPD-SX/WAVE/DATA/00/test.wav`))).toBe(
            true
        );
        expect(deviceWave.name.name).toBe('test.wav');
        expect(deviceWave.wavePath).toBe('00/test.wav');
    });
});

afterAll(async () => {
    await deleteDevice();
});
