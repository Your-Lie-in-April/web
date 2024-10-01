import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useAppDispatch, useAppSelector } from '@redux/config/hook';
import { RootState } from '@redux/config/store';
import { setEndDate, setStartDate } from '@redux/reducers/edit';
import '@styles/calendarcss.css';
import { StyledDatePicker } from '@styles/DatePicker.styles';
import { isWithinInterval } from 'date-fns';
import dayjs from 'dayjs';
import { useState } from 'react';
import Calendar from 'react-calendar';

type Value = Date | [Date | null, Date | null] | null;

const DatePicker = () => {
    const dispatch = useAppDispatch();
    const { startDate: startDateString, endDate: endDateString } = useAppSelector(
        (state: RootState) => state.edit
    );

    const startDate = startDateString ? new Date(startDateString) : new Date();
    const endDate = endDateString ? new Date(endDateString) : new Date();

    const [date, setDate] = useState<Value>(new Date());

    const handleDateChange = (newDate: Value) => {
        setDate(newDate);
        if (Array.isArray(newDate) && newDate[0] && newDate[1]) {
            dispatch(setStartDate(newDate[0].toISOString()));
            dispatch(setEndDate(newDate[1].toISOString()));
        } else if (newDate instanceof Date) {
            dispatch(setStartDate(newDate.toISOString()));
            dispatch(setEndDate(newDate.toISOString()));
        }
    };

    const isWithinRange = (currentDate: Date) => {
        if (startDate && endDate)
            return isWithinInterval(currentDate, { start: startDate, end: endDate });
        return false;
    };

    const tileContent = ({ date }: { date: Date; view: string }) => {
        const isInRange = isWithinRange(date);
        const isStartDate = date.toDateString() === startDate.toDateString();
        const isEndDate = date.toDateString() === endDate.toDateString();

        return (
            <>
                {isInRange && <div></div>}
                {isStartDate && <div></div>}
                {isEndDate && <div></div>}
            </>
        );
    };
    return (
        <StyledDatePicker style={{ display: 'flex', textAlign: 'center' }}>
            <Calendar
                value={date}
                onChange={handleDateChange}
                formatDay={(locale, date) => dayjs(date).format('D')}
                formatYear={(locale, date) => dayjs(date).format('YYYY')}
                formatMonthYear={(locale, date) => dayjs(date).format('MM')}
                formatShortWeekday={(locale, date) =>
                    ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]
                }
                showNeighboringMonth={false}
                next2Label={null}
                prev2Label={null}
                minDetail='month'
                calendarType='gregory'
                selectRange={true}
                tileContent={tileContent}
                prevLabel={
                    <ArrowLeftIcon sx={{ fill: '#D9D9D9', width: '36px', height: '36px' }} />
                }
                nextLabel={
                    <ArrowRightIcon sx={{ fill: '#D9D9D9', width: '36px', height: '36px' }} />
                }
            />
        </StyledDatePicker>
    );
};
export default DatePicker;
