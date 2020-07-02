import { stringToDecimal } from './xmlUtils';
import { NameType, SubNameType, WaveNameType } from '../renderer/store/types/NameTypes';

/* eslint-disable class-methods-use-this */
type Type = 'Nm' | 'SubNm' | 'waveNm';

const nameTypes = {
    Nm: {
        length: 8
    },
    SubNm: {
        length: 16
    },
    waveNm: {
        length: 12
    }
};

export class Name {
    name = '';
    type: Type;

    constructor(name: string, type: Type) {
        this.name = name.substring(0, nameTypes[type].length);
        this.type = type;
    }

    setName(name: string) {
        this.name = name.substring(0, this.length);
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

    get encodedObject(): NameType | SubNameType {
        return this.encodedArray.reduce((acc: any, char: number, i: number) => {
            acc[`${this.type}${i}`] = char;
            return acc;
        }, {});
    }

    get tags() {
        const array = new Array(this.length).map((_, i) => this.encodedArray[i]);
        const result: any = {};
        array.forEach(number => {
            result[`${this.type}${number}`] = number;
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
