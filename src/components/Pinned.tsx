import styled from "styled-components";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import usePinProject, { ProjectData } from "../hook/usePinProject";

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
  const projects: ProjectData[] = usePinProject();
  return (
    <PinnedBox>
      {projects.length > 0 && (
        <>
          <StyledPushPin sx={{ fontSize: 36 }} />
          {projects.map((project) => (
            <TextDiv key={project.projectId}>
              <ProjectText>
                {project.title}
                <br />
                {project.title}
              </ProjectText>
              <DetailText>{project.description}</DetailText>
              <DetailText>
                프로젝트 기간 <br />
                {project.startDate} ~{project.endDate}
              </DetailText>
            </TextDiv>
          ))}
        </>
      )}
    </PinnedBox>
  );
};

export default Pinned;
