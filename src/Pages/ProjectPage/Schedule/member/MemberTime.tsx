import styled from 'styled-components';
import { DaySchedule } from '#/Types/scheduletype';
import MemberTimeBar from './MemberTimeBar';

const CommonText = styled.div`
    color: #000000;
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const TimeTableDiv = styled.div`
    width: 100%;
    display: flex;
`;

const HourTextList = styled.div`
    width: 532px;
    display: flex;
    flex-direction: row;
    gap: 7px;
    align-items: center;
    justify-content: space-between;
    align-items: flex-start;
    margin-left: 46px;
`;

const HoursOfDay = [...Array(16).keys()].map((_, index) => index + 9);

interface MemberTimeProps {
    scheduleData: DaySchedule[];
}

const MemberTime: React.FC<MemberTimeProps> = ({ scheduleData }) => {
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
        const daySchedule = scheduleData?.find(
            (item) => item.daysOfWeek === day
        );
        return daySchedule?.schedule || [];
    };

    return (
        <TimeTableDiv>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <HourTextList>
                    {HoursOfDay.slice(0, 15).map((hour, idx) => (
                        <CommonText key={idx}>{hour}</CommonText>
                    ))}
                </HourTextList>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                    }}
                >
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
                                <MemberTimeBar
                                    hours={hours}
                                    schedule={getScheduleForDay(day)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </TimeTableDiv>
    );
};

export default MemberTime;
