import useProjectInfoQuery from '@hooks/apis/queries/project/useProjectInfoQuery';
import { ProjectEntity } from '@/types/projectType';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type ProjectContextType = {
    projectData: ProjectEntity | null;
    setProjectData: (projectData: ProjectEntity | null) => void;
};

export const ProjectContext = createContext<ProjectContextType>({
    projectData: null,
    setProjectData: () => {},
});

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [projectData, setProjectData] = useState<ProjectEntity | null>(null);
    const { projectId } = useParams();
    const { data } = useProjectInfoQuery(Number(projectId));
    useEffect(() => {
        if (data) {
            setProjectData(data);
        }
    }, [projectId, data, setProjectData]);

    return (
        <ProjectContext.Provider value={{ projectData, setProjectData }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProjectContext = (): ProjectContextType => {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error('useProjectContext must be used within a ProjectProvider');
    }
    return context;
};
