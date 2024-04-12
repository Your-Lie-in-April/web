import { API } from '#/constants/api';
import getAPIResponseData from '#/utils/getAPIResponseData';
import {} from '#/types/member';

// 시간표 전체 조회
export const getScheduleAll = async () => {
    return await getAPIResponseData<>({
        method: 'GET',
        url: API.SCHEDULE_ALL,
    });
};

// 프로젝트 내 모든 사용자 시간표 조회
export const getScheduleAllMember = async (projectId: number) => {
    return await getAPIResponseData<>({
        method: 'GET',
        url: API.SCHEDULE_PROJECT(projectId),
    });
};

// 사용자 시간표 조회
export const getScheduleMember = async (
    projectId: number,
    memberId: number
) => {
    return await getAPIResponseData<>({
        method: 'GET',
        url: API.SCHEDULE_MEMBER(projectId, memberId),
    });
};

// 시간표 생성
export const postSchedule = async (projectId: number) => {
    return await getAPIResponseData<>({
        method: 'POST',
        url: API.SCEHDULE_CRUD(projectId),
    });
};

// 시간표 수정
export const putSchedule = async (projectId: number) => {
    return await getAPIResponseData<>({
        method: 'PUT',
        url: API.SCEHDULE_CRUD(projectId),
    });
};

// 시간표 삭제
export const deleteSchedule = async (projectId: number) => {
    return await getAPIResponseData<>({
        method: 'DELETE',
        url: API.SCEHDULE_CRUD(projectId),
    });
};
