import { AlarmEntity } from '@/types/alarmType';
import { QUERY_KEY } from '@constants/queryKey';
import useDeleteAlarmMutation from '@hooks/apis/mutations/alarm/useDeleteAlarmMutation';
import usePatchAlarmMutation from '@hooks/apis/mutations/alarm/usePatchAlarmMutation';
import useAlarmsQuery from '@hooks/apis/queries/alarm/useAlarmsQuery';
import { AlarmMessageType, useSSE } from '@hooks/useSSE';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Toast } from '@pages/layouts/Toast';
import ConfirmDeleteAlarm from '@pages/modal/project/ConfirmDeleteAlarm';
import { useQuery } from '@tanstack/react-query';
import { FC, useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const Alarm: FC = () => {
    const [isIconVisible, setIsIconVisible] = useState<boolean>(false);
    const [checkedState, setCheckedState] = useState<Record<number, boolean>>({});
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const navigate = useNavigate();

    const { uncheckedQuery, checkedQuery, isUncheckedComplete } = useAlarmsQuery();

    const fetchSSEData = useSSE();
    const { data: realTimeAlarms } = useQuery<AlarmMessageType[]>({
        queryKey: QUERY_KEY.ALARM_SSE,
        queryFn: fetchSSEData,
    });

    const intObserver = useRef<IntersectionObserver | null>(null);
    const lastAlarmRef = useCallback(
        (alarm: HTMLDivElement) => {
            if (intObserver.current) intObserver.current.disconnect();

            intObserver.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    if (!isUncheckedComplete && uncheckedQuery.hasNextPage) {
                        uncheckedQuery.fetchNextPage();
                    } else if (isUncheckedComplete && checkedQuery.hasNextPage) {
                        checkedQuery.fetchNextPage();
                    }
                }
            });

            if (alarm) intObserver.current.observe(alarm);
        },
        [uncheckedQuery, checkedQuery, isUncheckedComplete]
    );

    const allAlarms: AlarmEntity[] = [
        ...(uncheckedQuery.data?.pages.flatMap((page) => page.data) || []),
        ...(isUncheckedComplete ? checkedQuery.data?.pages.flatMap((page) => page.data) || [] : []),
    ];

    // 알림 삭제
    const deleteAlarmMutation = useDeleteAlarmMutation();
    const handleDeleteNotifications = async () => {
        const notificationsToDelete = Object.entries(checkedState)
            .filter(([_, isChecked]) => isChecked)
            .map(([notificationId]) => parseInt(notificationId));

        if (notificationsToDelete.length === 0) {
            Toast('삭제할 알림을 선택해주세요', 'warning');
            return;
        }

        try {
            await Promise.all(
                notificationsToDelete.map((id) => deleteAlarmMutation.mutateAsync(id))
            );
            setCheckedState({});
            setIsDeleted(true);
        } catch (error) {
            console.error('Failed to delete notifications:', error);
        }
    };

    const handleCheckBoxClick = (notificationId: number) => {
        setCheckedState((prev) => ({
            ...prev,
            [notificationId]: !prev[notificationId],
        }));
    };

    // 알림 읽음 처리
    const patchAlarm = usePatchAlarmMutation();
    const handleNotificationClick = async (projectId: number, notificationId: number) => {
        try {
            await patchAlarm.mutateAsync(notificationId);
            navigate(`/project/${projectId}`);
        } catch (error) {
            console.error('Failed to patch notification:', error);
        }
    };

    return (
        <AlarmDiv>
            <Text>알림</Text>
            {allAlarms.length > 0 && (
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
            <ScrollableArea>
                {realTimeAlarms?.length == 0 && allAlarms.length == 0 && (
                    <EmptyAlarmMessage>알림이 비었습니다</EmptyAlarmMessage>
                )}
                {allAlarms.length > 0 && <Divider />}
                {realTimeAlarms && realTimeAlarms.length > 0 && (
                    <>
                        {realTimeAlarms.map((alarm) => (
                            <NotificationBox
                                key={alarm.notificationId}
                                onClick={() =>
                                    handleNotificationClick(alarm.projectId, alarm.notificationId)
                                }
                            >
                                <NotificationWrapper>
                                    {isIconVisible && (
                                        <CheckBoxIcon
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCheckBoxClick(alarm.notificationId);
                                            }}
                                            style={{
                                                color: checkedState[alarm.notificationId]
                                                    ? '#633AE2'
                                                    : '#A4A4A4',
                                                marginLeft: -10,
                                                fontSize: 20,
                                                cursor: 'pointer',
                                            }}
                                        />
                                    )}
                                    <ContentWrapper>
                                        <ProjectTitleContainer $isIconVisible={isIconVisible}>
                                            <ProjectTitle>{alarm.projectTitle}</ProjectTitle>
                                            <CreatedAt>{alarm.createdAt.slice(0, 10)}</CreatedAt>
                                        </ProjectTitleContainer>
                                        <NotificationContent>{alarm.message}</NotificationContent>
                                    </ContentWrapper>
                                </NotificationWrapper>
                            </NotificationBox>
                        ))}
                    </>
                )}
                {allAlarms.map((alarm, index) => (
                    <NotificationBox
                        key={alarm.notificationId}
                        onClick={() =>
                            handleNotificationClick(alarm.project.projectId, alarm.notificationId)
                        }
                        ref={index === allAlarms.length - 1 ? lastAlarmRef : null}
                    >
                        <NotificationWrapper>
                            {isIconVisible && (
                                <CheckBoxIcon
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCheckBoxClick(alarm.notificationId);
                                    }}
                                    style={{
                                        color: checkedState[alarm.notificationId]
                                            ? '#633AE2'
                                            : '#A4A4A4',
                                        marginLeft: -10,
                                        fontSize: 20,
                                        cursor: 'pointer',
                                    }}
                                />
                            )}
                            <ContentWrapper>
                                <ProjectTitleContainer $isIconVisible={isIconVisible}>
                                    <ProjectTitle>{alarm.project.title}</ProjectTitle>
                                    <CreatedAt>{alarm.createdAt.slice(0, 10)}</CreatedAt>
                                </ProjectTitleContainer>
                                <NotificationContent>{alarm.message}</NotificationContent>
                            </ContentWrapper>
                        </NotificationWrapper>
                    </NotificationBox>
                ))}
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

const ScrollableArea = styled.div`
    overflow-y: auto;
    flex-grow: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Divider = styled.div`
    height: 0.8px;
    background-color: #7d7d7d;
    width: 275px;
`;

const EmptyAlarmMessage = styled.div`
    font-weight: 500;
    color: #a4a4a4;
    font-size: 20px;
    display: flex;
    justify-content: center;
    position: absolute;
    top: calc(48%);
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
