import * as React from 'react';
import { PlayArrow } from '@material-ui/icons';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { IconButton } from '@material-ui/core';
import DeviceWave, { DndObject } from '../../classes/DeviceWave';
import LocalWave from '../../classes/LocalWave';
import { stripExtension } from '../../classes/xmlUtils';
import { colors } from '../styling';

interface DraggableAudioProps {
    handleClick?: (id: string) => void;
    dndObject: DndObject<DeviceWave | LocalWave>;
    isDragDisabled?: boolean;
    theme?: 'light' | 'dark';
    index: number;
    shouldCopy?: boolean;
}

const Container = styled.div<{ isDark: boolean; isDragging: boolean }>`
    display: flex;
    align-items: center;
    padding: 4px;
    padding-right: 20px;
    border-radius: 4px;
    user-select: none;
    font-family: Roboto-Light;

    border: ${({ isDragging }) => (isDragging ? `1px solid ${colors.bgDarkGrey}` : 'none')};
    box-shadow: ${({ isDragging }) => (isDragging ? '0 2px 8px 0 rgba(0,0,0,0.20)' : 'none')};
    background: ${({ isDragging }) => (isDragging ? colors.bgWhite : 'none')};
    color: ${({ isDark }: any) => (isDark ? colors.bgWhite : colors.black)};
`;

const DraggableAudio: React.FunctionComponent<DraggableAudioProps> = ({
    handleClick,
    dndObject,
    isDragDisabled = false,
    theme = 'light',
    index,
    shouldCopy = false
}) => {
    const onClick = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        const audio = new Audio(stripExtension(dndObject.item.fullPath));
        console.log(dndObject.item.fullPath);
        audio.play();
        if (!handleClick) return;
        handleClick(dndObject.id);
    };

    return (
        <Draggable key={dndObject.id} draggableId={dndObject.id} index={index}>
            {(prov, snapsh) => (
                <>
                    <Container
                        isDragging={snapsh.isDragging}
                        onClick={(e: any) => e.stopPropagation()}
                        isDark={theme === 'dark'}
                        ref={prov.innerRef}
                        {...prov.draggableProps}
                        {...prov.dragHandleProps}
                        style={snapsh.isDragging ? { ...prov.draggableProps.style } : {}}
                        key={dndObject.id}>
                        <IconButton aria-label="play/pauze" size="small" onClick={onClick}>
                            <PlayArrow
                                fontSize="inherit"
                                htmlColor={theme === 'dark' ? colors.bgWhite : colors.black}
                                />
                        </IconButton>
                        {dndObject.item.name}
                    </Container>
                    {shouldCopy && snapsh.isDragging && (
                        <Container isDragging={false} isDark={theme === 'dark'}>
                            <IconButton aria-label="play/pauze" size="small">
                                <PlayArrow
                                    fontSize="inherit"
                                    htmlColor={theme === 'dark' ? colors.bgWhite : colors.black}
                                    />
                            </IconButton>
                            {stripExtension(dndObject.item.name)}
                        </Container>
                    )}
                </>
            )}
        </Draggable>
    );
};

export default DraggableAudio;
