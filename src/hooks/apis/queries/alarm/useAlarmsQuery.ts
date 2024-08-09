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
    const [allAlarms, setAllAlarms] = useState<Set<AlarmEntity>>(new Set());
    const queryClient = useQueryClient();

    const uncheckedQuery = useUncheckedAlarmsQuery(projectId);
    const checkedQuery = useCheckedAlarmsQuery(projectId);
    const fetchSSEData = useSSE();

    useEffect(() => {
        const lastPage = uncheckedQuery.data?.pages[uncheckedQuery.data.pages.length - 1];
        if (lastPage && lastPage.hasMore === false) {
            setIsUncheckedComplete(true);
        } else {
            setIsUncheckedComplete(false);
        }
    }, [uncheckedQuery.data]);

    useEffect(() => {
        const lastPage = checkedQuery.data?.pages[checkedQuery.data.pages.length - 1];
        if (lastPage && lastPage.hasMore === false) {
            setIsCheckedComplete(true);
        } else {
            setIsCheckedComplete(false);
        }
    }, [checkedQuery.data]);

    useEffect(() => {
        fetchSSEData().then((newAlarms) => {
            setAllAlarms((prev) => new Set([...newAlarms, ...prev]));
        });
    }, [fetchSSEData]);

    useEffect(() => {
        setAllAlarms((prev) => {
            const newAlarms = [
                ...(uncheckedQuery.data?.pages.flatMap((page) => page.data) || []),
                ...(checkedQuery.data?.pages.flatMap((page) => page.data) || []),
            ];
            return new Set([...prev, ...newAlarms]);
        });
    }, [uncheckedQuery.data, checkedQuery.data]);

    const removeAlarm = useCallback((notificationId: number) => {
        setAllAlarms((prev) => {
            const newSet = new Set(prev);
            for (const alarm of newSet) {
                if (alarm.notificationId === notificationId) {
                    newSet.delete(alarm);
                    break;
                }
            }
            return newSet;
        });


        queryClient.setQueryData(QUERY_KEY.ALARM_ALL(), (oldData: any) => {
            if (!oldData) return oldData;
            return {
                ...oldData,
                pages: oldData.pages.map((page: any) => ({
                    ...page,
                    data: page.data.filter((alarm: AlarmEntity) => alarm.notificationId !== notificationId)
                }))
            };
        });

        if (projectId) {
            queryClient.setQueryData(QUERY_KEY.ALARM_PROJECT(projectId), (oldData: any) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    pages: oldData.pages.map((page: any) => ({
                        ...page,
                        data: page.data.filter((alarm: AlarmEntity) => alarm.notificationId !== notificationId)
                    }))
                };
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
        refetch: () => {
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.ALARM_ALL(),
            });
            void queryClient.invalidateQueries({
                queryKey: QUERY_KEY.ALARM_PROJECT(projectId!),
            });
        },
    };
};

export default useAlarmsQuery;
