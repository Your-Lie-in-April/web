import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '#/constants/queryKey';
import { deleteProject } from '#/apis/project';

/**
 * DELETE projects/{projectId}
 * 
 * 프로젝트를 삭제하는 api 입니다.
 */
const useDeleteProjectMutation = (projectId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => deleteProject(projectId),
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.PROJECT_ID(projectId),
            });
        },
    });
};

export default useDeleteProjectMutation;
