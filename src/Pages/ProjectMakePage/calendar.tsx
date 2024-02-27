import Calendar from 'react-calendar';
import styled from 'styled-components';
import '/src/styles/calendarcss.css';

export const StyledCalendarWrapper = styled.div`
    width: 390px;
    display: flex;
    justify-content: center;
    position: relative;
    display: flex;
    font-size: 32px;

    .react-calendar__tile {
        padding: 8px;
    }
`;

export const StyledCalendar = styled(Calendar)``;
