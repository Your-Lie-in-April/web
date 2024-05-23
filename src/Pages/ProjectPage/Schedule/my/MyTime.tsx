import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { useUserContext } from '#/Pages/MainPage/MainPage';
import { ProjectContext } from '#/hooks/context/projectContext';
import { DateContext } from '#/hooks/context/dateContext';
import dayjs from 'dayjs';
import { Http } from '#/constants/backendURL';
import { ScheduleWeekResponse } from '#/Types/scheduletype';
import TimeSchedule from '../TimeSchedule';

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

const HourTextList = styled.div`
    width: 574px;
    display: flex;
    flex-direction: row;
    gap: 11px;
    align-items: center;
    justify-content: space-between;
`;

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
    console.log(`condition : ${condition}`);

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
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <HourTextList style={{ alignSelf: 'flex-end' }}>
                    {HoursOfDay.slice(0, 15).map((hour, idx) => (
                        <CommonText key={idx}>{hour}</CommonText>
                    ))}
                </HourTextList>
                <TimeSchedule scheduleData={scheduleData} />
            </div>
        </TimeTableDiv>
    );
};

export default MyTime;
