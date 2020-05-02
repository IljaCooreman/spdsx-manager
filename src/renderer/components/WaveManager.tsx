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
import { Draggable, DraggableProvided, Droppable } from 'react-beautiful-dnd';
import { openImportDialog } from '../utils/openDialog';
import { State, WaveManagerEvents } from '../store/types/types';
import DeviceWave from '../../classes/DeviceWave';
import { store } from '../store';

const WaveManager: React.FunctionComponent = () => {
    const { deviceWaves } = useStoreon<State, WaveManagerEvents>('deviceWaves');

    const getListStyle = (isDraggingOver: any) => {
        return {};
    };

    const getItemStyle = (isDragging: boolean, style: any) => {
        return {
            background: isDragging ? 'lightgreen' : 'white',
            ...style
        };
    };

    const onAddWaveClick = (wave: DeviceWave) => {
        // store.dispatch(WaveManagerEvents.addWaveToDevice, wave);
    };
    return (
        <Grid item xs={6}>
            <Button
                variant="outlined"
                onClick={() => openImportDialog(WaveManagerEvents.import, {})}>
                import
            </Button>

            <Droppable droppableId="droppable">
                {(provided: any, snapshot: any) => (
                    <ul
                        style={getListStyle(snapshot.isDraggingOver)}
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        {deviceWaves.map((wave, index) => (
                            <Draggable
                                key={wave.wvNr}
                                draggableId={String(wave.wvNr)}
                                index={index}>
                                {(prov: any, snapsh: any) => (
                                    <li
                                        ref={prov.innerRef}
                                        {...prov.draggableProps}
                                        {...prov.dragHandleProps}
                                        style={getItemStyle(
                                            snapsh.isDragging,
                                            prov.draggableProps.style
                                        )}
                                        key={wave.wvNr}>
                                        wave.name
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>

            {/* <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <RootRef rootRef={provided.innerRef}></RootRef>
                    
            <List
                component="div"
                aria-labelledby="waves-on-device"
                subheader={
                    <ListSubheader component="div" id="waves-on-device">
                        Waves on device
                    </ListSubheader>
                }>
                {deviceWaves.map((wave: DeviceWave, index: number) => (
                    <Draggable key={wave.wvNr} draggableId={String(wave.wvNr)} index={index}>
                        {(provided: DraggableProvided, snapshot) => {
                            return (
                                <ListItem
                                    button
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    key={wave.wvNr}
                                    onClick={() => {
                                        console.log(wave);
                                    }}>
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={wave.name} />
                                </ListItem>
                            )
                        }}
                    </Draggable>
                ))}
            </List>

            </RootRef>
                )}
            </Droppable> */}

            <Button>Export all</Button>
        </Grid>
    );
};

export default WaveManager;
