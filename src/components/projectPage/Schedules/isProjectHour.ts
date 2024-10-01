export const isProjectHour = (
    date: string,
    hour: number,
    minute: number,
    projectStartTime: string | undefined,
    projectEndTime: string | undefined
) => {
    if (projectStartTime !== undefined && projectEndTime !== undefined) {
        const [startHour, startMinute] = projectStartTime.split(':').map(Number);
        const [endHour, endMinute] = projectEndTime.split(':').map(Number);

        const slotDateTime = new Date(date);
        slotDateTime.setHours(hour, minute);

        const projectStartDateTime = new Date(date);
        projectStartDateTime.setHours(startHour, startMinute);

        const projectEndDateTime = new Date(date);
        projectEndDateTime.setHours(endHour, endMinute);

        if (endHour === 0 && endMinute === 0) {
            projectEndDateTime.setDate(projectEndDateTime.getDate() + 1);
        }

        return slotDateTime >= projectStartDateTime && slotDateTime < projectEndDateTime;
    }
    return false;
};
