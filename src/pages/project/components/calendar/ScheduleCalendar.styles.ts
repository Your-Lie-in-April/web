import styled from 'styled-components';

export const StyledProjectCalendar = styled.div`
    // 날짜 범위 시작일의 테두리 반경을 없앰
    .react-calendar__tile--rangeStart {
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
        border-top-left-radius: 0px !important;
        border-bottom-left-radius: 0px !important;
    }

    // 오늘 날짜 스타일 투명
    .react-calendar__tile--now {
        background: transparent;
        border-radius: 0;
    }

    // 선택한 주차의 색 입히기
    .highlight {
        background-color: #b79fff;
        color: #ffffff !important;
        font-size: 24px;
        border-radius: 0;
        border: none;
    }

    // 선택 날짜 스타일
    .selected-date {
        position: relative;
        background-color: transparent !important;
        color: #ffffff !important;
        z-index: 1;
    }

    .selected-date::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #b79fff;
        z-index: -2;
    }

    .selected-date::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        background-color: #633ae2;
        border-radius: 5px;
        z-index: -1;
    }

    .selected-date.highlight.start-of-week::after,
    .selected-date.highlight.end-of-week::after {
        border-radius: 5px;
    }

    .highlight.start-of-week::before {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    .highlight.end-of-week::before {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    // 비선택한 날짜 스타일
    .react-calendar__tile--active:not(.selected-date) {
        background: #633ae2;
        color: #ffffff;
        border: none;
        outline: none;
        cursor: pointer;
        border-radius: 0;
    }

    // 날짜칸 스타일
    .react-calendar__tile {
        font-size: 24px;
        color: #000000;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        padding: 3px;
        outline: none;
        max-width: 100%;
    }

    // 전체적 캘린더 틀
    .react-calendar {
        width: 290px;
        height: 290px;
        border-radius: 10px;
        background: #fbfbfb;
        box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
        font-family: 'Pretendard';
        font-weight: 700;
        color: #000000;
        line-height: normal;
        padding: 3px;
        box-sizing: border-box;
    }

    // 요일 스타일
    .react-calendar__month-view__weekdays {
        text-align: center;
        text-transform: uppercase;
        font: inherit;
        font-size: 28px;
        color: #000000;
        font-weight: 700;
        gap: 2px;
        width: 272px;
        height: 30px;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
    }

    // 요일 칸 스타일
    .react-calendar__month-view__weekdays__weekday {
        border-radius: 5px;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    // 네비게이션
    .react-calendar__navigation {
        display: flex;
        margin-bottom: 0;
        align-items: center;
    }

    .react-calendar__navigation button {
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        border: none;
        cursor: pointer;
        outline: none;
    }

    // 월 선택 부분 스타일
    .react-calendar__year-view__months__month {
        border-radius: 10px;
        padding: 0px;
        height: 60px;
        font-size: 22px;
        background-color: transparent;
        color: #000000;
    }

    .highlight.start-of-week {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    .highlight.end-of-week {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    // 달력의 날짜 그리드 형식
    .react-calendar__month-view__days {
        height: 204px;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-auto-rows: 1fr;
    }

    .react-calendar__tile:focus {
        outline: none;
    }

    // 월에서 날짜 선택 호버시
    .react-calendar__tile:hover {
        cursor: pointer;
        background-color: inherit;
        color: inherit;
    }

    // 선택한 날짜 스타일
    .react-calendar__tile.react-calendar__tile--active {
        background: transparent;
        color: #ffffff;
        border: none;
        outline: none;
        cursor: pointer;
        border-radius: 5px;
        position: relative;
    }

    .react-calendar__tile.react-calendar__tile--active.highlight {
        background: transparent;
        color: #ffffff;
        border-radius: 0;
    }

    .react-calendar__navigation__prev2-button,
    .react-calendar__navigation__next2-button {
        display: none;
    }

    .react-calendar__navigation__prev-button,
    .react-calendar__navigation__next-button {
        color: #d9d9d9;
        width: 22px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .react-calendar__navigation__label {
        font-size: 32px;
        font-weight: 700;
        color: #000000;
        cursor: default !important;
    }

    .react-calendar__navigation__label__labelText {
        font-size: 28px;
        font-weight: 700;
        color: #000000;
        cursor: default !important;
    }

    // 프로젝트 기간 내 날짜 스타일
    .project-period {
        color: #000000;
        cursor: pointer;
    }

    // 프로젝트 기간 외 날짜 스타일
    .out-of-project-period {
        color: #d9d9d9;
        cursor: default;
        pointer-events: none;
    }

    .highlight.project-period,
    .highlight.out-of-project-period {
        color: #ffffff !important;
    }

    // 일반적인 타일 호버 스타일
    .react-calendar__tile:not(.highlight):hover {
        cursor: pointer;
        background-color: inherit;
        color: inherit;
    }

    // 하이라이트된 타일 호버 스타일
    .highlight:hover {
        cursor: pointer;
        background-color: #b79fff;
        color: #ffffff;
        border-radius: 0 !important;
    }

    .highlight.start-of-week:hover {
        border-top-left-radius: 5px !important;
        border-bottom-left-radius: 5px !important;
    }

    .highlight.end-of-week:hover {
        border-top-right-radius: 5px !important;
        border-bottom-right-radius: 5px !important;
    }
`;
