import React, { FC, useState, useRef, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import styled from 'styled-components';
import { ko } from 'date-fns/locale/ko';
import '/src/styles/projecttime.css';
import { time } from 'console';

const ProjectTimeContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: #fff;
`;

const DateContainer = styled.div`
    flex-direction: column;
    align-items: center;
    margin: 0 20px;
`;

const SDatePicker = styled(ReactDatePicker)`
    width: 166px;
    padding: 4px;
    font-size: 28px;
    font-weight: 400;
    border-radius: 20px;
    background: #f5f5f5;
    text-align: center;
    display: flex;
    margin-left: 14px;

    &:hover {
        cursor: pointer;
    }
`;

const TimePicker = styled.div`
    width: 178px;
    font-size: 28px;
    height: 40px;
    border-radius: 20px;
    background: #f5f5f5;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    cursor: pointer;
    border: none;
`;

const TimePickerContainer = styled.ul`
    width: 178px;
    height: 124px;
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
`;

const TimeOption = styled.li`
    width: 100%;
    height: 40px;
    cursor: pointer;
    font-size: 24px;
    line-height: 28px;
    color: #7d7d7d;
    &:hover {
        background-color: #633ae2;
        color: #fff;
    }
`;

const Text = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 24px;
    font-weight: 400;
    line-height: normal;
    margin-top: 42px;
    margin: auto;
`;

const Separator = styled.span`
    width: 21px;
    height: 38px;
    font-size: 32px;
    font-weight: 600;
    text-align: center;
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MakeWeekend = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
`;
const WeekendContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    margin-left: 21px;
    justify-content: center;
    margin-top: 8px;
`;
const Weekend = styled.div<{ selected: boolean }>`
    width: 60px;
    height: 60px;
    border-radius: 5px;
    background: ${({ selected }) => (selected ? '#633ae2' : '#d9d9d9')};
    font-size: 32px;
    font-weight: bold;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        cursor: pointer;
        background: #b79fff;
    }
`;

type ProjectTimeProps = {
    startDate: Date | null;
    endDate: Date | null;
    onDateChange?: (startDate: Date | null, endDate: Date | null) => void;
};

const ProjectTime: FC<ProjectTimeProps> = ({ startDate, endDate, onDateChange }) => {
    const [selectedDays, setSelectedDays] = useState<number[]>([]);
    const [isStartOpen, setIsStartOpen] = useState<boolean>(false);
    const [isEndOpen, setIsEndOpen] = useState<boolean>(false);
    const [starttime, setStartTime] = useState('AM 00:00');
    const [endtime, setEndTime] = useState('AM 00:00');
    const startDropdownRef = useRef<HTMLDivElement>(null);
    const endDropdownRef = useRef<HTMLDivElement>(null);

    const Times = [];
    for (let hour = 0; hour < 24; hour++) {
        const ampm = hour < 12 ? 'AM' : 'PM';
        const displayHour = hour === 0 ? 0 : hour > 12 ? hour - 12 : hour;
        for (let minute = 0; minute < 60; minute += 30) {
            const formattedHour = displayHour.toString().padStart(2, '0');
            const formattedMinute = minute.toString().padStart(2, '0');
            const time = `${ampm} ${formattedHour}:${formattedMinute}`;
            Times.push({
                value: `${formattedHour}:${formattedMinute}`,
                label: time,
                hour: formattedHour,
                minute: formattedMinute,
                ampm,
            });
        }
    }

    const toggleWeekend = (dayIndex: number) => {
        if (selectedDays.includes(dayIndex)) {
            setSelectedDays(selectedDays.filter((day) => day !== dayIndex));
        } else {
            setSelectedDays([...selectedDays, dayIndex]);
        }
        onDateChange?.(startDate, endDate);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (startDropdownRef.current && !startDropdownRef.current.contains(event.target as Node) && isStartOpen) {
                setIsStartOpen(false);
            }

            if (endDropdownRef.current && !endDropdownRef.current.contains(event.target as Node) && isEndOpen) {
                setIsEndOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isStartOpen, isEndOpen]);

    const startSelect = () => {
        setIsStartOpen(!isStartOpen);
    };

    const endSelect = () => {
        setIsEndOpen(!isEndOpen);
    };

    return (
        <ProjectTimeContainer>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                <DateContainer style={{ display: 'flex' }}>
                    <Text>프로젝트 시작일</Text>
                    <SDatePicker
                        disabled
                        locale={ko}
                        dateFormat={'YYYY-MM-dd'}
                        selected={startDate}
                        selectsStart
                        onChange={(date: Date) => {
                            onDateChange?.(date, endDate);
                        }}
                        startDate={startDate}
                    />
                </DateContainer>

                <Separator>~</Separator>

                <DateContainer style={{ display: 'flex' }}>
                    <Text>프로젝트 종료일</Text>
                    <SDatePicker
                        disabled
                        locale={ko}
                        dateFormat={'YYYY-MM-dd'}
                        selected={endDate}
                        onChange={(date: Date) => {
                            onDateChange?.(startDate, date);
                        }}
                        selectsEnd
                        endDate={endDate}
                        minDate={startDate}
                    />
                </DateContainer>
            </div>

            <MakeWeekend>
                <Text>생성할 요일</Text>
                <WeekendContainer>
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                        <Weekend
                            key={index}
                            selected={selectedDays.includes(index)}
                            onClick={() => toggleWeekend(index)}
                        >
                            {day}
                        </Weekend>
                    ))}
                </WeekendContainer>
            </MakeWeekend>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: '40px',
                    marginLeft: '10px',
                }}
            >
                <DateContainer style={{ gap: '4px' }}>
                    <Text>시간표 시작시간</Text>
                    <TimePicker style={{ marginTop: '4px' }} onClick={startSelect}>
                        {starttime}
                    </TimePicker>
                    {isStartOpen && (
                        <TimePickerContainer>
                            {Times.map((time, index) => (
                                <TimeOption
                                    key={index}
                                    onClick={() => {
                                        setStartTime(time.label);
                                        setIsStartOpen(false);
                                    }}
                                >
                                    {time.label}
                                </TimeOption>
                            ))}
                        </TimePickerContainer>
                    )}
                </DateContainer>
                <Separator style={{ marginLeft: '28px', marginRight: '28px' }}>~</Separator>

                <DateContainer style={{ gap: '4px' }}>
                    <Text>시간표 종료시간</Text>
                    <TimePicker style={{ marginTop: '4px' }} onClick={endSelect}>
                        {endtime}
                    </TimePicker>
                    {isEndOpen && (
                        <TimePickerContainer>
                            {Times.map((time, index) => (
                                <TimeOption
                                    key={index}
                                    onClick={() => {
                                        setEndTime(time.label);
                                        setIsEndOpen(false);
                                    }}
                                >
                                    {time.label}
                                </TimeOption>
                            ))}
                        </TimePickerContainer>
                    )}
                </DateContainer>
            </div>
        </ProjectTimeContainer>
    );
};

export default ProjectTime;
