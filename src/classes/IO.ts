import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs';

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

    // eslint-disable-next-line class-methods-use-this
    localReadFile(path: string): string {
        return readFileSync(path, 'utf8');
    }
}

const io = new IO();
export default io;
