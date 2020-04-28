// const wav = require('node-wav');
import { WaveFile } from 'wavefile';
import { v4 as uuidv4 } from 'uuid';
import { readFileSync } from 'fs';
import { basename } from 'path';

export default class LocalWave {
    id: string;
    wave: WaveFile;
    fileName: string;
    path: string;
    isResampled = false;

    constructor(path: string) {
        this.id = uuidv4();
        this.path = path;
        this.fileName = basename(path);
        this.wave = new WaveFile(readFileSync(path));
        this.resampleForSpdsx();
    }

    changeSampleRate(requestedSampleRate: number): void {
        if (!this.wave) {
            throw new Error(`No wave in memory`);
        }
        this.wave.toSampleRate(requestedSampleRate, { method: 'sinc', LPF: true, LPFType: 'FIR' });
        this.isResampled = true;
    }

    changeBitDepth(requestedBitDepth: number): void {
        if (!this.wave) {
            throw new Error(`No wave in memory`);
        }
        this.wave.toBitDepth(String(requestedBitDepth));
        this.isResampled = true;
    }

    resampleForSpdsx(requestedBitDepth = 16, requestedSampleRate = 44100) {
        if (!this.wave) {
            throw new Error(`No wave in memory`);
        }
        try {
            const changeBitDepth = this.wave.bitDepth !== String(requestedBitDepth);
            const changeSampleRate = this.wave.fmt.sampleRate === requestedSampleRate;

            if (changeSampleRate && changeBitDepth) {
                this.changeBitDepth(requestedBitDepth);
                this.changeSampleRate(requestedSampleRate);
                return this.wave.toBuffer();
            }
            if (changeBitDepth) {
                return this.changeBitDepth(requestedBitDepth);
            }
            if (changeSampleRate) {
                return this.changeSampleRate(requestedSampleRate);
            }
            return this.wave.toBuffer();
        } catch (e) {
            throw new Error(`Failed to resample local wave file. ${e.message}`);
        }
    }
}
