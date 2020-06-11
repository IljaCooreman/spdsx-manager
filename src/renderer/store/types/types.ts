import { DropResult } from 'react-beautiful-dnd';
import { Kit } from '../../../classes/Kit';
import LocalWave from '../../../classes/LocalWave';
import DeviceWave, { DndObject } from '../../../classes/DeviceWave';
import Device from '../../../classes/Device';
import { Name } from '../../../classes/Name';
import { Pad } from '../../../classes/Pad';

export interface State {
    localWaves: LocalWave[];
    deviceWaves: DeviceWave[];
    dndLocalWaves: DndObject<LocalWave>[];
    dndDeviceWaves: DndObject<DeviceWave>[];
    dndPadWaves: DndPadWaves;
    deviceIsConnected: boolean;
    device: Device;
    selectedKit: Kit | undefined;
    selectedPad: PadNames | undefined;
    kitList: (Kit | { id: number; uuid: string; kitName: Name; type: string })[];
}

export enum WaveManagerEvents {
    import = 'waveManager/import',
    createWave = 'waveManager/createWave',
    importFromDevice = 'waveManager/importFromDevice',
    addWaveToDevice = 'waveManager/addWaveToDevice',
    addNewDeviceWave = 'waveManager/addNewDeviceWave',
    addExistingDeviceWave = 'waveManager/addExistingDeviceWave'
}

export enum DeviceConnectorEvents {
    connect = 'deviceConnector/connect',
    disconnect = 'deviceConnector/disconnect'
}

export enum KitNavigatorEvents {
    selectKit = 'kitNavigator/selectKit',
    addKit = 'kitNavigator/addKit',
    createNewKit = 'kitNavigator/createNewKit',
    removeKit = 'kitNavigator/removeKit'
}

export enum KitConfiguratorEvents {
    dropOnPad = 'kitConfigurator/dropOnPad',
    removeWaveFromPad = 'kitConfigurator/removeWaveFromPad',
    clickOnPad = 'kitConfigurator/clickOnPad',
    setPadParam = 'kitConfigurator/setPadParam'
}

export enum IOEvents {
    saveKitToDevice = 'IOEvents/saveKitToDevice'
}

export interface Events {
    [WaveManagerEvents.import]: string[];
    [WaveManagerEvents.createWave]: string;
    [WaveManagerEvents.importFromDevice]: undefined;
    [WaveManagerEvents.addWaveToDevice]: LocalWave;
    [WaveManagerEvents.addNewDeviceWave]: string;
    [WaveManagerEvents.addExistingDeviceWave]: DeviceWave;
    [DeviceConnectorEvents.connect]: string[];
    [DeviceConnectorEvents.disconnect]: undefined;
    [KitNavigatorEvents.selectKit]: Kit | undefined;
    [KitNavigatorEvents.createNewKit]: number;
    [KitNavigatorEvents.addKit]: Kit;
    [KitConfiguratorEvents.setPadParam]: { pad: Pad; paramType: PadPrmSpdTags; value: number };
    [KitNavigatorEvents.removeKit]: Kit;
    [KitConfiguratorEvents.dropOnPad]: DropResult;
    [KitConfiguratorEvents.removeWaveFromPad]: DropResult;
    [KitConfiguratorEvents.clickOnPad]: PadNames;
    [IOEvents.saveKitToDevice]: Kit;
}

export enum PadWaveTypes {
    main = 'main',
    sub = 'sub'
}

export type DndPadWavesObject = {
    [PadWaveTypes.main]: DndObject<DeviceWave | undefined> | undefined;
    [PadWaveTypes.sub]: DndObject<DeviceWave | undefined> | undefined;
};

export enum DroppableTypes {
    pad = 'pad',
    list = 'list',
    local = 'local'
}

export enum PadNames {
    pad1 = 'Pad 1',
    pad2 = 'Pad 2',
    pad3 = 'Pad 3',
    pad4 = 'Pad 4',
    pad5 = 'Pad 5',
    pad6 = 'Pad 6',
    pad7 = 'Pad 7',
    pad8 = 'Pad 8',
    pad9 = 'Pad 9',
    trigger1 = 'Trigger 1',
    trigger2 = 'Trigger 2',
    trigger3 = 'Trigger 3',
    trigger4 = 'Trigger 4',
    footSwitch1 = 'Footswitch 1',
    footSwitch2 = 'Footswitch 2'
}
export interface DndPadWaves {
    [PadNames.pad1]: DndPadWavesObject;
    [PadNames.pad2]: DndPadWavesObject;
    [PadNames.pad3]: DndPadWavesObject;
    [PadNames.pad4]: DndPadWavesObject;
    [PadNames.pad5]: DndPadWavesObject;
    [PadNames.pad6]: DndPadWavesObject;
    [PadNames.pad7]: DndPadWavesObject;
    [PadNames.pad8]: DndPadWavesObject;
    [PadNames.pad9]: DndPadWavesObject;
    [PadNames.trigger1]: DndPadWavesObject;
    [PadNames.trigger2]: DndPadWavesObject;
    [PadNames.trigger3]: DndPadWavesObject;
    [PadNames.trigger4]: DndPadWavesObject;
    [PadNames.footSwitch1]: DndPadWavesObject;
    [PadNames.footSwitch2]: DndPadWavesObject;
}

// export enum LinkPadOptions {
//     none = -1,
//     [PadNames.pad1] = 1,
// }

export enum MuteGrpOptions {
    OFF = 0,
    GRP1 = 1,
    GRP2 = 2,
    GRP3 = 3,
    GRP4 = 4,
    GRP5 = 5,
    GRP6 = 6,
    GRP7 = 7,
    GRP8 = 8,
    GRP9 = 9
}
export enum TempoSyncOptions {
    OFF = 0,
    ON = 1
}
export enum LoopOptions {
    OFF = 0,
    ON = 1,
    x2 = 2, // ??
    x4 = 3, // ??
    x8 = 4 // ??
}
export enum TrigTypeOptions {
    ALT = 0,
    SHOT = 1
}
export enum DynamicsOptions {
    OFF = 0,
    ON = 1
}
export enum VoiceAssignOptions {
    MONO = 0,
    POLY = 1
}
export enum PlayModeOptions {
    none = -1,
    SINGLE = 0,
    PHRASE = 1,
    LOOP = 1
}
export enum OutAsgnOptions { // ???? complete unknown!
    MASTER = 0,
    FX1 = 1,
    FX2 = 2,
    SUB = 3,
    HEADPHONES = 4
}

export type SpdTags = KitPrmSpdTags | WvPrmSpdTags | MainSpdTags;

export type KitPrmSpdTags =
    | 'Level'
    | 'Tempo'
    | 'Fx2Asgn'
    | 'LinkPad0'
    | 'LinkPad1'
    | NameSpdTags
    | SubNameSpdTags
    | FxPrmSpdTags;

export type WvPrmSpdTags = NameSpdTags | 'Path' | 'Tag';

export type MainSpdTags = 'WvPrm' | 'KitPrm' | 'PadPrm';

export type NameSpdTags = 'Nm0' | 'Nm1' | 'Nm2' | 'Nm3' | 'Nm4' | 'Nm5' | 'Nm6' | 'Nm7';

export type SubNameSpdTags =
    | 'SubNm0'
    | 'SubNm1'
    | 'SubNm2'
    | 'SubNm3'
    | 'SubNm4'
    | 'SubNm5'
    | 'SubNm6'
    | 'SubNm7'
    | 'SubNm8'
    | 'SubNm9'
    | 'SubNm10'
    | 'SubNm11'
    | 'SubNm12'
    | 'SubNm13'
    | 'SubNm14';

export type PadPrmSpdTags =
    | 'WvLevel'
    | 'WvPan'
    | 'PlayMode'
    | 'OutAsgn'
    | 'MuteGrp'
    | 'TempoSync'
    | 'PadMidiCh'
    | 'NoteNum'
    | 'MidiCtrl'
    | 'Loop'
    | 'TrigType'
    | 'GateTime'
    | 'Dynamics'
    | 'VoiceAsgn'
    | 'Reverse'
    | 'SubWv'
    | 'SubWvLevel'
    | 'SubWvPan';

export type FxPrmSpdTags =
    | 'Fx1Sw'
    | 'Fx1Type'
    | 'Fx1Prm0'
    | 'Fx1Prm1'
    | 'Fx1Prm2'
    | 'Fx1Prm3'
    | 'Fx1Prm4'
    | 'Fx1Prm5'
    | 'Fx1Prm6'
    | 'Fx1Prm7'
    | 'Fx1Prm8'
    | 'Fx1Prm9'
    | 'Fx1Prm10'
    | 'Fx1Prm11'
    | 'Fx1Prm12'
    | 'Fx1Prm13'
    | 'Fx1Prm14'
    | 'Fx1Prm15'
    | 'Fx1Prm16'
    | 'Fx1Prm17'
    | 'Fx1Prm18'
    | 'Fx1Prm19'
    | 'Fx2Sw'
    | 'Fx2Type'
    | 'Fx2Prm0'
    | 'Fx2Prm1'
    | 'Fx2Prm2'
    | 'Fx2Prm3'
    | 'Fx2Prm4'
    | 'Fx2Prm5'
    | 'Fx2Prm6'
    | 'Fx2Prm7'
    | 'Fx2Prm8'
    | 'Fx2Prm9'
    | 'Fx2Prm10'
    | 'Fx2Prm11'
    | 'Fx2Prm12'
    | 'Fx2Prm13'
    | 'Fx2Prm14'
    | 'Fx2Prm15'
    | 'Fx2Prm16'
    | 'Fx2Prm17'
    | 'Fx2Prm18'
    | 'Fx2Prm19';
