import * as React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Grid, Box } from '@material-ui/core';
import { useStoreon } from 'storeon/react';
import WaveManager from './WaveManager';
import KitConfigContainer from './kitConfig/Container';
import { store } from '../store';
import { KitNavigatorEvents, PadNames, State } from '../store/types/types';
import Kits from './Kits';

const DndContainer: React.FunctionComponent = () => {
    const { deviceWaves }: State = useStoreon('deviceWaves');
    const onDragEnd = (result: DropResult) => {
        console.log(result);
        const typedPadName = Number(result.destination?.droppableId) as PadNames;
        const wave = deviceWaves.find(deviceWave => deviceWave.uuid === result.draggableId);
        if (!wave) {
            throw new Error('invalid wave found');
        }
        store.dispatch(KitNavigatorEvents.updatePadWave, { padName: typedPadName, wave });
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
                <WaveManager />
                <KitConfigContainer />
            </DragDropContext>
        </Grid>
    );
};

export default DndContainer;
