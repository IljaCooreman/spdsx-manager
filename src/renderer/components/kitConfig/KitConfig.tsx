import * as React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { Kit } from '../../../classes/Kit';

interface KitConfigProps {
    kit: Kit | undefined;
}

const KitConfig: React.FunctionComponent<KitConfigProps> = ({ kit }) => {
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
                    value={kit?.kitName?.name || ''}
                    onChange={handleChange}
                    disabled={!kit}
                    />
                {/* <TextField
          id="Tempo"
          label="Tempo"
          size="small"
          value={kit?.Tempo}
          onChange={handleChange}
        />
        <TextField
          id="Level"
          label="Level"
          size="small"
          value={kit?.Tempo}
          onChange={handleChange}
        /> */}
            </form>
        </Grid>
    );
};

export default KitConfig;
