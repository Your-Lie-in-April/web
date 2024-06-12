import React from 'react';
import styled from 'styled-components';

const IconWrapper = styled.div`
  position: absolute;
  top: 225px;
  right: -100px;
  flex-shrink: 0;
  overflow: hidden;
  stroke-width: 3px;
  stroke: #eb5757;
`;

const SpringIcon: React.FC = () => {
  return (
    <IconWrapper>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='651'
        height='908'
        viewBox='0 0 651 908'
        fill='none'
      >
        <path
          d='M131.67 2.32025C24.1563 100.197 -26.7725 219.336 17.9165 268.425C62.6054 317.514 185.989 277.964 293.503 180.087C353.757 125.234 387.267 63.9214 368.349 43.1413C349.432 22.3613 285.251 49.9832 224.997 104.836C117.483 202.713 66.5546 321.852 111.244 370.941C155.933 420.03 279.318 380.481 386.832 282.604C447.085 227.751 480.595 166.438 461.676 145.657C442.759 124.877 378.578 152.499 318.324 207.352C210.81 305.229 160.104 424.612 205.067 474.002C250.03 523.392 373.637 484.087 481.151 386.21C541.405 331.357 574.914 270.044 555.996 249.263C537.078 228.482 472.899 256.107 412.645 310.96C305.132 408.837 254.201 527.974 298.891 577.063C343.58 626.152 466.962 586.601 574.476 488.724C634.73 433.871 668.242 372.561 649.324 351.78C630.406 330.999 566.224 358.62 505.971 413.473C398.457 511.35 347.529 630.491 392.219 679.58C436.908 728.669 560.29 689.118 667.804 591.241C728.058 536.388 761.567 475.074 742.652 454.297C723.734 433.516 659.552 461.137 599.298 515.99C491.784 613.867 440.857 733.007 485.544 782.094C530.233 831.183 653.618 791.634 761.132 693.757C821.385 638.904 854.895 577.591 835.977 556.81C817.062 536.033 752.88 563.654 692.626 618.507C585.112 716.384 534.405 835.765 579.367 885.155C624.33 934.545 747.938 895.241 855.451 797.363'
          stroke='#EB5757'
          stroke-width='3'
          stroke-linecap='round'
        />
      </svg>
    </IconWrapper>
  );
};

export default SpringIcon;