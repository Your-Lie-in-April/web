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
  height: 325.17px;
  display: flex;
  flex-direction: column;
`;

const TimeList = styled.div`
  width: 100%;
  height: 325.17px;
  display: flex;
`;

const DayTextList = styled.div`
  width: 55.9px;
  height: 290.76px;
  display: flex;
  flex-direction: column;
  gap: 11px;
  align-items: center;
  margin-top: 10px;
`;

const HourTextList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 14px;
  align-items: center;
  justify-content: flex-end;
`;

const DayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const HoursOfDay = [...Array(16).keys()].map((_, index) => index + 9);

const EditMyTime = () => {
  return (
    <TimeTableDiv>
      <HourTextList>
        {HoursOfDay.map((h, idx) => (
          <CommonText key={idx} style={{ width: "38.45px" }}>
            {h}
          </CommonText>
        ))}
      </HourTextList>
      <TimeList>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <DayTextList>
            {DayOfWeek.map((day, idx) => (
              <CommonText key={idx} style={{ lineHeight: "32.11px" }}>
                {day}
              </CommonText>
            ))}
          </DayTextList>
          <div
            style={{
              height: "306.17px",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              padding: "8px",
            }}
          >
            {DayOfWeek.map((day, idx) => (
              <div key={idx} style={{ display: "flex", flexDirection: "row" }}>
                {HoursOfDay.slice(0, HoursOfDay.length - 1).map(
                  (hour, hourIdx) => (
                    <TimeCircle key={hourIdx} />
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </TimeList>
    </TimeTableDiv>
  );
};

export default EditMyTime;
