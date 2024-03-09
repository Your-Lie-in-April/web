import { useQuery } from "react-query";
import { QUERY_KEY } from "#/constants/queryKey";
import { getProjectThumbnail } from "#/apis/project";

const useProjectThumbnailQuery = (memberId: number) => {
  return useQuery({
    queryKey: QUERY_KEY.PROJECT_THUMBNAIL(memberId),
    queryFn: () => getProjectThumbnail(memberId),
  });
};

export default useProjectThumbnailQuery;
