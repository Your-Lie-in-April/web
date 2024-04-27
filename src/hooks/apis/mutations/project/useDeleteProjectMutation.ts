import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '#/constants/queryKey';
import { deleteProject } from '#/apis/project';
import { useProjectStoredQuery } from '../../queries/project/useProjectStoredQuery';


/**
 * DELETE projects/{projectId}
 *
 * 프로젝트를 삭제하는 api 입니다.
 */
const useDeleteProjectMutation = (projectId: number) => {
    const projectStoredQuery = useProjectStoredQuery();

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => deleteProject(projectId),
        onSuccess: () => {
            queryClient.invalidateQueries(QUERY_KEY.PROJECT_STORED());
            console.log('프로젝트 삭제 후 목록:', projectStoredQuery);
        },
    });
};

export default useDeleteProjectMutation;
