const fs = require('fs');
const path = require('path');

const build = async () => {
    try {
        const { exec } = require('child_process');

        const promise = new Promise((resolve, reject) => {
            exec('npm run build-all', (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    reject(error);
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    reject(stderr);
                }
                console.log(`stdout: ${stdout}`);
                resolve();
            });
        });
        await promise;
    } catch (e) {
        return e;
    }
};

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

const removeAllFiles = dir => {
    fs.readdir(dir, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(dir, file), err => {
                if (err) throw err;
            });
        }
    });
};

const init = async () => {
    // 0. build
    console.log('start building images');
    // await build();
    // 1. copy files to correct location
    const info = getInfo(sourceBasePath);
    const destFolder = path.join(destBasePath, 'releases', info.pc.version);
    const latestFolder = path.join(destBasePath, 'releases/latest');
    console.log('start copying files');
    if (!fs.existsSync(destFolder)) {
        fs.mkdirSync(destFolder);
    }
    copyFile(info.pc, destFolder);
    copyFile(info.mac, destFolder);

    removeAllFiles(latestFolder);
    copyFile(info.pc, latestFolder);
    copyFile(info.mac, latestFolder);
    console.log('files copied.');

    // 2. update manifest
    console.log('start updating manifest');
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
    const newHistory = manifest.history.filter(release => {
        return release.version !== info.mac.version;
    });
    newHistory.push(versionObj);
    manifest.history = newHistory;

    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

    console.log('Manifest updated', versionObj);
    console.log('Success!');
};

init();