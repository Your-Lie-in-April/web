import { getAlarmProjectId } from '@apis/alarm';
import { QUERY_KEY } from '@constants/queryKey';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AlarmProjectResDto } from '@/types/alarmType';

/**
 * GET /v1/projects/{projectId}/notifications
 *
 * (프로젝트 내) 이전 알림 조회하는 api 입니다.
 */

const useAlarmProjectQuery = (projectId: number, size: number = 12) => {
    return useInfiniteQuery<AlarmProjectResDto, Error>({
        queryKey: QUERY_KEY.ALARM_PROJECT(projectId),
        queryFn: ({ pageParam = 0 }) => getAlarmProjectId(projectId, pageParam as number, size),
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPages - 1) {
                return lastPage.currentPage + 1;
            }
            return undefined;
        },
        initialPageParam: 0,
        gcTime: 0,
    });
};

export default useAlarmProjectQuery;
