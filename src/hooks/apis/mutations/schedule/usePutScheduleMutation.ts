import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '#/constants/queryKey';
import { putSchedule } from '#/apis/schedule';

/**
 * PUT projects/{projectId}/schedules
 *
 * 프로젝트의 시간표를 수정하는 api 입니다.
 */
const usePutScheduleMutation = (projectId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => putSchedule(projectId),
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.SCHEDULE_PROJECT(projectId),
            });
        },
    });
};

export default usePutScheduleMutation
