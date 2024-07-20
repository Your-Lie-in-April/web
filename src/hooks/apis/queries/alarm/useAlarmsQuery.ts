import { useState, useEffect } from 'react';
import useCheckedAlarmsQuery from './useCheckedAlarmsQuery';
import useUncheckedAlarmsQuery from './useUncheckedAlarmsQuery';

const useAlarmsQuery = (projectId?: number) => {
    const [isUncheckedComplete, setIsUncheckedComplete] = useState<boolean>(false);

    const uncheckedQuery = useUncheckedAlarmsQuery(projectId);
    const checkedQuery = useCheckedAlarmsQuery(projectId);

    useEffect(() => {
        const lastPage = uncheckedQuery.data?.pages[uncheckedQuery.data.pages.length - 1];
        if (lastPage && !lastPage.hasMore) {
            setIsUncheckedComplete(true);
        }
    }, [uncheckedQuery.data]);

    return {
        uncheckedQuery,
        checkedQuery,
        isUncheckedComplete,
    };
};

export default useAlarmsQuery;