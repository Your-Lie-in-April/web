import { useQuery } from 'react-query';
import { QUERY_KEY } from '#/constants/queryKey';
import { getMemberInfo } from '#/apis/member';
/**
 * GET /members/${memberId}
 */
const useMemberIdQuery = () => {
    return useQuery({
        queryKey: QUERY_KEY.MEMBER_ID,
        queryFn: () => getMemberInfo,
    });
};

export default useMemberIdQuery();
