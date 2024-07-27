import { ProjectPostReqDto } from '@/types/projectType';
import { postNewProject } from '@apis/project';
import { QUERY_KEY } from '@constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * POST /project
 *
 * 프로젝트 생성하는 api 입니다.
 */

const usePostProjectMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (body: ProjectPostReqDto) => postNewProject(body),
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.PROJECT_MAIN(0),
            });
        },
    });
};

export default usePostProjectMutation;
