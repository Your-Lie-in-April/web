import React from 'react';
import styled from 'styled-components';

const IconWrapper = styled.div`
  position: fixed;
  top: 52.8vh;
  left: 0;
  width: 473px;
  height: 348px;
  flex-shrink: 0;

  @media (max-width: 1200px) {
    top: 41.7vh;
    left: 1vw;
  }

  @media (max-width: 768px) {
    top: 31.3vh;
    left: 0.5vw;
  }
`;

const ArrowIcon: React.FC = () => {
  return (
    <IconWrapper>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='473'
        height='348'
        viewBox='0 0 473 348'
        fill='none'
      >
        <path
          d='M336.938 209.667H0V138.333H336.938L249.36 50.4411L299.621 0L473 174L299.621 348L249.36 297.559L336.938 209.667Z'
          fill='#C2D57A'
        />
      </svg>
    </IconWrapper>
  );
};

export default ArrowIcon;