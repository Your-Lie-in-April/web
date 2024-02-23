import Calendar from 'react-calendar';
import styled from 'styled-components';
import './calendarcss.css';

export const StyledCalendarWrapper = styled.div`
    width: 390px;
    display: flex;
    justify-content: center;
    position: relative;

    .react-calendar {
        width: 390px;
        padding: 3% 5%;
        background-color: white;
    }

    .react-calendar__tile {
        padding: 8px;
    }

    .react-calendar__weekday {
        color: black;
    }
`;

export const StyledCalendar = styled(Calendar)`
    .react-calendar__tile {
        padding: 10px;
    }
`;
