import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '#/constants/queryKey';
import { deleteProjectMemberSelf } from '#/apis/project';

/**
 * DELETE projects/{projectId}
 * 
 * 프로젝트에서 멤버 스스로가 나가는 api 입니다.
 */
const useDeleteProjectMemberSelfMutation = (projectId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => deleteProjectMemberSelf(projectId),
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.PROJECT_ID(projectId),
            });
        },
    });
};

export default useDeleteProjectMemberSelfMutation;
