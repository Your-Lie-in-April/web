import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '#/constants/queryKey';
import { postSchedule } from '#/apis/schedule';

/**
 * POST projects/{projectId}/schedules
 * 
 * 프로젝트의 시간표를 생성하는 api 입니다.
 */
const usePostScheduleMutation = (projectId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => postSchedule(projectId),
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.SCHEDULE_PROJECT(projectId),
            });
        },
    });
};

export default usePostScheduleMutation;
