import styled from "styled-components";
import Project from "./Project";
import useProjectList, { ProjectData } from "../hook/useProjectList";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(auto, auto);
  gap: 25px;
`;

const ProjectList = () => {
  const projects: ProjectData[] = useProjectList();

  if (projects.length === 0) {
    return <div>No projects available.</div>;
  }

  return (
    <GridContainer>
      {projects.map((project) => (
        <Project
          projectId={project.projectId}
          title={project.title}
          description={project.description}
        />
      ))}
    </GridContainer>
  );
};
export default ProjectList;
