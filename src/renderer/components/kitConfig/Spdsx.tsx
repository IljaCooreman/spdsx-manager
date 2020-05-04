import * as React from 'react';
import { Grid } from '@material-ui/core';
import Pad from './Pad';
import { Kit } from '../../../classes/Kit';
import { PadNames } from '../../store/types/types';

export interface SpdsxProps {
    kit: Kit | undefined;
}

const Spdsx: React.FunctionComponent<SpdsxProps> = ({ kit }) => {
    return (
        <Grid item container xs={6} spacing={2}>
            <Grid container spacing={2}>
                <Pad padName={PadNames.pad1} pad={kit?.[PadNames.pad1]} />
                <Pad padName={PadNames.pad2} pad={kit?.[PadNames.pad2]} />
                <Pad padName={PadNames.pad3} pad={kit?.[PadNames.pad3]} />
            </Grid>
            <Grid container spacing={2}>
                <Pad padName={PadNames.pad4} pad={kit?.[PadNames.pad4]} />
                <Pad padName={PadNames.pad5} pad={kit?.[PadNames.pad5]} />
                <Pad padName={PadNames.pad6} pad={kit?.[PadNames.pad6]} />
            </Grid>
        </Grid>
    );
};

export default Spdsx;
