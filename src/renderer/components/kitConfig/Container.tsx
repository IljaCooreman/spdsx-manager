import * as React from 'react';
import { Grid } from '@material-ui/core';
import { useStoreon } from 'storeon/react';
import Spdsx from './Spdsx';
import { State } from '../../store/types/types';

const Container: React.FunctionComponent = () => {
    const { selectedKit }: State = useStoreon('selectedKit');
    return (
        <Grid item container spacing={2} xs={6} direction="column">
            <Grid item xs={3}>
                configurate kit settings here
            </Grid>
            <Spdsx kit={selectedKit} />
            <Grid item xs={3}>
                configure pad here
            </Grid>
        </Grid>
    );
};

export default Container;
