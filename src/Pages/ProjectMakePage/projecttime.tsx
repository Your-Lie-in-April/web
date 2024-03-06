import React, { FC, useState, useRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import styled from 'styled-components';
import { ko } from 'date-fns/locale/ko';
import '/src/styles/projecttime.css';

const ProjectTimeContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 600px;
    background: #fff;
`;

const DateContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 20px;
`;

const SDatePicker = styled(ReactDatePicker)`
    margin-top: 12px;
    width: 166px;
    padding: 4px;
    font-size: 28px;
    font-weight: 400;
    border-radius: 20px;
    background: #f5f5f5;
    text-align: center;
    margin: auto;

    &:hover {
        cursor: pointer;
    }
`;

const TimePicker = styled.div`
    margin-top: 12px;
    width: 178px;
    font-size: 28px;
    font-weight: 400;
    border-radius: 20px;
    background: #f5f5f5;
    text-align: center;
    margin: auto;

    &:hover {
        cursor: pointer;
    }
`;

const DropdownContainer = styled.div`
    position: absolute;
    top: calc(80%);
    width: auto;
    display: flex;
    flex-direction: row;
    background: #d7d7d7;
    border: 1px solid #ccc;
    z-index: 5;
`;

const DropdownItem = styled.select`
    margin: 3px;
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
    margin-top: 40px;
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
    const [starttime, setStartTime] = useState({ hour: '12', minute: '00', ampm: 'AM' });
    const [endtime, setEndTime] = useState({ hour: '12', minute: '00', ampm: 'AM' });

    const toggleWeekend = (dayIndex: number) => {
        if (selectedDays.includes(dayIndex)) {
            setSelectedDays(selectedDays.filter((day) => day !== dayIndex));
        } else {
            setSelectedDays([...selectedDays, dayIndex]);
        }
        onDateChange?.(startDate, endDate);
    };

    const hourRef = useRef<HTMLSelectElement>(null);
    const minuteRef = useRef<HTMLSelectElement>(null);
    const ampmRef = useRef<HTMLSelectElement>(null);

    const startDropdown = () => setIsStartOpen((prevIsOpen) => !prevIsOpen);
    const endDropdown = () => setIsEndOpen((prevIsOpen) => !prevIsOpen);

    const updateTime = () => {
        setStartTime({
            hour: hourRef.current?.value ?? starttime.hour,
            minute: minuteRef.current?.value ?? starttime.minute,
            ampm: ampmRef.current?.value ?? starttime.ampm,
        });
        setEndTime({
            hour: hourRef.current?.value ?? endtime.hour,
            minute: minuteRef.current?.value ?? endtime.minute,
            ampm: ampmRef.current?.value ?? endtime.ampm,
        });
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
                <DateContainer>
                    <Text>프로젝트 시작일</Text>
                    <SDatePicker
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

                <DateContainer>
                    <Text>프로젝트 종료일</Text>
                    <SDatePicker
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
                <DateContainer>
                    <Text>시간표 시작시간</Text>
                    <TimePicker
                        onClick={startDropdown}
                    >{`${starttime.hour}:${starttime.minute} ${starttime.ampm}`}</TimePicker>
                    {isStartOpen && (
                        <DropdownContainer>
                            <DropdownItem ref={hourRef} defaultValue={starttime.hour} onChange={updateTime}>
                                {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                                    <option key={hour} value={hour}>
                                        {hour}
                                    </option>
                                ))}
                            </DropdownItem>
                            <DropdownItem ref={minuteRef} defaultValue={starttime.minute} onChange={updateTime}>
                                <option value="00">00</option>
                                <option value="30">30</option>
                            </DropdownItem>
                            <DropdownItem ref={ampmRef} defaultValue={starttime.ampm} onChange={updateTime}>
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </DropdownItem>
                        </DropdownContainer>
                    )}
                </DateContainer>

                <Separator style={{ marginLeft: '28px', marginRight: '28px' }}>~</Separator>

                <DateContainer>
                    <Text>시간표 종료시간</Text>
                    <TimePicker onClick={endDropdown}>{`${endtime.hour}:${endtime.minute} ${endtime.ampm}`}</TimePicker>
                    {isEndOpen && (
                        <DropdownContainer>
                            <DropdownItem ref={hourRef} defaultValue={endtime.hour} onChange={updateTime}>
                                {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                                    <option key={hour} value={hour}>
                                        {hour}
                                    </option>
                                ))}
                            </DropdownItem>
                            <DropdownItem ref={minuteRef} defaultValue={endtime.minute} onChange={updateTime}>
                                <option value="00">00</option>
                                <option value="30">30</option>
                            </DropdownItem>
                            <DropdownItem ref={ampmRef} defaultValue={endtime.ampm} onChange={updateTime}>
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </DropdownItem>
                        </DropdownContainer>
                    )}
                </DateContainer>
            </div>
        </ProjectTimeContainer>
    );
};

export default ProjectTime;
