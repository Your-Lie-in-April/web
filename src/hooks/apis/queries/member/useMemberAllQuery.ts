import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '#/constants/queryKey';
import { getMemberAll } from '#/apis/member';
/**
 * GET /v1/members/all
 *
 * 멤버 전체를 조회하는 api 입니다.
 */
const useMemberAllQuery = () => {
    return useQuery({
        queryKey: QUERY_KEY.MEMBER,
        queryFn: () => getMemberAll,
    });
};

export default useMemberAllQuery;
