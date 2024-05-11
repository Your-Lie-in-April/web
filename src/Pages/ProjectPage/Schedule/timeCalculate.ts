import { startOfWeek, endOfWeek } from 'date-fns';
import { DaySchedule, ScheduleItem } from '#/types/schedule';

export const getWeekRange = (date: Date) => {
    const startDate = startOfWeek(date, { weekStartsOn: 0 });
    const endDate = endOfWeek(date, { weekStartsOn: 0 });
    return { start: startDate, end: endDate };
};

export const filterScheduleByWeekRange = (
    schedule: ScheduleItem[],
    weekRange: { start: Date; end: Date }
): DaySchedule[] => {
    const filteredSchedule: DaySchedule[] = [];

    for (let day = 0; day < 7; day++) {
        const currentDate = new Date(weekRange.start);
        currentDate.setDate(currentDate.getDate() + day);

        const daySchedule: DaySchedule = {
            date: currentDate,
            scheduleItems: schedule.filter((item) => item.day === day),
        };

        filteredSchedule.push(daySchedule);
    }

    return filteredSchedule;
};
