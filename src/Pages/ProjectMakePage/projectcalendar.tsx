import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { isWithinInterval } from 'date-fns';
import dayjs from 'dayjs';
import { FC, useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import '/src/styles/calendarcss.css';

const StyledCalendarWrapper = styled.div`
  // 전체적 캘린더 틀
  .react-calendar {
    width: 390px;
    height: 390px;
    border-radius: 10px;
    background: #fbfbfb;
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
    font-family: Pretendard;
    color: #000000;
    line-height: normal;
    padding: 7px;
    box-sizing: border-box;
  }

  &--active {
    background-color: inherit;
    border-radius: 0;
  }

  // 오늘 날짜 스타일
  .react-calendar__tile--now {
    background: transparent;
    border-radius: 0;
  }

  // 요일 스타일
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font: inherit;
    font-size: 32px;
    color: #ffffff;
    font-weight: 600;
    gap: 2px;
    width: 364px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
  }

  // 요일 스타일
  .react-calendar__month-view__weekdays__weekday {
    border-radius: 5px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  // 날짜칸 스타일
  .react-calendar__tile {
    font-size: 32px;
    font-weight: 700;
    color: #000000;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 0;
    outline: none;
    max-width: 100%;
    margin: 2px 0;
  }

  // 네비게이션
  .react-calendar__navigation {
    display: flex;
    margin-bottom: 9px;
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

  .react-calendar__month-view__days {
    height: 276px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: 1fr;
  }

  .react-calendar__tile:focus {
    outline: none;
  }

  // 월에서 날짜 선택 호버시
  .react-calendar__tile:hover {
    background-color: #633ae2;
    color: #ffffff;
    cursor: pointer;
    border-radius: 5px;
  }

  // 달력에서 월 선택 호버시
  .react-calendar__year-view__months__month:hover {
    background-color: transparent;
    color: #000000;
  }

  // 월 선택 부분 스타일
  .react-calendar__year-view__months__month {
    border-radius: 10px;
    padding: 0px;
    height: 80px;
    font-size: 32px;
    background-color: transparent;
    color: #000000;
  }

  .react-calendar__year-view__months__month--active {
    border: none;
    outline: none;
    color: #000000;
  }

  // 선택한 날짜 스타일
  .react-calendar__tile.react-calendar__tile--active {
    background: #fbfbfb;
    color: #ffffff;
    border: none;
    outline: none;
    cursor: pointer;
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
  }

  .react-calendar__navigation__label__labelText {
    font-size: 32px;
    font-weight: 700;
    color: #000000;
    padding: 0;
  }

  .react-calendar__tile--rangeStart {
    border-top-left-radius: 5px !important;
    border-bottom-left-radius: 5px !important;
  }

  .react-calendar__tile--rangeEnd {
    border-top-right-radius: 5px !important;
    border-bottom-right-radius: 5px !important;
  }
`;
const StyledCalendar = styled(Calendar)``;

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type ProjectCalendarProps = {
  startDate: Date | null;
  endDate: Date | null;
  selectRange: boolean;
  onDateChange?: (startDate: Date | null, endDate: Date | null) => void;
};

const ProjectCalendar: FC<ProjectCalendarProps> = ({
  startDate,
  endDate,
  onDateChange,
}) => {
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
      date.getDate() === startDate?.getDate() &&
      date.getMonth() === startDate?.getMonth();
    const isEndDate =
      date.getDate() === endDate?.getDate() &&
      date.getMonth() === endDate?.getMonth();

    return (
      <>
        {isInRange && <div></div>}
        {isStartDate && <div></div>}
        {isEndDate && <div></div>}
      </>
    );
  };
  return (
    <StyledCalendarWrapper style={{ display: 'flex', textAlign: 'center' }}>
      <StyledCalendar
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
        minDetail='year'
        calendarType='gregory'
        selectRange={true}
        tileContent={tileContent}
        prevLabel={
          <ArrowLeftIcon
            sx={{ fill: '#D9D9D9', width: '36px', height: '36px' }}
          />
        }
        nextLabel={
          <ArrowRightIcon
            sx={{ fill: '#D9D9D9', width: '36px', height: '36px' }}
          />
        }
      />
    </StyledCalendarWrapper>
  );
};

export default ProjectCalendar;
