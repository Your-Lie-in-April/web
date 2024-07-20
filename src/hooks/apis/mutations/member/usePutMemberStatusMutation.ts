import { putMemberStatus } from '@apis/member';
import { QUERY_KEY } from '@constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * PUT /members/${status}
 *
 * 유저가 상태메세지를 설정하는 api 입니다.
 */

const usePutMemberStatusMutation = (memberId: number, projectId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (status: string) => putMemberStatus(status),
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.MEMBER_ID(memberId),
            });
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.MEMBER_ALL_PROJECT(projectId),
            });
        },
    });
};

export default usePutMemberStatusMutation;
