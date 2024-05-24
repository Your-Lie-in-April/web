import dayjs from 'dayjs';

interface SelectedSlot {
    date: string;
    hour: number;
    minute: number;
}

export const formatScheduleData = (selection: {
    [key: number]: SelectedSlot;
}) => {
    const scheduleData: {
        schedule: { startTime: string; endTime: string }[];
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

        if (prevEndTime === startTime) {
            currentSchedule[currentSchedule.length - 1].endTime = endTime;
        } else {
            currentSchedule.push({ startTime, endTime });
        }

        prevEndTime = endTime;
    });

    if (currentSchedule.length > 0) {
        scheduleData.push({ schedule: currentSchedule });
    }

    return { schedule: scheduleData };
};
