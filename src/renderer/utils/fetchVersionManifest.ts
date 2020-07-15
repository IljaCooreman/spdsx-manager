import axios from 'axios';

interface Manifest {
    latest: {
        version?: string;
        downloadUrlMac?: string;
        downloadUrlPc?: string;
        downloadUrlLinux?: string;
        releaseDate?: string;
        changelogUrl?: string;
    };
    history?: {
        version: string;
        releaseDate: string;
    }[];
}

export async function fetchVersionManifest() {
    const manifestUrl = 'https://www.dropbox.com/s/g0o3ew5uzaz5tye/versionManifest.json?dl=1';
    try {
        const { data } = await axios.get<Manifest>(manifestUrl);
        return data;
    } catch (e) {
        throw new Error(`Failed to fetch version manifest., ${e.message}`);
    }
}
