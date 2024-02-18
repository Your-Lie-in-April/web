import { ScheduleWeekResponse } from "./schedule";
import { MemberEntity } from "./member";

export type ProjectEntity = {
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
  coverImageUrl: string;
  color: string;
};

export type ProjectThumbnailResponse = {
  projectId: number;
  title: string;
  description: string;
  color: string;
  coverImageUrl: string;
};

export type PinProjectResponse = {
  projectId: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  mon: boolean;
  tue: boolean;
  wed: boolean;
  thu: boolean;
  fri: boolean;
  sat: boolean;
  sun: boolean;
  isStored: boolean;
  coverImageUrl: string;
  color: string;
  memberCount: number;
  schedule: ScheduleWeekResponse[];
};

// GET projects/all
export type ProjectResDto = ProjectEntity;

// GET projects/members/{memberId}
export type ProjectThumbnailResDto = ProjectThumbnailResponse;

// GET projects/members/{memberId}/pin
export type PinProjectResDto = PinProjectResponse;

// GET projects/members/{memberId}/{keyword}
export type ProjectSearchResDto = Pick<ProjectEntity, "title">;

// GET projects/{projectId}/members
export type ProjectMembersResDto = MemberEntity;

// POST projects
export type ProjectPostReqDto = Omit<ProjectEntity, "projectId">;

// PUT projects/{projectId}
export type ProjectPutReqDto = ProjectPostReqDto;

// DELETE projects/{projectId}
export type ProjectDeleteReqDto = Pick<ProjectEntity, "projectId">;

// POST projects/{projectId}/invitation
export type ProjectInvitationReqDto = {
  url: string;
};

// DELETE projects/{projectId}/members/{memberId}
export type ProjectDeleteMemberReqDto = {
  memberId: number;
};
