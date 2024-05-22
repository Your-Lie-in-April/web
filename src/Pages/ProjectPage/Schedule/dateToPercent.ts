export const dateToPercent = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const totalMinutes = (hours - 9) * 60 + minutes;
    const totalMinutesInRange = 15 * 60;

    return (totalMinutes / totalMinutesInRange) * 100;
};
