import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEY } from "#/constants/queryKey";
import { postProjectInvitation } from "#/apis/project";

/**
 * POST /project/{projectId}/invitation
 */
const usePostProjectInviteMutation = (projectId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => postProjectInvitation(projectId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.PROJECT_ID(projectId),
      });
    },
  });
};

export default usePostProjectInviteMutation;
