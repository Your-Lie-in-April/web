import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import 'react-toastify/dist/ReactToastify.css';
import { Http } from '#/constants/backendURL';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useNavigate } from 'react-router-dom';

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
    cursor: pointer;
`;

const ProjectTitle = styled.div<{ isIconVisible: boolean }>`
    color: #000000;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 8px;
    margin-left: ${(props) => (props.isIconVisible ? '4px' : '0')};
`;

const CreatedAt = styled.span`
    color: #a4a4a4;
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
`;

const NotificationContent = styled.div<{ isIconVisible: boolean }>`
    display: flex;
    align-items: center;
    color: #7d7d7d;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-left: ${(props) => (props.isIconVisible ? '14px' : '0')};
`;

const ProjectTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
`;

const DeleteNotification = styled.div<{ isIconVisible: boolean }>`
    display: ${(props) => (props.isIconVisible ? 'block' : 'none')};
    position: absolute;
    top: 50px;
    left: 30px;
    color: #633ae2;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    cursor: pointer;
`;

const StyledCheckBoxIcon = styled(CheckBoxIcon)<{ isIconVisible: boolean }>`
    font-size: 20px !important;
    cursor: pointer;
    color: ${(props) => (props.isIconVisible ? '#633AE2' : '#A4A4A4')} !important;
    position: absolute;
    left: 8px;
    top: 48px;
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
    const [alarmMessages, setAlarmMessages] = useState<
        { projectTitle: string; message: string; createdAt: string; projectId: string }[]
    >([]);
    const [isIconVisible, setIsIconVisible] = useState<boolean>(false);
    const [checkedState, setCheckedState] = useState<boolean[]>([]);

    const sseURL = `${Http}/v1/sse/subscribe`;
    const token = localStorage.getItem('access_token');
    const navigate = useNavigate();

    useEffect(() => {
        const EventSource = EventSourcePolyfill || NativeEventSource;
        const eventSource = new EventSource(sseURL, {
            headers: {
                Authorization: `Bearer ${token}`,
                Connection: 'keep-alive',
                Accept: 'text/event-stream',
            },
            heartbeatTimeout: 86400000,
        });

        eventSource.addEventListener('notification', (event: any) => {
            console.log('Notification event received');
        });

        eventSource.addEventListener('message', (event: any) => {
            const { data } = event;
            try {
                if (isValidJSON(data)) {
                    const parsedData = JSON.parse(data);
                    const messages = parsedData.data.map((item: any) => ({
                        projectTitle: item.project.title,
                        message: item.message,
                        createdAt: formatTimeAgo(item.createdAt),
                        projectId: item.project.projectId,
                    }));
                    setAlarmMessages(messages);
                } else {
                    console.warn('Received data is not valid JSON:', data);
                }
            } catch (error) {
                console.error('Failed to parse JSON data:', data, error);
            }
        });

        eventSource.onerror = (err) => {
            console.error('EventSource failed:', err);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [sseURL, token]);

    const isValidJSON = (data: string) => {
        try {
            JSON.parse(data);
            return true;
        } catch {
            return false;
        }
    };

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
                if (Array.isArray(data.data.data)) {
                    const messages = data.data.data.map((item: any) => ({
                        projectTitle: item.project.title,
                        message: item.message,
                        createdAt: formatTimeAgo(item.createdAt),
                        projectId: item.project.projectId,
                    }));
                    console.log('메시지들', data.data);
                    setAlarmMessages(messages);
                } else {
                    console.error('Response data is not an array:', data);
                }
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    useEffect(() => {
        setCheckedState(Array(alarmMessages.length).fill(false));
    }, [alarmMessages]);

    const toggleIconVisibility = () => {
        setIsIconVisible(!isIconVisible);
    };

    const handleCheckBoxClick = (index: number) => {
        const updatedCheckedState = checkedState.map((item, idx) => (idx === index ? !item : item));
        setCheckedState(updatedCheckedState);
    };

    const handleNotificationClick = (projectId: string) => {
        navigate(`/project/${projectId}`);
    };

    return (
        <AlarmDiv>
            <Text>알림</Text>
            <StyledCheckBoxIcon onClick={toggleIconVisibility} isIconVisible={isIconVisible} />
            <DeleteNotification isIconVisible={isIconVisible} onClick={() => console.log('알림 삭제')}>
                알림삭제
            </DeleteNotification>
            {alarmMessages.map((alarm, index) => (
                <NotificationBox
                    key={index}
                    isFirst={index === 0}
                    onClick={() => handleNotificationClick(alarm.projectId)}
                >
                    <ProjectTitleContainer>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            {isIconVisible && (
                                <CheckBoxIcon
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCheckBoxClick(index);
                                    }}
                                    style={{
                                        color: checkedState[index] ? '#633AE2' : '#A4A4A4',
                                        marginLeft: -10,
                                        fontSize: 20,
                                        cursor: 'pointer',
                                        marginBottom: -7,
                                    }}
                                />
                            )}
                            <ProjectTitle isIconVisible={isIconVisible}>{alarm.projectTitle}</ProjectTitle>
                        </div>
                        <CreatedAt>{alarm.createdAt}</CreatedAt>
                    </ProjectTitleContainer>
                    <NotificationContent isIconVisible={isIconVisible}>{alarm.message}</NotificationContent>
                </NotificationBox>
            ))}
        </AlarmDiv>
    );
};

export default Alarm;
