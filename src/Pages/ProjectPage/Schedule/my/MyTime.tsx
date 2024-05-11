import styled from 'styled-components';
import TimeCircle from '../TimeCircle';
import useScheduleMemberQuery from '#/hooks/apis/queries/schedule/useScheduleMemberQuery';
import { useContext, useEffect, useState } from 'react';
import { useUserContext } from '#/Pages/MainPage/MainPage';
import { ProjectContext } from '#/hooks/context/projectContext';
import { DateContext } from '#/hooks/context/dateContext';
import { DaySchedule } from '#/Types/scheduletype';
import { filterScheduleByWeekRange } from '../filterSchedule';

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
    // const userId = userData?.id;
    const userId = 1;
    const projectId = 1;

    // 프로젝트 정보 가져옴
    const { projectInfo } = useContext(ProjectContext);
    // const projectId = projectInfo?.projectId;

    // 스케줄 데이터 가져옴
    const { data: scheduleData } = useScheduleMemberQuery(
        Number(projectId),
        Number(userId)
    );

    // 달력 선택 날짜 가져옴
    const dateContext = useContext(DateContext);
    const selectedDate = dateContext ? dateContext.selectedDate : null;

    const [filteredScheduleData, setFilteredScheduleData] = useState<
        DaySchedule[] | undefined
    >(undefined);

    console.log('filter: ', filteredScheduleData);

    // 스케줄 필터링
    useEffect(() => {
        if (scheduleData && selectedDate) {
            const filteredData = filterScheduleByWeekRange(
                scheduleData,
                selectedDate
            );
            setFilteredScheduleData(filteredData);
        }
    }, [scheduleData, selectedDate]);

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
                    {filteredScheduleData?.map((daySchedule, idx) => {
                        const day = daySchedule.dayOfWeek;
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
