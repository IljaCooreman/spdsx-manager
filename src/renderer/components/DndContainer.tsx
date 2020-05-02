import * as React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Grid } from '@material-ui/core';
import WaveManager from './WaveManager';
import Spdsx from './kitConfig/Spdsx';

const DndContainer: React.FunctionComponent = () => {
    const onDragEnd = (result: DropResult) => {
        console.log(result);
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Grid container direction="row">
                <WaveManager />
                <Spdsx />
            </Grid>
        </DragDropContext>
    );
};

export default DndContainer;
