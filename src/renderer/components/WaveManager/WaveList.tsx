import * as React from 'react';
import { useStoreon } from 'storeon/react';
import Button from '@material-ui/core/Button';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { State, WaveManagerEvents } from '../../store/types/types';
import DraggableAudio from '../DraggableAudio';
import { GeneralContainerStyle } from '../../styling';

const Container = styled.div`
    ${GeneralContainerStyle()}
`;

const WaveList: React.FunctionComponent = () => {
    const { dndDeviceWaves } = useStoreon<State, WaveManagerEvents>('dndDeviceWaves');

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

            <Droppable droppableId="list-wave" type="PAD" isDropDisabled={true}>
                {(provided, snapshot) => (
                    <ul style={getListStyle()} ref={provided.innerRef}>
                        {dndDeviceWaves.map((item, index) => (
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
