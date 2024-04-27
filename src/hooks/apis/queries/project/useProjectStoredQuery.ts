import { getProjectIsStored } from '#/apis/project';
import { QUERY_KEY } from '#/constants/queryKey';
import { ProjectStoreResDto } from '#/types/member';
import { useQuery } from '@tanstack/react-query';

/**
 * GET /v1/projects/stored
 *
 * 보관한 프로젝트 목록을 조회하는 api 입니다.
 */

export const useProjectStoredQuery = () => {
    const fallback: ProjectStoreResDto[] = [];

    const { data = fallback } = useQuery({
        queryKey: QUERY_KEY.PROJECT_STORED(),
        queryFn: () => getProjectIsStored(),
    });
    return data;
};
