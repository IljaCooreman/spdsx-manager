import DeviceWave from '../src/classes/DeviceWave';
import device, { createDevice, deleteDevice } from './mock/Device';

beforeAll(async () => {
    await createDevice();
});

describe('deviceWave class', () => {
    it('inits a new wave on device', () => {
        const wave = new DeviceWave(device, 1);
        expect(wave.wavePath).toBe('00/Clap__01.wav');
        expect(wave.name).toBe('Clap__01.wav');
        expect(wave.fullPath).toBe(
            '/Users/coorem43/Documents/projects/prive/spdsx2/test/mock/temp/Roland/SPD-SX/WAVE/DATA/00/Clap__01.wav'
        );
    });
});

afterAll(() => {
    deleteDevice();
});
