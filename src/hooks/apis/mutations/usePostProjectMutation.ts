import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "#/constants/queryKey";
import { postNewProject } from "#/apis/project";
import { ProjectPostReqDto } from "#/Types/project";

/**
 * POST /project
 */
const usePostProjectMutation = (body: ProjectPostReqDto) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => postNewProject(body),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.PROJECT,
      });
    },
  });
};

export default usePostProjectMutation;
