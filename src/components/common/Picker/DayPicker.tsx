import { useAppDispatch, useAppSelector } from '@redux/config/hook';
import { setDayOfWeek } from '@redux/slice/edit';
import styled from 'styled-components';

const DayPicker = () => {
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const dispatch = useAppDispatch();
    const selectedDays = useAppSelector((state) => state.edit.dayOfWeek);

    const handleDay = (day: string) => {
        const newSelectedDays = selectedDays.includes(day)
            ? selectedDays.filter((d) => d !== day)
            : [...selectedDays, day];
        dispatch(setDayOfWeek(newSelectedDays));
    };

    return (
        <DayLayout>
            <TextBox>생성할 요일</TextBox>
            <DayContainer>
                {days.map((day, index) => (
                    <DayBox
                        key={index}
                        selected={selectedDays.includes(day)}
                        onClick={() => handleDay(day)}
                    >
                        {day.substring(0, 1)}
                    </DayBox>
                ))}
            </DayContainer>
        </DayLayout>
    );
};
export default DayPicker;

const TextBox = styled.div`
    color: #000;
    font-family: 'Pretendard';
    font-size: 24px;
    font-weight: 400;
    line-height: normal;
    margin-top: 42px;
    margin: auto;
    text-align: center;
`;

const DayLayout = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
`;

const DayContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    margin-left: 21px;
    justify-content: center;
    margin-top: 8px;
`;

const DayBox = styled.div<{ selected: boolean }>`
    width: 60px;
    height: 60px;
    border-radius: 5px;
    background: ${({ selected }) => (selected ? '#633ae2' : '#d9d9d9')};
    font-size: 32px;
    font-weight: bold;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        cursor: pointer;
        background: #b79fff;
    }
`;
