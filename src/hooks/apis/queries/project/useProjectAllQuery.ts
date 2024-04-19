import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '#/constants/queryKey';
import { getProjectAll } from '#/apis/project';
/**
 * GET /v1/projects/all
 *
 * 프로젝트 전체를 조회하는 api 입니다.
 */
const useProjectAllQuery = () => {
    return useQuery({
        queryKey: QUERY_KEY.PROJECT,
        queryFn: () => getProjectAll,
    });
};

export default useProjectAllQuery;
