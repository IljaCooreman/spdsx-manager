import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: absolute;
    top: 4px;
    right: 6px;
    opacity: 0.3;
    font-size: 12px;
`;

const Version: React.FunctionComponent = () => {
    return <Container>v{process.env.npm_package_version}</Container>;
};

export default Version;
