import { js2xml, xml2js } from 'xml-js';
// import { SpdTags } from '../renderer/store/types';

export const objectToXml = (object: {}): string => {
    return js2xml(object, {
        ignoreInstruction: true,
        ignoreDoctype: true,
        ignoreAttributes: true,
        ignoreComment: true,
        fullTagEmptyElement: true,
        compact: true,
        spaces: 2
    });
};

export const xmlToObject = (string: string) => {
    return extractValues(
        xml2js(string, {
            ignoreInstruction: true,
            ignoreDoctype: true,
            ignoreAttributes: true,
            ignoreComment: true,
            compact: true,
            nativeType: true
        })
    );
};

export const extractValues = (object: { [key: string]: any }) => {
    return Object.keys(object).reduce((acc: any, key) => {
        const value = object[key];
        if (typeof value === 'object') {
            if (objectKeyWithUnderscore(value) !== null) {
                acc[key] = objectKeyWithUnderscore(value);
            } else {
                // handle nesting recursively
                acc[key] = extractValues(value);
            }
        } else {
            acc[key] = value;
        }
        return acc;
    }, {});
};

export const objectKeyWithUnderscore = (object: { [key: string]: any }): any | null => {
    return Object.keys(object).reduce((acc, key) => {
        return key[0] === '_' ? object[key] : acc;
    }, null);
};

// name encoding and decoding

export const decimalToString = (array: number[]): string => Buffer.from(array).toString();

export const stringToDecimal = (string: string): number[] => {
    const buffer = Buffer.from(string);
    const result = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const char of buffer.values()) {
        result.push(char);
    }
    return result;
};

// voorlopig is dit niet gebruikt
// export const objectToXmlTag = (obj: { [key: string]: number | string }) => {
//   const firstKey = Object.keys(obj).map(key => key)[0]
//   return `<${firstKey}>${obj[firstKey]}</${firstKey}>`
// }

// export const writeXmlPage = (obj: { [key: SpdTags]: any }): string => {

// }
