import { wvNrToPath, pathToWvNr } from '../src/renderer/utils/waveUtils';
import { getAllParamFileNames } from '../src/renderer/utils/assignPath';

describe('wave utils', () => {
    it('can get a list of params files', () => {
        expect(getAllParamFileNames(`${__dirname}/mock/full_archive`).length).toEqual(270);
    });

    it('can get a short path from a number', () => {
        expect(wvNrToPath('120')).toBe('01/20');
        expect(wvNrToPath(0)).toBe('00/00');
        expect(wvNrToPath(-1)).toBeUndefined();
        // expect(wvNrToPath(10000)).toThrow();
    });

    it('can get a number from a short path', () => {
        expect(pathToWvNr('00/20')).toBe(20);
        expect(pathToWvNr('10/20')).toBe(1020);
        expect(pathToWvNr('/10/20')).toBe(1020);
        expect(pathToWvNr('/10/20.psd')).toBe(1020);
        // expect(pathToWvNr('/10/103')).toThrow()
        expect(wvNrToPath(pathToWvNr('00/01'))).toBe('00/01');
    });
});
