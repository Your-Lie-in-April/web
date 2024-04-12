import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "#/constants/queryKey";
import { getProjectSearch } from "#/apis/project";

const useProjectSearchQuery = (memberId: number, keyword: string) => {
  return useQuery({
    queryKey: QUERY_KEY.PROJECT_KEYWORD(memberId, keyword),
    queryFn: () => getProjectSearch(memberId, keyword),
  });
};

export default useProjectSearchQuery;
