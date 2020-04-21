import { Wave } from '../../classes/Wave';

export interface State {
    waves: Wave[];
}

export enum WaveManagerEvents {
    import = 'waveManager/import',
    createNewWave = 'waveManager/createNewWave'
}

export interface Events {
    [WaveManagerEvents.import]: string[];
    'waveManager/createNewWave': string;
}
