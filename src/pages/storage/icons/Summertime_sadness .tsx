import React from 'react';
import styled from 'styled-components';

const IconWrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  flex-shrink: 0;
  overflow: hidden;
  width: 319px;
  height: 281px;

  @media (max-width: 1200px) {
    right: 1vw;
  }

  @media (max-width: 768px) {
    right: 0.5vw;
  }
`;

const SummertimeSadnessIcon: React.FC = () => {
  return (
    <IconWrapper>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="319"
        height="281"
        viewBox="0 0 319 281"
        fill="none"
      >
        <path
          d="M410 103C410 46.1147 364.109 -2.00595e-06 307.5 -4.48042e-06C250.89 -6.95492e-06 205 46.1147 205 103C205 46.1147 159.11 -1.09667e-05 102.5 -1.34413e-05C45.89 -1.59158e-05 2.85018e-05 46.1147 2.60153e-05 103C2.35287e-05 159.886 45.8899 206 102.5 206C45.8899 206 1.94973e-05 252.114 1.70108e-05 309C1.45242e-05 365.886 45.8899 412 102.5 412C159.11 412 205 365.886 205 309C205 365.886 250.89 412 307.5 412C364.109 412 410 365.886 410 309C410 252.114 364.109 206 307.5 206C364.109 206 410 159.886 410 103Z"
          fill="#FFCB3C"
        />
      </svg>
    </IconWrapper>
  );
};

export default SummertimeSadnessIcon;