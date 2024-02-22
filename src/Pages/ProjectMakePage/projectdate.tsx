import { FC } from 'react';
import { useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styled from 'styled-components';
import { ko } from 'date-fns/locale';
import { IoTriangleSharp } from 'react-icons/io5';

const Calendar = styled.div`
    width: 390px;
    height: 390px;
    border-radius: 10px;
    background-color: #fbfbfb;
    margin-left: 30px;
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
`;
const CalendarHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Month = styled.div`
    font-size: 32px;
    font-weight: bold;
    color: #000000;
    margin-bottom: 4px;
    text-align: center;
    margin-top: 4px;
`;

const Weekdays = styled.div`
    display: flex;
`;

const Weekday = styled.div`
    width: 52px;
    height: 40px;
    border-radius: 8px;
    background-color: #633ae2;
    color: #ffffff;
    font-size: 32px;
    font-weight: 700;
    margin-right: 2px;
    margin-bottom: 2px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Dates = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 16px;
    margin-top: 8px;
    font-weight: 500;
    font-family: Pretendard;
`;

const DateContainer = styled.div`
    width: 52px;
    height: 52px;
    font-size: 32px;
    text-align: center;
    margin-right: 2.1px;
    margin-bottom: 2px;
`;

const EachDate = styled(DateContainer)<{ isSelected?: boolean; isToday?: boolean }>`
    ${({ isSelected }) => isSelected && `background-color: #633AE2; color: #FFFFFF;`};
    ${({ isToday }) => isToday && `background-color: #B79FFF;`};
`;

const Checkboxes = styled.div`
    display: flex;
    margin-top: 16px;
    margin-left: 16px;
`;

const Checkbox = styled.div`
    width: 52px;
    height: 52px;
    border-radius: 8px;
    border: 1px solid #000000;

    &.checked {
        background-color: #633ae2;
    }
`;

const PeriodLabel = styled.div`
    font-size: 16px;
    color: #000000;
    margin-left: 8px;
    margin-top: 8px;
`;

const ProjectDate: FC = () => {
    const [selected, setSelected] = useState<Date>();
    const currentDate = new Date();

    return (
        <Calendar>
            <CalendarHeader>
                <IoTriangleSharp
                    style={{
                        fontSize: '22',
                        color: '#D9D9D9',
                        marginLeft: '22px',
                        marginTop: '24px',
                        margin: '0 16px',
                        rotate: '-90deg',
                    }}
                />
                <Month>{format(currentDate, 'yyyy년 MM월', { locale: ko })}</Month>
                <IoTriangleSharp
                    style={{
                        fontSize: '22',
                        color: '#D9D9D9',
                        marginRight: '22px',
                        marginTop: '24px',
                        margin: '0 16px',
                        rotate: '90deg',
                    }}
                />
            </CalendarHeader>

            <Weekdays style={{ marginLeft: '7px' }}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((weekday) => (
                    <Weekday key={weekday}>{weekday}</Weekday>
                ))}
            </Weekdays>
            <Dates style={{ marginLeft: '7px' }}>
                {[...Array(31).keys()].map((day) => (
                    <DateContainer key={day}>
                        <EachDate
                        //   isSelected={/* Check if the date is selected */}
                        //   isToday={/* Check if the date is today */}
                        //   onClick={() => /* Handle date selection */}
                        >
                            {day + 1}
                        </EachDate>
                    </DateContainer>
                ))}
            </Dates>
        </Calendar>
    );
};
export default ProjectDate;
