import { FC, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Info from './Info';
import ProjectTime from './projecttime';
import AfterLogin from '../Layouts/AfterLogin';
import ProjectCalendar from './projectcalendar';
import { useNavigate } from 'react-router';

const GlobalStyle = createGlobalStyle`
  body {
    width : 100%;
    min-width : 1366px;
    height : 1920px;
    margin: 0 auto;
    background-color: #212121;
    -ms-overflow-style: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Container = styled.div`
    display: flex;
    width: 100%;
    background-color: white;
    flex-direction: column;
    align-items: center;

    gap: 78px;
`;

const TimeContainer = styled.div`
    display: flex;
    gap: 240px;
    width: 1122px;
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

    const navigate = useNavigate();
    const handleProject = () => {
        navigate('/project');
    };
    return (
        <>
            <GlobalStyle />
            <AfterLogin />
            <Info />
            <div
                style={{
                    height: '109px',
                    width: '100%',
                    backgroundColor: 'white',
                }}
            />
            <Container>
                <TimeContainer>
                    <ProjectCalendar
                        selectRange={true}
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
                <SButton onClick={handleProject}>
                    <SButtonText>프로젝트 만들기</SButtonText>
                </SButton>
            </Container>
            <div
                style={{
                    height: '109px',
                    width: '100%',
                    backgroundColor: 'white',
                }}
            />
        </>
    );
};

export default ProjectMakePage;
