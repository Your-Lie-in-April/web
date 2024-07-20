import { postSchedule } from '@apis/schedule';
import { QUERY_KEY } from '@constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ScheduleData } from '@/types/scheduleType';

/**
 * POST projects/{projectId}/schedules
 *
 * 프로젝트의 시간표를 생성하는 api 입니다.
 */
const usePostScheduleMutation = (projectId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (scheduleData: ScheduleData) => postSchedule(projectId, scheduleData),
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.SCHEDULE,
            });
        },
    });
};

export default usePostScheduleMutation;
