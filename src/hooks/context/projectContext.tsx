import { ProjectEntity } from '#/Types/projecttype';
import { createContext, ReactNode } from 'react';
import useProjectInfoQuery from '#/hooks/apis/queries/project/useProjectInfoQuery';

type ProjectContextType = {
    projectInfo: ProjectEntity | undefined;
};

export const ProjectContext = createContext<ProjectContextType>({
    projectInfo: undefined,
});

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    // 프로젝트 아이디 수정하기 --> 선택된 아이디로 수정하기
    const projectId = 1;
    const { data: projectData } = useProjectInfoQuery(projectId);

    return (
        <ProjectContext.Provider value={{ projectInfo: projectData }}>
            {children}
        </ProjectContext.Provider>
    );
};
