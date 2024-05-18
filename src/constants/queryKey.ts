type Id = number;

export const QUERY_KEY = {
    // 멤버 관련 쿼리키 ---------------------------------------------------
    MEMBER: ['member'],
    MEMBER_ID: (memberId: Id) => ['member', memberId],
    MEMBER_STATE: ['member', 'state'],
    MEMBER_PROJECT: (projectId?: Id) => ['member', projectId],

    // 프로젝트 관련 쿼리키 ---------------------------------------------------
    PROJECT: ['project'],
    PROJECT_ID: (projectId: Id) => ['project', projectId],
    PROJECT_INFO: (projectId: Id) => ['project', projectId, 'info'],
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
    PROJECT_STORED: () => ['project', 'stored'],

    // 스케줄 관련 쿼리키 ---------------------------------------------------
    SCHEDULE: ['schedule'],
    SCHEDULE_PROJECT: (projectId: Id) => ['schedule', projectId],
    SCHEDULE_MEMBER: (projectId: Id, memberId: Id, condition: string) => [
        'schedule',
        projectId,
        memberId,
        condition,
    ],
    SCHEDULE_SHOW: (projectId: Id, scheduleDayRequst: []) => [
        'schedule',
        projectId,
        scheduleDayRequst,
    ],
};
