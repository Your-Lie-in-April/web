import { getScheduleMember } from '@apis/schedule';
import { QUERY_KEY } from '@constants/queryKey';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
/**
 * GET /v1/projects/{projectId}/members/{memberId}/schedules
 *
 * 프로젝트 안에서 특정 유저가 작성한 시간표 출력하는 api 입니다.
 */
const useScheduleMemberQuery = (projectId: number, memberId: number, condition: string) => {
    return useQuery({
        queryKey: QUERY_KEY.SCHEDULE_MEMBER(projectId, memberId, condition),
        queryFn: () => getScheduleMember(projectId, memberId, condition),
        gcTime: 0,
        placeholderData: keepPreviousData,
    });
};

export default useScheduleMemberQuery;
