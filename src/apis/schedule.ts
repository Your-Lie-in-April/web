import { API } from '#/constants/api';
import {
    SchdeuleDeleteReqDto,
    ScheduleAllMembersResDto,
    ScheduleMemberResDto,
    SchedulePostReqDto,
    SchedulePutReqDto,
} from '#/types/scheduleType';
import getAPIResponseData from '#/utils/getAPIResponseData';

// 프로젝트 내 모든 사용자 시간표 조회
export const getScheduleAllMember = async (projectId: number) => {
    return await getAPIResponseData<ScheduleAllMembersResDto>({
        method: 'GET',
        url: API.SCHEDULE_MEMBERS(projectId),
    });
};

// 특정 사용자 시간표 조회
export const getScheduleMember = async (projectId: number, memberId: number, condition: string) => {
    return await getAPIResponseData<ScheduleMemberResDto>({
        method: 'GET',
        url: API.SCHEDULE_MY(projectId, memberId),
        params: { condition },
    });
};

// 시간표 생성
export const postSchedule = async (projectId: number) => {
    return await getAPIResponseData<SchedulePostReqDto>({
        method: 'POST',
        url: API.SCHEDULE_POST(projectId),
    });
};

// 시간표 수정
export const putSchedule = async (projectId: number) => {
    return await getAPIResponseData<SchedulePutReqDto>({
        method: 'PUT',
        url: API.SCHEDULE_PUT(projectId),
    });
};

// 시간표 삭제
export const deleteSchedule = async (projectId: number) => {
    return await getAPIResponseData<SchdeuleDeleteReqDto>({
        method: 'DELETE',
        url: API.SCHEDULE_DELETE(projectId),
    });
};
