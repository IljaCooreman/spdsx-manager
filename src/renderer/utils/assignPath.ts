import { join } from 'path';
import io from '../../classes/IO';
import Device from '../../classes/Device';
import { pathToWvNr, wvNrToPath } from './waveUtils';
import { hasWeirdFileName } from './hasWeirdFileName';

export function assignPath(device: Device) {
    const numbers = listWavePaths(device)
        .map(path => {
            if (hasWeirdFileName(path)) {
                return undefined;
            }
            return pathToWvNr(path);
        })
        .filter(number => number);
    const castedNumbers = numbers as number[];
    const missingNr = findMissingNumber(castedNumbers);
    if (missingNr !== undefined && missingNr >= 0) {
        return {
            WvNr: missingNr,
            path: wvNrToPath(missingNr)
        };
    }
    const nextNr = Math.max(...castedNumbers) + 1;
    if (nextNr > 9999) {
        throw new Error('Theres more than 10000 samples');
    }
    return {
        WvNr: nextNr,
        path: wvNrToPath(nextNr)
    };
}

function findMissingNumber(numbers: number[]) {
    return numbers
        .sort((prev, next) => prev - next)
        .findIndex((next, i) => {
            if (i > next) throw new Error('Something wrong with the wave file numbering!!');
            return i < next;
        });
}

/**
 * List all full paths to waves on the device as a flat array of strings
 * @param device
 */
export function listWavePaths(device: Device): string[] {
    const acc: string[] = [];
    const path = join(device.path, `Roland/SPD-SX/WAVE/PRM`);
    const files = io.listFileNames(path);
    return files.reduce((result, folder) => {
        return [
            ...result,
            ...io.listFileNames(join(path, folder)).map(file => {
                return `${folder}/${file}`;
            })
        ];
    }, acc);
}

/**
 * list all the WvPrm files from the different folders
 * @param pathToDevice
 */
export function getAllParamFileNames(pathToDevice: string) {
    const foldersList = io.listFileNames(join(pathToDevice, 'Roland/SPD-SX/WAVE/PRM')); // e.g. [ '00', '01', '02' ]
    const acc: string[] = [];
    return foldersList.reduce((fullList, folder) => {
        return [
            ...fullList,
            ...io.listFileNames(join(pathToDevice, `Roland/SPD-SX/WAVE/PRM/${folder}`))
        ];
    }, acc);
}
