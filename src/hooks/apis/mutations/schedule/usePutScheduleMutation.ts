import { putSchedule } from '@apis/schedule';
import { QUERY_KEY } from '@constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ScheduleData } from '@/types/scheduleType';

/**
 * PUT projects/{projectId}/schedules
 *
 * 프로젝트의 시간표를 수정하는 api 입니다.
 */
const usePutScheduleMutation = (projectId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (scheduleData: ScheduleData) => putSchedule(projectId, scheduleData),
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.SCHEDULE,
            });
        },
    });
};

export default usePutScheduleMutation;
