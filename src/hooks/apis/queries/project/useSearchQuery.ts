import { getProjectSearch } from '@apis/project';
import { QUERY_KEY } from '@constants/queryKey';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

/**
 * GET /projects/members/{memberId}/{keyword}
 *
 * 프로젝트 검색하는 api 입니다.
 */

const useSearchQuery = (
    memberId: number,
    keyword: string,
    page: number = 0,
    size: number = 9,
    isStored: boolean = false
) => {
    return useQuery({
        queryKey: QUERY_KEY.SEARCH(keyword),
        queryFn: () => getProjectSearch(memberId, keyword, page, size, isStored),
        enabled: keyword.length > 0,
        placeholderData: keepPreviousData,
        staleTime: 0,
        gcTime: 0,
    });
};

export default useSearchQuery;
