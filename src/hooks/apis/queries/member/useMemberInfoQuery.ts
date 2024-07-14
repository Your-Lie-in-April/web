import { getMemberInfo } from '#/apis/member';
import { QUERY_KEY } from '#/constants/queryKey';
import { MemberGetResDto } from '#/types/memberType';
import { useQuery } from '@tanstack/react-query';

/**
 * GET /members/${memberId}
 * memberId 로 멤버 정보를 조회하는 API입니다.
 * @param memberId
 * @returns
 */
const useMemberInfoQuery = (memberId: number) => {
    return useQuery<MemberGetResDto>({
        queryKey: QUERY_KEY.MEMBER_ID(memberId),
        queryFn: () => getMemberInfo(memberId),
        enabled: !!memberId,
    });
};

export default useMemberInfoQuery;
