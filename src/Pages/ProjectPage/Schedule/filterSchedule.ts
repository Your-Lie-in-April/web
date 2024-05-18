import { startOfWeek, endOfWeek } from 'date-fns';
import { DaySchedule, ScheduleWeekResponse } from '#/Types/scheduletype';

const DayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export const filterScheduleByWeekRange = (
    scheduleData: ScheduleWeekResponse | null,
    selectedDate: Date | null
): DaySchedule[] => {
    if (!selectedDate || !scheduleData) return [];

    const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
    const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 0 });

    const filteredSchedules: DaySchedule[] = DayOfWeek.map((day) => ({
        dayOfWeek: day.toLowerCase(),
        schedule: [],
    }));

    scheduleData.schedule.forEach((daySchedule) => {
        daySchedule.schedule.forEach((scheduleItem) => {
            const scheduleDate = new Date(scheduleItem.startAt);
            if (scheduleDate >= weekStart && scheduleDate <= weekEnd) {
                const dayIndex = DayOfWeek.findIndex(
                    (day) => day.toLowerCase() === daySchedule.dayOfWeek
                );
                if (dayIndex !== -1) {
                    filteredSchedules[dayIndex].schedule.push(scheduleItem);
                }
            }
        });
    });

    return filteredSchedules;
};
