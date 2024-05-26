export const dateToPixel = (date: Date, totalWidth: number) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const totalMinutes = (hours - 9) * 60 + minutes;
    const totalMinutesInRange = 15 * 60;

    return (totalMinutes / totalMinutesInRange) * totalWidth;
};
