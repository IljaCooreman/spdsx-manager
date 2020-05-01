import { join } from 'path';
import { createNewKit, createKitFromPath } from '../src/classes/KitFactory';
import device, { createDevice, deleteDevice } from './mock/Device';
import io from '../src/classes/IO';

beforeAll(async () => {
    await createDevice();
});

describe('Kit class', () => {
    it('create a new kit at 000', () => {
        const kit = createNewKit(device, 0, []);
        const path = join(__dirname, './mock/temp/Roland/SPD-SX/KIT/kit000.spd');
        expect(kit.path).toBe(path);
        expect(io.exists(path)).toBeTruthy();
    });

    it('create a new kit at 099 then import it', () => {
        const kit = createNewKit(device, 99, []);
        const path = join(__dirname, './mock/temp/Roland/SPD-SX/KIT/kit099.spd');
        expect(io.exists(path)).toBeTruthy();
        expect(createKitFromPath(kit.path, device, [])).toBeTruthy();
    });
});

afterAll(() => {
    deleteDevice();
});
