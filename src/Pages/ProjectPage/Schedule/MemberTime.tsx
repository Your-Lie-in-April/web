import styled from "styled-components";
import TimeCircle from "./TimeCircle";

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
  flex-direction: column;
`;

const DayTextList = styled.div`
  height: 216.57px;
  display: flex;
  flex-direction: column;
  gap: 11px;
  align-items: center;
  justify-content: space-between;
  margin-top: 3px;
`;

const HourTextList = styled.div`
  width: 590px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
`;

const DayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const HoursOfDay = [...Array(16).keys()].map((_, index) => index + 9);

const MemeberTime = () => {
  return (
    <TimeTableDiv>
      <HourTextList style={{ alignSelf: "flex-end" }}>
        {HoursOfDay.map((hour, idx) => (
          <CommonText key={idx} style={{}}>
            {hour}
          </CommonText>
        ))}
      </HourTextList>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <DayTextList>
          {DayOfWeek.map((day, idx) => (
            <CommonText key={idx}>{day}</CommonText>
          ))}
        </DayTextList>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {DayOfWeek.map((day, idx) => (
            <div key={idx} style={{ display: "flex", flexDirection: "row" }}>
              {HoursOfDay.slice(0, HoursOfDay.length - 1).map(
                (hour, hourIdx) => (
                  <TimeCircle key={hourIdx} style={{ border: "none" }} />
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
