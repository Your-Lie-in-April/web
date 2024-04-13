import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '#/constants/queryKey';
import { getMemberInfo } from '#/apis/member';
/**
 * GET /members/${memberId}
 * 
 * memberId 로 멤버정보를 조회하는 api 입니다. 
 */
const useMemberIdQuery = (memberId : number) => {
    return useQuery({
        queryKey: QUERY_KEY.MEMBER_ID(memberId),
        queryFn: () => getMemberInfo,
    });
};

export default useMemberIdQuery;
