import { FC, useState } from 'react';
import { format } from 'date-fns';
import dayjs, { locale } from 'dayjs';
import { DayPicker } from 'react-day-picker';
import styled from 'styled-components';
import { ko } from 'date-fns/locale';
import { StyledCalendar, StyledCalendarWrapper } from './calendar.tsx';
import React from 'react';
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const SelectTime: FC = () => {
    const today = new Date();
    const [date, setDate] = useState<Value>(today);
    const [activeStartDate, setActiveStartDate] = useState<Date | null>(new Date());
    const attendDay = ['2023-12-03', '2023-12-13']; // 출석한 날짜 예시

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
                calendarType="gregory"
                showNeighboringMonth={false}
                next2Label={null}
                prev2Label={null}
                minDetail="year"
            />
        </StyledCalendarWrapper>
    );
};

export default SelectTime;
