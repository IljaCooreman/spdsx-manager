import * as React from 'react';
import { Grid } from '@material-ui/core';
import { useStoreon } from 'storeon/react';
import styled from 'styled-components';
import { PadNames, State } from '../../store/types/types';
import Pad from './Pad';
import { colors } from '../../styling';

const Row = styled.div`
    display: flex;
    flex-wrap: nowrap;
`;

const Container = styled.div<{ isActive: boolean }>`
    background: ${colors.black};
    box-shadow: 0 4px 13px 0 #858d91;
    border-radius: 26px;
    padding: 26px;
    opacity: ${({ isActive }: any) => (isActive ? 1 : 0.4)};
`;

const Spdsx: React.FunctionComponent = () => {
    const { selectedKit: kit }: State = useStoreon('selectedKit');

    return (
        <Container isActive={!!kit}>
            <Row>
                <Pad padName={PadNames.pad1} pad={kit?.[PadNames.pad1]} isActive={!!kit} />
                <Pad padName={PadNames.pad2} pad={kit?.[PadNames.pad2]} isActive={!!kit} />
                <Pad padName={PadNames.pad3} pad={kit?.[PadNames.pad3]} isActive={!!kit} />
            </Row>
            <Row>
                <Pad padName={PadNames.pad4} pad={kit?.[PadNames.pad4]} isActive={!!kit} />
                <Pad padName={PadNames.pad5} pad={kit?.[PadNames.pad5]} isActive={!!kit} />
                <Pad padName={PadNames.pad6} pad={kit?.[PadNames.pad6]} isActive={!!kit} />
            </Row>
            <Row>
                <Pad padName={PadNames.pad7} pad={kit?.[PadNames.pad7]} isActive={!!kit} />
                <Pad padName={PadNames.pad8} pad={kit?.[PadNames.pad8]} isActive={!!kit} />
                <Pad padName={PadNames.pad9} pad={kit?.[PadNames.pad9]} isActive={!!kit} />
            </Row>
            <Row />
            <Row>
                <Pad padName={PadNames.trigger1} pad={kit?.[PadNames.trigger1]} isActive={!!kit} />
                <Pad padName={PadNames.trigger2} pad={kit?.[PadNames.trigger2]} isActive={!!kit} />
                <Pad
                    padName={PadNames.footSwitch1}
                    pad={kit?.[PadNames.footSwitch1]}
                    isActive={!!kit}
                />
            </Row>
            <Row>
                <Pad padName={PadNames.trigger3} pad={kit?.[PadNames.trigger3]} isActive={!!kit} />
                <Pad padName={PadNames.trigger4} pad={kit?.[PadNames.trigger4]} isActive={!!kit} />
                <Pad
                    padName={PadNames.footSwitch2}
                    pad={kit?.[PadNames.footSwitch2]}
                    isActive={!!kit}
                />
            </Row>
        </Container>
    );
};

export default Spdsx;
