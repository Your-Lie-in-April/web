import { FC, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Info from './Info';
import SelectTime from './projectcalendar';
import ProjectTime from './projecttime';
import AfterLogin from '../Layouts/AfterLogin';
import ProjectCalendar from './projectcalendar';
import { useNavigate } from 'react-router';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #FFFFFF;
    -ms-overflow-style: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;
const ProjectMakePageContainer = styled.div`
    margin-left: auto;
    margin-right: auto;
    width: 1920px;
    height: 1920px;

    background-color: #212121;
    overflow: auto;
`;
const Container = styled.div`
    display: flex;
    width 1916px;
    height: 764px;
    background-color: white;
    flex-direction: column;
    align-items: center;
    gap: 16px;
   
`;
const TimeContainer = styled.div`
    display: flex;
    width: 1122px;
    height: 530px;
    padding: 109px 389px;
    gap: 240px;
    position: relative;
`;
const SButton = styled.button`
    position: absolute;
    bottom: 109px;
    left: 50%;
    transform: translateX(-50%);
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
        <ProjectMakePageContainer>
            <GlobalStyle />
            <AfterLogin />
            <Info />
            <Container style={{ marginTop: '24px' }}>
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
                    <SButton onClick={handleProject}>
                        <SButtonText>프로젝트 만들기</SButtonText>
                    </SButton>
                </TimeContainer>
            </Container>
        </ProjectMakePageContainer>
    );
};

export default ProjectMakePage;
