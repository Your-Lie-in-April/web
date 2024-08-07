import { deleteProjectMemberSelf } from '@apis/project';
import { QUERY_KEY } from '@constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * DELETE projects/{projectId}
 *
 * 프로젝트에서 멤버 스스로가 나가는 api 입니다.
 */
const useDeleteProjectLeaveMutation = (projectId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => deleteProjectMemberSelf(projectId),
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.PROJECT,
            });
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.PROJECT_PIN,
            });
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.PROJECT_STORED,
            });
        },
    });
};

export default useDeleteProjectLeaveMutation;
