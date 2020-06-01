import styled, { css } from 'styled-components';

export const colors = {
    red: '#D04444',
    black: `#282D31`,
    bgWhite: `#F8FBFC`,
    bgDarkGrey: '#474A4C',
    lightGrey: '#B0B2B4',
    lightHover: '#F3F3F3'
};

export const GeneralContainerStyle = () => {
    return css`
        background: ${colors.bgWhite};
        box-shadow: 0 -2px 4px 0 rgba(255, 255, 255, 0.75), 0 2px 4px 0 rgba(105, 105, 105, 0.5);
        border-radius: 10px;
        font-family: Roboto-Medium;
        font-size: 12px;
        color: ${colors.bgDarkGrey};
        padding: 12px;
        margin: 12px;
    `;
};
