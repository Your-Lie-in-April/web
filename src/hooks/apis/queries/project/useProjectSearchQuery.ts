import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '#/constants/queryKey';
import { getProjectSearch } from '#/apis/project';

/**
 * GET /v1/projects/members/{memberId}/{keyword}
 *
 * 유저가 가지고 있는 프로젝트 중 검색 기능하는 api 입니다.
 */

const useProjectSearchQuery = (memberId: number, keyword: string) => {
    return useQuery({
        queryKey: QUERY_KEY.PROJECT_SEARCH(memberId, keyword),
        queryFn: () => getProjectSearch(memberId, keyword),
    });
};

export default useProjectSearchQuery;
