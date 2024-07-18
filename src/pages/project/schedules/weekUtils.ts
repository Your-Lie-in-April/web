import dayjs from 'dayjs';

export const getWeekDates = (selectedDate: string): string[] => {
    const date = dayjs(selectedDate);
    const startOfWeek = date.startOf('week').day(0);
    const endOfWeek = date.endOf('week').day(6);

    const weekDates = [];
    let currentDate = startOfWeek;
    while (
        currentDate.isBefore(endOfWeek) ||
        currentDate.isSame(endOfWeek, 'day')
    ) {
        weekDates.push(currentDate.format('YYYY-MM-DD'));
        currentDate = currentDate.add(1, 'day');
    }

    return weekDates;
};
