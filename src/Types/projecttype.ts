import { MemberResDto } from './membertype';
import { ScheduleWeekResponse } from './scheduletype';

export type ProjectEntity = {
    projectId: string;
    title: string;
    description: string;
    startDate?: Date | undefined;
    endDate?: Date | undefined;
    startTime?: Date | undefined;
    endTime?: Date | undefined;
    daysOfWeek?: string[];
    isStored?: boolean;
    coverImageUrl: string | null;
    color: string;
    coverImageId?: string;
};

export type ProjectThumbnailResponse = {
    projectId: number;
    title: string;
    description: string;
    color: string;
    coverImageUrl: string | null;
};

export type PinProjectResponse = {
    projectId: number;
    title: string;
    description: string;
    startDate: number;
    endDate: number;
    startTime: Date;
    endTime: Date;
    mon: boolean;
    tue: boolean;
    wed: boolean;
    thu: boolean;
    fri: boolean;
    sat: boolean;
    sun: boolean;
    isStored: boolean;
    color: string;
    coverImageUrl: string | null;
    memberCount: number;
    schedule: ScheduleWeekResponse[];
};

export type ProjectCreateUpdateRequest = {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    startTime: Date;
    endTime: Date;
    mon: boolean;
    tue: boolean;
    wed: boolean;
    thu: boolean;
    fri: boolean;
    sat: boolean;
    sun: boolean;
    coverImageUrl: string | null;
    color: string;
};

// GET /v1/projects/all
// 프로젝트 전체 리스트를 조회했을 때 응답 객체 타입
export type ProjectResDto = ProjectEntity[];

// GET /v1/projects/{projectId}
// 특정 프로젝트의 정보 조회시 응답객체
export type ProjectInfoResDto = ProjectEntity;

// GET /v1/projects/members/{memberId}
// 유저가 소속된 프로젝트를 조회했을 때 응답객체
export type ProjectThumbnailResDto = ProjectThumbnailResponse[];

// GET /v1/projects/members/{memberId}/pin
// 유저가 핀 설정한 프로젝트-시간표 조회했을 때 응답객체
export type PinProjectResDto = PinProjectResponse[];

// GET /v1/projects/members/{memberId}/{keyword}
// 유저의 프로젝트 중 검색시 응답객체
export type ProjectSearchResDto = ProjectThumbnailResponse[];

// GET /v1/projects/{projectId}/members
// 프로젝트에 속해있는 멤버 전체 조회시 응답객체
export type ProjectAllMemberDto = MemberResDto;

// POST /v1/projects
// 프로젝트 생성시 응답객체
export type ProjectPostReqDto = ProjectCreateUpdateRequest;

// DELETE /v1/projects/{projectId}
// 프로젝트 삭제시 응답객체
export type ProjectDeleteReqDto = Pick<ProjectEntity, 'projectId'>;

// PUT /v1/projects/{projectId}
// 프로젝트 수정시 응답객체
export type ProjectPutReqDto = ProjectCreateUpdateRequest & {
    projectId: string;
};

// POST projects/{projectId}/invitation
// 회원 초대 링크 생성시 응답 객체
export type ProjectInviteLinkReqDto = {
    url: string;
};

// DELETE projects/{projectId}/members/{memberId}
// 프로젝트에서 회원 강퇴시 응답 객체
export type ProjectDeleteMemberReqDto = {
    memberId: number;
};

// POST /v1/invitation/{url}
// 프로젝트에 회원 초대(추가)시 응답객체
export type ProjectInviteMemReqDto = {
    url: string;
};

// PATCH /v1/projects/{projectId}/transfer-privilege
// 관리자 권한 양도
export type ProjectTransferPrivilegeReqDto = {
    toMemberId: number;
};

// DELETE /v1/projects/{projectId}/me
// 프로젝트 스스로 나가기 응답객체
export type ProjectSelfOutReqDto = Pick<ProjectEntity, 'projectId'>;

// GET /v1/projects/stored
// 보관한 프로젝트 목록 조회
export type ProjectsStoredResDto = ProjectThumbnailResponse[];
