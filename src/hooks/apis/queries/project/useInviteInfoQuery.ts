import { getProjectInviteInfo } from '@apis/project';
import { QUERY_KEY } from '@constants/queryKey';
import { useQuery } from '@tanstack/react-query';

/**
 * GET /projects/invitations
 *
 * 초대 프로젝트 메타정보를 가져오는 api 입니다.
 */

const useInviteInfoQuery = (url: string) => {
    return useQuery({
        queryKey: QUERY_KEY.PROJECT_IVITE_INFO(url),
        queryFn: () => getProjectInviteInfo(url),
        gcTime: 0,
    });
};

export default useInviteInfoQuery;
