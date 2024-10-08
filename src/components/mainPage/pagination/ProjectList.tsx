import { ProjectThumbnailInfo } from '@/types/projectType';
import { NoProject } from '@components/layout';
import styled from 'styled-components';
import Project from './Project';

interface ProjectListProps {
    projects: ProjectThumbnailInfo[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
    return projects && projects.length > 0 ? (
        <GridContainer>
            {projects.map((ele) => (
                <Project key={ele.projectId} project={ele} />
            ))}
        </GridContainer>
    ) : (
        <NoProject />
    );
};
export default ProjectList;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-auto-rows: minmax(auto, auto);
    column-gap: 25px;
    row-gap: 24px;
`;
