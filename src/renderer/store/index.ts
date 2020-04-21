import { createStoreon } from 'storeon';
import { storeonLogger } from 'storeon/devtools';

// eslint-disable-next-line import/no-cycle
import { waveManager } from './waveManager';
import { State, Events } from './types';

export const store = createStoreon<State, Events>([
    waveManager,
    process.env.NODE_ENV !== 'production' && storeonLogger
]);
