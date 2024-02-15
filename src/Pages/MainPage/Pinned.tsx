import styled from "styled-components";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";

const PinnedBox = styled.div`
  width: 950px;
  height: 400px;
  background-color: #633ae2;
  border-radius: 20px;
  display: flex;
  position: relative;
  color: #ffffff;
`;

const StyledPushPin = styled(PushPinOutlinedIcon)`
  position: absolute;
  top: 16px;
  left: 16px;
  color: #ffffff;
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  top: 148px;
  left: 24px;
  position: absolute;
  margin-top: ;
`;

const ProjectText = styled.text`
  width: 201px;
  color: #ffffff;
  font-family: "Pretendard";
  font-size: 32px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const DetailText = styled.text`
  color: #ffffff;
  font-family: "Pretendard";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Pinned = () => {
  return (
    <PinnedBox>
      <StyledPushPin sx={{ fontSize: 36 }} />
      <TextDiv>
        <ProjectText>
          프로젝트명
          <br />
          프로젝트명
        </ProjectText>
        <DetailText>멤버 00명</DetailText>
        <DetailText>
          프로젝트 기간 <br />
          20xx.xx.xx ~20xx.xx.xx
        </DetailText>
      </TextDiv>
    </PinnedBox>
  );
};

export default Pinned;
