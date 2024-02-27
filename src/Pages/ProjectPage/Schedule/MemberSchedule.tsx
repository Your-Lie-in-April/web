import styled from "styled-components";
import MemeberTime from "./MemberTime";

const Box = styled.div`
  width: 631px;
  height: 298px;
  border-radius: 20px;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  background-color: #f1f1f1;

  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 17px;
  padding: 5px 5px 8px 3px;
  align-items: center;
  justify-content: flex-end;
`;

const CommonText = styled.div`
  color: #000000;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Title = styled(CommonText)`
  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;
  font-size: 20px;
  font-weight: 500;
`;

const MemberSchedule = () => {
  return (
    <Box>
      <Title>00000의 시간표</Title>
      <MemeberTime />
    </Box>
  );
};

export default MemberSchedule;
