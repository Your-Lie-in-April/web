import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

interface SelectedSlot {
    date: string;
    hour: number;
    minute: number;
}

interface ScheduleItem {
    startTime: string;
    endTime: string;
}

interface ScheduleDayRequest {
    schedule: ScheduleItem[];
}

interface ScheduleData {
    schedule: ScheduleDayRequest[];
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
): ScheduleData => {
    const scheduleByDate: { [date: string]: ScheduleItem[] } = {};

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
    let currentStartTime = '';

    selectedSlots.forEach((slot, index) => {
        const slotTime = dayjs(
            `${slot.date}T${slot.hour.toString().padStart(2, '0')}:${slot.minute
                .toString()
                .padStart(2, '0')}:00`
        );
        const nextSlotTime = slotTime.add(30, 'minute');

        const isValidDate =
            projectStartDate &&
            projectEndDate &&
            slotTime.isBetween(projectStartDate, projectEndDate, 'day', '[]');
        const isValidDayOfWeek =
            projectDaysOfWeek !== undefined &&
            projectDaysOfWeek.includes(slotTime.format('dddd').toUpperCase());

        if (isValidDate && isValidDayOfWeek) {
            const projectStart = dayjs(slot.date)
                .hour(projectStartTime || 0)
                .minute(0);
            const projectEnd = dayjs(slot.date)
                .hour(projectEndTime || 24)
                .minute(0);
            if (projectEndTime === 0) projectEnd.add(1, 'day');

            if (slotTime.isBetween(projectStart, projectEnd, 'minute', '[]')) {
                if (!currentStartTime || slot.date !== currentDate) {
                    currentDate = slot.date;
                    currentStartTime = slotTime.format('YYYY-MM-DDTHH:mm:ss');
                }

                if (
                    index === selectedSlots.length - 1 ||
                    selectedSlots[index + 1].date !== slot.date ||
                    !nextSlotTime.isSame(
                        dayjs(
                            `${selectedSlots[index + 1].date}T${selectedSlots[index + 1].hour
                                .toString()
                                .padStart(2, '0')}:${selectedSlots[index + 1].minute
                                .toString()
                                .padStart(2, '0')}:00`
                        )
                    )
                ) {
                    if (!scheduleByDate[currentDate]) {
                        scheduleByDate[currentDate] = [];
                    }
                    scheduleByDate[currentDate].push({
                        startTime: currentStartTime,
                        endTime: nextSlotTime.format('YYYY-MM-DDTHH:mm:ss'),
                    });
                    currentStartTime = '';
                }
            }
        }
    });

    const scheduleData: ScheduleData = {
        schedule: Object.entries(scheduleByDate).map(([, scheduleItems]) => ({
            schedule: scheduleItems,
        })),
    };

    return scheduleData;
};