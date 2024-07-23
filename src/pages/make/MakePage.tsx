import usePostProjectMutation from '@hooks/apis/mutations/project/usePostProjectMutation';
import Layout from '@pages/layouts/Layout';
import { Toast } from '@pages/layouts/Toast';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
import styled, { createGlobalStyle } from 'styled-components';
import Info from './components/Info';
import ProjectCalendar from './components/ProjectCalendar';
import ProjectTime from './components/ProjectTime';

const ProjectMakePage: FC = () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [content, setContent] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [color, setColor] = useState<string>('#D6CBEF');
    const [img, setImg] = useState<string>('');
    const [imgId, setImgId] = useState<string>('');
    const [starttime, setStartTime] = useState('AM 09:00');
    const [endtime, setEndTime] = useState('AM 09:30');
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

    const mutate = usePostProjectMutation();
    const makeProject = async () => {
        if (!title.trim()) {
            Toast('프로젝트 제목을 작성해주세요', 'error');
            return;
        }
        if (!content.trim()) {
            Toast('프로젝트 내용을 작성해주세요', 'error');
            return;
        }

        if (selectedDays.length === 0) {
            Toast('생성할 요일을 선택해주세요', 'error');
            return;
        }

        const payload = {
            title: title,
            description: content,
            startDate: startDate?.toISOString().substring(0, 10) || '',
            endDate: endDate?.toISOString().substring(0, 10) || '',
            startTime: formatTime(starttime),
            endTime: formatTime(endtime),
            daysOfWeek: selectedDays,
            color: color,
            coverImageId: String(imgId),
        };

        try {
            await mutate.mutateAsync(payload);
            navigate('/');
        } catch (error) {
            Toast('다시 시도해주세요', 'error');
        }
    };
    return (
        <>
            <GlobalStyle />
            <Layout>
                <div
                    style={{
                        height: '16px',
                        width: '100%',
                        backgroundColor: '#000000',
                    }}
                />
                <Info
                    setContent={setContent}
                    setTitle={setTitle}
                    setColor={setColor}
                    setImg={setImg}
                    setImgId={setImgId}
                />
                <div
                    style={{
                        height: '24px',
                        width: '100%',
                        backgroundColor: '#000000',
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
                        height: '300px',
                        width: '100%',
                        backgroundColor: '#000000',
                    }}
                />
            </Layout>
        </>
    );
};
export default ProjectMakePage;

const GlobalStyle = createGlobalStyle`
  body {
    width : 100%;
    min-width : 1366px;
    max-height : 1920px;
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
    border: none;
    box-shadow: none;

    padding-top: 109px;
    padding-bottom: 109px;
    box-sizing: border-box;
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

const SButtonText = styled.span`
    color: #fff;
    text-align: center;
    font-family: Pretendard;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;
