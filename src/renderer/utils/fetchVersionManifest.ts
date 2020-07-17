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
    spdsxDistributionUrl: string;
}

export async function fetchVersionManifest() {
    const manifestUrl = 'https://spdsx-releases.s3.eu-west-3.amazonaws.com/versionManifest.json';
    try {
        const { data } = await axios.get<Manifest>(manifestUrl);
        return data;
    } catch (e) {
        throw new Error(`Failed to fetch version manifest. ${e.message}`);
    }
}
