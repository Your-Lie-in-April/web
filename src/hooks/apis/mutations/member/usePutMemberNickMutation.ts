import { putMemberNickname } from '@apis/member';
import { QUERY_KEY } from '@constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * PUT /projects/members/nickname
 *
 * 유저가 프로젝트별 닉네임을 설정하는 api 입니다.
 */
const usePutMemberNickMutation = (projectId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (nickname: string) => putMemberNickname(projectId, nickname),
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.MEMBER_PROJECT(projectId),
            });
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.MEMBER_ALL_PROJECT(projectId),
            });
        },
    });
};

export default usePutMemberNickMutation;
