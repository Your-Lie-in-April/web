import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../../../constants/queryKey';
import { getProjectIsStored } from '../../../../apis/project';

/**
 * GET /v1/projects/stored
 *
 * 보관한 프로젝트 목록을 조회하는 api 입니다.
 */

const useProjectStoredQuery = () => {
    return useQuery({
        queryKey: QUERY_KEY.PROJECT_STORED(),
        // queryFn: () => getProjectIsStored(),
        queryFn: async () => {
            const response = await fetch('/v1/projects/stored');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        },
    });
};

export default useProjectStoredQuery;
