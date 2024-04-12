import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "#/constants/queryKey";
import { getProjectList } from "#/apis/project";

const useProjectListQuery = () => {
  return useQuery({
    queryKey: QUERY_KEY.PROJECT,
    queryFn: () => getProjectList,
  });
};

export default useProjectListQuery();
