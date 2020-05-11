import { createStoreon } from 'storeon';
import { storeonLogger } from 'storeon/devtools';

// eslint-disable-next-line import/no-cycle
import { waveManager } from './waveManager';
import { State, Events } from './types/types';
import { deviceConnector } from './deviceConnector';
import { kitNavigator } from './kitNavigator';
import { kitConfigurator } from './kitConfigurator';

export const store = createStoreon<State, Events>([
    waveManager,
    deviceConnector,
    kitNavigator,
    kitConfigurator,
    process.env.NODE_ENV !== 'production' && storeonLogger
]);
