export const QUERY_KEY = {
    // 멤버 관련 쿼리키 ---------------------------------------------------
    MEMBER: ['member'],
    MEMBER_ID: (memberId: number) => ['member', memberId],
    MEMBER_STATE: ['member', 'state'],
    MEMBER_PROJECT: (projectId?: number) => ['member', projectId],

    // 프로젝트 관련 쿼리키 -----------------------------------------------
    PROJECT: ['project'],
    PROJECT_ID: (projectId: number) => ['project', projectId],
    PROJECT_INFO: (projectId: number) => ['project', projectId, 'info'],
    PROJECT_MAIN: (page: number) => ['project', 'main', page],
    PROJECT_AND_MEMBER: (projectId: number, memberId: number) => ['project', projectId, memberId],
    PROJECT_STORED: ['project', 'stored'],
    PROJECT_PIN: ['project', 'pin'],

    // 스케줄 관련 쿼리키 -----------------------------------------------
    SCHEDULE: ['schedule'],
    SCHEDULE_PROJECT: (projectId: number) => ['schedule', projectId],
    SCHEDULE_MEMBER: (projectId: number, memberId: number, condition: string) => [
        'schedule',
        projectId,
        memberId,
        condition,
    ],
    SCHEDULE_SHOW: (projectId: number, scheduleDayRequst: []) => [
        'schedule',
        projectId,
        scheduleDayRequst,
    ],
};
