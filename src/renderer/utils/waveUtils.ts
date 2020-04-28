import { join, parse } from 'path';
import io from '../../classes/IO';
import { xmlToObject } from '../../classes/xmlUtils';
import Device from '../../classes/Device';

export function lookupWaveFromParam(waveNr: number, device: Device) {
    const localPath = wvNrToPath(waveNr);
    join(device.path, '');
    // paramsList.find()
}

//   // return allFileNames;
// }

/**
 * list all the WvPrm files from the different folders
 * @param pathToDevice
 */
export function getAllParams(pathToDevice: string) {
    const foldersList = io.listFileNames(join(pathToDevice, 'Roland/SPD-SX/WAVE/PRM')); // e.g. [ '00', '01', '02' ]
    const acc: string[] = [];
    return foldersList.reduce((fullList, folder) => {
        return [
            ...fullList,
            ...io.listFileNames(join(pathToDevice, `Roland/SPD-SX/WAVE/PRM/${folder}`))
        ];
    }, acc);
}

// export function lookupWaveFromParam(pathToParam: string, pathToDevice: string) {
//   const wvPrm = xmlToObject(io.localReadFile(pathToParam))
//   const path = wvPrm.Path;
//   return io.localReadFile(join(pathToDevice, `Roland/SPD-SX/WAVE/DATA/${path}`))
// }

/**
 * e.g. insert 150, return 01/50
 * @param waveNr
 */
export function wvNrToPath(waveNr: number | string) {
    const nr = Number(waveNr);
    if (nr < 0) {
        return undefined;
    }
    if (nr > 9999) {
        throw new Error(
            `Wave number request out of bounds. Expected between 0 and 9999. Receveived ${nr}`
        );
    }
    const rest = `0${nr % 100}`.slice(-2);
    const prefix = `0${Math.floor(nr / 100)}`.slice(-2);
    return `${prefix}/${rest}`;
}

/**
 * convert path e.g. '01/09' to 109
 * @param shortPath
 */
export function pathToWvNr(shortPath: string): number {
    const filteredPath = shortPath.replace(/^\/+/, '');
    const [folder, digits] = filteredPath.split('/');
    const strippedDigits = parse(digits).name;
    if (folder.length > 2 || strippedDigits.length > 2) {
        throw new Error('Irregular path.');
    }
    return Number(folder) * 100 + Number(strippedDigits);
}

export function paramLookup(waveNr: number | string, device: Device) {
    const spdFile = io.localReadFile(
        join(device.path, `Roland/SPD-SX/WAVE/PRM/${wvNrToPath(waveNr)}.spd`)
    );
    return xmlToObject(spdFile);
}
export function waveLookup(waveNr: number | string, pathToDevice: string) {
    return io.localReadFile(
        join(pathToDevice, `Roland/SPD-SX/WAVE/DATA/${wvNrToPath(waveNr)}.wav`)
    );
}