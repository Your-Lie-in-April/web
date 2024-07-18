import { postNewProject } from '@apis/project';
import { useMutation } from '@tanstack/react-query';
import { ProjectPostReqDto } from '@/types/projectType';

/**
 * POST /project
 *
 * 프로젝트 생성하는 api 입니다.
 */

const usePostProjectMutation = () => {
    return useMutation({
        mutationFn: (body: ProjectPostReqDto) => postNewProject(body),
    });
};

export default usePostProjectMutation;
