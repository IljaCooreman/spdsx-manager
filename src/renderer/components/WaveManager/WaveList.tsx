import * as React from 'react';
import { useStoreon } from 'storeon/react';
import Button from '@material-ui/core/Button';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import { State, WaveManagerEvents } from '../../store/types/types';
import DraggableAudio from '../DraggableAudio';
import { GeneralContainerStyle } from '../../styling';
import DeviceWave, { DndObject } from '../../../classes/DeviceWave';

const Container = styled.div`
    ${GeneralContainerStyle()}
`;

const WaveList: React.FunctionComponent = () => {
    const [filterValue, setFilterValue] = React.useState<string>('');
    const [filteredList, setFilteredList] = React.useState<DndObject<DeviceWave>[]>([]);
    const { dndDeviceWaves } = useStoreon<State, WaveManagerEvents>('dndDeviceWaves');

    React.useEffect(() => {
        if (filterValue.length <= 0) {
            setFilteredList(dndDeviceWaves);
        } else {
            const regex = new RegExp(filterValue, 'ig');
            setFilteredList(dndDeviceWaves.filter(wave => regex.test(wave.item.name)));
        }
    }, [filterValue, dndDeviceWaves]);

    const getListStyle = () => {
        return {
            maxWidth: '250px',
            minWidth: '200px',
            listStyle: 'none',
            padding: '8px',
            overflow: 'scroll',
            maxHeight: '100%'
        };
    };

    return (
        <Container>
            <h3>Files on device</h3>
            <TextField
                label="Filter"
                size="small"
                value={filterValue}
                onChange={e => setFilterValue(e.target.value)}
            />

            <Droppable droppableId="list-wave" type="PAD" isDropDisabled={true}>
                {(provided, snapshot) => (
                    <ul style={getListStyle()} ref={provided.innerRef}>
                        {filteredList.map((item, index) => (
                            <DraggableAudio
                                key={item.id}
                                dndObject={item}
                                index={index}
                                shouldCopy={true}
                            />
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>

            <Button>Export all</Button>
        </Container>
    );
};

export default WaveList;
