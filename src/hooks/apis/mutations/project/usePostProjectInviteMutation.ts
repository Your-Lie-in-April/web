import { postProjectInviteMember } from '@apis/project';
import { QUERY_KEY } from '@constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * POST /project/invitation/{url}
 *
 * 프로젝트에 신규 회원가입 - 회원초대(추가) api 입니다.
 */
const usePostProjectInviteMutation = (projectId: number, url: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => postProjectInviteMember(url),
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.PROJECT_ID(projectId),
            });
        },
    });
};

export default usePostProjectInviteMutation;
