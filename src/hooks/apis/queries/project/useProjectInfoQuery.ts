import { getProjectInfo } from '@apis/project';
import { QUERY_KEY } from '@constants/queryKey';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

/**
 * GET /projects/{projectId}
 *
 * 특정 프로젝트(projectId) 에 대한 정보를 가져오는 api 입니다.
 */

const useProjectInfoQuery = (projectId: number) => {
    return useQuery({
        queryKey: QUERY_KEY.PROJECT_INFO(projectId),
        queryFn: () => getProjectInfo(projectId),
        placeholderData: keepPreviousData,
        staleTime: 60000 * 10,
        gcTime: 60000 * 2,
    });
};

export default useProjectInfoQuery;
