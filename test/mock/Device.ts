import { join } from 'path';
import { ncp } from 'ncp';

import Device from '../../src/classes/Device';

const rimraf = require('rimraf');

export async function createDevice() {
    return new Promise((resolve, reject) => {
        ncp(join(__dirname, './full_archive'), join(__dirname, './temp'), err => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}

export function deleteDevice() {
    rimraf.sync(join(__dirname, './temp'));
}

const device = new Device(join(__dirname, './temp'));
export default device;
