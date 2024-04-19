import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "#/constants/queryKey";
import { getProjectThumbnail } from "#/apis/project";

/**
 * GET /projects/members/{memberId}
 * 
 * 멤버(memberId)이 소속한 프로젝트를 조회하는 api 입니다. 
 */

const useProjectThumbnailQuery = (memberId: number) => {
  return useQuery({
    queryKey: QUERY_KEY.PROJECT_MEMBER(memberId),
    queryFn: () => getProjectThumbnail(memberId),
  });
};

export default useProjectThumbnailQuery;
