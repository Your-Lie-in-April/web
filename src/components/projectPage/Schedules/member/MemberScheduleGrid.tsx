import useScheduleAllMemberQuery from '@hooks/apis/queries/schedule/useScheduleAllMemberQuery';
import { useAppSelector } from '@redux/config/hook';
import { RootState } from '@redux/config/store';
import dayjs from 'dayjs';
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
    const selectedDate = useAppSelector((state: RootState) => state.date.selectedDate);
    const condition = dayjs(selectedDate).format('YYYY-MM-DD') ?? '';
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
