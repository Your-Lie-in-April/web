import { getScheduleTeam } from '@apis/schedule';
import { QUERY_KEY } from '@constants/queryKey';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
/**
 * GET /v2/projects/{projectId}/schedules
 *
 * 프로젝트 안에서 팀 코어 타임 출력하는 api 입니다.
 */
const useScheduleTeamQuery = (projectId: number, condition: string) => {
    return useQuery({
        queryKey: QUERY_KEY.SCHEDULE_TEAM(projectId, condition),
        queryFn: () => getScheduleTeam(projectId, condition),
        gcTime: 0,
        placeholderData: keepPreviousData,
    });
};

export default useScheduleTeamQuery;
