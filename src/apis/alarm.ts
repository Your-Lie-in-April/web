import { API } from '@constants/api';
import {
    AlarmAllResDto,
    AlarmDeleteReqDto,
    AlarmPatchReqDto,
    AlarmProjectResDto,
} from '@/types/alarmType';
import getAPIResponseData from '@utils/getAPIResponseData';

/**
 * 알림 읽음 처리
 * PATCH /v1/projects/notifications/{notificationId}
 */
export const patchAlarm = async (notificationId: number) => {
    return await getAPIResponseData<AlarmPatchReqDto>({
        method: 'PATCH',
        url: API.NOTIFICATION_PATCH(notificationId),
    });
};

/**
 * (프로젝트 내) 이전 알림 조회
 * GET /v1/projects/{projectId}/notifications
 */
export const getAlarmProjectId = async (projectId: number, page: number = 0, size: number = 12) => {
    return await getAPIResponseData<AlarmProjectResDto>({
        method: 'GET',
        url: API.NOTIFICATION_PROJECTID(projectId, page, size),
    });
};

/**
 * 이전 알림 조회
 * GET /v1/notifications
 */
export const getAlarmAll = async (page: number = 0, size: number = 12) => {
    return await getAPIResponseData<AlarmAllResDto>({
        method: 'GET',
        url: API.NOTIFICATION_ALL(page, size),
    });
};

/**
 * 알림 삭제
 * DELETE /v1/notifications/{notificationId}
 */
export const deleteAlarm = async (notificationId: number) => {
    return await getAPIResponseData<AlarmDeleteReqDto>({
        method: 'DELETE',
        url: API.NOTIFICATION_DELETE(notificationId),
    });
};
