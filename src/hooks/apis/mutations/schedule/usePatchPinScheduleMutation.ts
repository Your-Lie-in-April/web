import { patchProjectIsPinned } from '#/apis/member';
import { QUERY_KEY } from '#/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * PATCH projects/pin/{projectId}
 *
 * 프로젝트 핀 설정/해제 api 입니다.
 */
const usePatchPinScheduleMutation = (projectId: number) => {
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

export default usePatchPinScheduleMutation;
