import { getCoverImgId } from '@apis/project';
import { QUERY_KEY } from '@constants/queryKey';
import { useQuery } from '@tanstack/react-query';

/**
 * GET /cover-image/{id}
 *
 * 커버 아이디별 이미지  조회하는 api 입니다.
 */

const useCoverImgIdQuery = (id: number | null) => {
    return useQuery({
        queryKey: QUERY_KEY.COVER_IMG_ID(id!),
        queryFn: () => getCoverImgId(id!),
        enabled: !!id,
        staleTime: 6000,
        gcTime: 10000,
    });
};

export default useCoverImgIdQuery;
