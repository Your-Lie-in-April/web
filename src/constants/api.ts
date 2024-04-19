type Id = number;

export const API = {
    MEMBER: '/v1/members/all',
    MEMBER_ID: (memberId?: Id) => `/v1/members/${memberId ?? ':memberId'}`,
    MEMBER_STATE: (state?: string) => `/v1/members/${state ?? ':state'}`,
    MEMBER_NICKNAME: '/v1/projects/members/nickname',
    MEMBER_STORAGE_PROJECT: (memberId?: Id) =>
        `/v1/members/storage/${memberId ?? ':memberId'}`,
    MEMBER_PIN_PROJECT: (projectId?: Id) =>
        `/v1//members/pin/${projectId ?? ':projectId'}`,

    PROJECT_ALL: '/v1/projects/all',
    PROJECT_THUMBNAIL: (memberId?: Id) =>
        `/v1/projects/members/${memberId ?? ':memberId'}`,
    PROJECT_PIN: (memberId?: Id) =>
        `/v/projects/members/${memberId ?? ':memberId'}/pin`,
    PROJECT_SEARCH: (memberId?: Id, keyword?: string) =>
        `/v1/projects/members/${memberId ?? ':memberId'}/${
            keyword ?? ':keyword'
        }`,
    PROJECT_MEMBERS: (projectId?: Id) =>
        `/v1/projects/${projectId ?? ':projectId'}/members`,
    PROJECT: '/v1//projects',
    PROJECT_ID: (projectId?: Id) => `/v1/projects/${projectId ?? ':projectId'}`,
    PROJECT_INVITATION_LINK: (projectId?: Id) =>
        `/v1/projects/${projectId ?? `:projectId`}/invitation`,
    PROJECT_REMOVE_MEMBER: (projectId?: Id, memberId?: Id) =>
        `/v1/projects/${projectId ?? ':projectId'}/members/${
            memberId ?? ':memberId'
        }`,
    PROJECT_INVITE_MEMBER: (url: string) => `/v1/invitation/${url}`,
    PROJECT_TRANSFER_PREVILEGE: (projectId?: Id) =>
        `/v1/projects/${projectId ?? ':projectId'}/transfer-privilege`,
    PROJECT_SELF_OUT: (projectId?: Id) =>
        `/v1/projects/${projectId ?? ':projectId'}/me`,
    PROJECT_STORED: '/v1/projects/stored',

    SCHEDULE_ALL: `/v1/schedules/all`,
    SCHEDULE_PROJECT: (projectId?: Id) =>
        `/v1/projects/${projectId ?? ':projectId'}/schedules`,
    SCHEDULE_MEMBER: (projectId?: Id, memberId?: Id) =>
        `/v1/projects/${projectId ?? ':projectId'}/members/${
            memberId ?? ':memberId'
        }/schedules`,
    SCEHDULE_CRUD: (projectId?: Id) =>
        `/v1/projects/${projectId ?? ':projectId'}/schedules`,
} as const;
