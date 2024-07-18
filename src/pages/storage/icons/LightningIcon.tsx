import React from 'react';
import styled from 'styled-components';

const IconWrapper = styled.div`
  position: fixed;
  top: 20.6vh;
  left: 27.3vw;
  width: 253px;
  height: 448px;

  @media (max-width: 768px) {
    top: 18.6vh;
    left: 2.6vw;
  }

  @media (max-width: 480px) {
    width: 150px;
    height: 266px;
  }
`;

const LightningIcon: React.FC = () => {
  return (
    <IconWrapper>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='100%'
        height='100%'
        viewBox='0 0 253 448'
        fill='none'
      >
        <path
          d='M197.269 0L0 251.447H90.9968L55.7308 448L253 196.553H162.003L197.269 0Z'
          fill='#633AE2'
        />
      </svg>
    </IconWrapper>
  );
};

export default LightningIcon;
