import * as React from 'react';
import { useStoreon } from 'storeon/react';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import { Draggable, Droppable, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { openImportDialog } from '../../utils/openDialog';
import { State, WaveManagerEvents } from '../../store/types/types';
import DeviceWave from '../../../classes/DeviceWave';

const WaveList: React.FunctionComponent = () => {
    const { dndDeviceWaves } = useStoreon<State, WaveManagerEvents>('dndDeviceWaves');

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

    const essentialItemStyle = (): any => {
        const grid = 8;
        return {
            userSelect: 'none',
            padding: grid,
            margin: `0 0 ${grid / 2}px ${grid / 2}px`
        };
    };

    const getItemStyle = ({ isDragging, isDropAnimating }: DraggableStateSnapshot, style: any) => {
        if (!isDragging)
            return {
                ...essentialItemStyle(),
                background: 'white'
            };
        return {
            ...essentialItemStyle(),
            background: 'lightgreen',
            ...style
        };
    };

    // const getCloneStyle = () => {
    //     return {
    //         display: none!important;
    //     }
    // }

    //     const Item = styled.li`
    //     display: flex;
    //     user-select: none;
    //     padding: 0.5rem;
    //     margin: 0 0 0.5rem 0;
    //     align-items: flex-start;
    //     align-content: flex-start;
    //     line-height: 1.5;
    //     border-radius: 3px;
    //     background: #fff;
    //     border: 1px ${(props: any) => (props.isDragging ? 'dashed #4099ff' : 'solid #ddd')};
    // `;

    //     const Clone = styled.li`
    //         background: 'green';
    //         height: '100px';

    // `;

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

            <Droppable droppableId="list-wave" type="PAD" isDropDisabled={true}>
                {(provided, snapshot) => (
                    <ul
                        style={getListStyle(snapshot.isDraggingOver)}
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        {dndDeviceWaves.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(prov, snapsh) => (
                                    <>
                                        <li
                                            ref={prov.innerRef}
                                            {...prov.draggableProps}
                                            {...prov.dragHandleProps}
                                            style={getItemStyle(snapsh, prov.draggableProps.style)}
                                            key={item.item.uuid}>
                                            {item.item.name}
                                        </li>
                                        {snapsh.isDragging && (
                                            <li style={essentialItemStyle()}>{item.item.name}</li>
                                        )}
                                    </>
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

export default WaveList;
