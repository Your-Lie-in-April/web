import { ProjectMemberResDto } from '@/types/projectType';
import { getProjectMembers } from '@apis/project';
import { QUERY_KEY } from '@constants/queryKey';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

/**
 * GET /v1/projects/{projectId}/members
 *
 * 프로젝트에 속해있는 멤버 전체 조회하는 api 입니다.
 */

const useProjectMemberQuery = (
    projectId: number,
    options?: Omit<
        UseQueryOptions<ProjectMemberResDto, Error, ProjectMemberResDto, QueryKey>,
        'queryKey' | 'queryFn'
    > & {
        onSuccess?: (data: ProjectMemberResDto) => void;
    }
) => {
    return useQuery<ProjectMemberResDto, Error>({
        queryKey: QUERY_KEY.MEMBER_ALL_PROJECT(projectId),
        queryFn: () => getProjectMembers(projectId),
        staleTime: 60000 * 10,
        gcTime: 0,
        ...options,
    });
};

export default useProjectMemberQuery;
