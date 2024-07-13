import { putProject } from '#/apis/project';
import { QUERY_KEY } from '#/constants/queryKey';
import { ProjectPutReqDto } from '#/types/projectType';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * PUT projects/{projectId}
 *
 * 프로젝트를 수정하는 api 입니다.
 */
const usePutProjectMutation = (projectId: number, body: ProjectPutReqDto) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => putProject(projectId, body),
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.PROJECT_ID(projectId),
            });
        },
    });
};

export default usePutProjectMutation;
