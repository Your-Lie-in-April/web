import { FC, useState } from 'react';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import locale from 'react-day-picker';
import { DayPicker } from 'react-day-picker';
import styled from 'styled-components';
import { ko } from 'date-fns/locale';
import { StyledCalendar, StyledCalendarWrapper } from './calendar.tsx';
import React from 'react';

const Weekday = styled.div`
    width: 52px;
    height: 40px;
    border-radius: 8px;
    background-color: #633ae2;
    color: #ffffff;
    font-size: 32px;
    font-weight: 700;
    margin-right: 2px;
    margin-bottom: 2px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const SelectTime: FC = () => {
    const today = new Date();
    const [date, setDate] = useState<Value>(today);
    const [activeStartDate, setActiveStartDate] = useState<Date | null>(new Date());
    const attendDay = ['2023-12-03', '2023-12-13']; // 출석한 날짜 예시
    const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const handleDateChange = (newDate: Value) => {
        setDate(newDate);
    };

    return (
        <StyledCalendarWrapper style={{ display: 'flex', textAlign: 'center' }}>
            <StyledCalendar
                value={date}
                onChange={handleDateChange}
                formatDay={(locale, date) => dayjs(date).format('DD')}
                formatYear={(locale, date) => dayjs(date).format('YYYY')}
                formatMonthYear={(locale, date) => dayjs(date).format('YYYY. MM')}
                showNeighboringMonth={false}
                next2Label={null}
                prev2Label={null}
                minDetail="year"
            />
        </StyledCalendarWrapper>
    );
};

export default SelectTime;