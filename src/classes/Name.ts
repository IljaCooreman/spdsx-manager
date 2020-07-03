import { stringToDecimal } from './xmlUtils';
import { NameType, SubNameType, WaveNameType } from '../renderer/store/types/NameTypes';
import { removeNonAscii } from '../renderer/utils/waveUtils';

/* eslint-disable class-methods-use-this */
type Type = 'Nm' | 'SubNm' | 'waveNm';

const nameTypes = {
    Nm: {
        length: 8,
        tag: 'Nm'
    },
    SubNm: {
        length: 16,
        tag: 'SubNm'
    },
    waveNm: {
        length: 12,
        tag: 'Nm'
    }
};

export class Name {
    name = '';
    type: Type;

    constructor(name: string, type: Type) {
        this.type = type;
        this.setName(name);
    }

    setName(name: string) {
        this.name = removeNonAscii(name).substring(0, this.length);
    }

    get length(): number {
        return nameTypes[this.type]?.length;
    }

    get encodedArray(): number[] {
        const emptyArray = [...new Array(this.length)].map(x => 0);
        const decimalArray = stringToDecimal(this.name);
        decimalArray.forEach((decimal, i) => {
            emptyArray[i] = decimal;
        });
        return emptyArray;
    }

    /**
     * returns the name in tags, e.g.
     * {nm0: 45, nm1: 12, nm2: 34, ...}
     */
    get encodedObject(): NameType | SubNameType | WaveNameType {
        return this.encodedArray.reduce((acc: any, char: number, i: number) => {
            acc[`${nameTypes[this.type].tag}${i}`] = char;
            return acc;
        }, {});
    }

    get tags() {
        const array = new Array(this.length).map((_, i) => this.encodedArray[i]);
        const result: any = {};
        array.forEach(number => {
            result[`${nameTypes[this.type].tag}${number}`] = number;
        });
        switch (this.type) {
            case 'Nm':
                return result as NameType;
            case 'waveNm':
                return result as WaveNameType;
            case 'SubNm':
                return result as SubNameType;
            default:
                throw new Error('unknown naming scheme');
        }
    }
}
