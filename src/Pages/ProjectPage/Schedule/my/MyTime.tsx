import { ScheduleWeekResponse } from '@/types/scheduleType';
import styled from 'styled-components';
import MyTimeSchedule from './MyTimeSchedule';

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
    width: 576px;
    display: flex;
    flex-direction: row;
    gap: 11px;
    align-items: center;
    justify-content: space-between;
    align-items: flex-start;
    margin-left: 45px;
`;

const HoursOfDay = [...Array(16).keys()].map((_, index) => index + 9);

interface MyTimeProps {
    scheduleData: ScheduleWeekResponse | null;
}

const MyTime: React.FC<MyTimeProps> = ({ scheduleData }) => {
    return (
        <TimeTableDiv>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <HourTextList>
                    {HoursOfDay.slice(0, 15).map((hour, idx) => (
                        <CommonText key={idx}>{hour}</CommonText>
                    ))}
                </HourTextList>
                <MyTimeSchedule scheduleData={scheduleData} />
            </div>
        </TimeTableDiv>
    );
};

export default MyTime;
