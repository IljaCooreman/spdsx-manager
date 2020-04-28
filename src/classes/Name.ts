import { stringToDecimal } from './xmlUtils';

/* eslint-disable class-methods-use-this */
type Type = 'Nm' | 'SubNm';

const nameTypes = {
    Nm: {
        length: 8
    },
    SubNm: {
        length: 16
    }
};

export class Name {
    name = '';
    type: Type;

    constructor(name: string, type: Type) {
        this.name = name.substring(0, nameTypes[type].length);
        this.type = type;
    }

    length(): number {
        return nameTypes[this.type]?.length;
    }

    toEncodedArray(): number[] {
        const emptyArray = [...new Array(this.length())].map(x => 0);
        const decimalArray = stringToDecimal(this.name);
        decimalArray.forEach((decimal, i) => {
            emptyArray[i] = decimal;
        });
        return emptyArray;
    }

    toEncodedObject() {
        return this.toEncodedArray().reduce((acc: any, char: number, i: number) => {
            acc[`${this.type}${i}`] = char;
            return acc;
        }, {});
    }
}
