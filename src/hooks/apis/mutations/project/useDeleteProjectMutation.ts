import { deleteProject } from '@apis/project';
import { QUERY_KEY } from '@constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
            queryClient.invalidateQueries({ queryKey: QUERY_KEY.PROJECT });
        },
    });
};

export default useDeleteProjectMutation;
