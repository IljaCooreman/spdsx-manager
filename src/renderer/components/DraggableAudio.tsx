import * as React from 'react';
import { PlayArrow, Stop, MoreVert } from '@material-ui/icons';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { IconButton } from '@material-ui/core';
import { Howl } from 'howler';
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
    const [isHovering, setIsHovering] = React.useState<boolean>(false);
    const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
    const [sound, setSound] = React.useState<Howl | undefined>(undefined);

    React.useEffect(() => {
        setSound(new Howl({ src: [`file://${dndObject.item.fullPath}`], preload: false }));
    }, [dndObject]);

    const onClick = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (!sound) return;
        setIsPlaying(false);
        sound.load();
        sound.stop();
        if (!isPlaying) {
            sound.play();
            setIsPlaying(true);
            sound.once('end', () => {
                setIsPlaying(false);
            });
        }
        if (!handleClick) return;
        handleClick(dndObject.id);
    };

    return (
        <Draggable key={dndObject.id} draggableId={dndObject.id} index={index}>
            {(prov, snapsh) => (
                <>
                    <Container
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        isDragging={snapsh.isDragging}
                        onClick={(e: any) => e.stopPropagation()}
                        isDark={theme === 'dark'}
                        ref={prov.innerRef}
                        {...prov.draggableProps}
                        {...prov.dragHandleProps}
                        style={snapsh.isDragging ? { ...prov.draggableProps.style } : {}}
                        key={dndObject.id}
                    >
                        <IconButton aria-label="play/pauze" size="small" onClick={onClick}>
                            {isPlaying ? (
                                <Stop
                                    fontSize="inherit"
                                    htmlColor={theme === 'dark' ? colors.bgWhite : colors.black}
                                />
                            ) : (
                                <PlayArrow
                                    fontSize="inherit"
                                    htmlColor={theme === 'dark' ? colors.bgWhite : colors.black}
                                />
                            )}
                        </IconButton>
                        {stripExtension(dndObject.item.name)}
                        {isHovering && (
                            <IconButton size="small">
                                <MoreVert />
                            </IconButton>
                        )}
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
