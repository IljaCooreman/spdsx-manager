import * as React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Grid, Box } from '@material-ui/core';
import { useStoreon } from 'storeon/react';
import WaveManager from './WaveManager';
import KitConfigContainer from './kitConfig/Container';
import { store } from '../store';
import {
    KitNavigatorEvents,
    PadNames,
    State,
    KitConfiguratorEvents,
    DroppableTypes
} from '../store/types/types';
import Kits from './Kits';
import { parseDroppableId } from '../utils/parseDroppableId';

const DndContainer: React.FunctionComponent = () => {
    const onDragEnd = (result: DropResult) => {
        console.log(result.destination);
        if (parseDroppableId(result.destination?.droppableId).type === DroppableTypes.pad) {
            store.dispatch(KitConfiguratorEvents.dropOnPad, result);
        }

        if (
            (parseDroppableId(result.source.droppableId).type === DroppableTypes.pad &&
                !result.destination) ||
            parseDroppableId(result.destination?.droppableId).type !== DroppableTypes.pad
        ) {
            console.log('delete me');
            store.dispatch(KitConfiguratorEvents.removeWaveFromPad, result);
        }
    };

    return (
        <Grid
            item
            xs={12}
            container
            direction="row"
            spacing={2}
            alignItems="stretch"
            style={{ maxHeight: 'calc(100vh - 300px)' }}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Kits />
                <KitConfigContainer />
                <WaveManager />
            </DragDropContext>
        </Grid>
    );
};

export default DndContainer;
