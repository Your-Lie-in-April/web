import { FC } from 'react';
import styled from 'styled-components';
import Alarms from './alarms';
const AlarmDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 312px;
    height: 918px;
    background-color: #f5f5f5;
    border-radius: 10px;
`;

const AlarmText = styled.div`
    width: 39px;
    height: 26px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 26px;
    color: #a4a4a4;
    margin: 24px auto;
    margin-top: 24px;
    opacity: 0.9;
    white-space: nowrap;
`;

const CommingSoon = styled.div`
    height: 33px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 33px;
    color: #d9d9d9;
    margin: auto;
`;

const Alarm: FC = () => {
    return (
        <AlarmDiv>
            <AlarmText>알림</AlarmText>
            <CommingSoon>
                Comming Soon
                <Alarms />
            </CommingSoon>
        </AlarmDiv>
    );
};

export default Alarm;
