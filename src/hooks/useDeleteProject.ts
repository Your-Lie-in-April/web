import useDeleteProjectMutation from './apis/mutations/project/useDeleteProjectMutation';

const useDeleteProject = () => {
    const { mutate: deleteProjectSet } = useDeleteProjectMutation();

    const deleteProject = (projectId: number) => {
        deleteProjectSet(Number(projectId));
    };

    return {
        deleteProject,
    };
};
export default useDeleteProject;
