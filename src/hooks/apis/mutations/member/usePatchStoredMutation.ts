import { patchProjectIsStored } from '@apis/member';
import { QUERY_KEY } from '@constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * PATCH /members/storage/{projectId}
 *
 * 프로젝트 보관 설정/해제 api 입니다.
 */
const usePatchStoredMutation = (projectId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => patchProjectIsStored(projectId),
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.PROJECT,
            });
        },
    });
};

export default usePatchStoredMutation;
