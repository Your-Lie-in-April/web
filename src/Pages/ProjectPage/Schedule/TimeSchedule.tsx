import React from 'react';
import ProgressBar from './TimeBar';

interface TimeScheduleProps {
    currentTime: Date;
}

const TimeSchedule: React.FC<TimeScheduleProps> = ({ currentTime }) => {
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const hours = Array.from({ length: 15 }, (_, i) => i + 9);

    const getCurrentHour = (day: number) => {
        const currentDay = currentTime.getDay();
        const currentHour = currentTime.getHours();
        return currentDay === day ? currentHour : -1;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {daysOfWeek.map((day, dayIndex) => (
                <div key={day} style={{ display: 'flex' }}>
                    <div
                        style={{
                            width: '42px',
                            textAlign: 'center',
                            lineHeight: '29.804px',
                        }}
                    >
                        {day}
                    </div>
                    <div style={{ flex: 1 }}>
                        <ProgressBar
                            hours={hours}
                            currentHour={getCurrentHour(dayIndex)}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TimeSchedule;
