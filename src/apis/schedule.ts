import { API } from '@constants/api';
import {
    ScheduleAllMembersResDto,
    ScheduleData,
    ScheduleMemberResDto,
    SchedulePostReqDto,
    SchedulePutReqDto,
    ScheduleTeamResDto,
} from '@/types/scheduleType';
import getAPIResponseData from '@utils/getAPIResponseData';

// 프로젝트 내 모든 사용자 시간표 조회
export const getScheduleAllMember = async (projectId: number, condition: string) => {
    return await getAPIResponseData<ScheduleAllMembersResDto>({
        method: 'GET',
        url: API.SCHEDULE_MEMBERS(projectId, condition),
    });
};

// 특정 사용자 시간표 조회
export const getScheduleMember = async (projectId: number, memberId: number, condition: string) => {
    return await getAPIResponseData<ScheduleMemberResDto>({
        method: 'GET',
        url: API.SCHEDULE_MY(projectId, memberId, condition),
    });
};

// 팀 코어 시간표 조회
export const getScheduleTeam = async (projectId: number, condition: string) => {
    return await getAPIResponseData<ScheduleTeamResDto>({
        method: 'GET',
        url: API.SCHEDULE_TEAM(projectId, condition),
    });
};

// 시간표 생성
export const postSchedule = async (projectId: number, scheduleData: ScheduleData) => {
    return await getAPIResponseData<SchedulePostReqDto>({
        method: 'POST',
        url: API.SCHEDULE_POST(projectId),
        data: scheduleData,
    });
};

// 시간표 수정
export const putSchedule = async (projectId: number, scheduleData: ScheduleData) => {
    return await getAPIResponseData<SchedulePutReqDto>({
        method: 'PUT',
        url: API.SCHEDULE_PUT(projectId),
        data: scheduleData,
    });
};
