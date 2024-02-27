import styled from "styled-components";

const TimeBox = styled.div`
  position: relative;
  width: 53px;
  height: 40px;
  border: 0.5px solid #7d7d7d;
  border-radius: 20px;
  box-sizing: border-box;
`;

const TimeContainer = styled.div`
  position: absolute;
  width: 26.5px;
  height: 40px;
  box-sizing: border-box;
  background-color: #d9d9d9;
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
  position: absolute;
  left: 26.5px;
  width: 0.5px;
  height: 100%;
  background-color: #d9d9d9;
  border-left: 0.5px dashed #a4a4a4;
`;

const EditMyTimeCircle = () => {
  return (
    <TimeBox>
      <TimeLeft />
      <TimeRight />
      <VerticalLine />
    </TimeBox>
  );
};

export default EditMyTimeCircle;
