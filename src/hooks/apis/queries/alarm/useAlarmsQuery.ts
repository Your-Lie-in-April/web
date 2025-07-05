import { AlarmEntity } from '@/types/alarmType';
import { QUERY_KEY } from '@constants/queryKey';
import { useSSE } from '@hooks/useSSE';
import { useAppDispatch } from '@redux/config/hook';
import { setProjectLastAlarmId } from '@redux/slice/alarm';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import useCheckedAlarmsQuery from './useCheckedAlarmsQuery';
import useUncheckedAlarmsQuery from './useUncheckedAlarmsQuery';

const useAlarmsQuery = (projectId?: number) => {
    const [isUncheckedComplete, setIsUncheckedComplete] = useState<boolean>(false);
    const [isCheckedComplete, setIsCheckedComplete] = useState<boolean>(false);
    const [allAlarms, setAllAlarms] = useState<AlarmEntity[]>([]);
    const queryClient = useQueryClient();
    const dispatch = useAppDispatch();

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
            ...sseAlarms.map((alarm) => ({ ...alarm, isSSE: true })),
            ...(uncheckedQuery.data?.pages.flatMap((page) => page.data) || []),
            ...(checkedQuery.data?.pages.flatMap((page) => page.data) || []),
        ];

        const uniqueAlarms = Array.from(
            new Map(newAlarms.map((alarm) => [alarm.notificationId, alarm])).values()
        );

        setAllAlarms(uniqueAlarms);

        // 가장 최신 알림의 ID를 마지막 알림 ID로 저장
        if (uniqueAlarms.length > 0) {
            const latestAlarm = uniqueAlarms[0];

            // 특정 프로젝트 페이지
            if (projectId != null) {
                dispatch(
                    setProjectLastAlarmId({
                        projectId,
                        alarmId: latestAlarm.notificationId,
                    })
                );
            }
            // 메인페이지: 로컬 스토리지
            else {
                localStorage.setItem('mainLastAlarmId', String(latestAlarm.notificationId));
            }
        }
    }, [sseAlarms, uncheckedQuery.data, checkedQuery.data, projectId, dispatch]);

    const removeAlarm = useCallback(
        (notificationId: number) => {
            setAllAlarms((prev) => prev.filter((alarm) => alarm.notificationId !== notificationId));

            const updateQueryData = (oldData: any) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    pages: oldData.pages.map((page: any) => ({
                        ...page,
                        data: page.data.filter(
                            (alarm: AlarmEntity) => alarm.notificationId !== notificationId
                        ),
                    })),
                };
            };

            queryClient.setQueryData(QUERY_KEY.ALARM_ALL(), updateQueryData);
            if (projectId) {
                queryClient.setQueryData(QUERY_KEY.ALARM_PROJECT(projectId), updateQueryData);
            }
        },
        [queryClient, projectId]
    );

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
