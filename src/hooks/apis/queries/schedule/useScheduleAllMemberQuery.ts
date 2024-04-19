import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '#/constants/queryKey';
import { getScheduleAllMember } from '#/apis/schedule';
/**
 * GET /v1/projects/{projectId}/schedules
 *
 * 프로젝트 내 모든 사용자 시간표 조회하는 api 입니다.
 */
const useScheduleAllMemberQuery = (projectId: number) => {
    return useQuery({
        queryKey: QUERY_KEY.SCHEDULE_PROJECT(projectId),
        queryFn: () => getScheduleAllMember(projectId),
    });
};

export default useScheduleAllMemberQuery;
