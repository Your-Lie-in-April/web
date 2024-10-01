import { Toast } from '@components/layout';
import { formatTimeAgo } from '@components/mainPage/alarm/formatTimeAgo';
import ConfirmDeleteAlarm from '@components/modal/projectModal/ConfirmDeleteAlarm';
import useDeleteAlarmMutation from '@hooks/apis/mutations/alarm/useDeleteAlarmMutation';
import usePatchAlarmMutation from '@hooks/apis/mutations/alarm/usePatchAlarmMutation';
import useAlarmsQuery from '@hooks/apis/queries/alarm/useAlarmsQuery';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { FC, useCallback, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const Alarm: FC = () => {
    const [isIconVisible, setIsIconVisible] = useState<boolean>(false);
    const [checkedAlarm, setCheckedAlarm] = useState<number | null>(null);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const { projectId } = useParams();

    const { allAlarms, isUncheckedComplete, uncheckedQuery, checkedQuery, removeAlarm } =
        useAlarmsQuery(projectId ? Number(projectId) : undefined);

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

    // 알람 삭제
    const deleteAlarmMutation = useDeleteAlarmMutation();
    const handleDeleteNotifications = async () => {
        if (checkedAlarm === null) {
            Toast('삭제할 알림을 선택해주세요', 'warning');
            return;
        }
        try {
            await deleteAlarmMutation.mutateAsync(checkedAlarm);
            removeAlarm(checkedAlarm);
            setCheckedAlarm(null);
            setIsDeleted(true);
            setTimeout(() => setIsDeleted(false), 1000);
        } catch (error) {
            console.error('Failed to delete notification:', error);
        }
    };

    const handleCheckBoxClick = (notificationId: number) => {
        setCheckedAlarm((prevChecked) => (prevChecked === notificationId ? null : notificationId));
    };

    // 알람 읽음
    const patchAlarm = usePatchAlarmMutation();
    const handleNotificationClick = async (projectId: number, notificationId: number) => {
        try {
            await patchAlarm.mutateAsync(notificationId);
            Toast('알림을 확인했습니다', 'success');
        } catch (error) {
            console.error('Failed to patch notification:', error);
        }
    };

    return (
        <AlarmDiv>
            <TextStyle>알림</TextStyle>
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
            {allAlarms.length > 0 && (
                <ScrollableArea $hasMessages={allAlarms.length > 0}>
                    {Array.from(allAlarms).map((alarm, index) => (
                        <NotificationBox
                            key={alarm.notificationId}
                            onClick={() =>
                                handleNotificationClick(
                                    alarm.project.projectId,
                                    alarm.notificationId
                                )
                            }
                            ref={index === Array.from(allAlarms).length - 1 ? lastAlarmRef : null}
                        >
                            <NotificationWrapper>
                                {isIconVisible && (
                                    <CheckBoxIcon
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCheckBoxClick(alarm.notificationId);
                                        }}
                                        style={{
                                            color:
                                                checkedAlarm === alarm.notificationId
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
                                        <ProjectTitle $isSSE={alarm.isSSE ?? false}>
                                            {alarm.project.title}
                                        </ProjectTitle>
                                        <CreatedAt $isSSE={alarm.isSSE ?? false}>
                                            {formatTimeAgo(alarm.createdAt)}
                                        </CreatedAt>
                                    </ProjectTitleContainer>
                                    <NotificationContent $isSSE={alarm.isSSE ?? false}>
                                        {alarm.message}
                                    </NotificationContent>
                                </ContentWrapper>
                            </NotificationWrapper>
                        </NotificationBox>
                    ))}
                </ScrollableArea>
            )}
            {allAlarms.length === 0 && <EmptyAlarmMessage>알림이 비었습니다</EmptyAlarmMessage>}
            {isDeleted && <ConfirmDeleteAlarm />}
        </AlarmDiv>
    );
};
export default Alarm;

const AlarmDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 291px;
    height: 294px;
    background-color: #f5f5f5;
    border-radius: 20px;
    padding: 8px;
    padding-top: 20px;
    gap: 8px;
    box-sizing: border-box;
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
    position: relative;
    overflow: hidden;
`;

const EmptyAlarmMessage = styled.div`
    font-weight: 500;
    color: #a4a4a4;
    font-size: 18px;
    display: flex;
    justify-content: center;
    position: absolute;
    top: calc(48%);
`;

const ScrollableArea = styled.div<{ $hasMessages: boolean }>`
    overflow-y: auto;
    flex-grow: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-top: ${({ $hasMessages }) => ($hasMessages ? '1px solid #7d7d7d' : 'none')};
`;

const TextStyle = styled.div`
    color: #c4c4c4;
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    width: 100%;
    font-style: normal;
    opacity: 0.9;
    white-space: nowrap;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DeleteWrapper = styled.div`
    display: flex;
    gap: 218px;
    position: absolute;
    left: 7px;
    top: 34px;
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
    overflow-y: scroll;
    cursor: pointer;
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

const ProjectTitle = styled.div<{ $isSSE: boolean }>`
    color: ${({ $isSSE }) => ($isSSE ? ' #000000' : ' #a4a4a4')};
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const CreatedAt = styled.span<{ $isSSE: boolean }>`
    color: ${({ $isSSE }) => ($isSSE ? ' #000000' : ' #7d7d7d')};
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    flex-shrink: 0;
`;

const NotificationContent = styled.div<{ $isSSE: boolean }>`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${({ $isSSE }) => ($isSSE ? ' #000000' : ' #7d7d7d')};
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    overflow: hidden;
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
