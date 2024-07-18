import { getAllMemberInfo } from '@apis/member';
import { QUERY_KEY } from '@constants/queryKey';
import { useQuery } from '@tanstack/react-query';
import { AllMemGetResDto } from '@/types/memberType';

/**
 * GET projects/{projectId}/members
 * projectId 로 멤버 정보를 조회하는 API입니다.
 * @param projectId
 */

const useAllMemberInfoQuery = (projectId: number) => {
    return useQuery<AllMemGetResDto>({
        queryKey: QUERY_KEY.MEMBER_ALL_PROJECT(projectId),
        queryFn: () => getAllMemberInfo(projectId),
        enabled: !!projectId,
        gcTime: 0,
    });
};

export default useAllMemberInfoQuery;
