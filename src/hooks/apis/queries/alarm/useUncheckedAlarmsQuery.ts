import { getAlarmAll, getAlarmProject } from '@apis/alarm';
import { QUERY_KEY } from '@constants/queryKey';
import { getCurrentTimestamp } from '@pages/main/components/getCurrentTimestamp';
import { useInfiniteQuery } from '@tanstack/react-query';

const useUncheckedAlarmsQuery = (projectId?: number) => {
    return useInfiniteQuery({
        queryKey: projectId
            ? (QUERY_KEY.ALARM_PROJECT(projectId, false) as [string, number, string, boolean])
            : (QUERY_KEY.ALARM_ALL(false) as [string, boolean]),
        queryFn: ({ pageParam = getCurrentTimestamp() }) =>
            projectId
                ? getAlarmProject(projectId, pageParam, false)
                : getAlarmAll(pageParam, false),
        getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextCursor : undefined),
        initialPageParam: getCurrentTimestamp(),
    });
};

export default useUncheckedAlarmsQuery;
