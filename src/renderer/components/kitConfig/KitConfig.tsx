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
import { State } from '../../store/types/types';
import { GeneralContainer } from '../../styling';
import Kits from '../Kits/index';

const TopRow = styled.div`
    display: flex;
`;
const MiddleRow = styled.div`
    display: flex;
`;

const KitConfig: React.FunctionComponent = () => {
    const { selectedKit }: State = useStoreon('selectedKit');
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setName(event.target.value);
        // console.log(event.target.value)
    };

    const handleModalToggleClick = () => {
        setIsModalOpen(!isModalOpen);
    };
    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    const Container = GeneralContainer();

    return (
        <Container>
            <TopRow>
                <TextField
                    id="name"
                    label={selectedKit ? `kit ${selectedKit?.id + 1}` : 'kit name'}
                    variant="outlined"
                    value={selectedKit?.kitName?.name || ''}
                    onChange={handleChange}
                    disabled={!selectedKit}
                />
                <IconButton onClick={handleModalToggleClick}>
                    <ArrowDropDown />
                </IconButton>
            </TopRow>
            <MiddleRow />
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
