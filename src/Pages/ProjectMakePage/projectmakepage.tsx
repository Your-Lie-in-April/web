import { FC, useState } from 'react';
import styled from 'styled-components';
import Info from './Info';
import SelectTime from './projectcalendar';
import ProjectTime from './projecttime';
import AfterLogin from '../Layouts/AfterLogin';
import ProjectCalendar from './projectcalendar';

const ProjectMakePageContainer = styled.div`
    margin-left: auto;
    margin-right: auto;
    width: 1920px;
    height: 1920px;

    background-color: #212121;
    overflow: auto;

    body {
        -ms-overflow-style: none;
    }

    ::-webkit-scrollbar {
        display: none;
    }
`;
const Container = styled.div`
    display: flex;
    width 1916px;
    height: 764px;
    background-color: white;
    flex-direction: column;
    align-items: center;
    gap: 8px;
   
`;
const TimeContainer = styled.div`
    display: flex;
    width: 1122px;
    height: 530px;
    padding: 109px 389px;
    gap: 240px;
`;
const SButton = styled.button`
    width: 289px;
    height: 62px;
    padding: 12px 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 60px;
    background: #633ae2;
    white-space: nowrap;
    margin-bottom: 109px;
`;

const SButtonText = styled.text`
    color: #fff;
    text-align: center;
    font-family: Pretendard;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;
const ProjectMakePage: FC = () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());

    const handleDateChange = (newStartDate: Date | null, newEndDate: Date | null) => {
        setStartDate(newStartDate);
        setEndDate(newEndDate);
    };
    return (
        <ProjectMakePageContainer>
            <AfterLogin />
            <Info />
            <Container>
                <TimeContainer>
                    <ProjectCalendar
                        startDate={startDate}
                        endDate={endDate}
                        onDateChange={(start, end) => {
                            setStartDate(start || new Date());
                            setEndDate(end || new Date());
                        }}
                    />
                    <ProjectTime
                        startDate={startDate}
                        endDate={endDate}
                        onDateChange={(start, end) => {
                            setStartDate(start || new Date());
                            setEndDate(end || new Date());
                        }}
                    />
                </TimeContainer>
                <SButton>
                    <SButtonText>프로젝트 만들기</SButtonText>
                </SButton>
            </Container>
        </ProjectMakePageContainer>
    );
};

export default ProjectMakePage;
