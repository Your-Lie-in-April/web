import React from 'react';
import styled from 'styled-components';

const IconWrapper = styled.div`
  position: absolute;
  top: 373px;
  left: 532px;
  width: 253px;
  height: 448px;
  flex-shrink: 0;
`;

const LightningIcon: React.FC = () => (
  <IconWrapper>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="253"
      height="448"
      viewBox="0 0 253 448"
      fill="none"
    >
      <path
        d="M197.269 0L0 251.447H90.9968L55.7308 448L253 196.553H162.003L197.269 0Z"
        fill="#633AE2"
      />
    </svg>
  </IconWrapper>
);

export default LightningIcon;
