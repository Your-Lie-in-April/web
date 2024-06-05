import { Http } from '#/constants/backendURL';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router';
import styled, { createGlobalStyle } from 'styled-components';
import AfterLogin from '../Layouts/AfterLogin';
import Info from './Info';
import ProjectCalendar from './projectcalendar';
import ProjectTime from './projecttime';

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

    &:focus {
        outline: none;
        border: none;
    }
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
    const [content, setContent] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [color, setColor] = useState<string>('#D6CBEF');
    const [img, setImg] = useState<string>('');
    const [starttime, setStartTime] = useState('AM 09:00');
    const [endtime, setEndTime] = useState('AM 09:00');
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const navigate = useNavigate();
    const formatTime = (time: string) => {
        const [ampm, timeString] = time.split(' ');
        let [hour, minute] = timeString.split(':').map(Number);

        if (ampm === 'PM' && hour !== 12) {
            hour += 12;
        } else if (ampm === 'AM' && hour === 12) {
            hour = 0;
        }
        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
    };

    const makeProject = async () => {
        const accessToken = localStorage.getItem('access_token');
        const payload = {
            title: title,
            description: content,
            startDate: startDate?.toISOString().substring(0, 10),
            endDate: endDate?.toISOString().substring(0, 10),
            startTime: formatTime(starttime),
            endTime: formatTime(endtime),
            daysOfWeek: selectedDays,
            isStored: false,
            color: color,
            coverImageUrl: img,
        };
        console.log('payload', payload);
        if(!accessToken){
            navigate('/login');
            return;
        }
        try {
            const response = await fetch(Http + `/v1/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('프로젝트 생성 실패');
            }

            const jsonResponse = await response.json();
            console.log('Project 생성:', jsonResponse);
            navigate('/');
        } catch (error) {
            console.error('Error make project:', error);
        }
    };
    return (
        <>
            <GlobalStyle />
            <AfterLogin />
            <div
                style={{
                    height: '20px',
                    width: '100%',
                    backgroundColor: '#212121',
                }}
            />
            <Info setContent={setContent} setTitle={setTitle} setColor={setColor} setImg={setImg} />
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
                        starttime={starttime}
                        setStartTime={setStartTime}
                        endtime={endtime}
                        setEndTime={setEndTime}
                        selectedDays={selectedDays}
                        setSelectedDays={setSelectedDays}
                    />
                </TimeContainer>
                <SButton onClick={makeProject}>
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
