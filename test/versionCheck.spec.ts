import { isMinorVersionBehind } from '../src/renderer/utils/isMinorVersionBehind';

it('should be able to compare versions', () => {
    expect(isMinorVersionBehind('0.0.1', '0.1.1')).toBe(true);
    expect(isMinorVersionBehind('0.1.1', '1.0.1')).toBe(true);
    expect(isMinorVersionBehind('1.1.1', '1.1.1')).toBe(false);
    expect(() => {
        isMinorVersionBehind('1.1.1', '');
    }).toThrow();
});
