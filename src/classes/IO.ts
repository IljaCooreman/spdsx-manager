import { writeFileSync, existsSync, mkdirSync } from 'fs';

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
}

const io = new IO();
export default io;
