import { v4 as uuidv4 } from 'uuid';
import { readFileSync } from 'fs';
import { convert } from 'xml-js';
import { Pad } from './Pad';

export class Kit {
  id: string = uuidv4();

  kitName = 'New Kit';

  kitSubName = 'New subKit';

  volume = 100;

  tempo = 120;

  pad1 = new Pad();

  pad2 = new Pad();

  pad3 = new Pad();

  pad4 = new Pad();

  pad5 = new Pad();

  pad6 = new Pad();

  pad7 = new Pad();

  pad8 = new Pad();

  pad9 = new Pad();

  trigger1 = new Pad();

  trigger2 = new Pad();

  trigger3 = new Pad();

  trigger4 = new Pad();

  footSwitch1 = new Pad();

  footSwitch2 = new Pad();


  // constructor() {


  // }

  readFromXmlFile(path: string) {
    const xml = readFileSync(path, 'utf8');
    convert.xml2js(xml, {compact: true})
  }
}