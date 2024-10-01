import { useAppSelector } from '@redux/config/hook';
import { RootState } from '@redux/config/store';
import dayjs from 'dayjs';
import styled from 'styled-components';

const DateShow = () => {
    const { startDate, endDate } = useAppSelector((state: RootState) => state.edit);

    return (
        <DateLayout>
            <DateContainer>
                <TextBox>프로젝트 시작일</TextBox>
                <DateBox>{dayjs(startDate).format('YYYY-MM-DD')}</DateBox>
            </DateContainer>
            <Separator>~</Separator>
            <DateContainer>
                <TextBox>프로젝트 종료일</TextBox>
                <DateBox>{dayjs(endDate).format('YYYY-MM-DD')}</DateBox>
            </DateContainer>
        </DateLayout>
    );
};
export default DateShow;

const DateLayout = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const DateContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 20px;
    justify-content: center;
    gap: 8px;
`;

const DateBox = styled.div`
    width: 208px;
    height: 41px;
    padding: 4px;
    font-size: 28px;
    font-weight: 400;
    font-style: normal;
    line-height: normal;
    border-radius: 20px;
    background: #f5f5f5;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    color: #000000;
    text-align: center;
    font-family: 'Pretendard';
`;

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

const Separator = styled.span`
    width: 21px;
    height: 38px;
    font-size: 32px;
    font-weight: 600;
    text-align: center;
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
