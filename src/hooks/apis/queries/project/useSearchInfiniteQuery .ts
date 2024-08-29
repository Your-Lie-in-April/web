import { ProjectStoredResponse } from '@/types/projectType';
import { getProjectSearch } from '@apis/project';
import { QUERY_KEY } from '@constants/queryKey';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useSearchInfiniteQuery = (
    memberId: number,
    keyword: string,
    size: number = 9,
    isStored: boolean = true
) => {
    return useInfiniteQuery<ProjectStoredResponse, Error>({
        queryKey: QUERY_KEY.SEARCH(true, keyword),
        queryFn: ({ pageParam = 0 }) =>
            getProjectSearch(memberId, keyword, pageParam as number, size, isStored),
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPages - 1) {
                return lastPage.currentPage + 1;
            }
            return undefined;
        },
        enabled: !!keyword,
        initialPageParam: 0,
    });
};
