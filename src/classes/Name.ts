import { stringToDecimal } from "./xmlUtils";

/* eslint-disable class-methods-use-this */
type Type = 'Nm' | 'SubNm'

const nameTypes = {
  Nm: {
    length: 8
  },
  SubNm: {
    length: 16
  }
}

export class Name {
  name = ''

  type: Type

  constructor(name: string, type: Type) {
    this.name = name.substring(0, nameTypes[type].length);
    this.type = type;
  }

  toEncodedArray(): any {
    const emptyArray = [...new Array(nameTypes[this.type]?.length)].map(x => 0);
    const decimalArray = stringToDecimal(this.name);
    decimalArray.forEach((decimal, i) => {
      emptyArray[i] = decimal
    })
    return emptyArray;
  }


}