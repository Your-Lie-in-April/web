import useClickOutside from '@hooks/useClickOutside';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppDispatch, useAppSelector } from '@redux/config/hook';
import { setEndTime, setStartTime } from '@redux/reducers/edit';
import '@styles/projecttime.css';
import { useRef, useState } from 'react';
import styled from 'styled-components';

type Time = {
    value: string;
    label: string;
    hour: string;
    minute: string;
    ampm: string;
};

const TimePicker = () => {
    const dispatch = useAppDispatch();
    const { startTime, endTime } = useAppSelector((state) => state.edit);

    const [isStartOpen, setIsStartOpen] = useState<boolean>(false);
    const [isEndOpen, setIsEndOpen] = useState<boolean>(false);
    const startDropdownRef = useRef<HTMLDivElement>(null);
    const endDropdownRef = useRef<HTMLDivElement>(null);

    const Times: Time[] = [];
    for (let hour = 9; hour <= 23; hour++) {
        const ampm = hour < 12 ? 'AM' : 'PM';
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        for (let minute = 0; minute < 60; minute += 30) {
            if (hour === 23 && minute > 30) continue;
            const formattedHour = displayHour.toString().padStart(2, '0');
            const formattedMinute = minute.toString().padStart(2, '0');
            const time = `${ampm} ${formattedHour}:${formattedMinute}`;
            Times.push({
                value: `${hour.toString().padStart(2, '0')}:${formattedMinute}`,
                label: time,
                hour: hour.toString().padStart(2, '0'),
                minute: formattedMinute,
                ampm,
            });
        }
    }
    Times.push({
        value: '24:00',
        label: 'AM 12:00',
        hour: '24',
        minute: '00',
        ampm: 'AM',
    });

    const filterTimes = (start: string): Time[] => {
        const [startHour, startMinute] = start.split(':').map(Number);
        return Times.filter(({ hour, minute }) => {
            const currentHour = parseInt(hour, 10);
            const currentMinute = parseInt(minute, 10);
            return (
                currentHour > startHour ||
                (currentHour === startHour && currentMinute >= startMinute) ||
                (currentHour === 0 && currentMinute === 0)
            );
        });
    };
    const [filteredEndTimes, setFilteredEndTimes] = useState<Time[]>(Times);

    const startSelect = () => {
        setIsStartOpen(!isStartOpen);
        setIsEndOpen(false);
    };

    const endSelect = () => {
        setIsEndOpen(!isEndOpen);
        setIsStartOpen(false);
    };

    const handleStartTimeSelect = (time: Time) => {
        dispatch(setStartTime(time.label));
        const newFilteredEndTimes = filterTimes(time.value);
        setFilteredEndTimes(newFilteredEndTimes);
        setIsStartOpen(false);

        if (newFilteredEndTimes.length > 0) {
            const selectedStartIndex = Times.findIndex((t) => t.value === time.value);
            const selectedEndIndex = selectedStartIndex + 1;
            if (selectedEndIndex < Times.length) {
                const endTime = Times[selectedEndIndex];
                if (endTime.hour === '24' && endTime.minute === '00') {
                    dispatch(setEndTime('24:00'));
                } else {
                    dispatch(setEndTime(endTime.label));
                }
            }
        }
    };

    const startTimes = Times.slice(0, Times.length - 1);
    const endTimes = filteredEndTimes.slice(1);

    useClickOutside(startDropdownRef, () => {
        if (isStartOpen) setIsStartOpen(false);
    });

    useClickOutside(endDropdownRef, () => {
        if (isEndOpen) setIsEndOpen(false);
    });

    return (
        <TimeLayout>
            <TimeContainer ref={startDropdownRef}>
                <TextBox>시간표 시작시간</TextBox>
                <TimeBox onClick={startSelect}>
                    <TimeText>{startTime}</TimeText>
                    {!isStartOpen && <ExpandMoreIcon sx={{ fontSize: '22px' }} />}
                    {isStartOpen && <ExpandLessIcon sx={{ fontSize: '22px' }} />}
                </TimeBox>
                {isStartOpen && (
                    <TimeList style={{ position: 'absolute', marginTop: '4px' }}>
                        {startTimes.map((time, index) => (
                            <TimeItem key={index} onClick={() => handleStartTimeSelect(time)}>
                                {time.label}
                            </TimeItem>
                        ))}
                    </TimeList>
                )}
            </TimeContainer>
            <Separator>~</Separator>
            <TimeContainer ref={endDropdownRef}>
                <TextBox>시간표 종료시간</TextBox>
                <TimeBox onClick={endSelect}>
                    <TimeText>{endTime}</TimeText>
                    {!isEndOpen && <ExpandMoreIcon sx={{ fontSize: '22px' }} />}
                    {isEndOpen && <ExpandLessIcon sx={{ fontSize: '22px' }} />}
                </TimeBox>
                {isEndOpen && (
                    <TimeList>
                        {endTimes.map((time, index) => (
                            <TimeItem
                                key={index}
                                onClick={() => {
                                    dispatch(setEndTime(time.label));
                                    setIsEndOpen(false);
                                }}
                            >
                                {time.label}
                            </TimeItem>
                        ))}
                    </TimeList>
                )}
            </TimeContainer>
        </TimeLayout>
    );
};
export default TimePicker;

const TimeLayout = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 40px;
    margin-left: 10px;
`;

const TimeContainer = styled.div`
    flex-direction: column;
    align-items: center;
    margin: 0 20px;
    justify-content: center;
    gap: 12px;
`;

const TimeBox = styled.div`
    width: 200px;
    height: 33px;
    font-size: 28px;
    height: 40px;
    border-radius: 20px;
    background: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: none;
    color: #000000;
    text-align: center;
    font-family: 'Pretendard';
    font-size: 28px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 4px;
    margin-left: 4px;
    gap: 12px;
    padding: 4px;
    box-sizing: border-box;
`;

const TimeList = styled.ul`
    width: 208px;
    max-height: 124px;
    font-size: 28px;
    border-radius: 5px;
    background: #f5f5f5;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    list-style-type: none;
    margin: auto;
    overflow-y: auto;
    position: absolute;
    margin-top: 4px;
`;

const TimeItem = styled.li`
    width: 100%;
    height: 28px;
    font-size: 24px;
    line-height: 28px;
    color: #7d7d7d;
    font-family: 'Pretendard';
    font-size: 24px;
    font-style: normal;
    font-weight: 300;
    line-height: 28px;
    cursor: pointer;
    &:hover {
        background-color: #633ae2;
        color: #fff;
    }
`;

const TimeText = styled.div`
    padding-left: 20px;
`;

const TextBox = styled.div`
    color: #000;
    font-family: 'Pretendard';
    font-size: 24px;
    font-weight: 400;
    line-height: normal;
    margin-top: 42px;
    margin: auto;
    text-align: center;
`;

const Separator = styled.span`
    width: 21px;
    height: 38px;
    font-size: 32px;
    font-weight: 600;
    text-align: center;
    margin: 30px 28px 0 28px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
