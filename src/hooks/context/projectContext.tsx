import { ProjectEntity } from '#/Types/projecttype';
import {
    createContext,
    ReactNode,
    useState,
    useEffect,
    useContext,
} from 'react';
import { useParams } from 'react-router-dom';
import { Http } from '#/constants/backendURL';
import { DateContext } from './dateContext';

type ProjectContextType = {
    projectData: ProjectEntity | null;
    setProjectData: (projectData: ProjectEntity | null) => void;
    errorMessage: string | null;
};

export const ProjectContext = createContext<ProjectContextType>({
    projectData: null,
    setProjectData: () => {},
    errorMessage: null,
});

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [projectData, setProjectData] = useState<ProjectEntity | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { projectId } = useParams<{ projectId: string }>();
    const accessToken = localStorage.getItem('access_token');

    useEffect(() => {
        const fetchProjects = async () => {
            if (projectId && accessToken) {
                try {
                    const response = await fetch(
                        `${Http}/v1/projects/${projectId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }
                    );
                    const data = await response.json();
                    console.log(data);
                    setProjectData(data.data);
                    setErrorMessage(null);
                } catch (error) {
                    console.error('Failed to fetch project data:', error);
                    setErrorMessage('Failed to fetch project data');
                }
            }
        };

        fetchProjects();
    }, [projectId, accessToken]);

    return (
        <ProjectContext.Provider
            value={{ projectData, setProjectData, errorMessage }}
        >
            {children}
        </ProjectContext.Provider>
    );
};

export const useProjectContext = (): ProjectContextType => {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error(
            'useProjectContext must be used within a ProjectProvider'
        );
    }
    return context;
};
