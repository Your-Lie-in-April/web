import styled from "styled-components";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Box = styled.div`
  width: 406px;
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

const CommonText = styled.text`
  color: #000000;
  text-align: center;
  font-family: Pretendard;
  line-height: normal;
`;

const PeojectName = styled(CommonText)`
  font-size: 28px;
  font-weight: 700;
`;

const Title = styled(CommonText)`
  font-size: 24px;
  font-weight: 400;
`;

const Button = styled.button`
  display: flex;
  width: 60px;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 20px;
  font-family: Pretendard;
  font-size: 13px;
  font-weight: 500;
  line-height: normal;
`;

const ConfirmBtn = styled(Button)`
  background: #633ae2;
  color: #ffffff;
`;

const CancelBtn = styled(Button)`
  background: #d9d9d9;
  color: #ffffff;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 4px;
`;

const DeleteProject = () => {
  return (
    <Box>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            height: "100%",
          }}
        >
          <InfoCircleIcon sx={{ fontSize: "32px" }} />
          <PeojectName>프로젝트명</PeojectName>
          <Title>프로젝트에서 내보내겠습니까?</Title>
        </div>
        <ButtonsContainer style={{ alignSelf: "flex-end" }}>
          <ConfirmBtn>확인</ConfirmBtn>
          <CancelBtn>취소</CancelBtn>
        </ButtonsContainer>
      </div>
    </Box>
  );
};

export default DeleteProject;
