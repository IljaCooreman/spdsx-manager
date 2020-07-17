const fs = require('fs');
const path = require('path');
const url = require('url');
const { copyFile } = require('./awsRepo');
const axios = require('axios').default;

const sourceBasePath = '../release';
const bucketBasePath = 'https://spdsx-releases.s3.eu-west-3.amazonaws.com';
const manifestFileName = 'versionManifest.json';
const manifestPath = url.resolve(bucketBasePath, manifestFileName);

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

const fetchFile = async url => {
    try {
        const { data } = await axios.get(url, {});
        return data;
    } catch (e) {
        throw new Error(`Failed to fetch file. ${e.message}`);
    }
};

const updateManifest = (oldManifest, info) => {
    const versionObj = {
        version: info.mac.version,
        releaseDate: new Date().toISOString(),
        downloadUrlMac: `${bucketBasePath}/${info.pc.version}/${info.mac.fileName}`,
        downloadUrlPc: `${bucketBasePath}/${info.pc.version}/${info.pc.fileName}`
    };
    oldManifest.latest = versionObj;
    const newHistory = oldManifest.history.filter(release => {
        return release.version !== info.mac.version;
    });
    newHistory.push(versionObj);
    oldManifest.history = newHistory;
    return { ...oldManifest };
};

const init = async () => {
    // 0. build
    console.log('start building images');
    await build();
    console.log('images built');
    const info = getInfo(sourceBasePath);

    console.log('start updating manifest');
    const oldManifest = await fetchFile(manifestPath);
    const newManifest = updateManifest(oldManifest, info);

    if (!fs.existsSync('./manifest')) {
        fs.mkdirSync('./manifest');
    }
    fs.writeFileSync('./manifest/versionManifest.json', JSON.stringify(newManifest, null, 2));
    console.log('new manifest created');
    console.log('start copying files');
    await copyFile(path.join(sourceBasePath, info.pc.fileName), info.pc.version);
    await copyFile(path.join(sourceBasePath, info.mac.fileName), info.mac.version);
    await copyFile('./manifest/versionManifest.json', '');
    console.log('All files uploaded. Build and release successful!', info.mac.version, 'Is live!');
};

try {
    init();
} catch (err) {
    console.log(err.message);
    process.exit();
}
