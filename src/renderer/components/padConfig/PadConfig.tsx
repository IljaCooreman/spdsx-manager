import * as React from 'react';
import { useStoreon } from 'storeon/react';
import styled from 'styled-components';

import Slider from '@material-ui/core/Slider';
import { State, IOEvents, PadPrmSpdTags, KitConfiguratorEvents } from '../../store/types/types';
import { GeneralContainerStyle } from '../../styling';

import { store } from '../../store';

import { stripExtension } from '../../../classes/xmlUtils';
import CircleSlider from '../CircleSlider';
import SelectInput from '../SelectInput';
import {
    muteGrpOptions,
    tempoSyncOptions,
    voiceAssignOptions,
    outAsgnOptions,
    dynamicsOptions,
    trigTypeOptions,
    loopOptions
} from './inputOptions';

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

const SelectContainer = styled.div``;

const PadConfig: React.FunctionComponent = () => {
    const { selectedPad, selectedKit }: State = useStoreon('selectedPad', 'selectedKit');
    const pad = selectedPad !== undefined && !!selectedKit ? selectedKit[selectedPad] : undefined;

    if (!pad) return null;

    const handleChange = (value: number, padPrmType: PadPrmSpdTags) => {
        if (!pad || typeof value !== 'number') return;
        store.dispatch(KitConfiguratorEvents.setPadParam, {
            pad,
            paramType: padPrmType,
            value
        });
        store.dispatch(IOEvents.saveKitToDevice, pad.kit);
    };
    return (
        <Container>
            <h3>{selectedPad === undefined || !selectedKit ? 'No selection' : `${selectedPad}`}</h3>
            <h1>{stripExtension(pad?.wave?.name.name || 'No wave')}</h1>
            <CircleSlider
                label="Pad volume"
                value={pad.WvLevel}
                min={0}
                max={100}
                handleChange={(value: number) => handleChange(value, 'WvLevel')}
            />
            <Slider
                value={pad.WvPan - 15}
                onChange={(_, value) => {
                    if (typeof value !== 'number') return;
                    handleChange(value + 15, 'WvPan');
                }}
                step={1}
                min={-15}
                max={15}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
            />
            <SelectContainer>
                <SelectInput
                    label="Mute group"
                    options={muteGrpOptions}
                    selectedValue={pad.MuteGrp}
                    handleChange={(value: number) => {
                        handleChange(value, 'MuteGrp');
                    }}
                />
                <SelectInput
                    label="Tempo sync"
                    options={tempoSyncOptions}
                    selectedValue={pad.TempoSync}
                    handleChange={(value: number) => {
                        handleChange(value, 'TempoSync');
                    }}
                />
                <SelectInput
                    label="Loop"
                    options={loopOptions}
                    selectedValue={pad.Loop}
                    handleChange={(value: number) => {
                        handleChange(value, 'Loop');
                    }}
                />
                <SelectInput
                    label="Trigger type"
                    options={trigTypeOptions}
                    selectedValue={pad.TrigType}
                    handleChange={(value: number) => {
                        handleChange(value, 'TrigType');
                    }}
                />
                <SelectInput
                    label="Dynamics"
                    options={dynamicsOptions}
                    selectedValue={pad.Dynamics}
                    handleChange={(value: number) => {
                        handleChange(value, 'Dynamics');
                    }}
                />
                <SelectInput
                    label="Poly/Mono"
                    options={voiceAssignOptions}
                    selectedValue={pad.VoiceAsgn}
                    handleChange={(value: number) => {
                        handleChange(value, 'VoiceAsgn');
                    }}
                />
                <SelectInput
                    label="Output"
                    options={outAsgnOptions}
                    selectedValue={pad.OutAsgn}
                    handleChange={(value: number) => {
                        handleChange(value, 'OutAsgn');
                    }}
                />
            </SelectContainer>
        </Container>
    );
};

export default PadConfig;
