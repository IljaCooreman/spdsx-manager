import * as React from 'react';
import { Paper, makeStyles, Theme, createStyles, Grid } from '@material-ui/core';
import {
    Droppable,
    Draggable,
    DroppableStateSnapshot,
    DroppableProvided
} from 'react-beautiful-dnd';
import { PadNames, PadWaveTypes, DndPadWavesObject } from '../../store/types/types';
import DeviceWave, { DndObject } from '../../../classes/DeviceWave';

interface PadDroppableProps {
    padName: PadNames;
    dndObject?: DndObject<DeviceWave | undefined>;
    isDisabled?: boolean;
    padWaveType: PadWaveTypes;
}

const getPadStyle = (snapshot: DroppableStateSnapshot) => {
    return {
        height: '30px',
        border: `1px solid light-grey`,
        borderRadius: '4px',
        background: snapshot.isDraggingOver ? 'red' : '#eeeeee',
        margin: '4px'
    };
};

const PadDroppable: React.FunctionComponent<PadDroppableProps> = ({
    padName,
    dndObject,
    isDisabled,
    padWaveType
}) => {
    return (
        <Droppable droppableId={`pad-${padName}-${padWaveType}`} type="PAD">
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                <div
                    ref={provided.innerRef}
                    style={getPadStyle(snapshot)}
                    {...provided.droppableProps}>
                    {dndObject && (
                        <Draggable
                            key={dndObject.id}
                            isDragDisabled={isDisabled}
                            draggableId={dndObject.id}
                            index={0}>
                            {(prov, snapsh) => (
                                <div
                                    ref={prov.innerRef}
                                    {...prov.draggableProps}
                                    {...prov.dragHandleProps}>
                                    <div>{dndObject.item?.name}</div>
                                </div>
                            )}
                        </Draggable>
                    )}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default PadDroppable;
