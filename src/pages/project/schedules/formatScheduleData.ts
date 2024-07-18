import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

interface SelectedSlot {
    date: string;
    hour: number;
    minute: number;
}

export const formatScheduleData = (
    selection: {
        [key: number]: SelectedSlot;
    },
    projectStartTime: number | undefined,
    projectEndTime: number | undefined,
    projectDaysOfWeek: string[] | undefined,
    projectStartDate: string | undefined,
    projectEndDate: string | undefined
) => {
    const scheduleData: {
        schedule: {
            startTime: string;
            endTime: string;
        }[];
    }[] = [];

    const selectedSlots = Object.values(selection);
    selectedSlots.sort((a, b) => {
        if (a.date === b.date) {
            if (a.hour === b.hour) {
                return a.minute - b.minute;
            }
            return a.hour - b.hour;
        }
        return a.date.localeCompare(b.date);
    });

    let currentDate = '';
    let currentSchedule: { startTime: string; endTime: string }[] = [];
    let prevEndTime = '';

    selectedSlots.forEach((slot) => {
        if (slot.date !== currentDate) {
            if (currentSchedule.length > 0) {
                scheduleData.push({ schedule: currentSchedule });
            }
            currentDate = slot.date;
            currentSchedule = [];
            prevEndTime = '';
        }

        const startTime = dayjs(slot.date)
            .hour(slot.hour)
            .minute(slot.minute)
            .format('YYYY-MM-DDTHH:mm:ss');
        const endTime = dayjs(slot.date)
            .hour(slot.hour)
            .minute(slot.minute + 30)
            .format('YYYY-MM-DDTHH:mm:ss');

        const isValidStartTime = projectStartTime !== undefined && slot.hour >= projectStartTime;
        const isValidEndTime = projectEndTime !== undefined && slot.hour <= projectEndTime;
        const isValidDate =
            projectStartDate &&
            projectEndDate &&
            dayjs(slot.date).isBetween(projectStartDate, projectEndDate, 'day', '[]');
        const isValidDayOfWeek =
            projectDaysOfWeek !== undefined &&
            projectDaysOfWeek.includes(dayjs(slot.date).format('dddd').toUpperCase());

        if (
            isValidStartTime &&
            isValidEndTime &&
            isValidDate &&
            isValidDayOfWeek &&
            dayjs(endTime).isAfter(dayjs(startTime))
        ) {
            if (prevEndTime === startTime) {
                currentSchedule[currentSchedule.length - 1].endTime = endTime;
            } else {
                currentSchedule.push({ startTime, endTime });
            }
            prevEndTime = endTime;
        }
    });

    if (currentSchedule.length > 0) {
        scheduleData.push({ schedule: currentSchedule });
    }

    return { schedule: scheduleData };
};
