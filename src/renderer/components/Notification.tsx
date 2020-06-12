import * as React from 'react';
import { useStoreon } from 'storeon/react';
import { IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { State } from '../store/types/types';

const Notification: React.FunctionComponent = () => {
    const [open, setOpen] = React.useState<boolean>(false);
    const { notification }: State = useStoreon('notification');

    React.useEffect(() => {
        if (notification) setOpen(true);
    }, [notification]);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={notification?.message}
            action={
                <>
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </>
            }
        />
    );
};

export default Notification;
