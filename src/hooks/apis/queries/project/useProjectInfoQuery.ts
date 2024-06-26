import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '#/constants/queryKey';
import { getProjectInfo } from '#/apis/project';

/**
 * GET /projects/{projectId}
 *
 * 특정 프로젝트(projectId) 에 대한 정보를 가져오는 api 입니다.
 */

const useProjectInfoQuery = (projectId: number) => {
    return useQuery({
        queryKey: QUERY_KEY.PROJECT_INFO(projectId),
        queryFn: () => getProjectInfo(projectId),
    });
};

export default useProjectInfoQuery;
