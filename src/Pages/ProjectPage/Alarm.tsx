import { FC } from "react";
import styled from "styled-components";

const AlarmDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 291px;
  height: 294px;
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 21px;
  gap: 111px;
  box-sizing: border-box;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
`;

const TextStyle = styled.div`
  color: #c4c4c4;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;

  line-height: normal;
`;

const AlarmText = styled(TextStyle)`
  font-weight: 500;

  opacity: 0.9;
`;

const CommingSoon = styled(TextStyle)`
  font-weight: 800;
`;

const Alarm: FC = () => {
  return (
    <AlarmDiv>
      <AlarmText>알림</AlarmText>
      <CommingSoon>coming soon</CommingSoon>
    </AlarmDiv>
  );
};

export default Alarm;
