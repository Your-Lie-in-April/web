import { deleteAlarm } from '@apis/alarm';
import { QUERY_KEY } from '@constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * DELETE /v1/notifications/{notificationId}
 *
 * 알림을 삭제하는 api 입니다.
 */

const useDeleteAlarmMutation = (projectId?: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (notificationId: string | number) => deleteAlarm(Number(notificationId)),
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

export default useDeleteAlarmMutation;
