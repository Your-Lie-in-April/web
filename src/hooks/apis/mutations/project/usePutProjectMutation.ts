import { ProjectCreateUpate } from '@/types/projectType';
import { putProject } from '@apis/project';
import { QUERY_KEY } from '@constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * PUT projects/{projectId}
 *
 * 프로젝트를 수정하는 api 입니다.
 */

const usePutProjectMutation = (projectId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (body: Partial<ProjectCreateUpate>) => putProject(projectId, body),
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.PROJECT_INFO(projectId),
            });
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.PROJECT_MAIN(0),
            });
        },
    });
};
export default usePutProjectMutation;
