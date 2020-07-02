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
    display: flex;
    flex-flow: column;
`;

const List = styled.ul`
    max-width: 250px;
    min-width: 200px;
    list-style: none;
    padding: 8px;
    overflow-y: auto;
    max-height: 100%;
`;

const WaveList: React.FunctionComponent = () => {
    const [filterValue, setFilterValue] = React.useState<string>('');
    const [filteredList, setFilteredList] = React.useState<DndObject<DeviceWave>[]>([]);
    const { dndDeviceWaves } = useStoreon<State, WaveManagerEvents>('dndDeviceWaves');

    React.useEffect(() => {
        if (filterValue.length <= 0) {
            setFilteredList(dndDeviceWaves);
        } else {
            const regex = new RegExp(filterValue, 'i');
            setFilteredList(dndDeviceWaves.filter(wave => regex.test(wave.item.name.name)));
        }
    }, [filterValue, dndDeviceWaves]);

    return (
        <Container>
            <h3>Files on device</h3>
            <TextField
                style={{ flexShrink: 0 }}
                label="Filter"
                size="small"
                value={filterValue}
                onChange={e => setFilterValue(e.target.value)}
            />

            <Droppable droppableId="list-wave" type="PAD" isDropDisabled={true}>
                {(provided, snapshot) => (
                    <List ref={provided.innerRef}>
                        {filteredList.map((item, index) => (
                            <DraggableAudio
                                key={item.id}
                                dndObject={item}
                                index={index}
                                shouldCopy={true}
                            />
                        ))}
                        {provided.placeholder}
                    </List>
                )}
            </Droppable>
            <div style={{ opacity: 0.3 }}>
                {filteredList.length === dndDeviceWaves.length
                    ? `${dndDeviceWaves.length} waves`
                    : `${filteredList.length} / ${dndDeviceWaves.length} waves`}
            </div>
        </Container>
    );
};

export default WaveList;
