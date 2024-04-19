import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "#/constants/queryKey";
import { patchPojectPrevilege } from "#/apis/project";

/**
 * PATCH /projects/{projectId}/transfer-privilege
 * 
 * 관리자 권한을 양도하는 api 입니다.
 */
const usePatchPojectPrevilegeMutation = (projectId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => patchPojectPrevilege(projectId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.PROJECT_ID(projectId),
      });
    },
  });
};

export default usePatchPojectPrevilegeMutation;
