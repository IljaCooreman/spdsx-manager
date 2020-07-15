import { StoreonModule } from 'storeon';
// eslint-disable-next-line import/no-cycle

import { type } from 'os';
import { State, Events, VersionEvents } from './types/types';
import { fetchVersionManifest } from '../utils/fetchVersionManifest';
import { isMinorVersionBehind } from '../utils/isMinorVersionBehind';

export const versionCheckReducer: StoreonModule<State, Events> = async store => {
    store.on('@init', () => {
        store.dispatch(VersionEvents.checkVersion);
    });

    store.on(VersionEvents.checkVersion, async (_: State) => {
        const manifest = await fetchVersionManifest();
        if (!manifest?.latest?.version) {
            throw new Error('Failed to get latest version number');
        }
        if (
            isMinorVersionBehind(
                require('electron').remote.app.getVersion(),
                manifest?.latest?.version
            )
        ) {
            let downloadString = ``;
            // eslint-disable-next-line default-case
            switch (type()) {
                case 'Darwin':
                    downloadString = manifest.latest.downloadUrlMac
                        ? `Download link (mac): \n${manifest.latest.downloadUrlMac}`
                        : '';
                    break;
                case 'Windows_NT':
                    downloadString = manifest.latest.downloadUrlPc
                        ? `Download link (win): \n${manifest.latest.downloadUrlPc}`
                        : '';
                    break;
                case 'Linux':
                    downloadString = manifest.latest.downloadUrlLinux
                        ? `Download link (linux): \n${manifest.latest.downloadUrlLinux}`
                        : '';
            }
            // eslint-disable-next-line no-alert
            window.alert(
                `A new version of this software available. 
                
  - Latest version: ${manifest.latest.version}. 
  - Your version: ${require('electron').remote.app.getVersion()} 
                
${downloadString}`
            );
        }
    });
};
