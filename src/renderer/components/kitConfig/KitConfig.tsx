import * as React from 'react';
import {
    Grid,
    TextField,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@material-ui/core';
import { useStoreon } from 'storeon/react';
import { ArrowDropDown } from '@material-ui/icons';
import styled from 'styled-components';
// import CircleSlider from 'react-circle-slider';

import { State, IOEvents } from '../../store/types/types';
import { GeneralContainerStyle } from '../../styling';
import Kits from '../Kits/index';
import { store } from '../../store';
import CircleSlider from '../CircleSlider';
import io from '../../../classes/IO';
import { Kit } from '../../../classes/Kit';

const TopRow = styled.div`
    display: flex;
`;
const MiddleRow = styled.div`
    display: flex;
    justify-content: space-around;
    padding-top: 20px;
`;

const Container = styled.div`
    ${GeneralContainerStyle()}
`;

const KitConfig: React.FunctionComponent = () => {
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [kitName, setKitName] = React.useState<string>('');
    const { selectedKit }: State = useStoreon('selectedKit');

    React.useEffect(() => {
        setKitName(selectedKit?.kitName.name || '');
    }, [selectedKit]);
    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 8) return;
        setKitName(event.target.value);
    };

    const handleBlurName = () => {
        if (!selectedKit) return;
        selectedKit.kitName.setName(kitName);
        store.dispatch(IOEvents.saveKitToDevice, selectedKit);
    };

    const handleModalToggleClick = () => {
        setIsModalOpen(!isModalOpen);
    };
    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const writeToDevice = (kit: Kit) => {
        io.writeKitPrm(kit.kitPrmObject, kit.shortPath, kit.device);
    };

    const setVolume = (v: number) => {
        if (!selectedKit) return;
        selectedKit.setParam('Level', v);
        writeToDevice(selectedKit);
    };

    const setTempo = (v: number) => {
        if (!selectedKit) return;
        selectedKit.setParam('Tempo', v);
        writeToDevice(selectedKit);
    };

    return (
        <Container>
            <TopRow>
                <TextField
                    id="name"
                    label={selectedKit ? `kit ${selectedKit?.id + 1}` : 'kit name'}
                    variant="outlined"
                    value={kitName}
                    onChange={handleChangeName}
                    disabled={!selectedKit}
                    onBlur={handleBlurName}
                />
                <IconButton onClick={handleModalToggleClick}>
                    <ArrowDropDown />
                </IconButton>
            </TopRow>
            <MiddleRow>
                <CircleSlider
                    label="Kit volume"
                    value={selectedKit?.Level || 100}
                    min={0}
                    max={100}
                    handleChange={setVolume}
                />
                <CircleSlider
                    label="Tempo"
                    value={selectedKit?.Level || 120}
                    min={40}
                    max={250}
                    handleChange={setTempo}
                />
            </MiddleRow>
            <Dialog
                open={isModalOpen}
                aria-labelledby="kit-selection-dialog"
                onClose={handleModalClose}
            >
                <DialogTitle id="kit-selection-dialog">Select kit</DialogTitle>
                <DialogContent>
                    <Kits handleSelectKit={handleModalClose} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose}>close</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default KitConfig;
