import styled from "styled-components";

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

const TimeContainer = styled.div`
  flex: 1;
  box-sizing: border-box;
`;

const TimeLeft = styled(TimeContainer)`
  left: 0;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;

const TimeRight = styled(TimeContainer)`
  right: 0;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const VerticalLine = styled.div`
  height: 100%;
  border-left: 0.5px dashed #a4a4a4;
`;

const EditMyTimeCircle = () => {
  return (
    <TimeBox>
      <TimeLeft />
      <VerticalLine />
      <TimeRight />
    </TimeBox>
  );
};

export default EditMyTimeCircle;
