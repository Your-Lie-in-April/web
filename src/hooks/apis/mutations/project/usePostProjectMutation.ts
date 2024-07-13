import { postNewProject } from '#/apis/project';
import { QUERY_KEY } from '#/constants/queryKey';
import { ProjectPostReqDto } from '#/types/projectType';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * POST /project
 *
 * 프로젝트 생성하는 api 입니다.
 */
const usePostProjectMutation = (body: ProjectPostReqDto) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => postNewProject(body),
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.PROJECT,
            });
        },
    });
};

export default usePostProjectMutation;
