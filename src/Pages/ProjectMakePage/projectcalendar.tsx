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
    display: flex;
    font-size: 32px;

    .react-calendar__tile {
        padding: 8px;
    }
`;
const StyledCalendar = styled(Calendar)``;

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type ProjectCalendarProps = {
    startDate: Date | null;
    endDate: Date | null;
};

const ProjectCalendar: FC<ProjectCalendarProps> = ({ startDate, endDate }) => {
    const today = new Date();
    const [date, setDate] = useState<Value>(today);

    const handleDateChange = (newDate: Value) => {
        setDate(newDate);
    };
    const isWithinRange = (currentDate: Date) => {
        if (startDate && endDate) {
            return isWithinInterval(currentDate, { start: startDate, end: endDate });
        }
        return false;
    };

    const tileContent = ({ date, view }: { date: Date; view: string }) => {
        if (view === 'month' && isWithinRange(date)) {
            return <div style={{ background: '#B79FFF', borderRadius: '50%', height: '100%', width: '100%' }}></div>;
        }
        return null;
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
                selectRange={true}
                // tileContent={tileContent}
            />
        </StyledCalendarWrapper>
    );
};

export default ProjectCalendar;
