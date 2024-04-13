import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "#/constants/queryKey";
import { getPinProject } from "#/apis/project";

/**
 * GET /v1/projects/members/{memberId}/pin
 *
 * 핀 설정된 프로젝트를 조회하는 api 입니다.
 */

const useProjectPinnedQuery = (memberId : number) => {
  return useQuery({
    queryKey: QUERY_KEY.PROJECT_MEMBER(memberId),
    queryFn: () => getPinProject(memberId),
  });
};

export default useProjectPinnedQuery;
