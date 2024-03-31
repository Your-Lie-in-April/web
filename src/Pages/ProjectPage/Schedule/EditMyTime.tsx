import React, { useState } from 'react';
import styled from 'styled-components';
import { TimeSlotLeft, TimeSlotRight } from './EditMyTimeCircle';

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
  justify-content: center;
`;

const DayTextList = styled.div`
  height: 290.76px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
`;

const HourTextList = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: flex-end;
  margin-right: 55px;
`;

const DayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const HoursOfDay = [...Array(15).keys()].map((_, index) => index + 9);

const EditMyTime: React.FC = () => {
  let [startSlot, setStartSlot] = useState<number | null>(null);
  let [endSlot, setEndSlot] = useState<number | null>(null);
  let [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  let [selection, setSelection] = useState<number[]>([]);

  const handleSelectFromHere = (id: number) => {
    setIsMouseDown(true);
    setStartSlot(id);
    setEndSlot(id);
    setSelection([id]);
  };

  const handleSelectToHere = (id: number) => {
    if (isMouseDown && startSlot) {
      const currentIndex = id;
      const startIndex = startSlot;
      const endIndex = endSlot || 0;

      if (currentIndex > startIndex) {
        setEndSlot(id);
      } else {
        setStartSlot(id);
      }

      const selectedSlots = [];
      for (let i = Math.min(startIndex, id); i <= Math.max(endIndex, id); i++) {
        selectedSlots.push(i);
      }
      setSelection(selectedSlots);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const isSlotSelected = (id: number) => {
    return selection.includes(id);
  };

  return (
    <TimeTableDiv>
      <HourTextList>
        {HoursOfDay.map((h, idx) => (
          <CommonText key={idx} style={{ width: '38.45px' }}>
            {h}
          </CommonText>
        ))}
      </HourTextList>
      <TimeList>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <DayTextList>
            {DayOfWeek.map((day, idx) => (
              <CommonText key={idx} style={{ lineHeight: '32.11px' }}>
                {day}
              </CommonText>
            ))}
          </DayTextList>
          <div
            onMouseUp={handleMouseUp}
            style={{
              height: '306.17px',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              padding: '8px',
            }}
          >
            {DayOfWeek.map((day, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'row' }}>
                {HoursOfDay.map((_, hourIdx) => {
                  const slotIndex = idx * 15 + hourIdx;
                  const slotIdLeft = slotIndex * 2 + 1;
                  const slotIdRight = slotIndex * 2 + 2;

                  return (
                    <React.Fragment key={hourIdx}>
                      <TimeSlotLeft
                        id={slotIdLeft}
                        onSelectFromHere={handleSelectFromHere}
                        onSelectToHere={handleSelectToHere}
                        isSelected={isSlotSelected(slotIdLeft)}
                      />
                      <TimeSlotRight
                        id={slotIdRight}
                        onSelectFromHere={handleSelectFromHere}
                        onSelectToHere={handleSelectToHere}
                        isSelected={isSlotSelected(slotIdRight)}
                      />
                    </React.Fragment>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </TimeList>
    </TimeTableDiv>
  );
};

export default EditMyTime;
