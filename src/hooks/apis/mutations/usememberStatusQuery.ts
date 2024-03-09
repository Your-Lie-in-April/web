import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEY } from '#/constants/queryKey';
import { putMemberStatus } from '#/apis/member';

/**
 * PUT /members/${status}
 */
const useMemberStatusMutation = (status: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => putMemberStatus(status),
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.MEMBER_STATE,
            });
        },
    });
};

export default useMemberStatusMutation;
