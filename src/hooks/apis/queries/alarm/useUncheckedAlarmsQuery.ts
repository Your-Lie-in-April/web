import { getAlarmAll, getAlarmProject } from '@apis/alarm';
import { getCurrentTimestamp } from '@components/mainPage/alarm/getCurrentTimestamp';
import { QUERY_KEY } from '@constants/queryKey';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const useUncheckedAlarmsQuery = (projectId?: number) => {
    const [isCheckedComplete, setIsCheckedComplete] = useState<boolean>(false);

    const { data, hasNextPage, fetchNextPage, isLoading, error } = useInfiniteQuery({
        queryKey: projectId
            ? (QUERY_KEY.ALARM_PROJECT(projectId, false) as [string, number, string, boolean])
            : (QUERY_KEY.ALARM_ALL(false) as [string, boolean]),
        queryFn: ({ pageParam = getCurrentTimestamp() }) =>
            projectId
                ? getAlarmProject(projectId, pageParam, false)
                : getAlarmAll(pageParam, false),
        getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextCursor : undefined),
        initialPageParam: getCurrentTimestamp(),
        staleTime: 1000 * 60 * 2,
        gcTime: 1000 * 60 * 5,
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
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

    useEffect(() => {
        if (error) {
            console.error('❌ Unchecked alarms query error:', error);
        }
    }, [error]);

    return {
        data,
        hasNextPage,
        fetchNextPage,
        isCheckedComplete,
        isLoading,
        error,
    };
};

export default useUncheckedAlarmsQuery;
