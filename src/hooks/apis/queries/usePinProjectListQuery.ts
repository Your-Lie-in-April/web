import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "#/constants/queryKey";
import { getPinProjectList } from "#/apis/project";

const usePinProjectListQuery = () => {
  return useQuery({
    queryKey: QUERY_KEY.PROJECT_PIN,
    queryFn: () => getPinProjectList,
  });
};

export default usePinProjectListQuery();
