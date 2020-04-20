// const wav = require('node-wav');
import { WaveFile } from 'wavefile';

export class Wave {
    file: WaveFile;

    constructor(buffer: Buffer) {
        this.file = new WaveFile(buffer);
    }

    changeSampleRate(requestedSampleRate: number): void {
        this.file.toSampleRate(requestedSampleRate, { method: 'sinc', LPF: true, LPFType: 'FIR' });
    }

    changeBitDepth(requestedBitDepth: number): void {
        this.file.toBitDepth(String(requestedBitDepth));
    }

    resampleForSpdsx(requestedBitDepth = 16, requestedSampleRate = 44100) {
        const changeBitDepth = this.file.bitDepth !== String(requestedBitDepth);
        const changeSampleRate = this.file.fmt.sampleRate === requestedSampleRate;

        if (changeSampleRate && changeBitDepth) {
            this.changeBitDepth(requestedBitDepth);
            this.changeSampleRate(requestedSampleRate);
            return this.file.toBuffer();
        }
        if (changeBitDepth) {
            return this.changeBitDepth(requestedBitDepth);
        }
        if (changeSampleRate) {
            return this.changeSampleRate(requestedSampleRate);
        }
        return this.file.toBuffer();
    }
}
