import * as React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import WaveManager from './WaveManager';
import { store } from '../store';
import { KitConfiguratorEvents, DroppableTypes } from '../store/types/types';
import { parseDroppableId } from '../utils/parseDroppableId';
import KitConfig from './kitConfig/KitConfig';
import Spdsx from './kitConfig/Spdsx';
import LocalWaveList from './WaveManager/LocalWavesList';
import PadConfig from './padConfig/PadConfig';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
`;

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
            store.dispatch(KitConfiguratorEvents.removeWaveFromPad, result);
        }
    };

    return (
        <Container>
            <DragDropContext onDragEnd={onDragEnd}>
                <div>
                    <KitConfig />
                    <Grid item xs={12} style={{}}>
                        <PadConfig />
                    </Grid>
                </div>
                <Spdsx />
                <div>
                    <LocalWaveList />
                    <WaveManager />
                </div>
            </DragDropContext>
        </Container>
    );
};

export default DndContainer;
