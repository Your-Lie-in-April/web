import React, { useState } from 'react';
import styled from 'styled-components';

interface TimeContainerProps {
  selected: boolean;
}

const TimeBox = styled.div`
  width: 53px;
  height: 40px;
  border: 0.5px solid #7d7d7d;
  border-radius: 20px;
  box-sizing: border-box;
  background-color: #d9d9d9;
  display: flex;
  flex-direction: row;
`;

const TimeContainer = styled.div<TimeContainerProps>`
  flex: 1;
  box-sizing: border-box;
`;

const TimeLeft = styled(TimeContainer)<TimeContainerProps>`
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: ${(props) => (props.selected ? '#633AE2' : 'transparent')};
`;

const TimeRight = styled(TimeContainer)<TimeContainerProps>`
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: ${(props) => (props.selected ? '#633AE2' : 'transparent')};
`;

const VerticalLine = styled.div`
  height: 100%;
  border-left: 0.5px dashed #a4a4a4;
`;

const EditMyTimeCircle: React.FC = () => {
  const [leftSelected, setLeftSelected] = useState(false);
  const [rightSelected, setRightSelected] = useState(false);

  const handleLeftClick = () => {
    setLeftSelected(!leftSelected);
  };

  const handleRightClick = () => {
    setRightSelected(!rightSelected);
  };

  return (
    <TimeBox>
      <TimeLeft selected={leftSelected} onClick={handleLeftClick} />
      <VerticalLine />
      <TimeRight selected={rightSelected} onClick={handleRightClick} />
    </TimeBox>
  );
};

export default EditMyTimeCircle;
