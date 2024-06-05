import React from 'react';
import styled from 'styled-components';

const IconWrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 27.3vw;
  width: 253px;
  height: 382px;
`;

const LightningIcon: React.FC = () => {
  return (
    <IconWrapper>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='253'
        height='382'
        viewBox='0 0 253 382'
        fill='none'
      >
        <path
          d='M197.269 -66L0 185.447H90.9968L55.7308 382L253 130.553H162.003L197.269 -66Z'
          fill='#633AE2'
        />
      </svg>
    </IconWrapper>
  );
};

export default LightningIcon;
