import * as React from 'react';
import { MoreVert } from '@material-ui/icons';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import DeviceWave, { DndObject } from '../../classes/DeviceWave';
import LocalWave from '../../classes/LocalWave';
import { store } from '../store';
import { WaveManagerEvents } from '../store/types/types';

interface AudioPopupMenuProps {
    isHovering: boolean;
    dndObject: DndObject<DeviceWave | LocalWave>;
    handleRenameStart: () => void;
}

const PlaceHolder = styled.div`
    min-width: 32px;
    min-height: 24px;
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
    position: relative;
`;

const AudioPopupMenu: React.FunctionComponent<AudioPopupMenuProps> = ({
    isHovering,
    dndObject,
    handleRenameStart
}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const togglePopupMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRenameClick = () => {
        handleRenameStart();
        if (anchorEl) anchorEl.focus();
        handleClose();
    };

    const handleDelete = () => {
        if (dndObject.item instanceof DeviceWave) {
            store.dispatch(WaveManagerEvents.deleteDeviceWave, dndObject.item.uuid);
        }
        handleClose();
    };

    return (
        <PlaceHolder>
            {isHovering && (
                <IconButton
                    size="small"
                    aria-controls="popup-menu"
                    aria-haspopup="true"
                    onClick={togglePopupMenu}
                >
                    <MoreVert />
                </IconButton>
            )}
            <Menu
                id="popup-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {/* <MenuItem onClick={handleClose}>Info</MenuItem> */}
                <MenuItem onClick={handleRenameClick}>Rename</MenuItem>
                {/* <MenuItem onClick={handleClose}>Remove from pad</MenuItem>
                <MenuItem onClick={handleClose}>Copy</MenuItem> */}
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
        </PlaceHolder>
    );
};

export default AudioPopupMenu;
