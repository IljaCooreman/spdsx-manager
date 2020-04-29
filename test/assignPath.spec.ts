import { assignPath } from '../src/renderer/utils/assignPath';
import device, { createDevice, deleteDevice } from './mock/Device';

beforeAll(async () => {
    await createDevice();
});

describe('assign path', () => {
    it('can choose a path', () => {
        expect(assignPath(device)).toStrictEqual({ WvNr: 200, path: '02/00' });
    });
});

afterAll(() => {
    deleteDevice();
});
