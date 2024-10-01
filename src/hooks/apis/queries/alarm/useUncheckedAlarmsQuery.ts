import { getAlarmAll, getAlarmProject } from '@apis/alarm';
import { getCurrentTimestamp } from '@components/mainPage/alarm/getCurrentTimestamp';
import { QUERY_KEY } from '@constants/queryKey';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const useUncheckedAlarmsQuery = (projectId?: number) => {
    const [isCheckedComplete, setIsCheckedComplete] = useState<boolean>(false);

    const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
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

    useEffect(() => {
        if (data?.pages) {
            const lastPage = data.pages[data.pages.length - 1];
            if (lastPage && lastPage.hasMore === false) {
                setIsCheckedComplete(true);
            } else {
                setIsCheckedComplete(false);
            }
        }
    }, [data]);

    return {
        data,
        hasNextPage,
        fetchNextPage,
        isCheckedComplete,
    };
};

export default useUncheckedAlarmsQuery;
