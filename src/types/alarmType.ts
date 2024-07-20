export type AlarmEntity = {
    notificationId: number;
    message: string;
    project: {
        projectId: number;
        title: string;
    };
    receiver: {
        memberId: number;
        nickname: string;
    };
    sender: {
        memberId: number;
        nickname: string;
    };
    type: string;
    isChecked: boolean;
    createdAt: string;
};

export type AlarmEventEntity = {
    pageSize: number;
    nextCursor: string | null;
    hasMore: boolean;
    data: AlarmEntity[];
};

/**
 * 알림 읽음 처리
 * PATCH /v1/projects/notifications/{notificationId}
 */
export type AlarmPatchReqDto = null;

/**
 * (프로젝트 내) 이전 알림 조회
 * GET /v1/projects/{projectId}/notifications
 */
export type AlarmProjectResDto = AlarmEventEntity;

/**
 * 이전 알림 조회
 * GET /v1/notifications
 */
export type AlarmAllResDto = AlarmEventEntity;

/**
 * 알림 삭제
 * DELETE /v1/notifications/{notificationId}
 */
export type AlarmDeleteReqDto = null;
