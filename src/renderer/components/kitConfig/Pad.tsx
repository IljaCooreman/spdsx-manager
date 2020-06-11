import * as React from 'react';
import { Grid } from '@material-ui/core';
import {
    Droppable,
    Draggable,
    DroppableStateSnapshot,
    DroppableProvided
} from 'react-beautiful-dnd';
import { useStoreon } from 'storeon/react';
import styled from 'styled-components';
import { Pad as PadClass } from '../../../classes/Pad';
import { PadNames, KitConfiguratorEvents, PadWaveTypes, State } from '../../store/types/types';
import { store } from '../../store';
import PadDroppable from './PadDroppable';
import { colors } from '../../styling';

interface PadProps {
    padName: PadNames;
    pad: PadClass | undefined;
    isActive: boolean;
}

const Pad: React.FunctionComponent<PadProps> = ({ padName, isActive }) => {
    const { selectedPad, dndPadWaves }: State = useStoreon('selectedPad', 'dndPadWaves');

    const PadDroppables = () => (
        <>
            <PadDroppable
                padName={padName}
                dndObject={dndPadWaves?.[padName][PadWaveTypes.main]}
                padWaveType={PadWaveTypes.main}
            />
            <PadDroppable
                padName={padName}
                dndObject={dndPadWaves?.[padName][PadWaveTypes.sub]}
                padWaveType={PadWaveTypes.sub}
            />
        </>
    );

    return (
        <PadContainer
            isSelected={selectedPad === padName}
            onClick={() => store.dispatch(KitConfiguratorEvents.clickOnPad, padName)}
        >
            <PadName>{padName}</PadName>
            {isActive && PadDroppables()}
        </PadContainer>
    );
};

export default Pad;

interface Props {
    isSelected: boolean;
}

const PadContainer = styled.div<Props>`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 150px;
    width: 150px;
    background: ${(props: any) => (props.isSelected ? colors.red : colors.bgDarkGrey)};
    margin: 4px;
    box-shadow: 0 2px 15px 0 #000000;
    cursor: pointer;
`;

const PadName = styled.span`
    font-family: Roboto-Medium;
    font-size: 12px;
    color: #838383;
    text-transform: uppercase;
    position: absolute;
    right: 4px;
    top: 4px;
`;
