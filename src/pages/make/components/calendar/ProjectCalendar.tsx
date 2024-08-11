import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import '@styles/calendarcss.css';
import { isWithinInterval } from 'date-fns';
import dayjs from 'dayjs';
import { FC, useState } from 'react';
import Calendar from 'react-calendar';
import { StyledProjectCalendar } from './ProjectCalendar.styles';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type ProjectCalendarProps = {
    startDate: Date | null;
    endDate: Date | null;
    selectRange: boolean;
    onDateChange?: (startDate: Date | null, endDate: Date | null) => void;
};

const ProjectCalendar: FC<ProjectCalendarProps> = ({ startDate, endDate, onDateChange }) => {
    const today = new Date();
    const [date, setDate] = useState<Value>(today);

    const handleDateChange = (newDate: Value) => {
        setDate(newDate);
        if (Array.isArray(newDate)) {
            const [start, end] = newDate;
            onDateChange?.(start, end);
        } else {
            onDateChange?.(newDate, newDate);
        }
    };
    const isWithinRange = (currentDate: Date) => {
        if (startDate && endDate) {
            return isWithinInterval(currentDate, { start: startDate, end: endDate });
        }
        return false;
    };

    const tileContent = ({ date }: { date: Date; view: string }) => {
        const isInRange = isWithinRange(date);
        const isStartDate =
            date.getDate() === startDate?.getDate() && date.getMonth() === startDate?.getMonth();
        const isEndDate =
            date.getDate() === endDate?.getDate() && date.getMonth() === endDate?.getMonth();

        return (
            <>
                {isInRange && <div></div>}
                {isStartDate && <div></div>}
                {isEndDate && <div></div>}
            </>
        );
    };
    return (
        <StyledProjectCalendar style={{ display: 'flex', textAlign: 'center' }}>
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
        </StyledProjectCalendar>
    );
};

export default ProjectCalendar;
