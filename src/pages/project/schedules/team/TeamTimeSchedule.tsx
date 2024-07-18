import { ScheduleAllMembersResDto, ScheduleItem } from '@/types/scheduleType';
import React from 'react';
import TeamTimeBar from './TeamTimeBar';

interface TeamTimeScheduleeProps {
    scheduleData: ScheduleAllMembersResDto | null;
}

const TeamTimeSchedule: React.FC<TeamTimeScheduleeProps> = ({ scheduleData }) => {
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {daysOfWeek.map((day) => (
                <div key={day} style={{ display: 'flex' }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            justifyItems: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            width: '41.922px',

                            textAlign: 'center',
                            color: '#000000',
                            fontSize: '18px',
                            fontWeight: '400',
                            fontStyle: 'normal',
                            fontFamily: 'Pretendard',
                        }}
                    >
                        {daysOfWeekMap[day]}
                    </div>
                    <TeamTimeBar
                        hours={hours}
                        schedule={getScheduleForDay(day)}
                        memberCount={getMemberCount()}
                    />
                </div>
            ))}
        </div>
    );
};

export default TeamTimeSchedule;
