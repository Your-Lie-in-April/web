type ScheduleItem = {
    startAt: string;
    endAt: string;
};

type DaySchedule = {
    dayOfWeek: string;
    schedule: ScheduleItem[];
};

type UserSchedule = {
    nickname: string;
    schedule: DaySchedule[];
};

export type ScheduleWeekResponse = UserSchedule;

export type ScheduleCreateUpsateRequest = {
    projectId: number;
    schedule: DaySchedule[];
};

// GET /v1/schedules/all
// 시간표 전체 조회시 응답 객체
export type ScheduleAllResDto = ScheduleWeekResponse[];

// GET /v1/projects/{projectId}/schedules
// 프로젝트 내 모든 사용자 시간표 조회시 응답객체
export type ScheduleAllMembersResDto = ScheduleWeekResponse[];

// GET /v1/projects/{projectId}/members/{memberId}/schedules
// 프로젝트 내 특정 유저가 작성한 시간표 조회시 응답객체
export type ScheduleMemberResDto = ScheduleWeekResponse;

// POST /v1/projects/{projectId}/schedules
// 프로젝트 생성시 응답객체
export type SchedulePostReqDto = ScheduleCreateUpsateRequest;

// PUT /v1/projects/{projectId}/schedules
// 프로젝트 수정시 응답객체
export type SchedulePutReqDto = ScheduleCreateUpsateRequest;

// DELETE /v1/projects/{projectId}/schedules
// 프로젝트 삭제시 응답객체
export type SchdeuleDeleteReqDto = {
    projectId: number;
    startDate: Date;
    endDate: Date;
};
