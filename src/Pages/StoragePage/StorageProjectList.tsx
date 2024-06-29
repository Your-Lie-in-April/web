import { ProjectThumbnailResponse } from '#/Types/projecttype';
import styled from 'styled-components';
import NoProject from '../Layouts/NoProject';
import StorageProject from './StorageProject';

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(auto, auto);
    column-gap: 25px;
    row-gap: 16px;
`;

interface StorageProjectListProps {
    projects: ProjectThumbnailResponse[];
    lastProjectRef: (node: HTMLDivElement | null) => void;
}

const StorageProjectList: React.FC<StorageProjectListProps> = ({ projects, lastProjectRef }) => {
    return projects.length > 0 ? (
        <GridContainer>
            {projects.map((project, index) => (
                <div
                    key={`${project.projectId}-${index}`}
                    ref={index === projects.length - 1 ? lastProjectRef : null}
                >
                    <StorageProject project={project} />
                </div>
            ))}
        </GridContainer>
    ) : (
        <NoProject />
    );
};

export default StorageProjectList;
