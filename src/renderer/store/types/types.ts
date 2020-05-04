import { Kit } from '../../../classes/Kit';
import LocalWave from '../../../classes/LocalWave';
import DeviceWave from '../../../classes/DeviceWave';
import Device from '../../../classes/Device';
import { Name } from '../../../classes/Name';

export interface State {
    localWaves: LocalWave[];
    deviceWaves: DeviceWave[];
    deviceIsConnected: boolean;
    device: Device;
    selectedKit: Kit | undefined;
    kitList: (Kit | { id: number; uuid: string; kitName: Name; type: string })[];
}

export enum WaveManagerEvents {
    import = 'waveManager/import',
    createWave = 'waveManager/createWave',
    importFromDevice = 'waveManager/importFromDevice',
    addWaveToDevice = 'waveManager/addWaveToDevice'
}

export enum DeviceConnectorEvents {
    connect = 'deviceConnector/connect',
    disconnect = 'deviceConnector/disconnect'
}

export enum KitNavigatorEvents {
    selectKit = 'kitNavigator/selectKit',
    addKit = 'kitNavigator/addKit',
    createNewKit = 'kitNavigator/createNewKit',
    updateKit = 'kitNavigator/updateKit',
    removeKit = 'kitNavigator/removeKit',
    updatePadWave = 'kitNavigator/updatePadWave'
}

export interface Events {
    [WaveManagerEvents.import]: string[];
    [WaveManagerEvents.createWave]: string;
    [WaveManagerEvents.importFromDevice]: undefined;
    [WaveManagerEvents.addWaveToDevice]: LocalWave;
    [DeviceConnectorEvents.connect]: string[];
    [DeviceConnectorEvents.disconnect]: undefined;
    [KitNavigatorEvents.selectKit]: Kit | undefined;
    [KitNavigatorEvents.createNewKit]: number;
    [KitNavigatorEvents.addKit]: Kit;
    [KitNavigatorEvents.updateKit]: Kit;
    [KitNavigatorEvents.removeKit]: Kit;
    [KitNavigatorEvents.updatePadWave]: { padName: PadNames; wave: DeviceWave };
}

export enum PadNames {
    pad1,
    pad2,
    pad3,
    pad4,
    pad5,
    pad6,
    pad7,
    pad8,
    pad9,
    trigger1,
    trigger2,
    trigger3,
    trigger4,
    footSwitch1,
    footSwitch2
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
