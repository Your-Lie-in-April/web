import { AlarmEntity } from '@/types/alarmType';
import { useSSE } from '@hooks/useSSE';
import { useCallback, useEffect, useState } from 'react';
import useCheckedAlarmsQuery from './useCheckedAlarmsQuery';
import useUncheckedAlarmsQuery from './useUncheckedAlarmsQuery';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';

const useAlarmsQuery = (projectId?: number) => {
    const [isUncheckedComplete, setIsUncheckedComplete] = useState<boolean>(false);
    const [isCheckedComplete, setIsCheckedComplete] = useState<boolean>(false);
    const [allAlarms, setAllAlarms] = useState<AlarmEntity[]>([]);
    const queryClient = useQueryClient();

    const uncheckedQuery = useUncheckedAlarmsQuery(projectId);
    const checkedQuery = useCheckedAlarmsQuery(projectId);
    const { allAlarms: sseAlarms, fetchSSEData } = useSSE();

    useEffect(() => {
        const lastPage = uncheckedQuery.data?.pages[uncheckedQuery.data.pages.length - 1];
        setIsUncheckedComplete(lastPage?.hasMore === false);
    }, [uncheckedQuery.data]);

    useEffect(() => {
        const lastPage = checkedQuery.data?.pages[checkedQuery.data.pages.length - 1];
        setIsCheckedComplete(lastPage?.hasMore === false);
    }, [checkedQuery.data]);

    useEffect(() => {
        const newAlarms = [
            ...sseAlarms,
            ...(uncheckedQuery.data?.pages.flatMap((page) => page.data) || []),
            ...(checkedQuery.data?.pages.flatMap((page) => page.data) || []),
        ];

        const uniqueAlarms = Array.from(
            new Map(newAlarms.map(alarm => [alarm.notificationId, alarm])).values()
        );

        setAllAlarms(uniqueAlarms);
    }, [sseAlarms, uncheckedQuery.data, checkedQuery.data]);

    const removeAlarm = useCallback((notificationId: number) => {
        setAllAlarms((prev) => prev.filter(alarm => alarm.notificationId !== notificationId));

        const updateQueryData = (oldData: any) => {
            if (!oldData) return oldData;
            return {
                ...oldData,
                pages: oldData.pages.map((page: any) => ({
                    ...page,
                    data: page.data.filter((alarm: AlarmEntity) => alarm.notificationId !== notificationId)
                }))
            };
        };

        queryClient.setQueryData(QUERY_KEY.ALARM_ALL(), updateQueryData);
        if (projectId) {
            queryClient.setQueryData(QUERY_KEY.ALARM_PROJECT(projectId), updateQueryData);
        }
    }, [queryClient, projectId]);

    const refetch = useCallback(() => {
        void queryClient.invalidateQueries({
            queryKey: QUERY_KEY.ALARM_ALL(),
        });
        if (projectId) {
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.ALARM_PROJECT(projectId),
            });
        }
    }, [queryClient, projectId]);

    return {
        allAlarms,
        isUncheckedComplete,
        isCheckedComplete,
        uncheckedQuery,
        checkedQuery,
        fetchSSEData,
        removeAlarm,
        refetch,
    };
};

export default useAlarmsQuery;