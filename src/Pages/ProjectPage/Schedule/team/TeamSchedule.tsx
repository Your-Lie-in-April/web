import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "#/hooks/context/projectContext";
import { DateContext } from "#/hooks/context/dateContext";
import dayjs from "dayjs";
import { ScheduleAllMembersResDto } from "#/Types/scheduletype";
import { Http } from "#/constants/backendURL";
import { useParams } from "react-router-dom";
import TeamTime from "./TeamTime";

const Box = styled.div`
  width: 661px;
  height: 294px;
  border-radius: 20px;
  border: 1px solid #000000;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 5px 5px 8px 3px;
  align-items: center;
  justify-content: flex-start;
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
  min-width: 178px;
  height: 22px;
  border-radius: 20px;
  padding: 3px 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  background-color: #633ae2;
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
`;

interface TeamScheduleProps {
  isEditModal: boolean;
}

const TeamSchedule: React.FC<TeamScheduleProps> = ({ isEditModal }) => {
  // 프로젝트 ID 가져옴
  const { projectId } = useParams();
  const { projectData } = useContext(ProjectContext);
  const projectTitle = projectData?.title;

  // 달력 선택 날짜 가져옴
  const date = useContext(DateContext);
  const condition = dayjs(date?.selectedDate).format("YYYY-MM-DD") ?? "";
  console.log(`condition : ${condition}`);

  const [scheduleData, setSchdeuleData] = useState<ScheduleAllMembersResDto[]>(
    []
  );

  // 전체멤버 스케줄 데이터 가져옴
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const fetchSchedule = async () => {
      try {
        const response = await fetch(
          `${Http}/v1/projects/${projectId}/schedules?condition=${condition}`,
          {
            method: "GET",
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch pinned projects");
        }

        const data = await response.json();
        console.log("멤버 스케줄", data.data);
        setSchdeuleData(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSchedule();
  }, [projectId, condition, isEditModal]);

  return (
    <Box>
      <Title>{projectTitle} 시간표</Title>
      <TeamTime scheduleData={scheduleData} />
    </Box>
  );
};

export default TeamSchedule;
