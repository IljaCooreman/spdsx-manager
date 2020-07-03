/* eslint-disable @typescript-eslint/no-empty-interface */
import { KitPrmType } from './KitPrm';

export interface NameType
    extends Pick<KitPrmType, 'Nm0' | 'Nm1' | 'Nm2' | 'Nm3' | 'Nm4' | 'Nm5' | 'Nm6' | 'Nm7'> {}
export interface SubNameType
    extends Pick<
        KitPrmType,
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
        | 'SubNm14'
        | 'SubNm15'
    > {}
export interface WaveNameType {
    ['Nm0']: number;
    ['Nm1']: number;
    ['Nm2']: number;
    ['Nm3']: number;
    ['Nm4']: number;
    ['Nm5']: number;
    ['Nm6']: number;
    ['Nm7']: number;
    ['Nm8']: number;
    ['Nm9']: number;
    ['Nm10']: number;
    ['Nm11']: number;
}
