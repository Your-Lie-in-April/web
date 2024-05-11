import { DaySchedule, ScheduleWeekResponse } from '#/Types/scheduletype';
import { createContext, useContext } from 'react';


type ScheduleContextType = {
    scheduleData: ScheduleWeekResponse | undefined;
    filteredSchedule: DaySchedule[];
};

export const ScheduleContext = createContext<ScheduleContextType>({
    scheduleData: undefined,
    filteredSchedule: [],
});

export const useScheduleContext = () => useContext(ScheduleContext);
