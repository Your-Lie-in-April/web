import { getAlarmAll } from '#/apis/alarm';
import { QUERY_KEY } from '#/constants/queryKey';
import { AlarmAllResDto } from '#/types/alarmType';
import { useInfiniteQuery } from '@tanstack/react-query';

/**
 * GET /v1/notifications
 *
 * 이전 알림 조회하는 api 입니다.
 */

const useAllAlarmQuery = (size: number = 12) => {
    return useInfiniteQuery<AlarmAllResDto, Error>({
        queryKey: QUERY_KEY.ALARM_ALL,
        queryFn: ({ pageParam = 0 }) => getAlarmAll(pageParam as number, size),
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPages - 1) {
                return lastPage.currentPage + 1;
            }
            return undefined;
        },
        initialPageParam: 0,
    });
};

export default useAllAlarmQuery;
