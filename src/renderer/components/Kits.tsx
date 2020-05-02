import * as React from 'react';
import { useStoreon } from 'storeon/react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { List, ListItem, RootRef, ListItemText } from '@material-ui/core';
import { State, WaveManagerEvents, KitNavigatorEvents } from '../store/types/types';
import { Kit } from '../../classes/Kit';

// idea from https://codesandbox.io/s/k260nyxq9v?file=/index.js
const Kits: React.FunctionComponent = () => {
    const { kitList } = useStoreon<State, KitNavigatorEvents>('kitList');

    // a little function to help us with reordering the result
    function reorder<T>(list: T[], startIndex: number, endIndex: number) {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1); // remove item from array
        result.splice(endIndex, 0, removed); // insert item in new place

        return result;
    }

    const grid = 8;

    const getItemStyle = (isDragging: any, draggableStyle: any) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? 'lightgreen' : 'grey',

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const getListStyle = (isDraggingOver: boolean) => ({
        background: isDraggingOver ? 'lightblue' : 'lightgrey',
        padding: grid,
        width: 250
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

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided: any, snapshot: any) => (
                    <RootRef rootRef={provided.innerRef}>
                        <List style={getListStyle(snapshot.isDraggingOver)}>
                            {kitList.map((kit, index) => (
                                <Draggable key={kit.uuid} draggableId={kit.uuid} index={index}>
                                    {(prov: any, snapsh: any) => (
                                        <ListItem
                                            ref={prov.innerRef}
                                            {...prov.draggableProps}
                                            {...prov.dragHandleProps}
                                            style={getItemStyle(
                                                snapsh.isDragging,
                                                prov.draggableProps.style
                                            )}>
                                            <ListItemText
                                                primary={`${index}: ${kit.kitName.name}`}
                                                />
                                        </ListItem>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </List>
                    </RootRef>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default Kits;
