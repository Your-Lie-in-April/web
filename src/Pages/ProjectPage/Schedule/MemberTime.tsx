import styled from 'styled-components';
import TimeCircle from './TimeCircle';

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
  gap: 3.73px;
`;

const DayTextList = styled.div`
  height: 212.5px;
  display: flex;
  flex-direction: column;
  gap: 9.32px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.8px;
  align-self: flex-end;
`;

const HourTextList = styled.div`
  width: 536px;
  display: flex;
  flex-direction: row;
  gap: 7.46px;
  align-items: center;
  justify-content: space-between;
`;

const DayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const HoursOfDay = [...Array(16).keys()].map((_, index) => index + 9);

const MemeberTime = () => {
  const filteredHours = HoursOfDay.slice(0, 15);
  return (
    <TimeTableDiv>
      <DayTextList>
        {DayOfWeek.map((day, idx) => (
          <CommonText style={{ height: '22.369px' }} key={idx}>
            {day}
          </CommonText>
        ))}
      </DayTextList>
      <div style={{ display: 'flex', flexDirection: 'column', gap : "7.3px"}}>
        <HourTextList style={{ alignSelf: 'flex-start' }}>
          {filteredHours.map((hour, idx) => (
            <CommonText key={idx}>{hour}</CommonText>
          ))}
        </HourTextList>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '3.73px',
          }}
        >
          {DayOfWeek.map((day, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'row' }}>
              {HoursOfDay.slice(0, HoursOfDay.length - 1).map(
                (hour, hourIdx) => (
                  <TimeCircle
                    key={hourIdx}
                    style={{
                      border: 'none',
                      width: '37.282px',
                      height: '27.962px',
                    }}
                  />
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </TimeTableDiv>
  );
};

export default MemeberTime;
