import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "#/constants/queryKey";
import { getProjectMembers } from "#/apis/project";

/**
 * GET /v1/projects/{projectId}/members
 *
 * 프로젝트에 속해있는 멤버 전체 조회하는 api 입니다.
 */

const useProjectMemberQuery = (projcetId: number) => {
  return useQuery({
    queryKey: QUERY_KEY.PROJECT_ID(projcetId),
    queryFn: () => getProjectMembers(projcetId),
  });
};

export default useProjectMemberQuery;
