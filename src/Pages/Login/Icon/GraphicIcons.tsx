import React from 'react';
import styled from 'styled-components';
import ArrowIcon from './ArrowIcon';
import LightningIcon from './LightningIcon';
import SpringIcon from './SpringIcon';
import SummertimeSadnessIcon from './Summertime_sadness ';

const GraphicIconsWrapper = styled.div`
  position: relative;
  z-index: 1; 
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