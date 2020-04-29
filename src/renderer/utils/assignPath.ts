import { join } from 'path';
import io from '../../classes/IO';
import Device from '../../classes/Device';
import { pathToWvNr, wvNrToPath } from './waveUtils';

export function assignPath(device: Device) {
    const numbers = listWavePaths(device).map(path => pathToWvNr(path));
    const missingNr = listMissingNumbers(numbers)[0];
    if (missingNr) {
        return {
            WvNr: missingNr,
            path: wvNrToPath(missingNr)
        };
    }
    const nextNr = Math.max(...numbers) + 1;
    if (nextNr > 9999) {
        throw new Error('Theres more than 10000 samples');
    }
    return {
        WvNr: nextNr,
        path: wvNrToPath(nextNr)
    };
}

function listMissingNumbers(numbers: number[]) {
    const accum: number[] = [];
    const mia = numbers.reduce((acc, cur, ind, arr) => {
        const diff = cur - arr[ind - 1];
        if (diff > 1) {
            let i = 1;
            while (i < diff) {
                acc.push(arr[ind - 1] + i);
                i += 1;
            }
        }
        return acc;
    }, accum);
    return mia;
}

// not used for now ...
export function listWavePaths(device: Device) {
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
