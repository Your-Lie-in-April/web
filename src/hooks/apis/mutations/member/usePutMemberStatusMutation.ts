import { putMemberStatus } from '#/apis/member';
import { QUERY_KEY } from '#/constants/queryKey';
import { memberId } from '#/utils/token';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * PUT /members/${status}
 */
const usePutMemberStatusMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (status: string) => putMemberStatus(status),
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.MEMBER_ID(memberId),
            });
        },
    });
};

export default usePutMemberStatusMutation;
