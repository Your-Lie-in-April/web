import { postProjectInviteMember } from '@apis/project';
import { QUERY_KEY } from '@constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * POST /v1/projects/invitation${url}
 *
 * 초대링크로 프로젝트 초대 수락/거절 api 입니다.
 */

const usePostInvitationMutation = (url: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => postProjectInviteMember(url),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEY.PROJECT,
            });
        },
    });
};

export default usePostInvitationMutation;
