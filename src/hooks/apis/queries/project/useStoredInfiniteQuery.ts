import { ProjectStoredResponse } from '@/types/projectType';
import { getProjectIsStored } from '@apis/project';
import { QUERY_KEY } from '@constants/queryKey';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

/**
 * GET /v1/projects/stored
 *
 * 보관한 프로젝트 목록을 조회하는 api 입니다.
 */

export const useStoredInfiniteQuery = (keyword: string, size: number = 9) => {
    return useInfiniteQuery<ProjectStoredResponse, Error>({
        queryKey: QUERY_KEY.PROJECT_STORED,
        queryFn: ({ pageParam = 0 }) => getProjectIsStored(pageParam as number, size),
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPages - 1) {
                return lastPage.currentPage + 1;
            }
            return undefined;
        },
        placeholderData: keepPreviousData,
        initialPageParam: 0,
    });
};
