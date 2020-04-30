import * as React from 'react';
import { useStoreon } from 'storeon/react';
import Button from '@material-ui/core/Button';
import { List, ListItem, ListItemText, ListItemIcon, ListSubheader } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import { openImportDialog } from '../utils/openDialog';
import { State, WaveManagerEvents } from '../store/types/types';
import DeviceWave from '../../classes/DeviceWave';
import { store } from '../store';

const WaveManager: React.FunctionComponent = () => {
    const { deviceWaves } = useStoreon<State, WaveManagerEvents>('deviceWaves');
    const onAddWaveClick = (wave: DeviceWave) => {
        // store.dispatch(WaveManagerEvents.addWaveToDevice, wave);
    };
    return (
        <div>
            <Button
                variant="outlined"
                onClick={() => openImportDialog(WaveManagerEvents.import, {})}>
                import
            </Button>
            <List
                component="div"
                aria-labelledby="waves-on-device"
                subheader={
                    <ListSubheader component="div" id="waves-on-device">
                        Waves on device
                    </ListSubheader>
                }>
                {deviceWaves.map((wave: DeviceWave) => (
                    <ListItem
                        button
                        key={wave.wvNr}
                        onClick={() => {
                            console.log(wave);
                        }}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary={wave.name} />
                        {/* <Button onClick={() => onAddWaveClick(wave)}>add</Button> */}
                    </ListItem>
                ))}
            </List>

            <Button>Export all</Button>
        </div>
    );
};

export default WaveManager;
