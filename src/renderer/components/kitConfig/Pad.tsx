import * as React from 'react';
import { Paper, makeStyles, Theme, createStyles, Grid } from '@material-ui/core';
import {
    Droppable,
    Draggable,
    DroppableStateSnapshot,
    DroppableProvided
} from 'react-beautiful-dnd';
import { Pad as PadClass } from '../../../classes/Pad';
import { PadNames } from '../../store/types/types';

interface PadProps {
    padName: PadNames;
    pad: PadClass | undefined;
}

const useStyles = makeStyles((theme: Theme) => {
    createStyles({
        root: {
            flexGrow: 1
        },
        paper: {
            textAlign: 'center',
            color: theme.palette.text.secondary
        }
    });
});

const getPadStyle = (snapshot: DroppableStateSnapshot) => {
    return {
        height: '100px',
        background: snapshot.isDraggingOver ? 'red' : 'white'
    };
};

const Pad: React.FunctionComponent<PadProps> = ({ padName, pad }) => {
    const classes = useStyles();
    return (
        <Grid item xs={4}>
            <Paper>
                <Droppable droppableId={String(padName)} type="PAD">
                    {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getPadStyle(snapshot)}
                            {...provided.droppableProps}>
                            <div>pad {padName}</div>
                            <Draggable
                                key={`pad-${pad?.uuid || 0}`}
                                isDragDisabled={!pad?.wave}
                                draggableId={String(pad?.wave?.uuid) || '0'}
                                index={0}>
                                {(prov, snapsh) => (
                                    <div
                                        ref={prov.innerRef}
                                        {...prov.draggableProps}
                                        {...prov.dragHandleProps}>
                                        <div>{pad?.wave?.name}</div>
                                    </div>
                                )}
                            </Draggable>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </Paper>
        </Grid>
    );
};

export default Pad;
