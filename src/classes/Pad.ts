import { v4 as uuidv4 } from 'uuid';
import { PadPrmType } from '../renderer/store/types/PadPrm';
import DeviceWave from './DeviceWave';
import { PadNames, PadPrmSpdTags } from '../renderer/store/types/types';

export class Pad {
    uuid: string;
    wave: DeviceWave | undefined;
    WvLevel = 100;
    WvPan = 0; // L15 - center - R15
    MuteGrp = 0;
    TempoSync = 0;
    PlayMode = 0;
    OutAsgn = 0;
    PadMidiCh = 0;
    NoteNum = 0;
    MidiCtrl = 0;
    Loop = 0;
    TrigType = 0;
    GateTime = 0;
    Dynamics = 0;
    VoiceAsgn = 0;
    Reverse = 0;
    SubWv = 0;
    SubWvLevel = 0;
    SubWvPan = 0;

    constructor(pad?: PadPrmType, deviceWave?: DeviceWave) {
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
            this.SubWv = SubWv;
            this.SubWvLevel = SubWvLevel;
            this.SubWvPan = SubWvPan;
        }
    }

    updateProperty(name: PadPrmSpdTags, value: any) {
        this[name] = value;
    }

    updateWave(wave: DeviceWave | undefined) {
        this.wave = wave;
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
            SubWv: this.SubWv,
            SubWvLevel: this.SubWvLevel,
            SubWvPan: this.SubWvPan
        };
    }
}
