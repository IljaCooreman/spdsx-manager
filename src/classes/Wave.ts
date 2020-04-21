// const wav = require('node-wav');
import { WaveFile } from 'wavefile';
import { readFileSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

const nodePath = require('path');

export class Wave {
    id: string;

    path: string;

    fileName: string;

    file: WaveFile;

    constructor(path: string) {
        try {
            this.id = uuidv4();
            this.path = path;
            this.fileName = nodePath.basename(path);
            const buffer = readFileSync(path);
            this.file = new WaveFile(buffer);
            this.resampleForSpdsx();
        } catch {
            throw new Error('Could not import wave file. Path does not exist.');
        }
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
