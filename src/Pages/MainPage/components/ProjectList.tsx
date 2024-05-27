import Project from './Project';
import styled from 'styled-components';
import { ProjectEntity } from '#/Types/projecttype';

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(auto, auto);
    column-gap: 25px;
    row-gap: 24px;
`;

const noProfileImg = 'src/pics/no_profile.png';

interface ProjectListProps {
    projects: ProjectEntity[];
}
const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
    const accessToken = localStorage.getItem('access_token');

    return accessToken == '' ? (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                alignContent: 'center',
                justifyContent: 'center',
            }}
        >
            <img
                src={noProfileImg}
                style={{ width: '160px', height: '160px' }}
            />
            <div
                style={{
                    color: '#D9D9D9',
                    fontFamily: 'Pretendard',
                    fontWeight: '400',
                    fontSize: '28px',
                    lineHeight: '33.41px',
                }}
            >
                No Project
            </div>
        </div>
    ) : (
        <GridContainer>
            {projects.map((project) => (
                <Project key={project.projectId} project={project} />
            ))}
        </GridContainer>
    );
};

export default ProjectList;
