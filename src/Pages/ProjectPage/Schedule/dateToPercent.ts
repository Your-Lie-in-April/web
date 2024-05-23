export const dateToPercent = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const totalMinutes = hours * 60 + minutes;
    const totalMinutesInDay = 24 * 60;

    return (totalMinutes / totalMinutesInDay) * 100;
};