const fs = require('fs');
const path = require('path');

console.log('start deployment');

const sourceBasePath = './release';
const destBasePath = '/Users/coorem43/Dropbox/spdsx-wave-manager';
const manifestPath = path.join(destBasePath, 'versionManifest.json');
const downloadUrlBase = 'https://www.dropbox.com/s/md5leb80l9jtp1v';
const downloadUrlSuffix = '?dl-1';

findPath = string => {
    const result = /(path: )([^\s].*)/.exec(string);
    if (result) return result[2];
    return undefined;
};
findVersion = string => {
    const result = /(version: )([^\s].*)/.exec(string);
    if (result) return result[2];
    return undefined;
};
getInfo = basePath => {
    const macLatestYml = fs.readFileSync(path.join(basePath, 'latest-mac.yml'), 'utf8');
    const pcLatestYml = fs.readFileSync(path.join(basePath, 'latest.yml'), 'utf8');
    return {
        pc: {
            platform: 'Windows',
            fileName: findPath(pcLatestYml),
            version: findVersion(pcLatestYml)
        },
        mac: {
            platform: 'Darwin',
            fileName: findPath(macLatestYml),
            version: findVersion(macLatestYml)
        }
    };
};

const copyFile = (info, destFolder) => {
    fs.copyFile(
        path.join(__dirname, sourceBasePath, info.fileName),
        path.join(destFolder, info.fileName),
        err => {
            if (err) {
                console.log(err.message);
                return err;
            }
        }
    );
};

// 1. copy files to correct location
const info = getInfo(sourceBasePath);
// const destFolder = path.join(destBasePath, 'releases', info.pc.version);
// if (!fs.existsSync(destFolder)) {
//     fs.mkdirSync(destFolder);
// }
// copyFile(info.pc, destFolder);
// copyFile(info.mac, destFolder);

// 2. update manifest
const manifest = require(manifestPath);

const versionObj = {
    version: info.mac.version,
    releaseDate: new Date().toISOString()
};
manifest.latest = {
    ...versionObj,
    downloadUrlMac: path.join(downloadUrlBase, info.mac.fileName) + downloadUrlSuffix,
    downloadUrlPc: path.join(downloadUrlBase, info.pc.fileName) + downloadUrlSuffix
};
manifest.history.push(versionObj);

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log(manifest);

console.log('done');
