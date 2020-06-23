import { v4 as uuidv4 } from 'uuid';
import { PadPrmType } from '../renderer/store/types/PadPrm';
import DeviceWave from './DeviceWave';
import {
    PadNames,
    PadPrmSpdTags,
    MuteGrpOptions,
    TempoSyncOptions,
    PlayModeOptions,
    VoiceAssignOptions,
    DynamicsOptions,
    TrigTypeOptions,
    LoopOptions,
    OutAsgnOptions
} from '../renderer/store/types/types';
import { Kit } from './Kit';
import { inputSanitize } from './inputSanitize';

export class Pad {
    uuid: string;
    wave: DeviceWave | undefined;
    WvLevel = 100;
    WvPan = 0; // L15 - center - R15
    MuteGrp: MuteGrpOptions = MuteGrpOptions.OFF;
    TempoSync: TempoSyncOptions = TempoSyncOptions.OFF;
    PlayMode: PlayModeOptions = PlayModeOptions.SINGLE;
    OutAsgn: OutAsgnOptions = OutAsgnOptions.MASTER;
    PadMidiCh = 0;
    NoteNum = 0;
    MidiCtrl = 0;
    Loop: LoopOptions = LoopOptions.OFF;
    TrigType: TrigTypeOptions = TrigTypeOptions.SHOT;
    GateTime = 0;
    Dynamics: DynamicsOptions = DynamicsOptions.ON;
    VoiceAsgn: VoiceAssignOptions = VoiceAssignOptions.MONO;
    Reverse = 0;
    SubWv?: DeviceWave = undefined;
    SubWvLevel = 0;
    SubWvPan = 0;
    padName: PadNames; // padName and kit are not used at the moment
    kit: Kit;

    constructor(
        kit: Kit,
        padName: PadNames,
        pad?: PadPrmType,
        deviceWave?: DeviceWave,
        subDeviceWave?: DeviceWave
    ) {
        this.kit = kit;
        this.padName = padName;
        this.uuid = uuidv4();
        if (pad) {
            const {
                WvPan,
                Wv,
                WvLevel,
                MuteGrp,
                TempoSync,
                PlayMode,
                OutAsgn,
                PadMidiCh,
                NoteNum,
                MidiCtrl,
                Loop,
                TrigType,
                GateTime,
                Dynamics,
                VoiceAsgn,
                Reverse,
                SubWv,
                SubWvLevel,
                SubWvPan
            } = pad;
            this.wave = Wv < 0 ? undefined : deviceWave;
            this.SubWv = SubWv < 0 ? undefined : subDeviceWave;

            this.WvPan = WvPan;
            this.WvLevel = WvLevel;
            this.MuteGrp = MuteGrp;
            this.TempoSync = TempoSync;
            this.PlayMode = PlayMode;
            this.OutAsgn = OutAsgn;
            this.PadMidiCh = PadMidiCh;
            this.NoteNum = NoteNum;
            this.MidiCtrl = MidiCtrl;
            this.Loop = Loop;
            this.TrigType = TrigType;
            this.GateTime = GateTime;
            this.Dynamics = Dynamics;
            this.VoiceAsgn = VoiceAsgn;
            this.Reverse = Reverse;
            this.SubWvLevel = SubWvLevel;
            this.SubWvPan = SubWvPan;
        }
    }

    setWvLevel(value: number) {
        this.WvLevel = inputSanitize.Level(value);
    }

    setSubWvLevel(value: number) {
        this.SubWvLevel = inputSanitize.Level(value);
    }

    setWvPan(value: number) {
        this.WvPan = inputSanitize.Pan(value);
    }

    setSubWvPan(value: number) {
        this.SubWvPan = inputSanitize.Pan(value);
    }

    setMuteGrp(value: MuteGrpOptions) {
        this.MuteGrp = value;
    }

    setTempoSync(value: TempoSyncOptions) {
        this.TempoSync = value;
    }

    setPlayMode(value: PlayModeOptions) {
        this.PlayMode = value;
    }

    setOutAsgn(value: OutAsgnOptions) {
        this.OutAsgn = value;
    }

    setLoop(value: LoopOptions) {
        this.Loop = value;
    }

    setTrigType(value: TrigTypeOptions) {
        this.TrigType = value;
    }

    setDynamics(value: DynamicsOptions) {
        this.Dynamics = value;
    }

    setVoiceAsgn(value: VoiceAssignOptions) {
        this.VoiceAsgn = value;
    }

    setWave(wave: DeviceWave | undefined) {
        this.wave = wave;
    }

    setSubWave(wave: DeviceWave | undefined) {
        this.SubWv = wave;
    }

    get padPrmObject(): PadPrmType {
        return {
            Wv: this.wave?.wvNr || -1,
            WvLevel: this.WvLevel,
            WvPan: this.WvPan,
            PlayMode: this.PlayMode,
            OutAsgn: this.OutAsgn,
            MuteGrp: this.MuteGrp,
            TempoSync: this.TempoSync,
            PadMidiCh: this.PadMidiCh,
            NoteNum: this.NoteNum,
            MidiCtrl: this.MidiCtrl,
            Loop: this.Loop,
            TrigType: this.TrigType,
            GateTime: this.GateTime,
            Dynamics: this.Dynamics,
            VoiceAsgn: this.VoiceAsgn,
            Reverse: this.Reverse,
            SubWv: this.SubWv?.wvNr || -1,
            SubWvLevel: this.SubWvLevel,
            SubWvPan: this.SubWvPan
        };
    }
}
