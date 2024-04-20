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

const NoProject = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  

    color: #d9d9d9;
    text-align: center;
    font-family: Pretendard;
    font-size: 28px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: capitalize;
`;

const noProjectPic = 'src/pics/no_project.png';

const StorageProjectList = ({
    projects,
}: {
    projects: ProjectsStoredResDto[];
}) => {
    return !projects ? (
        <NoProject>
            <img src={noProjectPic} />
            No Project
        </NoProject>
    ) : (
        <GridContainer>
            {projects.map((project) => (
                <StorageProject key={project.projectId} project={project} />
            ))}
        </GridContainer>
    );
};

export default StorageProjectList;
