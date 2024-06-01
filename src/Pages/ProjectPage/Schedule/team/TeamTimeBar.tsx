import React from "react";
import { ScheduleItem } from "#/Types/scheduletype";

interface TeamTimeBarProps {
  hours: number[];
  schedule: ScheduleItem[];
  memberCount: number;
}

const TeamTimeBar: React.FC<TeamTimeBarProps> = ({
  hours,
  schedule,
  memberCount,
}) => {
  const totalWidth = hours.length * 40;

  const getColor = (count: number) => {
    const baseColor = "#633AE2";
    const opacity = count / memberCount;
    return `${baseColor}${Math.round(opacity * 255)
      .toString(16)
      .padStart(2, "0")}`;
  };

  const getMemberCountAtTime = (hour: number, minute: number) => {
    return schedule.filter((item) => {
      const itemStartTime = new Date(item.startTime);
      const itemEndTime = new Date(item.endTime);
      const itemTime = new Date(itemStartTime);
      itemTime.setHours(hour, minute, 0, 0);
      return itemStartTime <= itemTime && itemEndTime > itemTime;
    }).length;
  };

  return (
    <div
      style={{
        width: `${totalWidth}px`,
        height: "29.804px",
        backgroundColor: "transparent",
        overflow: "hidden",
        position: "relative",
        display: "flex",
      }}
    >
      {hours.map((hour) => (
        <div
          key={hour}
          style={{
            width: "40px",
            height: "100%",
            backgroundColor: "#D9D9D9",
            position: "relative",
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid #7D7D7D",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              width: "0.5px",
              height: "100%",
              borderLeft: "1px dashed #a4a4a4",
              transform: "translateX(-50%)",
            }}
          />
          {Array.from({ length: 60 }, (_, minute) => (
            <div
              key={minute}
              style={{
                position: "absolute",
                top: 0,
                left: `${(minute / 60) * 100}%`,
                width: `${(1 / 60) * 100}%`,
                height: "100%",
                backgroundColor: getColor(getMemberCountAtTime(hour, minute)),
                boxSizing: "border-box",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TeamTimeBar;
