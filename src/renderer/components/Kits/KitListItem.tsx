import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { DragHandle } from '@material-ui/icons';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { colors } from '../../styling';
import { Kit } from '../../../classes/Kit';
import { store } from '../../store';
import { KitNavigatorEvents, DummyKit } from '../../store/types/types';

interface KitListItemProps {
    kit: Kit | DummyKit;
    index: number;
    selectedKit: Kit | undefined;
    onItemClick: (kit: Kit | DummyKit) => any;
}

const createNewKit = (id: number) => {
    store.dispatch(KitNavigatorEvents.createNewKit, id);
    // TODO: automatically select new kit
    store.dispatch(KitNavigatorEvents.selectKit, undefined);
};

const getItemStyle = (isDragging: any, draggableStyle: any, isSelected: boolean) => ({
    // eslint-disable-next-line no-nested-ternary
    background: isDragging ? 'lightgreen' : isSelected ? 'grey' : 'none',
    // styles we need to apply on draggables
    ...draggableStyle
});

const KitListItem: React.FunctionComponent<KitListItemProps> = ({
    onItemClick,
    kit,
    index,
    selectedKit
}) => {
    const [isHovering, setIsHovering] = React.useState<boolean>(false);

    return (
        <Draggable key={kit.uuid} draggableId={kit.uuid} index={index}>
            {(prov, snapsh) =>
                (kit as Kit).type === 'Kit' ? (
                    <ListItem
                        ref={prov.innerRef}
                        {...prov.draggableProps}
                        onClick={() => onItemClick(kit)}
                        style={getItemStyle(
                            snapsh.isDragging,
                            prov.draggableProps.style,
                            kit.uuid === selectedKit?.uuid
                        )}
                    >
                        <div {...prov.dragHandleProps}>
                            <DragHandle />
                        </div>
                        <ListItemClickable>
                            <KitId>Kit{kit.id + 1}</KitId>
                            <KitName>{kit.kitName.name}</KitName>
                        </ListItemClickable>
                    </ListItem>
                ) : (
                    <ListItem>
                        <div {...prov.dragHandleProps} ref={prov.innerRef} {...prov.draggableProps}>
                            <DragHandle />
                        </div>
                        <ListItemClickable
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            <KitId>Kit{kit.id + 1}</KitId>
                            <KitNameEmpty>empty</KitNameEmpty>
                            {isHovering && (
                                <Button
                                    style={{ position: 'absolute', right: '4px' }}
                                    size="small"
                                    onClick={() => createNewKit(kit.id)}
                                >
                                    Create
                                </Button>
                            )}
                        </ListItemClickable>
                    </ListItem>
                )
            }
        </Draggable>
    );
};

const ListItemClickable = styled.div`
    position: relative;
    cursor: pointer;
    display: flex;
    flex-grow: 1;
    align-items: center;
    padding: 4px;
    transition: background 0.2s ease;

    &&:hover {
        background: ${colors.lightHover};
    }
`;

const ListItem = styled.li`
    display: flex;
    align-items: center;
    user-select: none;
`;

const KitId = styled.span`
    color: ${colors.lightGrey};
    font-size: 12px;
    font-family: Roboto-Light;
    margin: 0 6px;
`;

const KitName = styled.span`
    color: ${colors.black};
    font-size: 12px;
`;
const KitNameEmpty = styled.span`
    color: ${colors.lightGrey};
    font-style: italic;
    font-family: Roboto-light;
    font-size: 12px;
`;

export default KitListItem;
