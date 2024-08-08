import { ScheduleWeekResponse } from '@/types/scheduleType';
import React from 'react';
import MyTimeBar from './MyTimeBar';

interface MyTimeScheduleProps {
    scheduleData: ScheduleWeekResponse | null;
}

const MyTimeSchedule: React.FC<MyTimeScheduleProps> = ({ scheduleData }) => {
    const daysOfWeek = [
        'SUNDAY',
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
    ];

    const daysOfWeekMap: { [key: string]: string } = {
        SUNDAY: 'SUN',
        MONDAY: 'MON',
        TUESDAY: 'TUE',
        WEDNESDAY: 'WED',
        THURSDAY: 'THU',
        FRIDAY: 'FRI',
        SATURDAY: 'SAT',
    };
    const hours = Array.from({ length: 15 }, (_, i) => i + 9);

    const getScheduleForDay = (day: string) => {
        const daySchedule = scheduleData?.schedule.find((item) => item.daysOfWeek === day);
        return daySchedule?.schedule || [];
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {daysOfWeek.map((day) => (
                <div key={day} style={{ display: 'flex' }}>
                    <div
                        style={{
                            width: '42px',
                            textAlign: 'center',
                            lineHeight: '29.804px',
                            color: '#000000',
                            fontSize: '18px',
                            fontWeight: '400',
                            fontStyle: 'normal',
                            fontFamily: 'Pretendard',
                        }}
                    >
                        {daysOfWeekMap[day]}
                    </div>
                    <div style={{ width: '2px' }} />
                    <div style={{ flex: 1 }}>
                        <MyTimeBar hours={hours} schedule={getScheduleForDay(day)} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyTimeSchedule;
