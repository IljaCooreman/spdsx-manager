import * as React from 'react';
import { useStoreon } from 'storeon/react';
import Button from '@material-ui/core/Button';
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListSubheader,
    Grid,
    RootRef
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import {
    Draggable,
    DraggableProvided,
    Droppable,
    DraggableStateSnapshot
} from 'react-beautiful-dnd';
import { openImportDialog } from '../utils/openDialog';
import { State, WaveManagerEvents } from '../store/types/types';
import DeviceWave from '../../classes/DeviceWave';
import { store } from '../store';

const WaveManager: React.FunctionComponent = () => {
    const { deviceWaves } = useStoreon<State, WaveManagerEvents>('deviceWaves');

    const getListStyle = (isDraggingOver: any) => {
        return {
            background: 'lightgrey',
            maxWidth: '250px',
            listStyle: 'none',
            padding: '8px',
            overflow: 'scroll',
            maxHeight: '100%'
        };
    };

    const grid = 8;

    const getItemStyle = (
        {
            isDragging,
            isDropAnimating,
            mode,
            combineTargetFor,
            combineWith,
            draggingOver
        }: DraggableStateSnapshot,
        style: any
    ) => {
        return {
            userSelect: 'none',
            padding: grid,
            margin: `0 0 ${grid / 2}px ${grid / 2}px`,
            background: isDragging ? 'lightgreen' : 'white',
            border: isDropAnimating ? '1px solid red' : 'none',
            ...style
        };
    };

    const onAddWaveClick = (wave: DeviceWave) => {
        // store.dispatch(WaveManagerEvents.addWaveToDevice, wave);
    };
    return (
        <Grid item xs={3} style={{ maxHeight: '100%' }}>
            <Button
                variant="outlined"
                onClick={() => openImportDialog(WaveManagerEvents.import, {})}>
                import
            </Button>

            <Droppable droppableId="droppable" type="PAD" isDropDisabled={true}>
                {(provided, snapshot) => (
                    <ul
                        style={getListStyle(snapshot.isDraggingOver)}
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        {deviceWaves.map((wave, index) => (
                            <Draggable key={wave.uuid} draggableId={wave.uuid} index={index}>
                                {(prov, snapsh) => (
                                    <li
                                        ref={prov.innerRef}
                                        {...prov.draggableProps}
                                        {...prov.dragHandleProps}
                                        style={getItemStyle(snapsh, prov.draggableProps.style)}
                                        key={wave.uuid}>
                                        {wave.name}
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>

            <Button>Export all</Button>
        </Grid>
    );
};

export default WaveManager;
