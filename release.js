const fs = require('fs');
const path = require('path');

const sourceBasePath = './release';
const destBasePath = '/Users/coorem43/Dropbox/spdsx-wave-manager';
const manifestPath = path.join(__dirname, 'public-release/versionManifest.json');
const downloadUrlBase =
    'https://github.com/IljaCooreman/spdsx-manager/tree/master/public-release/latest';

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

const copyFile = async (info, destFolder) => {
    return new Promise((resolve, reject) => {
        fs.copyFile(
            path.join(__dirname, sourceBasePath, info.fileName),
            path.join(destFolder, info.fileName),
            err => {
                if (err) {
                    console.log(err.message);
                    reject(err);
                }
                resolve();
            }
        );
    });
};

const removeAllFiles = async dir => {
    try {
        const files = await fs.readdirSync(dir);
        let promises = [];
        files.forEach(file => {
            promises.push(fs.unlinkSync(path.join(dir, file)));
        });
        await Promise.all(promises);
    } catch (e) {
        throw new Error('failed to remove files', e.message);
    }

    fs.readdirSync(dir, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlinkSync(path.join(dir, file), err => {
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
    const latestFolder = path.join(__dirname, 'public-release/latest');
    console.log('start copying files');
    // save to dropbox
    if (!fs.existsSync(destFolder)) {
        fs.mkdirSync(destFolder);
    }
    await copyFile(info.pc, destFolder);
    await copyFile(info.mac, destFolder);

    // save to latest folder in project
    if (!fs.existsSync(latestFolder)) {
        fs.mkdirSync(latestFolder);
    } else {
        await removeAllFiles(latestFolder);
    }
    await copyFile(info.pc, latestFolder);
    await copyFile(info.mac, latestFolder);
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
        downloadUrlMac: path.join(downloadUrlBase, info.mac.fileName),
        downloadUrlPc: path.join(downloadUrlBase, info.pc.fileName)
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
