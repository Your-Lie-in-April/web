import styled from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import { useState } from "react";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const ProjectBox = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  background-color: #b79fff;
  border-radius: 16px;
  display: flex;
  color: #ffffff;
  margin-bottom: 25px;
`;

const DetailBox = styled.div`
  position: absolute;
  bottom: 0;
  width: 300px;
  height: 96px;
  border-radius: 0px 0px 16px 16px;
  background-color: #ffffff;
`;

const ProjectName = styled.div`
  margin: 8px;
  width: 284px;
  font-family: Pretendard;
  font-weight: 700;
  font-size: 24px;
  font-style: normal;
  line-height: normal;
  text-transform: uppercase;
  color: #000000;
`;

const DetailText = styled.div`
  margin: 0px 8px 8px 8px;
  width: 284px;
  height: 43px;
  font-family: "pretendard";
  font-weight: 400;
  font-size: 16px;
  font-style: normal;
  line-height: normal;
  text-transform: uppercase;
  color: #000000;
`;

const StyledMoreBtn = styled(MoreVertIcon)`
  position: absolute;
  top: 168px;
  right: 4px;
  color: #000000;
  cursor: pointer;
`;

const MoreBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 84px;
  height: 36px;
  position: absolute;
  top: 166px;
  right: 40px;
  border-radius: 6px;
  background-color: #ffffff;
  color: #7d7d7d;
`;

const MoreItem = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const MoreText = styled.div`
  font-family: Pretendard;
  font-weight: 400;
  font-size: 10px;
  font-style: normal;
  line-height: normal;
  text-transform: uppercase;
  margin: auto;
  margin-top: 0px;
`;

const StyledPushPin = styled(PushPinOutlinedIcon)`
  margin: 4px 12px 0px 12px;
`;

const StyledInBox = styled(InboxOutlinedIcon)`
  margin: 4px 12px 0px 12px;
`;

interface ProjectComponentProps {
  projectName: string;
  projectDescription: string;
}

const ProjectComponent: React.FC<ProjectComponentProps> = ({
  projectName,
  projectDescription,
}) => {
  const [showMore, setShowMore] = useState(false);
  const toggleMoreBtn = () => {
    setShowMore(!showMore);
  };
  return (
    <ProjectBox>
      {showMore && (
        <MoreBox>
          <MoreItem>
            <StyledPushPin sx={{ fontSize: 18 }} />
            <MoreText>상단고정</MoreText>
          </MoreItem>
          <MoreItem>
            <StyledInBox sx={{ fontSize: 18 }} />
            <MoreText>보관함</MoreText>
          </MoreItem>
        </MoreBox>
      )}
      <StyledMoreBtn sx={{ fontSize: 32 }} onClick={toggleMoreBtn} />
      <DetailBox>
        <ProjectName>{projectName}</ProjectName>
        <DetailText>{projectDescription}</DetailText>
      </DetailBox>
    </ProjectBox>
  );
};

const Projects = () => {
  const projects = [
    {
      name: "2023 여름방학 프로젝트",
      description: "2023 앱센터 프로젝트 입니다.",
    },
    { name: "앱센터 2", description: "앱센터 2 프로젝트" },
    { name: "앱센터 3", description: "앱센터 3 프로젝트" },
    { name: "앱센터 4", description: "앱센터 4 프로젝트" },
    { name: "앱센터 4", description: "앱센터 4 프로젝트" },
    { name: "앱센터 4", description: "앱센터 4 프로젝트" },
    { name: "앱센터 4", description: "앱센터 4 프로젝트" },
  ];
  return (
    <GridContainer>
      {projects.map((project, index) => (
        <ProjectComponent
          key={index}
          projectName={project.name}
          projectDescription={project.description}
        />
      ))}
    </GridContainer>
  );
};

export default Projects;
