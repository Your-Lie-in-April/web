import styled from "styled-components";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Box = styled.div`
  width: 400px;
  height: 182px;
  border-radius: 20px;
  background: #f5f5f5;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 16px 20px 8px 20px;
  box-sizing: border-box;
`;

const InfoCircleIcon = styled(InfoOutlinedIcon)`
  width: 32px;
  height: 32px;
  color: #eb5757;
`;

const MemberNick = styled.text`
  color: #000000;
  text-align: center;
  font-family: Pretendard;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Title = styled.text`
  color: #000000;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 4px;
`;

const ConfirmBtn = styled.button`
  display: flex;
  width: 60px;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 20px;
  background: #633ae2;

  color: #ffffff;
  text-align: center;
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const CancelBtn = styled.button`
  display: flex;
  width: 60px;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 20px;
  background: #d9d9d9;

  color: #ffffff;
  text-align: center;
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const DeleteMemeber = () => {
  return (
    <Box>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyItems: "center",
            gap: "10px",
          }}
        >
          <InfoCircleIcon sx={{ fontSize: "32px" }} />
          <MemberNick>닉네임</MemberNick>
          <Title>프로젝트에서 내보내겠습니까?</Title>
        </div>
        <ButtonsContainer>
          <ConfirmBtn>확인</ConfirmBtn>
          <CancelBtn>취소</CancelBtn>
        </ButtonsContainer>
      </div>
    </Box>
  );
};
export default DeleteMemeber;
