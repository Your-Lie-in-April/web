import { AlarmEntity } from '@/types/alarmType';
import { useSSE } from '@hooks/useSSE';
import { useEffect, useState } from 'react';
import useCheckedAlarmsQuery from './useCheckedAlarmsQuery';
import useUncheckedAlarmsQuery from './useUncheckedAlarmsQuery';

const useAlarmsQuery = (projectId?: number) => {
    const [isUncheckedComplete, setIsUncheckedComplete] = useState<boolean>(false);
    const [isCheckedComplete, setIsCheckedComplete] = useState<boolean>(false);
    const [allAlarms, setAllAlarms] = useState<Set<AlarmEntity>>(new Set());

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

    return {
        allAlarms,
        isUncheckedComplete,
        isCheckedComplete,
        uncheckedQuery,
        checkedQuery,
        fetchSSEData,
    };
};

export default useAlarmsQuery;
