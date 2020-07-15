import { createStoreon } from 'storeon';
import { storeonLogger } from 'storeon/devtools';

// eslint-disable-next-line import/no-cycle
import { waveManager } from './waveManager';
import { State, Events } from './types/types';
import { deviceConnector } from './deviceConnector';
import { kitNavigator } from './kitNavigator';
import { kitConfigurator } from './kitConfigurator';
import { IOReducer } from './IOReducer';
import { notificationReducer } from './notificationReducer';
import { versionCheckReducer } from './versionCheckReducer';

export const store = createStoreon<State, Events>([
    waveManager,
    deviceConnector,
    kitNavigator,
    kitConfigurator,
    IOReducer,
    notificationReducer,
    versionCheckReducer,
    process.env.NODE_ENV !== 'production' && storeonLogger
]);
