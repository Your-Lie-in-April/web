import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '#/constants/queryKey';
import { putMemberNickname } from '#/apis/member';

/**
 * PUT /projects/members/nickname
 *
 * 유저가 프로젝트별 닉네임을 설정하는 api 입니다.
 */
const usePutMemberNickQuery = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => putMemberNickname(),
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.MEMBER_PROJECT(),
            });
        },
    });
};

export default usePutMemberNickQuery;
