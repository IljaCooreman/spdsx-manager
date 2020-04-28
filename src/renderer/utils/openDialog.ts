import { remote } from 'electron';
import { WaveManagerEvents, Events, DeviceConnectorEvents } from '../store/types/types';
import { store } from '../store';

export interface DialogOptions {
    title?: string;
    buttonLabel?: string;
    properties?: 'openFile' | 'openDirectory' | 'multiSelections'[];
    filters?: any[];
}

export const openImportDialog = (
    event: WaveManagerEvents.import | DeviceConnectorEvents.connect,
    options: any
): void => {
    const { title, buttonLabel, properties, filters } = options;
    remote.dialog.showOpenDialog(
        {
            title: title || 'Import wave samples',
            buttonLabel: buttonLabel || 'Import',
            properties: properties || ['openFile', 'multiSelections'],
            filters: filters || [{ name: 'Wave files', extensions: ['wav', 'wave'] }]
        },
        (paths: string[]) => {
            store.dispatch(event, paths);
        }
    );
};
