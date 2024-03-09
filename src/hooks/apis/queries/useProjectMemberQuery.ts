import { useQuery } from "react-query";
import { QUERY_KEY } from "#/constants/queryKey";
import { getProjectMember } from "#/apis/project";

const useProjectMemberQuery = (projcetId: number) => {
  return useQuery({
    queryKey: QUERY_KEY.PROJECT_ID(projcetId),
    queryFn: () => getProjectMember(projcetId),
  });
};

export default useProjectMemberQuery;
