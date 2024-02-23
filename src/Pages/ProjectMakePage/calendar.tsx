import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

export const StyledCalendarWrapper = styled.div`
    width: 390px;
    display: flex;
    justify-content: center;
    position: relative;
    .react-calendar {
        width: 390px;
        border: none;
        border-radius: 0.5rem;
        box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
        padding: 3% 5%;
        background-color: white;
    }

    .react-calendar__month-view {
        abbr {
            color: ${(props) => props.theme.gray_1};
        }
    }

    .react-calendar__navigation {
        justify-content: center;
    }

    .react-calendar__navigation button {
        font-weight: 800;
        font-size: 1rem;
    }

    .react-calendar__navigation button:focus {
        background-color: white;
    }

    .react-calendar__navigation button:disabled {
        background-color: white;
        color: ${(props) => props.theme.darkBlack};
    }

    .react-calendar__navigation__label {
        flex-grow: 0 !important;
    }

    .react-calendar__month-view__weekdays abbr {
        text-decoration: none;
        font-weight: 800;
    }

    .react-calendar__month-view__weekdays__weekday--weekend abbr[title='일요일'] {
        color: ${(props) => props.theme.red_1};
    }

    .react-calendar__year-view__months__month {
        border-radius: 0.8rem;
        background-color: ${(props) => props.theme.gray_5};
        padding: 0;
    }

    .react-calendar__tile--hasActive {
        background-color: ${(props) => props.theme.primary_2};
        abbr {
            color: white;
        }
    }

    /* 일 날짜 간격 */
    .react-calendar__tile {
        padding: 5px 0px 18px;
        position: relative;
    }

    /* 네비게이션 월 스타일 적용 */
    .react-calendar__year-view__months__month {
        flex: 0 0 calc(33.3333% - 10px) !important;
        margin-inline-start: 5px !important;
        margin-inline-end: 5px !important;
        margin-block-end: 10px;
        padding: 20px 6.6667px;
        font-size: 0.9rem;
        font-weight: 600;
        color: ${(props) => props.theme.gray_1};
    }

    /* 선택한 날짜 스타일 적용 */
    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus,
    .react-calendar__tile--active {
        background-color: ${(props) => props.theme.yellow_2};
        border-radius: 0.3rem;
    }
`;
export const StyledCalendar = styled(Calendar)``;
