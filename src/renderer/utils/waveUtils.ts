import { join, parse } from 'path';
// eslint-disable-next-line import/no-cycle
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

/**
 * lookup the param file for a given waveNumber. If it doesn't exist, return undefined
 * @param waveNr
 * @param device
 */
export function paramLookup(waveNr: number | string, device: Device) {
    const path = join(device.path, `Roland/SPD-SX/WAVE/PRM/${wvNrToPath(waveNr)}.spd`);
    if (!io.exists(path)) return undefined;
    const spdFile = io.localReadFile(path);
    if (!spdFile) {
        return undefined;
    }
    return xmlToObject(spdFile);
}

export function waveLookup(waveNr: number | string, pathToDevice: string) {
    return io.localReadFile(
        join(pathToDevice, `Roland/SPD-SX/WAVE/DATA/${wvNrToPath(waveNr)}.wav`)
    );
}
