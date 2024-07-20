import { getProjectMain } from '@apis/project';
import { QUERY_KEY } from '@constants/queryKey';
import { useQuery } from '@tanstack/react-query';

/**
 * GET /projects/members/{memberId}
 *
 * 멤버(memberId)이 소속한 프로젝트를 조회하는 api 입니다.
 */

const useProjectMainQuery = (memberId: number, page: number = 0, size: number = 6) => {
    return useQuery({
        queryKey: QUERY_KEY.PROJECT_MAIN(page),
        queryFn: () => getProjectMain(memberId, page, size),
        staleTime: 60000 * 10,
    });
};

export default useProjectMainQuery;
