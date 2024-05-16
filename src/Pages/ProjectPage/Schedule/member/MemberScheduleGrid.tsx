import styled from 'styled-components';
import MemberSchedule from './MemberSchedule';
import { MemberEntity } from '#/Types/membertype';

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

const MemberScheduleGrid: React.FC<MemberScheduleGridProps> = ({ members }) => {
    return (
        <GridContainer>
            {members.map((member) => (
                <MemberSchedule key={member.memberId} />
            ))}
        </GridContainer>
    );
};
export default MemberScheduleGrid;
