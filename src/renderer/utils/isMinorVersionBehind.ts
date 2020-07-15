/**
 * return true if current major or minor version is behind the highest version. patch is ignored
 * @param current of type 1.2.3
 * @param next of type 1.2.3
 */
export const isMinorVersionBehind = (current: string, highest: string) => {
    const currArr = current.split('.');
    const highArr = highest.split('.');

    const curr = {
        major: Number(currArr[0]),
        minor: Number(currArr[1]),
        patch: Number(currArr[2])
    };
    const high = {
        major: Number(highArr[0]),
        minor: Number(highArr[1]),
        patch: Number(highArr[2])
    };

    if (!curr.major || !curr.minor || !high.minor || !high.minor) {
        throw new Error('incorrect version number');
    }
    // check if major version is behind
    if (curr.major < high.major) {
        return true;
    }
    // check if minor version is behind
    if (curr.major < high.major) {
        return true;
    }
    return false;
};
