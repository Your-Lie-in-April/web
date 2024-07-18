import { patchPojectPrevilege } from '@apis/project';
import { QUERY_KEY } from '@constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * PATCH /projects/{projectId}/transfer-privilege
 *
 * 관리자 권한을 양도하는 api 입니다.
 */

const usePatchPojectPrevilegeMutation = (projectId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (toMemberId: number) => patchPojectPrevilege(projectId, toMemberId),
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.MEMBER_ALL_PROJECT(projectId),
            });
        },
    });
};

export default usePatchPojectPrevilegeMutation;
