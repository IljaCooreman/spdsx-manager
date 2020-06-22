import { parse } from 'path';

export const kitPathToNumber = (path: string) => {
    const { name } = parse(path);
    return Number(name.split('kit').pop());
};

export const kitIndexToShortPath = (index: number) => {
    return `kit0${`0${index}`.slice(-2)}.spd`;
};
