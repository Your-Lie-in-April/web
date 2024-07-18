import { patchAlarm } from '@apis/alarm';
import { QUERY_KEY } from '@constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * PATCH /v1/projects/notifications/{notificationId}
 *
 * 알림을 읽음 처리하는 api 입니다.
 */

const usePatchAlarmMutation = (projectId?: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (notificationId: string | number) => patchAlarm(Number(notificationId)),
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.ALARM_ALL,
            });
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.ALARM_PROJECT(projectId!),
            });
        },
    });
};

export default usePatchAlarmMutation;
