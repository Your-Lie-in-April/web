import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '#/constants/queryKey';
import { deleteSchedule } from '#/apis/schedule';

/**
 * Delete projects/{projectId}/schedules
 *
 * 프로젝트의 시간표를 삭제하는 api 입니다.
 */
const useDeleteScheduleQuery = (projectId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => deleteSchedule(projectId),
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.SCHEDULE_PROJECT(projectId),
            });
        },
    });
};

export default useDeleteScheduleQuery;
