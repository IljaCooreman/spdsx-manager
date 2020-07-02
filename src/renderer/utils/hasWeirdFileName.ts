import { basename } from 'path';
/**
 * test whether a filename starts with ._
 * This happens in the device, not sure why. These files are unreadable
 * @param fileName short filename, e.g. kit001.spd or full path
 */
export const hasWeirdFileName = (fileName: string) => {
    return /^._/.test(basename(fileName));
};
