export const QUERY_KEY = {
    // 멤버 관련 쿼리키 ---------------------------------------------------
    MEMBER_ID: (memberId: number) => ['member', memberId],
    MEMBER_STATE: ['member', 'state'],
    MEMBER_PROJECT: (projectId?: number) => ['member', projectId],
    MEMBER_ALL_PROJECT: (projectId?: number) => ['member', 'all', projectId],

    // 프로젝트 관련 쿼리키 -----------------------------------------------
    PROJECT: ['project'],
    PROJECT_ID: (projectId: number) => ['project', projectId],
    PROJECT_INFO: (projectId: number) => ['project', projectId, 'info'],
    PROJECT_MAIN: (page: number) => ['project', 'main', page],
    PROJECT_STORED: ['project', 'stored'],
    PROJECT_PIN: ['project', 'pin'],
    PROJECT_INVITATION: (projectId: number) => ['project', 'invite', projectId],
    PROJECT_IVITE_INFO: (url: string) => ['invite', 'info', url],
    COVER_IMG: ['covers'],
    SEARCH: (keyword: string) => ['project', 'search', keyword],

    // 스케줄 관련 쿼리키 -----------------------------------------------
    SCHEDULE: ['schedule'],
    SCHEDULE_TEAM: (projectId: number, condition: string) => [
        'schedule',
        projectId,
        'team',
        condition,
    ],
    SCHEDULE_MEMBER: (projectId: number, memberId: number, condition: string) => [
        'schedule',
        projectId,
        memberId,
        condition,
    ],
    SCHEDULE_MEMBER_ALL: (projectId: number, condition: string) => [
        'schedule',
        projectId,
        'members',
        condition,
    ],

    // 알람 관련 쿼리키
    ALARM_SSE: ['alarm', 'sse'],
    ALARM_ALL: (isChecked?: boolean) => ['alarm', isChecked],
    ALARM_PROJECT: (projectId: number, isChecked?: boolean) => [
        'project',
        projectId,
        'alarm',
        isChecked,
    ],
};
