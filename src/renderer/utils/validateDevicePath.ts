import { existsSync } from 'fs';
import { join } from 'path';

export const validateDevicePath = (path: string): string | undefined => {
    const strippedPath = path.match(/(.+)\/(Roland)/)?.[1];
    const newPath = strippedPath || path;

    return existsSync(join(newPath, `Roland/SPD-SX/KIT`)) ? newPath : undefined;
};
