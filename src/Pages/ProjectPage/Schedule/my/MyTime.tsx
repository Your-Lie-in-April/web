import styled from 'styled-components';
import TimeCircle from '../TimeCircle';

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

const DayTextList = styled.div`
    height: 216.57px;
    display: flex;
    flex-direction: column;
    gap: 11px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.06px;
    align-self: flex-end;
`;

const HourTextList = styled.div`
    width: 574px;
    display: flex;
    flex-direction: row;
    gap: 11px;
    align-items: center;
    justify-content: space-between;
`;

const DayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const HoursOfDay = [...Array(16).keys()].map((_, index) => index + 9);

const MyTime = () => {
    const filteredHours = HoursOfDay.slice(0, 15);
    return (
        <TimeTableDiv>
            <DayTextList>
                {DayOfWeek.map((day, idx) => (
                    <CommonText style={{ height: '24.081px' }} key={idx}>
                        {day}
                    </CommonText>
                ))}
            </DayTextList>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <HourTextList style={{ alignSelf: 'flex-start' }}>
                    {filteredHours.map((hour, idx) => (
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
                    {DayOfWeek.map((day, idx) => (
                        <div
                            key={idx}
                            style={{ display: 'flex', flexDirection: 'row' }}
                        >
                            {HoursOfDay.slice(0, HoursOfDay.length - 1).map(
                                (hour, hourIdx) => (
                                    <TimeCircle key={hourIdx} />
                                )
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </TimeTableDiv>
    );
};

export default MyTime;
