import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import 'react-toastify/dist/ReactToastify.css';
import { Http } from '#/constants/backendURL';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const AlarmDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 312px;
    height: 918px;
    background-color: #f5f5f5;
    border-radius: 10px;
    position: relative;
`;

const Text = styled.div`
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

const NotificationBox = styled.div<{ isFirst: boolean }>`
    display: flex;
    width: 275px;
    height: 59px;
    padding: 8px;
    flex-shrink: 0;
    background: #f5f5f5;
    border-bottom: 1px solid #7d7d7d;
    border-top: ${(props) => (props.isFirst ? '1px solid #7d7d7d' : 'none')};
    flex-direction: column;
    gap: 7px;
`;

const ProjectTitle = styled.div`
    color: #a4a4a4;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 8px;
    margin: auto;
`;

const CreatedAt = styled.span`
    color: #a4a4a4;
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const NotificationContent = styled.div`
    color: #7d7d7d;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const ProjectTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
`;

function formatTimeAgo(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();

    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSeconds < 60) {
        return '지금';
    } else if (diffMinutes < 60) {
        return `${diffMinutes}분 전`;
    } else if (diffHours < 24) {
        return `${diffHours}시간 전`;
    } else if (diffDays < 7) {
        return `${diffDays}일 전`;
    } else {
        return date.toLocaleDateString();
    }
}

const Alarm: FC = () => {
    const [alarmMessages, setAlarmMessages] = useState<{ projectTitle: string; message: string; createdAt: string }[]>(
        []
    );
    const [isIconVisible, setIsIconVisible] = useState<boolean>(false);
    const sseURL = `${Http}/v1/sse/subscribe`;
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        const EventSource = EventSourcePolyfill || NativeEventSource;
        const eventSource = new EventSource(`${Http}/v1/sse/subscribe`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Connection: 'keep-alive',
                Accept: 'text/event-stream',
            },
            heartbeatTimeout: 86400000,
        });

        eventSource.addEventListener('notification', (event: any) => {
            console.log('에아아');
        });

        eventSource.addEventListener('message', (event: any) => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const messages = parsedData.data.map((item: any) => ({
                projectTitle: item.project.title,
                message: item.message,
                createdAt: formatTimeAgo(item.createdAt),
            }));
            setAlarmMessages(messages);
        });

        eventSource.onerror = (err) => {
            console.error('EventSource failed:', err);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [sseURL, token]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const accessToken = localStorage.getItem('access_token');
                const response = await fetch(`${Http}/v1/notifications`, {
                    method: 'GET',
                    headers: {
                        Accept: '*/*',
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch notifications');
                }

                const data = await response.json();
                const messages = data.data.map((item: any) => ({
                    projectTitle: item.project.title,
                    message: item.message,
                    createdAt: formatTimeAgo(item.createdAt),
                }));
                setAlarmMessages(messages);
            } catch (error) {
                console.error(error);
            }
        };

        fetchNotifications();
    }, []);

    const toggleIconVisibility = () => {
        setIsIconVisible(!isIconVisible);
    };

    return (
        <AlarmDiv>
            <Text>알림</Text>
            <CheckBoxIcon
                onClick={toggleIconVisibility}
                style={{ cursor: 'pointer', color: '#A4A4A4', position: 'absolute', left: 8, top: 48 }}
            />
            {alarmMessages.map((alarm, index) => (
                <NotificationBox key={index} isFirst={index === 0}>
                    <ProjectTitleContainer>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            {isIconVisible && (
                                <CheckBoxIcon style={{ cursor: 'pointer', color: '#A4A4A4', marginLeft: -10 }} />
                            )}
                            <ProjectTitle>{alarm.projectTitle}</ProjectTitle>
                        </div>
                        <CreatedAt>{alarm.createdAt}</CreatedAt>
                    </ProjectTitleContainer>
                    <NotificationContent>{alarm.message}</NotificationContent>
                </NotificationBox>
            ))}
        </AlarmDiv>
    );
};

export default Alarm;
