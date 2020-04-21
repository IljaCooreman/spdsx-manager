import { remote } from 'electron';
import { WaveManagerEvents } from '../store/types';
import { store } from '../store';

export const openImportDialog = (): void => {
    remote.dialog.showOpenDialog(
        {
            title: 'Import wave samples',
            buttonLabel: 'Import',
            properties: ['openFile', 'multiSelections'],
            filters: [{ name: 'Wave files', extensions: ['wav', 'wave'] }]
        },
        (paths: string[]) => {
            store.dispatch(WaveManagerEvents.import, paths);
        }
    );
};
