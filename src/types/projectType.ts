import { MemberGetResDto } from './memberType';
import { UserSchedule } from './scheduleType';

export type ProjectEntity = {
    projectId: number;
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

export type ProjectStoredResponse = {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    data: ProjectThumbnailResponse[];
};

export type ProjectPinResponse = {
    projectId: number;
    title: string;
    description: string;
    startDate: number;
    endDate: number;
    startTime: Date;
    endTime: Date;
    dayOfWeek: string[];
    color: string;
    coverImageUrl: string | null;
    memberCount: number;
    schedule: UserSchedule[];
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

export type ProjectInvitationLink = {
    projectId: number;
    title: string;
    linkt: string;
};

export type ProjectInviteMetaInfo = {
    title: string;
    invitator: string;
    isExpired: boolean;
};

export type ProjectCoverImg = {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    data: {
        id: string;
        url: string;
    }[];
};

export type ProjectPagination = {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    data: ProjectThumbnailResponse[];
};

// GET /v1/projects/{projectId}
// 특정 프로젝트의 정보 조회시 응답객체
export type ProjectGetResDto = ProjectEntity;

// GET /v1/projects/members/{memberId}
// 유저가 소속된 프로젝트를 조회했을 때 응답객체
export type ProjectThumbnailResDto = ProjectPagination;

// GET /v1/projects/members/{memberId}/pin
// 유저가 핀 설정한 프로젝트-시간표 조회했을 때 응답객체
export type PinProjectResDto = ProjectPinResponse[];

// GET /v1/projects/{projectId}/members
// 프로젝트에 속해있는 멤버 전체 조회시 응답객체
export type ProjectMemberResDto = MemberGetResDto[];

// GET /v1/projects/stored
// 보관한 프로젝트 목록 조회
export type ProjectsStoredResDto = ProjectStoredResponse;

// GET /v1/projects/invitations
// 초대 링크 메타데이터 조회
export type ProjectInvitationMetaResDto = ProjectInviteMetaInfo;

// GET /v1/covers
export type ProjectCoverImgResDto = ProjectCoverImg;

// PUT /v1/projects/{projectId}
// 프로젝트 수정시 응답객체
export type ProjectPutReqDto = null;

// DELETE /v1/projects/{projectId}
// 프로젝트 삭제시 응답객체
export type ProjectDeleteReqDto = null;

// POST /v1/projects
// 프로젝트 생성시 응답객체
export type ProjectPostReqDto = null;

// POST projects/{projectId}/invitation
// 회원 초대 링크 생성시 응답 객체
export type ProjectInviteLinkReqDto = ProjectInvitationLink;

// POST /v1/invitation/{url}
// 프로젝트에 회원 초대(추가)시 응답객체
export type ProjectInviteMemReqDto = null;

// PATCH /v1/projects/{projectId}/transfer-privilege
// 관리자 권한 양도
export type ProjectTransferPrivilegeReqDto = null;

// DELETE projects/{projectId}/members/{memberId}
// 프로젝트에서 회원 강퇴시 응답 객체
export type ProjectDeleteMemberReqDto = null;

// DELETE /v1/projects/{projectId}/me
// 프로젝트 스스로 나가기 응답객체
export type ProjectDeleteMeReqDto = null;
