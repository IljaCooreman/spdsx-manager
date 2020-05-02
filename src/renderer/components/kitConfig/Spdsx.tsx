import * as React from 'react';
import { Grid } from '@material-ui/core';
import Pad from './Pad';

const Spdsx: React.FunctionComponent = () => {
    return (
        <Grid item container xs={6} spacing={2}>
            <Grid container spacing={2}>
                <Pad id={0} />
                <Pad id={1} />
                <Pad id={2} />
            </Grid>
            <Grid container spacing={2}>
                <Pad id={4} />
                <Pad id={5} />
                <Pad id={6} />
            </Grid>
        </Grid>
    );
};

export default Spdsx;
