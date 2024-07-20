import { getPinProject } from '@apis/project';
import { QUERY_KEY } from '@constants/queryKey';
import { useQuery } from '@tanstack/react-query';

/**
 * GET /v1/projects/members/{memberId}/pin
 *
 * 핀 설정된 프로젝트를 조회하는 api 입니다.
 */

const useProjectPinnedQuery = (memberId: number) => {
    return useQuery({
        queryKey: QUERY_KEY.PROJECT_PIN,
        queryFn: () => getPinProject(memberId),
        staleTime: 60000 * 10,
    });
};

export default useProjectPinnedQuery;
