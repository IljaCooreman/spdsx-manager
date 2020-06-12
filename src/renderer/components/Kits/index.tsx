import * as React from 'react';
import { useStoreon } from 'storeon/react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { RootRef } from '@material-ui/core';

import { State, KitNavigatorEvents } from '../../store/types/types';
import { Kit } from '../../../classes/Kit';
import { store } from '../../store';
import KitListItem from './KitListItem';

interface KitsProps {
    handleSelectKit: () => any;
}

// idea from https://codesandbox.io/s/k260nyxq9v?file=/index.js
const Kits: React.FunctionComponent<KitsProps> = ({ handleSelectKit }) => {
    const { kitList, selectedKit } = useStoreon<State, KitNavigatorEvents>(
        'kitList',
        'selectedKit'
    );

    // a little function to help us with reordering the result
    function reorder<T>(list: T[], startIndex: number, endIndex: number) {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1); // remove item from array
        result.splice(endIndex, 0, removed); // insert item in new place

        return result;
    }

    const grid = 8;

    const getListStyle = (isDraggingOver: boolean) => ({
        background: isDraggingOver ? 'lightblue' : 'none',
        padding: grid,
        minWidth: '200px',
        maxHeight: '100%',
        overflow: 'auto'
    });

    const onDragEnd = (result: DropResult) => {
        console.log(result);
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(kitList, result.source.index, result.destination.index);
        // TODO: set new state here!
        // this.setState({
        //     items
        // });
    };

    const onItemClick = (kit: Kit | { id: number; uuid: string; kitName: any }) => {
        if ((kit as Kit).type === 'Kit') {
            const castedKit = kit as Kit;
            store.dispatch(KitNavigatorEvents.selectKit, castedKit);
        }
        handleSelectKit();
    };

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <RootRef rootRef={provided.innerRef}>
                            <ul style={getListStyle(snapshot.isDraggingOver)}>
                                {kitList.map((kit, index: number) => (
                                    <KitListItem
                                        key={kit.uuid}
                                        kit={kit}
                                        index={index}
                                        onItemClick={onItemClick}
                                        selectedKit={selectedKit}
                                    />
                                ))}
                                {provided.placeholder}
                            </ul>
                        </RootRef>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default Kits;
