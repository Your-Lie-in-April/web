import useDeleteAlarmMutation from '@hooks/apis/mutations/alarm/useDeleteAlarmMutation';
import usePatchAlarmMutation from '@hooks/apis/mutations/alarm/usePatchAlarmMutation';
import useAlarmsQuery from '@hooks/apis/queries/alarm/useAlarmsQuery';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Toast } from '@pages/layouts/Toast';
import ConfirmDeleteAlarm from '@pages/modal/project/ConfirmDeleteAlarm';
import { FC, useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { formatTimeAgo } from './formatTimeAgo';

const Alarm: FC = () => {
    const [isIconVisible, setIsIconVisible] = useState<boolean>(false);
    const [checkedAlarm, setCheckedAlarm] = useState<number | null>(null);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const navigate = useNavigate();

    const { allAlarms, isUncheckedComplete, uncheckedQuery, checkedQuery, removeAlarm } =
        useAlarmsQuery();

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

    // 알림 삭제
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
            {allAlarms.size > 0 && (
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
                {allAlarms.size == 0 && <EmptyAlarmMessage>알림이 비었습니다</EmptyAlarmMessage>}
                {allAlarms.size > 0 && <Divider />}
                {Array.from(allAlarms).map((alarm, index) => (
                    <NotificationBox
                        key={alarm.notificationId}
                        onClick={() =>
                            handleNotificationClick(alarm.project.projectId, alarm.notificationId)
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
                                    <ProjectTitle>{alarm.project.title}</ProjectTitle>
                                    <CreatedAt>{formatTimeAgo(alarm.createdAt)}</CreatedAt>
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
