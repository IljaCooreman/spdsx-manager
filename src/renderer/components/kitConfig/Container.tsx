import * as React from 'react';
import { Grid } from '@material-ui/core';
import { useStoreon } from 'storeon/react';
import Spdsx from './Spdsx';
import { State } from '../../store/types/types';
import KitConfig from './KitConfig';

const Container: React.FunctionComponent = () => {
    const { selectedKit }: State = useStoreon('selectedKit');
    return (
        <Grid item container spacing={2} xs={6} alignItems="stretch" alignContent="stretch">
            <KitConfig kit={selectedKit} />
            <Spdsx kit={selectedKit} />
            <Grid item xs={12} style={{}}>
                configure pad here
            </Grid>
        </Grid>
    );
};

export default Container;
