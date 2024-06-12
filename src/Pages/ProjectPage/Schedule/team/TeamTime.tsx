import styled from 'styled-components';
import { ScheduleAllMembersResDto } from '#/Types/scheduletype';
import TeamTimeSchedule from './TeamTimeSchedule';
import { useContext } from 'react';
import { ProjectContext } from '#/hooks/context/projectContext';

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
  display: flex;
  width: 567.371px;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;
  justify-content: space-between;
  margin-left: 41.922px;
`;

const HoursOfDay = [...Array(16).keys()].map((_, index) => index + 9);

interface TeamTimeProps {
  scheduleData: ScheduleAllMembersResDto[] | null;
}

const TeamTime: React.FC<TeamTimeProps> = ({ scheduleData }) => {
  const { projectData } = useContext(ProjectContext);
  const startTime = projectData?.startTime;
  const endTime = projectData?.endTime;

  return (
    <TimeTableDiv>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <HourTextList>
          {HoursOfDay.slice(0, 15).map((hour, idx) => (
            <CommonText key={idx}>{hour}</CommonText>
          ))}
        </HourTextList>
        <TeamTimeSchedule scheduleData={scheduleData} />
      </div>
    </TimeTableDiv>
  );
};

export default TeamTime;
