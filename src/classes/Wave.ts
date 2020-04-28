// const wav = require('node-wav');
import { WaveFile } from 'wavefile';
import { readFileSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

const nodePath = require('path');

export enum WaveState {
    init = 'init',
    localImport = 'localImport',
    deciveImport = 'deciveImport',
    onDevice = 'onDevice',
    sync = 'sync'
}

export interface SetStateOptions {
    isInMemory?: boolean;
    isOnDevice?: boolean;
    isLocal?: boolean;
    devicePath?: string;
    localPath?: string;
    wave?: WaveFile;
}

export enum InitType {
    local,
    device
}

export default class Wave {
    id: string;
    state: WaveState = WaveState.init;
    isOnDevice = false; // whether the wave exists on spdsx
    devicePath: string | undefined; // full path to file on device
    nameOnDevice: string | undefined; // short path in spdsx, e.g. 00/clap.wav

    isLocal = false; // whether the file exists on local machine
    localPath: string | undefined; // full path on
    localName: string | undefined; // file name on local machine

    isInMemory = false; // whether the wave is imported into this class or not
    wave: WaveFile | undefined;
    isResampled = false;
    tags: string[] = [];

    constructor(path: string, type: InitType) {
        this.id = uuidv4();
        switch (type) {
            case InitType.local:
                this.localName = nodePath.basename(path);
                this.wave = new WaveFile(readFileSync(path));
                this.resampleForSpdsx();
                this.setState({
                    localPath: path
                });
                break;

            case InitType.device:
                this.setState({
                    devicePath: path
                });
                this.nameOnDevice = '';
                break;

            default:
                throw new Error('Unknown type for wave');
        }
    }

    setState({
        isInMemory = this.isInMemory,
        isOnDevice = this.isOnDevice,
        isLocal = this.isLocal,
        devicePath = this.devicePath,
        localPath = this.localPath,
        wave = this.wave
    }: SetStateOptions) {
        if (!isOnDevice && !isInMemory && !isLocal) {
            this.state = WaveState.init;
            this.isOnDevice = false;
            this.isInMemory = false;
            this.isLocal = false;
            this.devicePath = undefined;
            this.wave = undefined;
            this.localPath = undefined;
            return;
        }
        if (!isOnDevice && isInMemory && localPath) {
            this.state = WaveState.localImport;
            this.isOnDevice = false;
            this.isInMemory = true;
            this.isLocal = true;
            this.devicePath = undefined;
            this.localPath = localPath;
            return;
        }
        if (devicePath && isInMemory && !isLocal) {
            this.state = WaveState.deciveImport;
            this.isOnDevice = true;
            this.isInMemory = true;
            this.isLocal = false;
            this.devicePath = devicePath;
            this.localPath = undefined;
            return;
        }
        if (devicePath && !isInMemory && !isLocal) {
            this.state = WaveState.onDevice;
            this.isOnDevice = true;
            this.isInMemory = false;
            this.isLocal = false;
            this.devicePath = devicePath;
            this.localPath = undefined;
            return;
        }
        if (devicePath && isInMemory && localPath) {
            this.state = WaveState.sync;
            this.isOnDevice = true;
            this.isInMemory = true;
            this.isLocal = true;
            this.devicePath = devicePath;
            this.localPath = localPath;
            return;
        }
        throw new Error('Wave in an impossible state.');
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
    }
}
