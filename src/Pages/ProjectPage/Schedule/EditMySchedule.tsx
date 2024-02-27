import styled from "styled-components";
import TimeCircle from "./EditMyTimeCircle";
import EditMyTime from "./EditMyTime";

const Box = styled.div`
  width: 876px;
  height: 389px;
  border-radius: 20px;
  border: 1px solid #000000;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  padding: 4px 1px 3px 1px;

  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 21px;
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
  width: 240px;
  height: 32px;
  border-radius: 20px;
  padding: 4px 20px;
  justify-content: center;
  align-items: center;
  background-color: #633ae2;
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  box-sizing: border-box;
`;

const EditMySchedule = () => {
  return (
    <Box>
      <Title>나의 시간표</Title>
      <EditMyTime />
    </Box>
  );
};

export default EditMySchedule;
