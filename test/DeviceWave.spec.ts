import DeviceWave from '../src/classes/DeviceWave';
import device, { createDevice, deleteDevice } from './mock/Device';

beforeAll(async () => {
    await createDevice();
});

describe('deviceWave class', () => {
    it('inits a new wave on device', () => {
        const wave = new DeviceWave(device, 0);
        expect(wave.wavePath).toBe('00/Clap_.wav');
        expect(wave.name.name).toBe('Clap_110');
        expect(wave.fullWavePath).toBe(
            '/Users/coorem43/Documents/projects/prive/spdsx2/test/mock/temp/Roland/SPD_SX/WAVE/DATA/00/Clap_.wav'
        );
    });
});

afterAll(() => {
    deleteDevice();
});
