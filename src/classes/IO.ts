/* eslint-disable class-methods-use-this */
import { writeFileSync, existsSync, mkdirSync, readFileSync, readdirSync } from 'fs';

class IO {
    path: string; // path where files temporary get written to

    constructor(path = 'data/resampled') {
        this.path = path;
        if (!existsSync(path)) {
            mkdirSync(path);
        }
    }

    localWriteFile(buffer: any, fileName: string) {
        writeFileSync(`${this.path}/${fileName}.wav`, buffer);
    }

    localReadFile(path: string): string {
        return readFileSync(path, 'utf8');
    }

    listFileNames(pathToFolder: string) {
        return readdirSync(pathToFolder);
    }
}

const io = new IO();
export default io;
