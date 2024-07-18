import useScheduleAllMemberQuery from '@hooks/apis/queries/schedule/useScheduleAllMemberQuery';
import { DateContext } from '@hooks/context/dateContext';
import dayjs from 'dayjs';
import { useContext } from 'react';
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

const MemberScheduleGrid = () => {
    const { projectId } = useParams();
    const date = useContext(DateContext);
    const condition = dayjs(date?.selectedDate).format('YYYY-MM-DD') ?? '';
    const { data: scheduleData } = useScheduleAllMemberQuery(Number(projectId), condition);

    return (
        <GridContainer>
            {scheduleData?.map((schedule) => (
                <MemberSchedule key={schedule.nickname} scheduleData={schedule} />
            ))}
        </GridContainer>
    );
};
export default MemberScheduleGrid;
