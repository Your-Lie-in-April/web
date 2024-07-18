import { ScheduleAllMembersResDto } from '@/types/scheduleType';
import styled from 'styled-components';
import PinnedTimeSchedule from './PinnedTimeSchedule';

const HoursOfDay = [...Array(16).keys()].map((_, index) => index + 9);

interface PinScheduleProps {
    scheduleData: ScheduleAllMembersResDto | null;
}

const PinnedSchedule: React.FC<PinScheduleProps> = ({ scheduleData }) => {
    return (
        <Box>
            <TimeTableDiv>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <HourTextList>
                        {HoursOfDay.slice(0, 15).map((hour, idx) => (
                            <CommonText key={idx}>{hour}</CommonText>
                        ))}
                    </HourTextList>
                    <PinnedTimeSchedule scheduleData={scheduleData} />
                </div>
            </TimeTableDiv>
        </Box>
    );
};
export default PinnedSchedule;

const Box = styled.div`
    width: 681px;
    height: 300px;
    border-radius: 20px;
    background: #fff;

    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 20px 8px 18px 8px;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
`;

const CommonText = styled.div`
    color: #000000;
    text-align: center;
    font-family: 'Pretendard';
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    width: 32px;
    height: 20px;
`;

const TimeTableDiv = styled.div`
    width: 100%;
    display: flex;
`;

const HourTextList = styled.div`
    width: 632px;
    height: 32px;
    display: flex;
    gap: 8px;
    align-items: center;
    margin-left: 33px;
`;
