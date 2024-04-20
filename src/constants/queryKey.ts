type Id = number;

export const QUERY_KEY = {
    MEMBER: ['member'],
    MEMBER_ID: (memberId: Id) => ['member', memberId],
    MEMBER_STATE: ['member', 'state'],
    MEMBER_PROJECT: (projectId?: Id) => ['member', projectId],

    PROJECT: ['project'],
    PROJECT_ID: (projectId: Id) => ['project', projectId],
    PROJECT_MEMBER: (memberId: Id) => ['project', memberId],
    PROJECT_SEARCH: (memberId: Id, keyword: string) => [
        'project',
        memberId,
        keyword,
    ],
    PROJECT_AND_MEMBER: (projectId: Id, memberId: Id) => [
        'project',
        projectId,
        memberId,
    ],
    PROJECT_STORED: () => ['project', { isStored: true }],

    SCHEDULE: ['schedule'],
    SCHEDULE_PROJECT: (projectId: Id) => ['schedule', projectId],
    SCHEDULE_MEMBER: (projectId: Id, memberId?: Id) => [
        'schedule',
        projectId,
        memberId,
    ],
    SCHEDULE_SHOW: (projectId: Id, scheduleDayRequst: list) => [
        'schedule',
        projectId,
        scheduleDayRequst,
    ],
};
