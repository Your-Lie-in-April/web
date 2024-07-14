import { ScheduleAllMembersResDto, ScheduleItem } from '#/types/scheduleType';
import React from 'react';
import PinnedTimeBar from './PinnedTimeBar';

interface PinnedTimeScheduleProps {
    scheduleData: ScheduleAllMembersResDto | null;
}

const PinnedTimeSchedule: React.FC<PinnedTimeScheduleProps> = ({ scheduleData }) => {
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

    const getScheduleForDay = (day: string): ScheduleItem[] => {
        const daySchedules = scheduleData?.flatMap((member) =>
            member.schedule
                .filter((item) => item.daysOfWeek === day)
                .flatMap((item) => item.schedule)
        );
        return daySchedules || [];
    };

    const getMemberCount = () => {
        return scheduleData?.length || 0;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {daysOfWeek.map((day) => (
                <div key={day} style={{ display: 'flex', gap: '4px' }}>
                    <div
                        style={{
                            textAlign: 'center',
                            lineHeight: '29.804px',
                            color: '#000000',
                            fontSize: '18px',
                            fontWeight: '400',
                            fontStyle: 'normal',
                            fontFamily: 'Pretendard',
                            display: 'flex',
                            flexDirection: 'column',
                            width: '45px',
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {daysOfWeekMap[day]}
                    </div>
                    <PinnedTimeBar
                        hours={hours}
                        schedule={getScheduleForDay(day)}
                        memberCount={getMemberCount()}
                    />
                </div>
            ))}
        </div>
    );
};

export default PinnedTimeSchedule;
