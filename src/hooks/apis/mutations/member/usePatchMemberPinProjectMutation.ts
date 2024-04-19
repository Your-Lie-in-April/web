import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '#/constants/queryKey';
import { patchProjectIsPinned } from '#/apis/member';

/**
 * PATCH /members/pin/{projectId}
 *
 * 프로젝트 핀 설정/해제 api 입니다.
 */
const usePatchMemberPinProjectMutation = (projectId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => patchProjectIsPinned(projectId),
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.MEMBER_PROJECT(projectId),
            });
        },
    });
};

export default usePatchMemberPinProjectMutation;
