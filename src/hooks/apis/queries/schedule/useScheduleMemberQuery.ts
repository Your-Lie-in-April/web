import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '#/constants/queryKey';
import { getScheduleMember } from '#/apis/schedule';
/**
 * GET /v1/schedules/all
 *
 * 시간표 전체를 조회하는 api 입니다.
 */
const useScheduleMemberQuery = (projectId: number, memberId: number) => {
    return useQuery({
        queryKey: QUERY_KEY.SCHEDULE_MEMBER(projectId, memberId),
        queryFn: () => getScheduleMember(projectId, memberId),
    });
};

export default useScheduleMemberQuery;
