import {
    AlarmAllResDto,
    AlarmDeleteReqDto,
    AlarmEventEntity,
    AlarmPatchReqDto,
    AlarmProjectResDto,
} from '@/types/alarmType';
import { API } from '@constants/api';
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
 * 이전 알림 조회
 * GET /v1/notifications
 * |
 * (프로젝트 내) 이전 알림 조회
 * GET /v1/projects/{projectId}/notifications
 */
export const getAlarmAll = async (
    cursor: string,
    isChecked: boolean
): Promise<AlarmEventEntity> => {
    return await getAPIResponseData<AlarmAllResDto>({
        method: 'GET',
        url: API.NOTIFICATION_ALL(cursor, isChecked),
    });
};

/*
 * (프로젝트 내) 이전 알림 조회
 * GET /v1/projects/{projectId}/notifications
 */
export const getAlarmProject = async (
    projectId: number,
    cursor: string,
    isChecked: boolean,
    size: number = 5
): Promise<AlarmEventEntity> => {
    return await getAPIResponseData<AlarmProjectResDto>({
        method: 'GET',
        url: API.NOTIFICATION_PROJECTID(projectId, cursor, isChecked, size),
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
