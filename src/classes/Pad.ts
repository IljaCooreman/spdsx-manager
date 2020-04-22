import { Wave } from "./Wave";

export class Pad {
  wave: Wave | null = null;

  volume = 100;

  pan = 'center'; // L15 - center - R15

  muteGroup = 0;

  tempoSync = false;

}