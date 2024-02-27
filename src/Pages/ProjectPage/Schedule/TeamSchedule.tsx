import styled from "styled-components";
import TeamTime from "./TeamTime";


const Box = styled.div`
  width: 661px;
  height: 294px;
  border-radius: 20px;
  border: 1px solid #000000;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 5px 5px 8px 3px;
  align-items: center;
  justify-content: flex-start;
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
  width: 178px;
  height: 22px;
  border-radius: 20px;
  padding: 3px 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  background-color: #633ae2;
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
`;

const TeamSchedule = () => {
  return (
    <Box>
      <Title>(프로젝트명) 시간표</Title>
      <TeamTime />
    </Box>
  );
};

export default TeamSchedule;
