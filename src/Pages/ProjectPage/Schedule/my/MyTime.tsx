import styled from 'styled-components';
import TimeCircle from '../TimeCircle';
import useScheduleMemberQuery from '#/hooks/apis/queries/schedule/useScheduleMemberQuery';
import { useContext, useEffect, useState } from 'react';
import { useUserContext } from '#/Pages/MainPage/MainPage';
import { ProjectContext } from '#/hooks/context/projectContext';
import { DateContext } from '#/hooks/context/dateContext';
import dayjs from 'dayjs';
import { Http } from '#/constants/backendURL';
import { ProjectEntity } from '#/Types/projecttype';
import { ScheduleWeekResponse } from '#/Types/scheduletype';

const CommonText = styled.div`
    color: #000000;
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const TimeTableDiv = styled.div`
    width: 100%;
    display: flex;
`;

const DayTextList = styled.div`
    height: 216.57px;
    display: flex;
    flex-direction: column;
    gap: 11px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.06px;
    align-self: flex-end;
`;

const HourTextList = styled.div`
    width: 574px;
    display: flex;
    flex-direction: row;
    gap: 11px;
    align-items: center;
    justify-content: space-between;
`;

const DayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const HoursOfDay = [...Array(16).keys()].map((_, index) => index + 9);

const MyTime = () => {
    // 유저데이터가져옴
    const { userData } = useUserContext();
    const memberId = userData?.memberId;

    // 프로젝트 정보 가져옴
    const { projectData } = useContext(ProjectContext);
    const projectId = projectData?.projectId;

    // 달력 선택 날짜 가져옴
    const date = useContext(DateContext);
    const condition = dayjs(date?.selectedDate).format('YYYY-MM-DD') ?? '';
    console.log(`condition : ${condition}`)

    const [scheduleData, setSchdeuleData] =
        useState<ScheduleWeekResponse | null>(null);
    // 스케줄 데이터 가져옴
    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        const fetchSchedule = async () => {
            try {
                const response = await fetch(
                    `${Http}/v1/projects/${projectId}/members/${memberId}/schedules?condition=${condition}`,
                    {
                        method: 'GET',
                        headers: {
                            Accept: '*/*',
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch pinned projects');
                }

                const data = await response.json();
                console.log('내 스케줄', data.data);
                setSchdeuleData(data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchSchedule();
    }, [projectId, memberId, condition]);


    return (
        <TimeTableDiv>
            <DayTextList>
                {DayOfWeek.map((day, idx) => (
                    <CommonText style={{ height: '24.081px' }} key={idx}>
                        {day}
                    </CommonText>
                ))}
            </DayTextList>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <HourTextList style={{ alignSelf: 'flex-start' }}>
                    {HoursOfDay.slice(0, 15).map((hour, idx) => (
                        <CommonText key={idx}>{hour}</CommonText>
                    ))}
                </HourTextList>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                    }}
                >
                    {scheduleData?.map((daySchedule, idx) => {
                        return (
                            <div
                                key={idx}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                {HoursOfDay.slice(0, HoursOfDay.length - 1).map(
                                    (hour, hourIdx) => (
                                        <TimeCircle
                                            key={hourIdx}
                                            hour={hour}
                                            isScheduled={
                                                daySchedule.schedule.some(
                                                    (scheduleItem) =>
                                                        new Date(
                                                            scheduleItem.startAt
                                                        ).getHours() === hour &&
                                                        new Date(
                                                            scheduleItem.endAt
                                                        ).getHours() > hour
                                                ) || false
                                            }
                                            scheduleItems={
                                                daySchedule.schedule.filter(
                                                    (scheduleItem) =>
                                                        new Date(
                                                            scheduleItem.startAt
                                                        ).getHours() === hour
                                                ) || []
                                            }
                                        />
                                    )
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </TimeTableDiv>
    );
};

export default MyTime;
