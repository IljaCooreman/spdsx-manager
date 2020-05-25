import * as React from 'react';
import { useStoreon } from 'storeon/react';
import Button from '@material-ui/core/Button';
import { Draggable, Droppable, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { State, WaveManagerEvents } from '../../store/types/types';
import DeviceWave from '../../../classes/DeviceWave';
import DraggableAudio from '../DraggableAudio';
import { GeneralContainer } from '../../styling';

const WaveList: React.FunctionComponent = () => {
    const { dndDeviceWaves } = useStoreon<State, WaveManagerEvents>('dndDeviceWaves');

    const getListStyle = () => {
        return {
            background: 'lightgrey',
            maxWidth: '250px',
            minWidth: '200px',
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

    const Container = GeneralContainer();

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
