import { Http } from '#/constants/backendURL';
import { DateContext } from '#/hooks/context/dateContext';
import { MemberEntity } from '#/types/memberType';
import { ScheduleWeekResponse } from '#/types/scheduleType';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import MemberSchedule from './MemberSchedule';

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(auto, auto);
    column-gap: 18px;
    row-gap: 20px;
`;

interface MemberScheduleGridProps {
    projectId: string | undefined;
    members: MemberEntity[];
}

const MemberScheduleGrid: React.FC<MemberScheduleGridProps> = () => {
    // 프로젝트 ID 가져옴
    const { projectId } = useParams();

    // 달력 선택 날짜 가져옴
    const date = useContext(DateContext);
    const condition = dayjs(date?.selectedDate).format('YYYY-MM-DD') ?? '';

    const [scheduleData, setSchdeuleData] = useState<ScheduleWeekResponse[]>([]);
    // 멤버 스케줄 데이터 가져옴
    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        const fetchSchedule = async () => {
            try {
                const response = await fetch(
                    `${Http}/v2/projects/${projectId}/schedules?condition=${condition}`,
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
                setSchdeuleData(data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchSchedule();
    }, [projectId, condition]);

    return (
        <GridContainer>
            {scheduleData.map((schedule) => (
                <MemberSchedule key={schedule.nickname} scheduleData={schedule} />
            ))}
        </GridContainer>
    );
};
export default MemberScheduleGrid;
