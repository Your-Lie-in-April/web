import { FC, useState } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import { isWithinInterval } from 'date-fns';
import '/src/styles/calendarcss.css';

const StyledCalendarWrapper = styled.div`
    width: 390px;
    height: auto;
    display: flex;
    justify-content: center;
    position: relative;
    font-size: 32px;

    &--active {
        background-color: inherit;
        border-radius: 0;
    }
`;

const StyledCalendar = styled(Calendar)``;

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type ScheduleCalendarProps = {
    startDate: Date | null;
    endDate: Date | null;
    selectRange: boolean;
    onDateChange?: (startDate: Date | null, endDate: Date | null) => void;
};

const ScheduleCalendar: FC<ScheduleCalendarProps> = ({ startDate, endDate, onDateChange }) => {
    const today = new Date();
    const [date, setDate] = useState<Value>(today);

    const handleDateChange = (newDate: Value) => {
        if (Array.isArray(newDate) && newDate[0]) {
            const start = new Date(newDate[0]);
            const end = new Date(start);
            end.setDate(end.getDate() + 7);
            setDate([start, end]);
            onDateChange?.(start, end);
        } else if (newDate instanceof Date) {
            const start = new Date(newDate);
            const end = new Date(start);
            end.setDate(end.getDate() + 7);
            setDate([start, end]);
            onDateChange?.(start, end);
        }
    };

    const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
        if (view === 'month') {
            if (startDate) {
                const maxDate = new Date(startDate);
                maxDate.setDate(maxDate.getDate() + 7);
                return date > maxDate;
            }
        }
        return false;
    };

    const isWithinRange = (currentDate: Date) => {
        if (startDate && endDate) {
            return isWithinInterval(currentDate, { start: startDate, end: endDate });
        }
        return false;
    };

    const tileContent = ({ date }: { date: Date; view: string }) => {
        const isInRange = isWithinRange(date);
        const isStartDate = date.getDate() === startDate?.getDate() && date.getMonth() === startDate?.getMonth();
        const isEndDate = date.getDate() === endDate?.getDate() && date.getMonth() === endDate?.getMonth();

        return (
            <>
                {isInRange && <div></div>}
                {isStartDate && <div></div>}
                {isEndDate && <div></div>}
            </>
        );
    };

    return (
        <StyledCalendarWrapper style={{ display: 'flex', textAlign: 'center' }}>
            <StyledCalendar
                value={date}
                onChange={handleDateChange}
                formatDay={(locale, date) => dayjs(date).format('D')}
                formatYear={(locale, date) => dayjs(date).format('YYYY')}
                formatMonthYear={(locale, date) => dayjs(date).format('YYYY. MM')}
                showNeighboringMonth={false}
                next2Label={null}
                prev2Label={null}
                minDetail="year"
                selectRange={false}
                tileDisabled={tileDisabled}
            />
        </StyledCalendarWrapper>
    );
};

export default ScheduleCalendar;
