import { Http } from '#/constants/backendURL';
import { DateContext } from '#/hooks/context/dateContext';
import { ProjectContext } from '#/hooks/context/projectContext';
import { ScheduleWeekResponse } from '#/types/scheduleType';
import ModalPortal from '#/utils/ModalPotal';
import useScrollLock from '#/utils/useScrollLock';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { formatScheduleData } from '../../formatScheduleData';
import EditMyTime from './EditMyTime';

const ModalBlackOut = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    background: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
`;

const Box = styled.div`
    width: 876px;
    height: 389px;
    background-color: #ffffff;
    border-radius: 20px;
    border: 1px solid #000000;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
    padding: 4px 1px 3px 1px;

    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 21px;
    align-items: center;
    justify-content: flex-end;
`;

const CommonText = styled.div`
    color: #000000;
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const Title = styled(CommonText)`
    width: 240px;
    height: 32px;
    border-radius: 20px;
    padding: 4px 20px;
    justify-content: center;
    align-items: center;
    background-color: #633ae2;
    color: #ffffff;
    font-size: 20px;
    font-weight: 700;
    box-sizing: border-box;
`;

const ConfirmBtn = styled.button`
    width: 297px;
    height: 64px;
    border-radius: 60px;
    background: #633ae2;
    box-sizing: border-box;
    color: #ffffff;
    text-align: center;
    font-family: Pretendard;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    display: flex;
    justify-content: center;
    align-items: center;

    &:focus {
        outline: none;
    }
`;

interface SelectedSlot {
    date: string;
    hour: number;
    minute: number;
}

interface ScheduleData {
    schedule: {
        schedule: {
            startTime: string;
            endTime: string;
        }[];
    }[];
}

interface EditMyScheduleProps {
    isEditModal: boolean;
    onSetIsEditModal: () => void;
    scheduleData: ScheduleWeekResponse | null;
    fetchSchedule: () => Promise<void>;
}

const EditMySchedule: React.FC<EditMyScheduleProps> = ({
    isEditModal,
    onSetIsEditModal,
    scheduleData,
    fetchSchedule,
}) => {
    const { projectData } = useContext(ProjectContext);
    const startDateString = projectData?.startDate;
    const endDateString = projectData?.endDate;
    const startTimeString = projectData?.startTime;
    const endTimeString = projectData?.endTime;
    const dayOfWeek = projectData?.daysOfWeek;

    const startDateTime =
        startDateString && startTimeString
            ? new Date(`${startDateString}T${startTimeString}`)
            : undefined;

    const endDateTime =
        endDateString && endTimeString ? new Date(`${endDateString}T${endTimeString}`) : undefined;

    const projectStartTime = startDateTime ? startDateTime.getHours() : undefined;
    const projectEndTime = endDateTime ? endDateTime.getHours() : undefined;

    const { projectId } = useParams<{ projectId: string }>();
    const { weekDates } = useContext(DateContext) || {};
    const [selection, setSelection] = useState<{ [key: number]: SelectedSlot }>({});

    const postSchedule = async (scheduleData: ScheduleData) => {
        const accessToken = localStorage.getItem('access_token');
        try {
            const response = await fetch(Http + `/v1/projects/${projectId}/schedules`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(scheduleData),
            });

            if (!response.ok) {
                throw new Error('Failed to post the schedule');
            }

            const jsonResponse = await response.json();
            console.log('my Schedule post:', jsonResponse);
        } catch (error) {
            console.error('Error posting schedule:', error);
        }
    };

    const putSchedule = async (scheduleData: ScheduleData) => {
        const accessToken = localStorage.getItem('access_token');
        try {
            const response = await fetch(Http + `/v1/projects/${projectId}/schedules`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(scheduleData),
            });

            if (!response.ok) {
                throw new Error('Failed to update the schedule');
            }

            const jsonResponse = await response.json();
            console.log('my Schedule updated:', jsonResponse);
            console.log(scheduleData);
        } catch (error) {
            console.error('Error updating schedule:', error);
        }
    };

    const handleConfirm = async () => {
        const projectStartDate = projectData?.startDate;
        const projectEndDate = projectData?.endDate;

        const projectStartDateString = projectStartDate
            ? new Date(projectStartDate).toISOString().slice(0, 10)
            : undefined;
        const projectEndDateString = projectEndDate
            ? new Date(projectEndDate).toISOString().slice(0, 10)
            : undefined;

        const newScheduleData = formatScheduleData(
            selection,
            projectStartTime,
            projectEndTime,
            dayOfWeek,
            projectStartDateString,
            projectEndDateString
        );
        console.log(`schedule 수정 : ${JSON.stringify(newScheduleData)}`);

        // 선택한 스케줄이 없거나 모두 프로젝트 기간/날짜에 포함되지 않는 경우
        if (newScheduleData.schedule.length === 0) {
            console.log('Post/Update Schedule data empty');
            setSelection({});
            onSetIsEditModal();
            alert('프로젝트 기간에 맞춰 시간표를 작성해주세요!');
            return;
        }

        try {
            if (scheduleData && scheduleData.schedule.length > 0) {
                await putSchedule(newScheduleData);
            } else {
                await postSchedule(newScheduleData);
            }
            setSelection({});
            onSetIsEditModal();
            fetchSchedule(); // 일정 등록/수정 후에 fetchSchedule 함수를 호출합니다.
        } catch (error) {
            console.error('Error post/update schedule:', error);
        }
    };

    useScrollLock(isEditModal);

    const handleCloseModal = () => {
        setSelection({});
        onSetIsEditModal();
    };

    return (
        <>
            {isEditModal && (
                <ModalPortal>
                    <ModalBlackOut onClick={handleCloseModal} />
                    <ModalContainer>
                        <Box>
                            <Title>나의 시간표</Title>
                            <EditMyTime
                                weekDates={weekDates || []}
                                selection={selection}
                                onSelectionChange={(newSelection) => setSelection(newSelection)}
                            />
                        </Box>
                        <ConfirmBtn onClick={handleConfirm}>시간표 등록하기</ConfirmBtn>
                    </ModalContainer>
                </ModalPortal>
            )}
        </>
    );
};

export default EditMySchedule;
