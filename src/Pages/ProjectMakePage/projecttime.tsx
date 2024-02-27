import React, { FC, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import styled from 'styled-components';
import { ko } from 'date-fns/locale/ko';
import '/src/styles/projecttime.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import ProjectCalendar from './projectcalendar';

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

const STimePickerContainer = styled(DemoContainer)`
    margin-top: 12px;
    font-size: 28px;
    font-weight: 400;
    background: #f5f5f5;
    text-align: center;
    margin: auto;
    position: relative;
`;

const STimePicker = styled(TimePicker)`
    background: #f5f5f5;
    width: 166px;
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

    &: hover {
        cursor: pointer;
        background: #b79fff;
    }
`;

const ProjectTime: FC = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedDays, setSelectedDays] = useState<number[]>([]);

    const toggleWeekend = (dayIndex: number) => {
        if (selectedDays.includes(dayIndex)) {
            setSelectedDays(selectedDays.filter((day) => day !== dayIndex));
        } else {
            setSelectedDays([...selectedDays, dayIndex]);
        }
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
                        onChange={(date: Date) => setStartDate(date)}
                        startDate={startDate}
                        onFocus={(e) => e.target.blur()}
                    />
                </DateContainer>

                <Separator>~</Separator>

                <DateContainer>
                    <Text>프로젝트 종료일</Text>
                    <SDatePicker
                        locale={ko}
                        dateFormat={'YYYY-MM-dd'}
                        selected={endDate}
                        onChange={(date: Date) => setEndDate(date)}
                        selectsEnd
                        endDate={endDate}
                        minDate={startDate}
                        onFocus={(e) => e.target.blur()}
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
                    marginTop: '42px',
                }}
            >
                <DateContainer>
                    <Text>시간표 시작시간</Text>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <STimePickerContainer components={['TimePicker']}>
                            <STimePicker />
                        </STimePickerContainer>
                    </LocalizationProvider>
                </DateContainer>

                <Separator>~</Separator>

                <DateContainer>
                    <Text>시간표 종료시간</Text>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <STimePickerContainer components={['TimePicker']}>
                            <STimePicker />
                        </STimePickerContainer>
                    </LocalizationProvider>
                </DateContainer>
            </div>
        </ProjectTimeContainer>
    );
};

export default ProjectTime;
