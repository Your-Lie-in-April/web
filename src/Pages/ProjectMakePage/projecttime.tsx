import React, { FC, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import styled from 'styled-components';
import { ko } from 'date-fns/locale/ko';
import './projecttime.css';

const ProjectTimeContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 600px;
    height: 400px;
    background: #fff;
`;

const DateContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 20px;
`;

const SDatePicker = styled(ReactDatePicker)`
    margin-top: 12px;
    width: 166px;
    padding: 4px;
    font-size: 28px;
    font-weight: 400;
    border-radius: 20px;
    background: #f5f5f5;
    text-align: center;
    margin: auto;

    &:hover {
        cursor: pointer;
    }
`;

const Text = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 24px;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 12px;
    margin-top: 12px;
`;

const Separator = styled.span`
    width: 21px;
    height: 38px;
    font-size: 32px;
    font-weight: 600;
    text-align: center;
    margin-top: 40px;
`;

const Example: FC = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <ProjectTimeContainer>
            <DateContainer>
                <Text>프로젝트 시작일</Text>
                <SDatePicker
                    locale={ko}
                    dateFormat={'YYYY-MM-dd'}
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    startDate={startDate}
                    onFocus={(e) => e.target.blur()}
                />
            </DateContainer>

            <Separator>~</Separator>

            <DateContainer>
                <Text>프로젝트 종료일</Text>
                <SDatePicker
                    locale={ko}
                    dateFormat={'YYYY-MM-dd'}
                    selected={endDate}
                    onChange={(date: Date) => setEndDate(date)}
                    selectsEnd
                    endDate={endDate}
                    minDate={startDate}
                    onFocus={(e) => e.target.blur()}
                />
            </DateContainer>
        </ProjectTimeContainer>
    );
};

export default Example;
