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
  margin-top: 16px;
  margin-left: 16px;
  color: #ffffff;
`;

const ProjectText = styled.div`
  position: absolute;
  width: 201px;
  height: 76px;
  margin-top: 148px;
  margin-left: 24px;
  font-family: "pretendard";
  font-weight: 800;
  font-size: 32px;
`;

const DetailText = styled.div`
  position: absolute;
  font-family: "pretendard";
  font-weight: 500;
  font-size: 16px;
`;

const MemberText = styled(DetailText)`
  margin-top: 8px;
  position: relative;
`;

const PeriodText = styled(DetailText)`
  margin-top: 8px;
  white-space: nowrap;
`;

const Pinned = () => {
  return (
    <PinnedBox>
      <StyledPushPin sx={{ fontSize: 36 }} />
      <ProjectText>
        프로젝트명 프로젝트명
        <MemberText>
          멤버 00 명
          <PeriodText>
            프로젝트 기간
            <br />
            20XX.XX.XX ~20XX.XX.XX
          </PeriodText>
        </MemberText>
      </ProjectText>
    </PinnedBox>
  );
};

export default Pinned;
