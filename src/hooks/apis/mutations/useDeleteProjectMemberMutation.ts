import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEY } from "#/constants/queryKey";
import { deleteProjectMember } from "#/apis/project";

/**
 * DELETE projects/{projectId}/members/{memberId}
 */
const useDeleteProjectMemberMutation = (
  projectId: number,
  memberId: number
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteProjectMember(projectId, memberId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.PROJECT_ID(projectId),
      });
    },
  });
};

export default useDeleteProjectMemberMutation;
