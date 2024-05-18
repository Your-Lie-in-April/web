import { ProjectEntity } from '#/Types/projecttype';
import { createContext, ReactNode, useState, useEffect } from 'react';
import useProjectInfoQuery from '#/hooks/apis/queries/project/useProjectInfoQuery';
import { useParams } from 'react-router-dom';

type ProjectContextType = {
    projectInfo: ProjectEntity | null;
};

export const ProjectContext = createContext<ProjectContextType>({
    projectInfo: null,
});

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { projectId } = useParams();

    const { data: projectData } = useProjectInfoQuery(Number(projectId));
    const [projectInfo, setProjectInfo] = useState<ProjectEntity | null>(null);

    useEffect(() => {
        if (projectData) {
            setProjectInfo(projectData);
        }
    }, [projectData]);

    return (
        <ProjectContext.Provider value={{ projectInfo }}>
            {children}
        </ProjectContext.Provider>
    );
};
