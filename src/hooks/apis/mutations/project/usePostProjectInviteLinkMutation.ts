import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@constants/queryKey";
import { postProjectInviteLink } from "@apis/project";

/**
 * POST /project/{projectId}/invitation
 * 
 * 프로젝트의 회원 초대 링크 생성하는 api 입니다.
 */
const usePostProjectInviteLinkMutation = (projectId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => postProjectInviteLink(projectId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.PROJECT_ID(projectId),
      });
    },
  });
};

export default usePostProjectInviteLinkMutation;
