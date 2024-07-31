export const Http = import.meta.env.VITE_API_URL;

export const API = {
    // member-controller
    MEMBER_GET: (memberId?: number) => `${Http}/v1/members/${memberId ?? ':memberId'}`,
    MEMBER_NICKNAME: (projectId?: number, nickname?: string) =>
        `${Http}/v2/projects/members/nickname?projectId=${projectId}&nickname=${nickname}`,

    MEMBER_STATE: (state?: string) => `${Http}/v1/members/${state ?? ':state'}`,
    MEMBER_STORAGE: (projectId?: number) =>
        `${Http}/v1/members/storage/${projectId ?? ':projectId'}`,
    MEMBER_PIN: (projectId?: number) => `${Http}/v1/members/pin/${projectId ?? ':projectId'}`,

    // project-controller
    PROJECT_GET: (projectId?: number) => `${Http}/v1/projects/${projectId ?? ':projectId'}`,
    PROJECT_PUT: (projectId?: number) => `${Http}/v1/projects/${projectId ?? ':projectId'}`,
    PROJECT_DELETE: (projectId?: number) => `${Http}/v1/projects/${projectId ?? ':projectId'}`,
    PROJECT_POST: `${Http}/v1/projects`,

    PROJECT_INVITATION_LINK: (projectId?: number) =>
        `${Http}/v1/projects/${projectId ?? `:projectId`}/invitation`,
    PROJECT_INVITATION_MEM: (url?: string) => `${Http}/v1/invitation/${url}`,
    PROJECT_INVITATION_INFO: (url: string) => `${Http}/v1/projects/invitations?url=${url}`,

    PROJECT_TRANSFER_PREVILEGE: (projectId?: number) =>
        `${Http}/v1/projects/${projectId ?? ':projectId'}/transfer-privilege`,
    PROJECT_IN_MEMBERS: (projectId?: number) =>
        `${Http}/v1/projects/${projectId ?? ':projectId'}/members`,
    PROJECT_STORED: (page: number = 0, size: number = 9) =>
        `${Http}/v1/projects/stored?page=${page}&size=${size}`,
    PROJECT_MAIN: (memberId?: number, page: number = 0, size: number = 6) =>
        `${Http}/v1/projects/members/${memberId ?? ':memberId'}?page=${page}&size=${size}`,
    PROJECT_PIN: (memberId?: number) =>
        `${Http}/v1/projects/members/${memberId ?? ':memberId'}/pin`,

    PROJECT_COVER_IMG: `${Http}/v1/covers`,
    PROJECT_DELETE_MEMBER: (projectId?: number, memberId?: number) =>
        `${Http}/v1/projects/${projectId ?? ':projectId'}/members/${memberId ?? ':memberId'}`,
    PROJECT_DELETE_ME: (projectId?: number) =>
        `${Http}/v1/projects/${projectId ?? ':projectId'}/me`,
    COVER_IMG: (page: number) => `${Http}/v1/covers?page=${page}&size=10`,
    SEARCH: (memberId: number, keyword: string, page: number, size: number, isStored: boolean) =>
        `${Http}/v1/projects/members/${memberId}/${encodeURIComponent(keyword)}?page=${page}&size=${size}&isStored=${isStored}`,

    // schedule-controller
    SCHEDULE_GET: (projectId?: number) =>
        `${Http}/v1/projects/${projectId ?? ':projectId'}/schedules`,
    SCHEDULE_PUT: (projectId?: number) =>
        `${Http}/v1/projects/${projectId ?? ':projectId'}/schedules`,
    SCHEDULE_POST: (projectId?: number) =>
        `${Http}/v1/projects/${projectId ?? ':projectId'}/schedules`,
    SCHEDULE_DELETE: (projectId?: number) =>
        `${Http}/v1/projects/${projectId ?? ':projectId'}/schedules`,
    SCHEDULE_MEMBERS: (projectId?: number, condition?: string) =>
        `${Http}/v2/projects/${projectId ?? ':projectId'}/schedules?condition=${condition}`,
    SCHEDULE_MY: (projectId?: number, memberId?: number, condition?: string) =>
        `${Http}/v1/projects/${projectId ?? ':projectId'}/members/${
            memberId ?? ':memberId'
        }/schedules?condition=${condition ?? ':condition'}`,
    SCHEDULE_TEAM: (projectId?: number, condition?: string) =>
        `${Http}/v1/projects/${projectId ?? ':projectId'}/schedules?condition=${condition}`,

    // auth-controller
    TOKEN_REISSUE: `${Http}/v1/auth/reissue`,

    // notification-controller
    NOTIFICATION_PATCH: (notificationId?: number) =>
        `${Http}/v1/projects/notifications/${notificationId ?? ':notificationId'}`,
    NOTIFICATION_SSE: `${Http}/v1/sse/subscribe`,
    NOTIFICATION_PROJECTID: (
        projectId: number,
        cursor: string,
        isChecked: boolean = true,
        size: number = 16
    ) =>
        `${Http}/v1/projects/${projectId}/notifications?cursor=${cursor}&isChecked=${isChecked}&size=${size}`,
    NOTIFICATION_ALL: (cursor: string, isChecked: boolean = true, size: number = 16) =>
        `v1/notifications?cursor=${cursor}&isChecked=${isChecked}&size=${size}`,
    NOTIFICATION_DELETE: (notificationId?: number) =>
        `${Http}/v1/notifications/${notificationId ?? ':notificationId'}`,
} as const;
