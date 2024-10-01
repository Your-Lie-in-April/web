import React from 'react';
import styled from 'styled-components';
import ArrowIcon from './ArrowIcon';
import LightningIcon from './LightningIcon';
import SpringIcon from './SpringIcon';
import SummertimeSadnessIcon from './Summertime_sadness ';

const GraphicIconsWrapper = styled.div`
    z-index: 0;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #000000;
`;

const GraphicIcons: React.FC = () => {
    return (
        <GraphicIconsWrapper>
            <ArrowIcon />
            <LightningIcon />
            <SpringIcon />
            <SummertimeSadnessIcon />
        </GraphicIconsWrapper>
    );
};

export default GraphicIcons;
