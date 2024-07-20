import { getAlarmAll, getAlarmProject } from '@apis/alarm';
import { QUERY_KEY } from '@constants/queryKey';
import { getCurrentTimestamp } from '@pages/main/components/getCurrentTimestamp';
import { useInfiniteQuery } from '@tanstack/react-query';

const useCheckedAlarmsQuery = (projectId?: number) => {
    return useInfiniteQuery({
        queryKey: projectId
            ? (QUERY_KEY.ALARM_PROJECT(projectId, true) as [string, number, string, boolean])
            : (QUERY_KEY.ALARM_ALL(true) as [string, boolean]),
        queryFn: ({ pageParam = getCurrentTimestamp() }) =>
            projectId ? getAlarmProject(projectId, pageParam, true) : getAlarmAll(pageParam, true),
        getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextCursor : undefined),
        initialPageParam: getCurrentTimestamp(),
    });
};

export default useCheckedAlarmsQuery;
