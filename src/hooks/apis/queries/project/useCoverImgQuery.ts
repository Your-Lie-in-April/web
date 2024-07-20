import { getCoverImg } from '@apis/project';
import { QUERY_KEY } from '@constants/queryKey';
import { useQuery } from '@tanstack/react-query';

/**
 * GET /v1/covers
 *
 * 커버 이미지 메타데이터 조회하는 api 입니다.
 */

const useCoverImgQuery = () => {
    return useQuery({
        queryKey: QUERY_KEY.COVER_IMG,
        queryFn: async () => {
            const page0Data = await getCoverImg(0);
            const page1Data = await getCoverImg(1);

            return page0Data.data.map((item, index) => ({
                page0: item,
                page1: page1Data.data[index],
            }));
        },
        staleTime: 60000 * 10,
        gcTime: 60000 * 2,
    });
};

export default useCoverImgQuery;
