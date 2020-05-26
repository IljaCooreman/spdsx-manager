import * as React from 'react';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { useStoreon } from 'storeon/react';
import { Droppable } from 'react-beautiful-dnd';
import { openImportDialog } from '../../utils/openDialog';
import { GeneralContainer, colors } from '../../styling';

import { WaveManagerEvents, State } from '../../store/types/types';
import DraggableAudio from '../DraggableAudio';

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ContentContainer = styled.div`
    min-height: 120px;
    display: flex;
    flex-flow: column;
`;

const EmptyMessage = styled.div`
    margin: 30px 20px;
    align-self: center;
    justify-self: center;
    text-align: center;
    flex-grow: 1;
    opacity: 0.3;
    font-family: Roboto-Medium;
    font-size: 14px;
    color: ${colors.black};
`;

const Container = GeneralContainer();

const LocalWaveList: React.FunctionComponent = props => {
    const { dndLocalWaves }: State = useStoreon('dndLocalWaves');
    return (
        <Container>
            <TitleContainer>
                <h3>Local files</h3>
                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => openImportDialog(WaveManagerEvents.import, {})}
                >
                    import
                </Button>
            </TitleContainer>
            <Droppable droppableId="local-localwavelist" type="PAD" isDropDisabled={true}>
                {(provided, snapshot) => (
                    <ContentContainer ref={provided.innerRef}>
                        {dndLocalWaves.length > 0 ? (
                            dndLocalWaves.map((item, index) => {
                                return (
                                    <DraggableAudio
                                        key={item.id}
                                        dndObject={item}
                                        index={index}
                                        shouldCopy={true}
                                    />
                                );
                            })
                        ) : (
                            <EmptyMessage>
                                Drag files or click the import button to import files from your
                                computer
                            </EmptyMessage>
                        )}

                        {provided.placeholder}
                    </ContentContainer>
                )}
            </Droppable>
        </Container>
    );
};

export default LocalWaveList;
