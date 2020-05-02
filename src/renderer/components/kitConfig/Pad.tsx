import * as React from 'react';
import { Paper, makeStyles, Theme, createStyles, Grid } from '@material-ui/core';
import { Droppable, DroppableStateSnapshot, DroppableProvided } from 'react-beautiful-dnd';

interface PadProps {
    id: number;
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

const Pad: React.FunctionComponent<PadProps> = ({ id }) => {
    const classes = useStyles();
    return (
        <Grid item xs={4}>
            <Paper>
                <Droppable droppableId={`droppable-pad${id}`}>
                    {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getPadStyle(snapshot)}
                            {...provided.droppableProps}>
                            pad {id}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </Paper>
        </Grid>
    );
};

export default Pad;
