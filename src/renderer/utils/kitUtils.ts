import { parse } from 'path';

export const kitPathToNumber = (path: string) => {
    const { name } = parse(path);
    return Number(name.split('kit').pop());
};
