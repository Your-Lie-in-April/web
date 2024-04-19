import styled from 'styled-components';
import StorageProject from './StorageProject';
import { ProjectsStoredResDto } from '../../types/project';

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(auto, auto);
    column-gap: 25px;
    row-gap: 16px;
`;

const StorageProjectList = ({
    projects,
}: {
    projects: ProjectsStoredResDto[];
}) => {
    return (
        <GridContainer>
            {projects.map((project) => (
                <StorageProject key={project.projectId} project={project} />
            ))}
        </GridContainer>
    );
};

export default StorageProjectList;
