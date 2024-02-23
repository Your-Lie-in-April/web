import Calendar from 'react-calendar';
import styled from 'styled-components';
import './calendarcss.css';

export const StyledCalendarWrapper = styled.div`
    width: 390px;
    display: flex;
    justify-content: center;
    position: relative;
    font-size: 32px;

    .react-calendar__tile {
        padding: 8px;
    }
    .react-calendar__month-view__weekdays__weekday span,
    .react-calendar__month-view__days__day span {
        letter-spacing: 2px;
        display: inline-block;
    }
`;

export const StyledCalendar = styled(Calendar)``;
