import { ProjectPagination, ProjectThumbnailInfo } from '@/types/projectType';
import { getProjectMain } from '@apis/project';
import { QUERY_KEY } from '@constants/queryKey';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useMainPaginationMutation = (
    memberId: number,
    initialPage: number = 0,
    pageSize: number = 6
) => {
    const [currentPage, setCurrentPage] = useState<number>(initialPage);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [projects, setProjects] = useState<ProjectThumbnailInfo[]>([]);

    const queryClient = useQueryClient();

    useEffect(() => {
        const prefetchPage = async (page: number) => {
            if (page >= 0 && page < totalPages) {
                await queryClient.prefetchQuery({
                    queryKey: QUERY_KEY.PROJECT_MAIN(page),
                    queryFn: () => getProjectMain(memberId, page, pageSize),
                });
            }
        };
        prefetchPage(currentPage - 1);
        prefetchPage(currentPage + 1);
    }, [currentPage, totalPages, queryClient, memberId, pageSize]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page - 1);
    };

    const updatePaginationData = (data: ProjectPagination) => {
        if (data) {
            setTotalPages(Number(data.totalPages));
            setTotalCount(Number(data.totalCount));
            setProjects(data.data);
        }
    };

    return {
        currentPage,
        totalPages,
        totalCount,
        projects,
        handlePageChange,
        updatePaginationData,
    };
};
