import { PadNames, PadWaveTypes, DroppableTypes } from '../store/types/types';

export const parseDroppableId = (id: string | undefined) => {
    if (!id)
        return {
            type: undefined,
            padName: undefined,
            padWaveType: undefined
        };
    const [type, padName, padWaveType]: any[] = id.split('-');
    return {
        type,
        padName,
        padWaveType
    } as {
        type?: DroppableTypes;
        padName?: PadNames;
        padWaveType?: PadWaveTypes;
    };
};
