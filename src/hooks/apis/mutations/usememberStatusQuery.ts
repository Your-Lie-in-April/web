import { useQuery } from 'react-query';
import { QUERY_KEY } from '#/constants/queryKey';
import { getMemberStatus } from '#/apis/member';

const useMemberStatusQuery = () => {
    return useQuery({
        queryKey: QUERY_KEY.MEMBER_STATUS,
        queryFn: () => getMemberStatus(),
    });
};
