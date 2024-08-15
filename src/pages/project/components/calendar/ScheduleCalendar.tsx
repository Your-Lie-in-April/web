import { DateContext } from '@hooks/context/dateContext';
import { useProjectContext } from '@hooks/context/projectContext';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { FC, useContext, useMemo } from 'react';
import Calendar from 'react-calendar';
import { StyledScheduleCalendar } from './ScheduleCalendar.styles';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const ScheduleCalendar: FC = () => {
    const { selectedDate, setSelectedDate } = useContext(DateContext) || {};
    const { projectData } = useProjectContext();

    const [startDate, endDate] = useMemo(() => {
        if (!selectedDate) return [null, null];

        const selected = dayjs(selectedDate);
        const startOfWeek = selected.startOf('week');
        const endOfWeek = selected.endOf('week');

        return [startOfWeek.toDate(), endOfWeek.toDate()];
    }, [selectedDate]);

    const tileClassName = ({ date, view }: { date: Date; view: string }) => {
        if (view === 'month' && selectedDate) {
            const currentDate = dayjs(date);
            const selected = dayjs(selectedDate);
            const projectStart = dayjs(projectData?.startDate);
            const projectEnd = dayjs(projectData?.endDate);
            const today = dayjs();

            let classes = [];

            const isWithinProjectPeriod =
                currentDate.isSameOrAfter(projectStart, 'day') &&
                (currentDate.isBefore(projectEnd, 'day') ||
                    (currentDate.isSame(projectEnd, 'day') && projectEnd.hour() !== 0));

            classes.push(isWithinProjectPeriod ? 'project-period' : 'out-of-project-period');

            const isOutOfProjectPeriod = !isWithinProjectPeriod;
            const isToday = currentDate.isSame(today, 'day');

            if (isToday && isOutOfProjectPeriod && currentDate.isSame(selected, 'day')) {
                classes.push('today-selected-out-of-project');
            }

            if (startDate && endDate && date >= startDate && date <= endDate) {
                classes.push('highlight');

                const isStartOfWeek = currentDate.day() === 0;
                const isEndOfWeek = currentDate.day() === 6;
                const isProjectStart = currentDate.isSame(projectStart, 'day');
                const isProjectEnd = currentDate.isSame(projectEnd.subtract(1, 'second'), 'day');
                const isStartOfHighlight =
                    date.getTime() === startDate.getTime() || isStartOfWeek || isProjectStart;
                const isEndOfHighlight =
                    date.getTime() === endDate.getTime() || isEndOfWeek || isProjectEnd;

                if (isStartOfHighlight) classes.push('highlight-start');
                if (isEndOfHighlight) classes.push('highlight-end');
            }

            if (currentDate.isSame(selected, 'day')) {
                classes.push('selected-date');
            }

            return classes.join(' ');
        }

        return null;
    };

    const handleDateChange = (date: Value) => {
        if (date instanceof Date && setSelectedDate) {
            const selectedDate = dayjs(date);
            const projectStart = dayjs(projectData?.startDate);
            const projectEnd = dayjs(projectData?.endDate);

            if (
                selectedDate.isSameOrAfter(projectStart, 'day') &&
                selectedDate.isSameOrBefore(projectEnd, 'day')
            ) {
                setSelectedDate(date.toISOString());
            }
        }
    };

    return (
        <StyledScheduleCalendar>
            <Calendar
                value={selectedDate}
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
                maxDetail='month'
                tileClassName={tileClassName}
                calendarType='gregory'
                prevLabel={
                    <ArrowLeftIcon sx={{ fill: '#D9D9D9', width: '22px', height: '22px' }} />
                }
                nextLabel={
                    <ArrowRightIcon sx={{ fill: '#D9D9D9', width: '22px', height: '22px' }} />
                }
            />
        </StyledScheduleCalendar>
    );
};
export default ScheduleCalendar;
