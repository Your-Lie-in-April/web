import styled from "styled-components";
import TeamTime from "./TeamTime";
import { useState } from "react";
import EditMySchedule from "./EditMySchedule";
import MyTime from "./MyTime";

const Box = styled.div`
  width: 661px;
  height: 294px;
  border-radius: 20px;
  border: 1px solid #000000;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;

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
  width: 430px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
`;

const EditBtn = styled.button`
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background: #212121;

  color: #ffffff;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const MySchedule = () => {
  const [isEditModal, setIsEditModal] = useState(false);
  const onSetIsEditModal = () => {
    setIsEditModal((prev) => !prev);
  };
  return (
    <>
      <Box>
        <div
          style={{
            display: "flex",
            gap: "58px",
            margin: "3px 7px auto auto",
          }}
        >
          <Title>나의 시간표</Title>
          <EditBtn onClick={onSetIsEditModal}>수정하기</EditBtn>
        </div>
        <MyTime />
      </Box>
      {isEditModal && <EditMySchedule onSetIsEditModal={onSetIsEditModal} />}
    </>
  );
};

export default MySchedule;
