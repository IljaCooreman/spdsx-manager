import { PadPrmSpdTags } from '../renderer/store/types/types';

export const range = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
};

// Tempo: (v: number) => range(Number(v), 200, 4000)

export const inputSanitize: {
    [key: string]: (input: string | number) => number;
} = {
    Tempo: (v: any) => range(Number(v), 200, 4000),
    Level: (v: any) => range(Number(v), 0, 100),
    Pan: (v: any) => range(Number(v), 0, 30),
    PlayMode: (v: any) => range(Number(v), -1, 1) // ????
    // OutAssign:
};
