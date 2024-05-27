import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TimeSlotLeft, TimeSlotRight } from './EditMyTimeCircle';
import dayjs from 'dayjs';

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

const HoursOfDay = [...Array(15).keys()].map((_, index) => index + 9);

interface SelectedSlot {
    date: string;
    hour: number;
    minute: number;
}

interface EditMyTimeProps {
    weekDates: string[];
    selection: { [key: number]: SelectedSlot };
    setSelection: React.Dispatch<
        React.SetStateAction<{ [key: number]: SelectedSlot }>
    >;
}

const EditMyTime: React.FC<EditMyTimeProps> = ({
    weekDates,
    selection,
    setSelection,
}) => {
    const [firstClickSlot, setFirstClickSlot] = useState<number>(0);
    const [firstClickSlotState, setFirstClickSlotState] =
        useState<boolean>(false);
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

    // 셀 마우스 클릭시
    const handleMouseClick = (
        id: number,
        date: string,
        hour: number,
        minute: number
    ) => {
        setFirstClickSlot(id);

        setSelection((prevSelection) => {
            const newSelection = { ...prevSelection };
            if (newSelection[id]) {
                delete newSelection[id];
            } else {
                newSelection[id] = { date, hour, minute };
                setFirstClickSlotState(true);
            }
            return newSelection;
        });

        setIsMouseDown(true);
    };

    // 마우스가 셀 안에 들어올 경우 (드래그시)
    const handleMouseEnter = (
        id: number,
        date: string,
        hour: number,
        minute: number
    ) => {
        if (isMouseDown) {
            setSelection((prevSelection) => {
                const newSelection = { ...prevSelection };
                if (firstClickSlotState) {
                    newSelection[id] = { date, hour, minute };
                } else {
                    delete newSelection[id];
                }
                return newSelection;
            });
        }
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    const isSlotSelected = (id: number) => {
        return selection[id] !== undefined;
    };

    useEffect(() => {
        if (Object.keys(selection).length > 0) {
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
                        {weekDates.map((date, idx) => (
                            <CommonText
                                key={idx}
                                style={{ lineHeight: '32.11px' }}
                            >
                                {dayjs(date).format('ddd').toLocaleUpperCase()}
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
                        {weekDates.map((date, idx) => (
                            <div
                                key={idx}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                {HoursOfDay.map((hour, hourIdx) => {
                                    const slotIndex = idx * 15 + hourIdx;
                                    const slotIdLeft = slotIndex * 2 + 1;
                                    const slotIdRight = slotIndex * 2 + 2;

                                    return (
                                        <React.Fragment key={hourIdx}>
                                            <TimeSlotLeft
                                                id={slotIdLeft}
                                                onSelectSlot={handleMouseClick}
                                                onMouseEnter={() =>
                                                    handleMouseEnter(
                                                        slotIdLeft,
                                                        date,
                                                        hour,
                                                        0
                                                    )
                                                }
                                                isSelected={
                                                    isSlotSelected(
                                                        slotIdLeft
                                                    ) ||
                                                    firstClickSlot == slotIdLeft
                                                }
                                                date={date}
                                                hour={hour}
                                                minute={0}
                                            />
                                            <TimeSlotRight
                                                id={slotIdRight}
                                                onSelectSlot={handleMouseClick}
                                                onMouseEnter={() =>
                                                    handleMouseEnter(
                                                        slotIdRight,
                                                        date,
                                                        hour,
                                                        30
                                                    )
                                                }
                                                isSelected={
                                                    isSlotSelected(
                                                        slotIdRight
                                                    ) ||
                                                    firstClickSlot ===
                                                        slotIdRight
                                                }
                                                date={date}
                                                hour={hour}
                                                minute={30}
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
