import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "#/constants/queryKey";
import { putProject } from "#/apis/project";
import { ProjectPutReqDto } from "#/Types/project";

/**
 * PUT projects/{projectId}
 */
const usePutProjectMutation = (projectId: number, body: ProjectPutReqDto) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => putProject(projectId, body),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.PROJECT_ID(projectId),
      });
    },
  });
};

export default usePutProjectMutation;
