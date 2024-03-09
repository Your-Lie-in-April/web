import { API } from "#/constants/api";
import getAPIResponseData from "#/utils/getAPIResponseData";
import {
  PinProjectResDto,
  ProjectDeleteMemberReqDto,
  ProjectDeleteReqDto,
  ProjectEntity,
  ProjectInvitationReqDto,
  ProjectMembersResDto,
  ProjectPostReqDto,
  ProjectPutReqDto,
  ProjectSearchResDto,
  ProjectThumbnailResDto,
} from "#/Types/project";

export const getProjectList = async () => {
  return await getAPIResponseData<ProjectEntity>({
    method: "GET",
    url: API.PROJECT_ALL,
  });
};

export const getProjectThumbnail = async (memberId: number) => {
  return await getAPIResponseData<ProjectThumbnailResDto>({
    method: "GET",
    url: API.PROJECT_THUMBNAIL(memberId),
  });
};

export const getPinProjectList = async (memberId: number) => {
  return await getAPIResponseData<PinProjectResDto>({
    method: "GET",
    url: API.PROJECT_PIN(memberId),
  });
};

export const getProjectSearch = async (memberId: number, keyword: string) => {
  return await getAPIResponseData<ProjectSearchResDto>({
    method: "GET",
    url: API.PROJECT_SEARCH(memberId, keyword),
  });
};

export const getProjectMember = async (projectId: number) => {
  return await getAPIResponseData<ProjectMembersResDto>({
    method: "GET",
    url: API.PROJECT_MEMBERS(projectId),
  });
};

export const postNewProject = async (body: ProjectPostReqDto) => {
  return await getAPIResponseData<ProjectEntity, ProjectPutReqDto>({
    method: "POST",
    url: API.PROJECT,
    data: body,
  });
};

export const deleteProject = async (projectId: number) => {
  return await getAPIResponseData<ProjectEntity, ProjectDeleteReqDto>({
    method: "DELETE",
    url: API.PROJECT_ID(projectId),
  });
};

export const putProject = async (projectId: number, body: ProjectPutReqDto) => {
  return await getAPIResponseData<ProjectEntity, ProjectPutReqDto>({
    method: "PUT",
    url: API.PROJECT_ID(projectId),
    data: body,
  });
};

export const postProjectInvitation = async (projectId: number) => {
  return await getAPIResponseData<ProjectInvitationReqDto>({
    method: "POST",
    url: API.PROJECT_INVITATION(projectId),
  });
};

export const deleteProjectMember = async (
  projectId: number,
  memberId: number
) => {
  return await getAPIResponseData<ProjectDeleteMemberReqDto>({
    method: "DELETE",
    url: API.PROJECT_REMOVE_MEMBER(projectId, memberId),
  });
};
