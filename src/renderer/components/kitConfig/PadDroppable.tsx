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
import { colors } from '../../styling';
import DraggableAudio from '../DraggableAudio';

interface PadDroppableProps {
    padName: PadNames;
    dndObject?: DndObject<DeviceWave | undefined>;
    isDisabled?: boolean;
    padWaveType: PadWaveTypes;
}

const getPadStyle = (snapshot: DroppableStateSnapshot) => {
    return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        height: '38px',
        margin: '6px',
        borderRadius: '8px',
        border: `1px solid ${colors.black}`,
        background: snapshot.isDraggingOver ? colors.red : colors.bgWhite,
        fontFamily: 'Roboto-Light',
        fontSize: '12px',
        transition: 'background .3s ease'
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
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
                // if (!dndObject.item) return null;
                const castedDndObj = dndObject as DndObject<DeviceWave>;
                return (
                    <div
                        ref={provided.innerRef}
                        style={getPadStyle(snapshot)}
                        {...provided.droppableProps}>
                        {dndObject &&
                        dndObject.item && ( // make sure the object is not undefined
                                // <Draggable
                                //     key={dndObject.id}
                                //     isDragDisabled={isDisabled}
                                //     draggableId={dndObject.id}
                                //     index={0}>
                                //     {(prov, snapsh) => (
                                //         <div
                                //             ref={prov.innerRef}
                                //             {...prov.draggableProps}
                                //             {...prov.dragHandleProps}>
                                //             <div>{dndObject.item?.name}</div>
                                //         </div>
                                //     )}
                                // </Draggable>
                                <DraggableAudio
                                    dndObject={castedDndObj}
                                    handleClick={id => {
                                        console.log(id);
                                    }}
                                    theme="light"
                                    index={0}
                                    />
                            )}
                        {provided.placeholder}
                    </div>
                );
            }}
        </Droppable>
    );
};

export default PadDroppable;
