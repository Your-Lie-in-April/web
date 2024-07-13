export type ScheduleItem = {
    startTime: string;
    endTime: string;
};

export type DaySchedule = {
    daysOfWeek: string;
    schedule: ScheduleItem[];
};

export type UserSchedule = {
    nickname: string;
    schedule: DaySchedule[];
};

export type ScheduleWeekResponse = UserSchedule;

export type ScheduleCreateUpsateRequest = {
    projectId: number;
    schedule: DaySchedule[];
};

// GET /v1/projects/{projectId}/schedules
// 프로젝트 보인 제외 모든 사용자 시간표 조회시 응답객체
export type ScheduleAllMembersResDto = UserSchedule[];

// GET /v1/projects/{projectId}/members/{memberId}/schedules
// 프로젝트 내 특정 유저가 작성한 시간표 조회시 응답객체
export type ScheduleMemberResDto = UserSchedule;

// POST /v1/projects/{projectId}/schedules
// 프로젝트 생성시 응답객체
export type SchedulePostReqDto = null;

// PUT /v1/projects/{projectId}/schedules
// 프로젝트 수정시 응답객체
export type SchedulePutReqDto = null;

// DELETE /v1/projects/{projectId}/schedules
// 프로젝트 삭제시 응답객체
export type SchdeuleDeleteReqDto = null;
