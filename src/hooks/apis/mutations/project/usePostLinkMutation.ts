import { postProjectInviteLink } from '@apis/project';
import { QUERY_KEY } from '@constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * POST /v1/projects/projectId/invitation
 *
 * 특정 프로젝트 초대링크 생성 api 입니다.
 */

const usePostLinkMutation = (projectId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => postProjectInviteLink(projectId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEY.PROJECT_INVITATION(projectId),
            });
        },
    });
};

export default usePostLinkMutation;
