import device, { createDevice, deleteDevice } from './mock/Device';

beforeEach(async () => {
    await createDevice();
});

describe('interact with the device', () => {
    it('can create a new wave', () => {
        expect(true).toBe(true);
    });
});

afterAll(() => {
    deleteDevice();
});
