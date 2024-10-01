import { DateContext } from '@hooks/context/dateContext';
import { useProjectContext } from '@hooks/context/projectContext';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { FC, useContext, useMemo } from 'react';
import Calendar from 'react-calendar';
import { StyledScheduleCalendar } from '../../styles/ScheduleCalendar.styles';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const ScheduleCalendar: FC = () => {
    const { selectedDate, setSelectedDate } = useContext(DateContext) || {};
    const { projectData } = useProjectContext();

    function formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const [startDate, endDate] = useMemo(() => {
        if (!selectedDate) return [null, null];
        const selected = dayjs(selectedDate);
        const startOfWeek = selected.startOf('week');
        const endOfWeek = selected.endOf('week');
        return [startOfWeek.toDate(), endOfWeek.toDate()];
    }, [selectedDate]);

    const projectEnd = useMemo(() => {
        if (!projectData?.endDate) return null;
        const endDate = dayjs(projectData.endDate);
        const endTime = projectData.endTime;
        if (endTime) {
            const [hours, minutes, seconds] = endTime.toString().split(':').map(Number);
            if (hours === 0 && minutes === 0 && seconds === 0) {
                return endDate.subtract(1, 'day').startOf('day');
            }
        }
        return endDate.startOf('day');
    }, [projectData?.endDate, projectData?.endTime]);

    const tileClassName = ({ date, view }: { date: Date; view: string }) => {
        if (view === 'month' && selectedDate) {
            const currentDate = dayjs(date).tz().startOf('day');
            const selected = dayjs(selectedDate).tz().startOf('day');
            const projectStart = projectData?.startDate;
            const today = dayjs(formatDate(new Date())).startOf('day');

            const classes = [];

            const isWithinProjectPeriod =
                projectStart &&
                projectEnd &&
                currentDate.isSameOrAfter(projectStart, 'day') &&
                currentDate.isSameOrBefore(projectEnd, 'day');

            classes.push(isWithinProjectPeriod ? 'project-period' : 'out-of-project-period');

            const isOutOfProjectPeriod = !isWithinProjectPeriod;
            const isToday = currentDate.isSame(today, 'day');

            if (currentDate.isSame(selected, 'day')) {
                classes.push('selected-date');
            }

            if (isToday && isOutOfProjectPeriod && currentDate.isSame(selected, 'day')) {
                classes.push('today-selected-out-of-project');
            }

            if (startDate && endDate) {
                const startOfWeek = dayjs(startDate).tz().startOf('day');
                const endOfWeek = dayjs(endDate).tz().startOf('day');

                if (
                    currentDate.isSameOrAfter(startOfWeek, 'day') &&
                    currentDate.isSameOrBefore(endOfWeek, 'day')
                ) {
                    classes.push('highlight');

                    const isStartOfWeek = currentDate.day() === 0;
                    const isEndOfWeek = currentDate.day() === 6;
                    const isProjectStart = currentDate.isSame(projectStart, 'day');
                    const isProjectEnd = currentDate.isSame(projectEnd, 'day');
                    const isStartOfHighlight =
                        currentDate.isSame(startOfWeek, 'day') || isStartOfWeek || isProjectStart;
                    const isEndOfHighlight =
                        currentDate.isSame(endOfWeek, 'day') || isEndOfWeek || isProjectEnd;

                    if (isStartOfHighlight) classes.push('highlight-start');
                    if (isEndOfHighlight) classes.push('highlight-end');
                }
            }

            return classes.join(' ');
        }

        return null;
    };

    const handleDateChange = (date: Value) => {
        if (date instanceof Date && setSelectedDate) {
            const selectedDate = dayjs(date).tz();
            const projectStart = projectData?.startDate ? dayjs(projectData.startDate) : null;

            if (
                projectStart &&
                projectEnd &&
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
