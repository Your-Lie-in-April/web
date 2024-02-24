import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEY } from "#/constants/queryKey";
import { deleteProject } from "#/apis/project";

/**
 * DELETE projects/{projectId}
 */
const useDeleteProjectMutation = (projectId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteProject(projectId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.PROJECT,
      });
    },
  });
};

export default useDeleteProjectMutation;
