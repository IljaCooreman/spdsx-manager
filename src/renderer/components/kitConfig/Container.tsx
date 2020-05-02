import * as React from 'react';
import { Grid } from '@material-ui/core';
import Spdsx from './Spdsx';

const Container: React.FunctionComponent = () => {
    return (
        <Grid item container>
            <Spdsx />
        </Grid>
    );
};

export default Container;
