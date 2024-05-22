import React, { useEffect, useState } from 'react';
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
    const [firstClickSlot, setFirstClickSlot] = useState<number>(0);
    const [firstClickSlotState, setFirstClickSlotState] =
        useState<boolean>(false);
    const [selection, setSelection] = useState<Set<number> | null>(null);
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

    // 셀 마우스 클릭시
    const handleMouseClick = (id: number) => {
        setFirstClickSlot(id);

        if (selection === null) {
            setSelection(new Set([id]));
            setFirstClickSlotState(true);
        } else {
            if (selection.has(id)) {
                setFirstClickSlotState(false);
                const newSelection = new Set(selection);
                newSelection.delete(id);
                setSelection(newSelection);
            } else {
                setFirstClickSlotState(true);
                setSelection((prevSelection) => new Set(prevSelection).add(id));
            }
        }

        setIsMouseDown(true);
    };

    // 마우스가 셀 안에 들어올 경우 (드래그시)
    const handleMouseEnter = (id: number) => {
        if (isMouseDown) {
            if (firstClickSlotState) {
                setSelection((prevSelection) => new Set(prevSelection).add(id));
            } else {
                if (selection !== null) {
                    const newSelection = new Set(selection);
                    newSelection.delete(id);
                    setSelection(newSelection);
                }
            }
        }
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    const isSlotSelected = (id: number) => {
        if (selection !== null) {
            return selection.has(id);
        }
    };

    useEffect(() => {
        if (selection !== null) {
            setFirstClickSlot(0);
        }
    }, [selection]);

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
                            <CommonText
                                key={idx}
                                style={{ lineHeight: '32.11px' }}
                            >
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
                            <div
                                key={idx}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                {HoursOfDay.map((_, hourIdx) => {
                                    const slotIndex = idx * 15 + hourIdx;
                                    const slotIdLeft = slotIndex * 2 + 1;
                                    const slotIdRight = slotIndex * 2 + 2;

                                    return (
                                        <React.Fragment key={hourIdx}>
                                            <TimeSlotLeft
                                                id={slotIdLeft}
                                                onSelectSlot={handleMouseClick}
                                                onMouseEnter={() =>
                                                    handleMouseEnter(slotIdLeft)
                                                }
                                                isSelected={
                                                    isSlotSelected(
                                                        slotIdLeft
                                                    ) ||
                                                    firstClickSlot == slotIdLeft
                                                }
                                            />
                                            <TimeSlotRight
                                                id={slotIdRight}
                                                onSelectSlot={handleMouseClick}
                                                onMouseEnter={() =>
                                                    handleMouseEnter(
                                                        slotIdRight
                                                    )
                                                }
                                                isSelected={
                                                    isSlotSelected(
                                                        slotIdRight
                                                    ) ||
                                                    firstClickSlot ===
                                                        slotIdRight
                                                }
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
