import React from 'react';

interface TimeSlotProps {
    id: number;
    isSelected: boolean;
    onSelectSlot: (
        id: number,
        date: string,
        hour: number,
        minute: number
    ) => void;
    onMouseEnter: () => void;
    date: string;
    hour: number;
    minute: number;
    projectStartTime: number | undefined;
    projectEndTime: number | undefined;
}

const isProjectHour = (
    date: string,
    hour: number,
    projectStartTime: number | undefined,
    projectEndTime: number | undefined
) => {
    if (projectStartTime !== undefined && projectEndTime !== undefined) {
        const slotDateTime = new Date(date);
        slotDateTime.setHours(hour);

        const projectStartDateTime = new Date(date);
        projectStartDateTime.setHours(projectStartTime);

        const projectEndDateTime = new Date(date);
        projectEndDateTime.setHours(projectEndTime);

        return (
            slotDateTime >= projectStartDateTime &&
            slotDateTime < projectEndDateTime
        );
    }
    return false;
};

export const TimeSlotLeft: React.FC<TimeSlotProps> = ({
    id,
    isSelected,
    onSelectSlot,
    onMouseEnter,
    date,
    hour,
    minute,
    projectStartTime,
    projectEndTime,
}) => {
    const handleMouseDown = () => {
        onSelectSlot(id, date, hour, minute);
    };

    const handleMouseEnter = () => {
        onMouseEnter();
    };

    const isProjectTime = isProjectHour(
        date,
        hour,
        projectStartTime,
        projectEndTime
    );

    return (
        <div
            id={`Time${id}`}
            style={{
                verticalAlign: 'top',
                display: 'flex',
                flex: '1',
                width: '26.665px',
                height: '39.74px',
                borderRadius: '20px 0 0 20px',
                borderTop: '0.5px solid #a4a4a4',
                borderLeft: '0.5px solid #a4a4a4',
                borderBottom: '0.5px solid #a4a4a4',
                background: isProjectTime
                    ? isSelected
                        ? '#633AE2'
                        : '#D9D9D9'
                    : '#ffffff',
                boxSizing: 'border-box',
            }}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
        ></div>
    );
};

export const TimeSlotRight: React.FC<TimeSlotProps> = ({
    id,
    isSelected,
    onSelectSlot,
    onMouseEnter,
    date,
    hour,
    minute,
    projectStartTime,
    projectEndTime,
}) => {
    const handleMouseDown = () => {
        onSelectSlot(id, date, hour, minute);
    };

    const handleMouseEnter = () => {
        onMouseEnter();
    };

    const isProjectTime = isProjectHour(
        date,
        hour,
        projectStartTime,
        projectEndTime
    );

    return (
        <div
            id={`Time${id}`}
            style={{
                display: 'flex',
                width: '26.665px',
                height: '39.74px',
                borderRadius: '0 20px 20px 0',
                borderLeft: '0.5px dashed #a4a4a4',
                borderTop: '0.5px solid #a4a4a4',
                borderRight: '0.5px solid #a4a4a4',
                borderBottom: '0.5px solid #a4a4a4',
                background: isProjectTime
                    ? isSelected
                        ? '#633AE2'
                        : '#D9D9D9'
                    : '#ffffff',
                boxSizing: 'border-box',
            }}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
        ></div>
    );
};
