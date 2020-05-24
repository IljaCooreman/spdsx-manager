import * as React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { useStoreon } from 'storeon/react';
import { Kit } from '../../../classes/Kit';
import { State } from '../../store/types/types';

const KitConfig: React.FunctionComponent = () => {
    const { selectedKit }: State = useStoreon('selectedKit');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setName(event.target.value);
        // console.log(event.target.value)
    };

    return (
        <Grid item xs={12} style={{}}>
            <form noValidate autoComplete="off">
                <TextField
                    id="name"
                    label="Kit name"
                    variant="outlined"
                    value={selectedKit?.kitName?.name || ''}
                    onChange={handleChange}
                    disabled={!selectedKit}
                />
            </form>
        </Grid>
    );
};

export default KitConfig;
