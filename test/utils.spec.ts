import { kitPathToNumber } from '../src/renderer/utils/kitUtils';

describe('utils', () => {
    it('extract kit number from path', () => {
        expect(kitPathToNumber('long/test/path/here')).toBeNaN();
        expect(kitPathToNumber('long/test/path/here/kit023.spd')).toBe(23);
        expect(kitPathToNumber('long/test/path/here/kit123.spd')).toBe(123);
        expect(kitPathToNumber('long/test/path/here/23')).toBe(23);
    });
});
