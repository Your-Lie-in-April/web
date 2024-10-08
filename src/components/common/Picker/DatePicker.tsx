import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useAppDispatch, useAppSelector } from '@redux/config/hook';
import { RootState } from '@redux/config/store';
import { setEndDate, setStartDate } from '@redux/slice/edit';
import '@styles/calendarcss.css';
import { StyledDatePicker } from '@styles/DatePicker.styles';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';

dayjs.extend(utc);
dayjs.extend(timezone);

type Value = Date | [Date | null, Date | null] | null;

const DatePicker = () => {
    const dispatch = useAppDispatch();
    const { startDate: startDateString, endDate: endDateString } = useAppSelector(
        (state: RootState) => state.edit
    );
    const { isEdit } = useAppSelector((state: RootState) => state.mode);

    const [date, setDate] = useState<Value>(new Date());

    useEffect(() => {
        if (isEdit && startDateString && endDateString) {
            setDate([new Date(startDateString), new Date(endDateString)]);
        }
    }, [isEdit, startDateString, endDateString]);

    const handleDateChange = (newDate: Value) => {
        setDate(newDate);
        if (Array.isArray(newDate) && newDate[0] && newDate[1]) {
            const startDate = dayjs(newDate[0]).tz('Asia/Seoul').format('YYYY-MM-DDTHH:mm:ss');
            const endDate = dayjs(newDate[1]).tz('Asia/Seoul').format('YYYY-MM-DDTHH:mm:ss');
            dispatch(setStartDate(startDate));
            dispatch(setEndDate(endDate));
        } else if (newDate instanceof Date) {
            const selectedDate = dayjs(newDate).tz('Asia/Seoul').format('YYYY-MM-DDTHH:mm:ss');
            dispatch(setStartDate(selectedDate));
            dispatch(setEndDate(selectedDate));
        }
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
