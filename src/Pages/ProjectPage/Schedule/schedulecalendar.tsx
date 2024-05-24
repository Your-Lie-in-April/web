import React, { FC, useContext } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import '/src/styles/calendarcss.css';
import { ProjectContext } from '#/hooks/context/projectContext';
import { DateContext } from '#/hooks/context/dateContext';

const StyledCalendarDiv = styled.div`
    .react-calendar__tile {
        padding: 3px;
        font-size: 24px;
    }
    &--active {
        background-color: inherit;
        border-radius: 0;
    }
    .react-calendar {
        width: 290px;
        height: 294px;
        border-radius: 10px;
        background: #fbfbfb;
        box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
        font-family: Arial, Helvetica, sans-serif;
        line-height: normal;
    }
    .react-calendar__month-view__weekdays {
        text-align: center;
        text-transform: uppercase;
        font: inherit;
        font-size: 28px;
        font-weight: bold;
        gap: 2px;
        width: 278px;
    }
    .react-calendar__navigation {
        display: flex;
        height: 20px;
        margin-bottom: 1em;
    }
    .highlight {
        background-color: #b79fff;
        color: #ffffff;
        border-radius: 0;
        border: none;
    }
`;

const StyledCalendarWrapper = styled.div`
    width: 290px;
    height: auto;
    display: flex;
    position: relative;
    font-size: 32px;
`;

const StyledCalendar = styled(Calendar)`
    .react-calendar__tile--active {
        background-color: inherit;
        border-radius: 0;
        border: none;
    }
`;

const ScheduleCalendar: FC = () => {
    const { projectData } = useContext(ProjectContext);
    const startDate = projectData?.startDate
        ? new Date(projectData.startDate)
        : null;
    const endDate = projectData?.endDate ? new Date(projectData.endDate) : null;

    const { selectedDate, setSelectedDate } = useContext(DateContext) || {};

    const tileClassName = ({ date }: { date: Date }) => {
        if (startDate && endDate) {
            if (date >= startDate && date <= endDate) {
                return 'highlight';
            }
        }
        return null;
    };

    const handleDateChange = (date: Date | Date[] | null) => {
        if (date instanceof Date && setSelectedDate) {
            setSelectedDate(date.toISOString());
        }
    };

    return (
        <StyledCalendarDiv style={{ width: '20px' }}>
            <StyledCalendarWrapper
                style={{ display: 'flex', textAlign: 'center' }}
            >
                <StyledCalendar
                    value={selectedDate}
                    onChange={handleDateChange}
                    formatDay={(locale, date) => dayjs(date).format('D')}
                    formatYear={(locale, date) => dayjs(date).format('YYYY')}
                    formatMonthYear={(locale, date) =>
                        dayjs(date).format('YYYY. MM')
                    }
                    formatShortWeekday={(locale, date) =>
                        ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]
                    }
                    showNeighboringMonth={false}
                    next2Label={null}
                    prev2Label={null}
                    minDetail="year"
                    selectRange={false}
                    tileClassName={tileClassName}
                    calendarType="US"
                />
            </StyledCalendarWrapper>
        </StyledCalendarDiv>
    );
};

export default ScheduleCalendar;
