import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '#/constants/queryKey';
import { deleteProjectMember } from '#/apis/project';

/**
 * DELETE projects/{projectId}/members/{memberId}
 *
 * 프로젝트에서 회원 강퇴하는 api 입니다.
 */
const useDeleteProjectMemberMutation = (
    projectId: number,
    memberId: number
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => deleteProjectMember(projectId, memberId),
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.PROJECT_AND_MEMBER(projectId, memberId),
            });
        },
    });
};

export default useDeleteProjectMemberMutation;
