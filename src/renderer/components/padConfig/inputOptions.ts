import {
    MuteGrpOptions,
    TempoSyncOptions,
    LoopOptions,
    TrigTypeOptions,
    DynamicsOptions,
    VoiceAssignOptions,
    PlayModeOptions,
    OutAsgnOptions
} from '../../store/types/types';

export const muteGrpOptions = [
    {
        key: MuteGrpOptions.OFF,
        value: 'Off'
    },
    {
        key: MuteGrpOptions.GRP1,
        value: 'Group 1'
    },
    {
        key: MuteGrpOptions.GRP2,
        value: 'Group 2'
    },
    {
        key: MuteGrpOptions.GRP3,
        value: 'Group 3'
    },
    {
        key: MuteGrpOptions.GRP4,
        value: 'Group 4'
    },
    {
        key: MuteGrpOptions.GRP5,
        value: 'Group 5'
    },
    {
        key: MuteGrpOptions.GRP6,
        value: 'Group 6'
    },
    {
        key: MuteGrpOptions.GRP7,
        value: 'Group 7'
    },
    {
        key: MuteGrpOptions.GRP8,
        value: 'Group 8'
    },
    {
        key: MuteGrpOptions.GRP9,
        value: 'Group 9'
    }
];

export const tempoSyncOptions = [
    {
        key: TempoSyncOptions.OFF,
        value: 'Off'
    },
    {
        key: TempoSyncOptions.ON,
        value: 'On'
    }
];

export const loopOptions = [
    {
        key: LoopOptions.OFF,
        value: 'Off'
    },
    {
        key: LoopOptions.ON,
        value: 'On'
    },
    {
        key: LoopOptions.x2,
        value: 'x2'
    },
    {
        key: LoopOptions.x4,
        value: 'x4'
    },
    {
        key: LoopOptions.x8,
        value: 'x8'
    }
];

export const trigTypeOptions = [
    {
        key: TrigTypeOptions.ALT,
        value: 'Alt'
    },
    {
        key: TrigTypeOptions.SHOT,
        value: 'Shot'
    }
];

export const dynamicsOptions = [
    {
        key: DynamicsOptions.OFF,
        value: 'Off'
    },
    {
        key: DynamicsOptions.ON,
        value: 'On'
    }
];

export const voiceAssignOptions = [
    {
        key: VoiceAssignOptions.MONO,
        value: 'Mono'
    },
    {
        key: VoiceAssignOptions.POLY,
        value: 'Poly'
    }
];

export const playModeOptions = [
    {
        key: PlayModeOptions.none,
        value: 'None'
    },
    {
        key: PlayModeOptions.SINGLE,
        value: 'Single'
    },
    {
        key: PlayModeOptions.PHRASE,
        value: 'Phrase'
    },
    {
        key: PlayModeOptions.LOOP,
        value: 'Loop'
    }
];

export const outAsgnOptions = [
    {
        key: OutAsgnOptions.MASTER,
        value: 'Master'
    },
    {
        key: OutAsgnOptions.FX1,
        value: 'FX1'
    },
    {
        key: OutAsgnOptions.FX2,
        value: 'Fx2'
    },
    {
        key: OutAsgnOptions.SUB,
        value: 'Sub'
    },
    {
        key: OutAsgnOptions.HEADPHONES,
        value: 'Headphones'
    }
];
