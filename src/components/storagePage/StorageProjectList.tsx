import { ProjectThumbnailInfo } from '@/types/projectType';
import { NoProject } from '@components/layout';
import styled from 'styled-components';
import StorageProject from './StorageProject';

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(auto, auto);
    column-gap: 25px;
    row-gap: 16px;
`;

interface StorageProjectListProps {
    projects: ProjectThumbnailInfo[];
}

const StorageProjectList: React.FC<StorageProjectListProps> = ({ projects }) => {
    if (!projects || projects.length === 0) {
        return <NoProject />;
    }

    return (
        <GridContainer>
            {projects.map((project, index) => (
                <div key={`${project.projectId}-${index}`}>
                    <StorageProject project={project} />
                </div>
            ))}
        </GridContainer>
    );
};

export default StorageProjectList;
