import { patchProjectIsPinned } from '@apis/member';
import { QUERY_KEY } from '@constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * PATCH members/pin/{projectId}
 *
 * 프로젝트를 핀 설정/해제 api 입니다.
 */

const usePatchPinnedMutation = (projectId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => patchProjectIsPinned(projectId),
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.PROJECT_PIN,
            });
        },
    });
};

export default usePatchPinnedMutation;
