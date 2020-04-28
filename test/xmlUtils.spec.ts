import {
    objectToXml,
    xmlToObject,
    extractValues,
    objectKeyWithUnderscore,
    stringToDecimal,
    decimalToString
} from '../src/classes/xmlUtils';
import io from '../src/classes/IO';

const testObject = {
    parent: {
        Nm1: 0,
        Nm2: {
            Nm3: 'second level'
        }
    }
};

const testXml = `<parent>
  <Nm1>0</Nm1>
  <Nm2>
    <Nm3>second level</Nm3>
  </Nm2>
</parent>`;

const expectedResult = {
    WvPrm: {
        Nm0: { _text: 67 },
        Nm1: { _text: 108 },
        Nm2: { _text: 97 },
        Nm3: { _text: 112 },
        Nm4: { _text: 95 },
        Nm5: { _text: 49 },
        Nm6: { _text: 49 },
        Nm7: { _text: 48 },
        Nm8: { _text: 0 },
        Nm9: { _text: 0 },
        Nm10: { _text: 0 },
        Nm11: { _text: 0 },
        Path: { _text: '00/Clap_.wav' },
        Tag: { _text: 1 }
    }
};

describe('xml utils', () => {
    it('can parse an xml to json and back', () => {
        expect(objectToXml(testObject)).toBe(testXml);
        expect(xmlToObject(testXml)).toStrictEqual(testObject);
    });

    it('detects objects with an underscore key', () => {
        expect(objectKeyWithUnderscore({ _text: '45' })).toBe('45');
        expect(objectKeyWithUnderscore({ text: '45' })).toBeNull();
        expect(objectKeyWithUnderscore({ text: '1', _text: 45 })).toBe(45);
    });

    it('can simplify the object tree', () => {
        expect(extractValues(expectedResult)).toStrictEqual({
            WvPrm: {
                Nm0: 67,
                Nm1: 108,
                Nm2: 97,
                Nm3: 112,
                Nm4: 95,
                Nm5: 49,
                Nm6: 49,
                Nm7: 48,
                Nm8: 0,
                Nm9: 0,
                Nm10: 0,
                Nm11: 0,
                Path: '00/Clap_.wav',
                Tag: 1
            }
        });
    });

    it('can encode and decode decimal text', () => {
        expect(decimalToString([67, 108, 97, 112, 95, 49, 49, 48])).toBe('Clap_110');
        expect(stringToDecimal('Clap_110')).toStrictEqual([67, 108, 97, 112, 95, 49, 49, 48]);
    });
});
