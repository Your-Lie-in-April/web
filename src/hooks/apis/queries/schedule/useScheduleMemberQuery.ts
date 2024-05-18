import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '#/constants/queryKey';
import { getScheduleMember } from '#/apis/schedule';
/**
 * GET /v1/projects/{projectId}/members/{memberId}/schedules
 *
 * 프로젝트 안에서 특정 유저가 작성한 시간표 출력하는 api 입니다.
 */
const useScheduleMemberQuery = (
    projectId: number,
    memberId: number,
    condition: string
) => {
    return useQuery({
        queryKey: QUERY_KEY.SCHEDULE_MEMBER(projectId, memberId, condition),
        queryFn: () => getScheduleMember(projectId, memberId, condition),
    });
};

export default useScheduleMemberQuery;
