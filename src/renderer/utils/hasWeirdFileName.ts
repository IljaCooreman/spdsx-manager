export const hasWeirdFileName = (fileName: string) => {
    return /^._/.test(fileName);
};
