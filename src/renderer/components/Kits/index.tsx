import * as React from 'react';
import { useStoreon } from 'storeon/react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { RootRef } from '@material-ui/core';

import { State, KitNavigatorEvents, DummyKit } from '../../store/types/types';
import { Kit } from '../../../classes/Kit';
import { store } from '../../store';
import KitListItem from './KitListItem';

interface KitsProps {
    handleSelectKit: () => any;
}

// idea from https://codesandbox.io/s/k260nyxq9v?file=/index.js
const Kits: React.FunctionComponent<KitsProps> = ({ handleSelectKit }) => {
    // const [orderedKits, setOrderedKits] = React.useState<(Kit | DummyKit)[]>([]);
    // const [isReordered, setIsReordered] = React.useState<boolean>(false);
    const { kitList, selectedKit } = useStoreon<State, KitNavigatorEvents>(
        'kitList',
        'selectedKit'
    );
    // React.useEffect(() => {
    //     console.log('resetting');
    //     setOrderedKits(kitList);
    // }, [kitList]);

    // React.useEffect(() => {
    //     return () => {
    //         console.log('dismounting');
    //         console.log(orderedKits);
    //         if (isReordered) {
    //             store.dispatch(KitNavigatorEvents.reorder, [...orderedKits]);
    //         }
    //     };
    // }, [isReordered]);

    // a little function to help us with reordering the result
    function reorder<T>(list: T[], startIndex: number, endIndex: number) {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1); // remove item from array
        result.splice(endIndex, 0, removed); // insert item in new place

        return [...result];
    }

    const grid = 8;

    const getListStyle = (isDraggingOver: boolean) => ({
        background: isDraggingOver ? 'lightblue' : 'none',
        padding: grid,
        minWidth: '200px',
        maxHeight: '100%'
    });

    const onDragEnd = (result: DropResult) => {
        if (!result.destination || result.destination?.index === result.source?.index) {
            return;
        }
        store.dispatch(
            KitNavigatorEvents.reorder,
            reorder(kitList, result.source.index, result.destination.index)
        );
        // setOrderedKits(reorder(orderedKits, result.source.index, result.destination.index));
        // setIsReordered(true);
    };

    const onItemClick = (kit: Kit | DummyKit) => {
        if ((kit as Kit).type === 'Kit') {
            const castedKit = kit as Kit;
            store.dispatch(KitNavigatorEvents.selectKit, castedKit);
        }
        handleSelectKit();
    };

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="kitlist-droppable">
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
