import styled from 'styled-components';
import { UserSchedule } from '#/Types/scheduletype';
import MemberTime from './MemberTime';


const Box = styled.div`
    width: 631px;
    height: 298px;
    border-radius: 20px;
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
    background-color: #f1f1f1;

    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 7.46px;
    padding: 7.46px 5px 8px 9.32px;
    align-items: center;
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
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
`;

interface MemberScheduleProps {
    scheduleData: UserSchedule;
}

const MemberSchedule: React.FC<MemberScheduleProps> = ({ scheduleData }) => {
    return (
        <Box>
            <Title>{scheduleData.nickname}의 시간표</Title>
            <MemberTime scheduleData={scheduleData.schedule} />
        </Box>
    );
};

export default MemberSchedule;
