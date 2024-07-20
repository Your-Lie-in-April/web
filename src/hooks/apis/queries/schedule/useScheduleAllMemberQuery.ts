import { getScheduleAllMember } from '@apis/schedule';
import { QUERY_KEY } from '@constants/queryKey';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
/**
 * GET /v1/projects/{projectId}/schedules
 *
 * 프로젝트 내 모든 사용자 시간표 조회하는 api 입니다.
 */
const useScheduleAllMemberQuery = (projectId: number, condition: string) => {
    return useQuery({
        queryKey: QUERY_KEY.SCHEDULE_MEMBER_ALL(projectId, condition),
        queryFn: () => getScheduleAllMember(projectId, condition),
        enabled: !!condition,
        placeholderData: keepPreviousData,
        staleTime: 60000 * 10,
        gcTime: 0,
    });
};

export default useScheduleAllMemberQuery;
