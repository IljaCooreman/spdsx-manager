import * as React from 'react';
import {
    CircularInput,
    CircularTrack,
    CircularProgress,
    useCircularDrag
} from 'react-circular-input';
import styled from 'styled-components';
import { colors } from '../styling';

interface CircleSliderProps {
    value?: number;
    handleChange: (value: number) => any;
    size?: number;
    strokeWidth?: number;
    min: number;
    max: number;
    label: string;
}

const Container = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    font-family: Roboto-Medium;
    color: ${colors.lightGrey};
`;

const CustomDragger = ({ radius }: { radius: number }) => {
    const ref = React.useRef(null);
    useCircularDrag(ref);
    return <circle ref={ref} cx={50} cy={50} r={radius + 10} opacity={0} />;
};

const valueToPercent = (value: number, min: number, max: number) => {
    const range = max - min;
    return value / range;
};

const percentToValue = (value: number, min: number, max: number) => {
    return Math.round((value * (max - min) + min) * 1) / 1;
};

const CircleSlider: React.FunctionComponent<CircleSliderProps> = ({
    value,
    min,
    max,
    handleChange,
    size = 25,
    strokeWidth = 6,
    label
}) => {
    const [innerValue, setInnerValue] = React.useState<number>(valueToPercent(value, min, max));
    React.useEffect(() => {
        setInnerValue(value ? valueToPercent(value, min, max) : 0);
    }, [value]);

    return (
        <Container>
            {label}
            <CircularInput
                style={{ padding: strokeWidth / 2, margin: '4px' }}
                radius={size}
                value={innerValue}
                onChange={setInnerValue}
                onChangeEnd={() => handleChange(percentToValue(innerValue, min, max))}
            >
                <defs>
                    <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
                        <feOffset result="offOut" in="SourceAlpha" dx="0" dy="2" />
                        <feColorMatrix
                            result="matrixOut"
                            in="offOut"
                            type="matrix"
                            values=".5 0 0 0 0 0 .5 0 0 0 0 0 .5 0 0 0 0 0 .4 0"
                        />
                        <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="3" />
                        <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                    </filter>
                </defs>
                <CircularTrack strokeWidth={strokeWidth} stroke="#CACACA" />
                {value && (
                    <CircularProgress
                        stroke="#666666"
                        strokeWidth={strokeWidth}
                        strokeLinecap="butt"
                    />
                )}
                <circle
                    cx={size}
                    cy={size}
                    r={size - strokeWidth / 2}
                    fill="#E2E9EC"
                    filter="url(#shadow)"
                />
                {value && (
                    <text
                        x={size}
                        y={size}
                        pointerEvents="none"
                        textAnchor="middle"
                        dy="0.3em"
                        fontFamily="Roboto-medium"
                        fontSize="14"
                        fill="#55636D"
                        opacity=".5"
                    >
                        {percentToValue(innerValue, min, max)}
                    </text>
                )}
                <CustomDragger radius={size} />
            </CircularInput>
        </Container>
    );
};

export default CircleSlider;
