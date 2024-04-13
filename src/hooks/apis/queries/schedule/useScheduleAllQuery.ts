import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '#/constants/queryKey';
import { getScheduleAll } from '#/apis/schedule';
/**
 * GET /v1/schedules/all
 *
 * 시간표 전체를 조회하는 api 입니다.
 */
const useScheduleAllQuery = () => {
    return useQuery({
        queryKey: QUERY_KEY.SCHEDULE,
        queryFn: () => getScheduleAll,
    });
};

export default useScheduleAllQuery;
