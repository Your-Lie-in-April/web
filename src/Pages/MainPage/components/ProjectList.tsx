import NoProject from '#/Pages/Layouts/NoProject';
import { ProjectEntity } from '#/Types/projecttype';
import styled from 'styled-components';
import Project from './Project';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(auto, auto);
  column-gap: 25px;
  row-gap: 24px;
`;

interface ProjectListProps {
  projects: ProjectEntity[];
}
const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return projects && projects.length > 0 ? (
    <GridContainer>
      {projects.map((project) => (
        <Project key={project.projectId} project={project} />
      ))}
    </GridContainer>
  ) : (
    <NoProject />
  );
};

export default ProjectList;
