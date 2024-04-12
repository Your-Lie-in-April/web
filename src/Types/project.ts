import { MemberEntity } from './member';
import { ScheduleWeekResponse } from './schedule';


export type ProjectEntity = {
    projectId: string;
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
    isStored: boolean;
    coverImageUrl: string | null;
    color: string;
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
    isStored: boolean;
    color: string;
    coverImageUrl: string | null;
    memberCount: number;
    schedule: ScheduleWeekResponse[];
};

// GET /v1/projects/all
export type ProjectResDto = ProjectEntity;

// GET /v1/projects/members/{memberId}
export type ProjectThumbnailResDto = ProjectThumbnailResponse;

// GET /v1/projects/members/{memberId}/pin
export type PinProjectResDto = PinProjectResponse;

// GET /v1/projects/members/{memberId}/{keyword}
export type ProjectSearchResDto = Pick<ProjectEntity, 'title'>;

// GET /v1/projects/{projectId}/members
export type ProjectMembersResDto = MemberEntity;

// POST /v1/projects
export type ProjectPostReqDto = Omit<ProjectEntity, 'projectId'>;

// PUT /v1/projects/{projectId}
export type ProjectPutReqDto = ProjectPostReqDto;

// DELETE /v1/projects/{projectId}
export type ProjectDeleteReqDto = Pick<ProjectEntity, 'projectId'>;

// POST projects/{projectId}/invitation
export type ProjectInvitationReqDto = {
    url: string;
};

// DELETE projects/{projectId}/members/{memberId}
export type ProjectDeleteMemberReqDto = {
    memberId: number;
};
