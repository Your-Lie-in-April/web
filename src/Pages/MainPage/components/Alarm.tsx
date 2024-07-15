import { Http } from '#/constants/urls';
import useDeleteAlarmMutation from '#/hooks/apis/mutations/alarm/useDeleteAlarmMutation';
import useAllAlarmQuery from '#/hooks/apis/queries/alarm/useAllAlarmQuery';
import ConfirmDeleteAlarm from '#/Pages/Modal/project/ConfirmDeleteAlarm';
import { AlarmEntity } from '#/types/alarmType';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { FC, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { formatTimeAgo } from './formatTimeAgo';

type alarmMeaageType = {
    projectTitle: string;
    message: string;
    createdAt: string;
    projectId: number;
    notificationId: number;
};

const Alarm: FC = () => {
    const [alarmMessages, setAlarmMessages] = useState<alarmMeaageType[]>([]);
    const [isIconVisible, setIsIconVisible] = useState<boolean>(false);
    const [checkedState, setCheckedState] = useState<boolean[]>([]);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const sseURL = `${Http}/v1/sse/subscribe`;
    const token = localStorage.getItem('access_token');
    const navigate = useNavigate();

    const { data, fetchNextPage, hasNextPage } = useAllAlarmQuery();
    const deleteAlarmMutation = useDeleteAlarmMutation();

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
                        notificationId: item.notificationId,
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

    const flattenedAlarms = useMemo((): alarmMeaageType[] => {
        return (
            data?.pages.flatMap((page) =>
                (page.data as AlarmEntity[]).map((item: AlarmEntity) => ({
                    projectTitle: item.project.title,
                    message: item.message,
                    createdAt: formatTimeAgo(item.createdAt),
                    projectId: item.project.projectId,
                    notificationId: item.notificationId,
                }))
            ) || []
        );
    }, [data]);

    useEffect(() => {
        setAlarmMessages(flattenedAlarms);
    }, [flattenedAlarms]);

    useEffect(() => {
        setIsIconVisible(alarmMessages.length > 0);
    }, [alarmMessages]);

    const handleDeleteNotifications = async () => {
        const notificationsToDelete = alarmMessages.filter((_, index) => checkedState[index]);
        if (notificationsToDelete.length === 0) {
            alert('✂️삭제할 알림을 선택해주세요');
            return;
        }
        try {
            for (const notification of notificationsToDelete) {
                await deleteAlarmMutation.mutateAsync(notification.notificationId);
            }
            console.log('메세지 삭제 성공');
            const remainingNotifications = alarmMessages.filter((_, index) => !checkedState[index]);
            setAlarmMessages(remainingNotifications);
            setCheckedState(Array(remainingNotifications.length).fill(false));
            setIsDeleted(true);
        } catch (error) {
            console.error('Failed to delete notifications:', error);
        }
    };

    useEffect(() => {
        setCheckedState(Array(alarmMessages.length).fill(false));
    }, [alarmMessages]);

    const handleCheckBoxClick = (index: number) => {
        const updatedCheckedState = checkedState.map((item, idx) => (idx === index ? !item : item));
        setCheckedState(updatedCheckedState);
    };

    const handleNotificationClick = (projectId: number) => {
        navigate(`/project/${projectId}`);
    };

    return (
        <AlarmDiv>
            <Text>알림</Text>
            {alarmMessages.length > 0 && (
                <DeleteWrapper>
                    <StyledCheckBoxIcon
                        onClick={() => setIsIconVisible(!isIconVisible)}
                        $isIconVisible={isIconVisible}
                    />
                    <DeleteNotification
                        $isIconVisible={isIconVisible}
                        onClick={handleDeleteNotifications}
                    >
                        알림삭제
                    </DeleteNotification>
                </DeleteWrapper>
            )}
            <ScrollableArea $hasMessages={alarmMessages.length > 0}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={() => fetchNextPage()}
                    hasMore={!!hasNextPage}
                    loader={<div key={0}>Loading...</div>}
                    useWindow={false}
                >
                    {alarmMessages.map((alarm, index) => (
                        <NotificationBox
                            key={index}
                            onClick={() => handleNotificationClick(alarm.projectId)}
                        >
                            <NotificationWrapper>
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
                                        }}
                                    />
                                )}
                                <ContentWrapper>
                                    <ProjectTitleContainer $isIconVisible={isIconVisible}>
                                        <ProjectTitle>{alarm.projectTitle}</ProjectTitle>
                                        <CreatedAt>{alarm.createdAt}</CreatedAt>
                                    </ProjectTitleContainer>
                                    <NotificationContent>{alarm.message}</NotificationContent>
                                </ContentWrapper>
                            </NotificationWrapper>
                        </NotificationBox>
                    ))}
                </InfiniteScroll>
            </ScrollableArea>
            {isDeleted && <ConfirmDeleteAlarm />}
        </AlarmDiv>
    );
};
export default Alarm;

const AlarmDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 312px;
    height: 918px;
    background-color: #f5f5f5;
    border-radius: 10px;
    padding: 8px;
    padding-top: 14px;
    gap: 8px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
`;

const ScrollableArea = styled.div<{ $hasMessages: boolean }>`
    overflow-y: auto;
    flex-grow: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    border-top: ${({ $hasMessages }) => ($hasMessages ? '1px solid #7d7d7d' : 'none')};
`;

const Text = styled.div`
    width: 100%;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    color: #a4a4a4;
    opacity: 0.9;
    white-space: nowrap;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DeleteWrapper = styled.div`
    display: flex;
    gap: 4px;
    position: absolute;
    left: 16px;
    top: 25px;
    justify-content: center;
    align-items: center;
`;

const NotificationBox = styled.div`
    display: flex;
    width: 275px;
    height: 60px;
    padding: 8px;
    box-sizing: border-box;
    flex-shrink: 0;
    background: #f5f5f5;
    border-bottom: 1px solid #7d7d7d;
    flex-direction: column;
    gap: 7px;
    cursor: pointer;
    overflow-y: scroll;
`;

const NotificationWrapper = styled.div`
    display: flex;
    gap: 4px;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin-top: 4px;
`;

const ProjectTitle = styled.div`
    color: #000000;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const CreatedAt = styled.span`
    color: #a4a4a4;
    font-size: 6px;
    font-style: normal;
    font-weight: 400;
    flex-shrink: 0;
`;

const NotificationContent = styled.div`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #7d7d7d;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const ProjectTitleContainer = styled.div<{ $isIconVisible: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: ${(props) => (props.$isIconVisible ? '245px' : '259px')};
`;

const DeleteNotification = styled.div<{ $isIconVisible: boolean }>`
    display: ${(props) => (props.$isIconVisible ? 'block' : 'none')};
    color: #633ae2;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    text-align: center;
    cursor: pointer;
`;

const StyledCheckBoxIcon = styled(CheckBoxIcon)<{ $isIconVisible: boolean }>`
    font-size: 20px !important;
    cursor: pointer;
    color: ${(props) => (props.$isIconVisible ? '#633AE2' : '#A4A4A4')} !important;
`;
