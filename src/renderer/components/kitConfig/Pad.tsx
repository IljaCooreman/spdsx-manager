import * as React from 'react';
import { Paper, makeStyles, Theme, createStyles, Grid } from '@material-ui/core';
import {
    Droppable,
    Draggable,
    DroppableStateSnapshot,
    DroppableProvided
} from 'react-beautiful-dnd';
import { useStoreon } from 'storeon/react';
import { Pad as PadClass } from '../../../classes/Pad';
import { PadNames, KitConfiguratorEvents, PadWaveTypes, State } from '../../store/types/types';
import { store } from '../../store';
import PadDroppable from './PadDroppable';

interface PadProps {
    padName: PadNames;
    pad: PadClass;
}

const Pad: React.FunctionComponent<PadProps> = ({ padName, pad }) => {
    const { selectedPad, selectedKit, dndPadWaves }: State = useStoreon(
        'selectedPad',
        'selectedKit',
        'dndPadWaves'
    );

    const getPadStyle = () => {
        return {
            height: '100px',
            background: 'white',
            border: `1px ${selectedPad === padName ? 'solid red' : 'solid white'}`
        };
    };

    if (!selectedKit)
        return (
            <Grid item xs={4}>
                <Paper
                    style={{
                        height: '100px',
                        background: '#e3e3e3'
                    }}>
                    <div>pad {padName}</div>
                </Paper>
            </Grid>
        );

    return (
        <Grid item xs={4}>
            <Paper
                style={getPadStyle()}
                onClick={() => store.dispatch(KitConfiguratorEvents.clickOnPad, padName)}>
                <div>pad {padName}</div>
                {selectedKit && (
                    <PadDroppable
                        padName={padName}
                        dndObject={dndPadWaves?.[padName][PadWaveTypes.main]}
                        padWaveType={PadWaveTypes.main}
                        />
                )}
                {selectedKit && (
                    <PadDroppable
                        padName={padName}
                        dndObject={dndPadWaves?.[padName][PadWaveTypes.sub]}
                        padWaveType={PadWaveTypes.sub}
                        />
                )}
            </Paper>
        </Grid>
    );
};

export default Pad;
