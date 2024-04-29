import { API } from '../constants/api';
import getAPIResponseData from '../utils/getAPIResponseData';
import {
    ProjectEntity,
    ProjectResDto,
    ProjectThumbnailResDto,
    PinProjectResDto,
    ProjectSearchResDto,
    ProjectAllMemberDto,
    ProjectPostReqDto,
    ProjectDeleteReqDto,
    ProjectPutReqDto,
    ProjectInviteLinkReqDto,
    ProjectDeleteMemberReqDto,
    ProjectInviteMemReqDto,
    ProjectTransferPrivilegeReqDto,
    ProjectSelfOutReqDto,
    ProjectsStoredResDto,
} from '#/types/project';

// 프로젝트 전체 조회
export const getProjectAll = async () => {
    return await getAPIResponseData<ProjectResDto>({
        method: 'GET',
        url: API.PROJECT_ALL,
    });
};

// 멤버가 소속한 프로젝트 전체 조회
export const getProjectThumbnail = async (memberId: number) => {
    return await getAPIResponseData<ProjectThumbnailResDto>({
        method: 'GET',
        url: API.PROJECT_THUMBNAIL(memberId),
    });
};

// 멤버가 핀 설정한 프로젝트 조회
export const getPinProject = async (memberId: number) => {
    return await getAPIResponseData<PinProjectResDto>({
        method: 'GET',
        url: API.PROJECT_PIN(memberId),
    });
};

// 멤버가 가지고 있는 프로젝트 중 검색(조회)
export const getProjectSearch = async (memberId: number, keyword: string) => {
    return await getAPIResponseData<ProjectSearchResDto>({
        method: 'GET',
        url: API.PROJECT_SEARCH(memberId, keyword),
    });
};

// 프로젝트에 속해있는 멤버 전체 조회
export const getProjectMembers = async (projectId: number) => {
    return await getAPIResponseData<ProjectAllMemberDto>({
        method: 'GET',
        url: API.PROJECT_MEMBERS(projectId),
    });
};

// 새 프로젝트 생성
export const postNewProject = async (body: ProjectPostReqDto) => {
    return await getAPIResponseData<ProjectEntity, ProjectPostReqDto>({
        method: 'POST',
        url: API.PROJECT,
        data: body,
    });
};

// 프로젝트 삭제
export const deleteProject = async (projectId: number) => {
    return await getAPIResponseData<ProjectEntity, ProjectDeleteReqDto>({
        method: 'DELETE',
        url: API.PROJECT_ID(projectId),
    });
};

// 프로젝트 수정
export const putProject = async (projectId: number, body: ProjectPutReqDto) => {
    return await getAPIResponseData<ProjectEntity, ProjectPutReqDto>({
        method: 'PUT',
        url: API.PROJECT_ID(projectId),
        data: body,
    });
};

// 회원초대 링크 생성
export const postProjectInviteLink = async (projectId: number) => {
    return await getAPIResponseData<ProjectInviteLinkReqDto>({
        method: 'POST',
        url: API.PROJECT_INVITATION_LINK(projectId),
    });
};

// 회원 강퇴
export const deleteProjectMember = async (
    projectId: number,
    memberId: number
) => {
    return await getAPIResponseData<ProjectDeleteMemberReqDto>({
        method: 'DELETE',
        url: API.PROJECT_REMOVE_MEMBER(projectId, memberId),
    });
};

// 회원 초대 (추가)
export const postProjectInviteMember = async (url: string) => {
    return await getAPIResponseData<ProjectInviteMemReqDto>({
        method: 'POST',
        url: API.PROJECT_INVITE_MEMBER(url),
    });
};

// 관리자 권한 양도
export const patchPojectPrevilege = async (projectId: number) => {
    return await getAPIResponseData<ProjectTransferPrivilegeReqDto>({
        method: 'PATCH',
        url: API.PROJECT_TRANSFER_PREVILEGE(projectId),
    });
};

// 프로젝트 스스로 나가기
export const deleteProjectMemberSelf = async (projectId: number) => {
    return await getAPIResponseData<ProjectSelfOutReqDto>({
        method: 'DELETE',
        url: API.PROJECT_SELF_OUT(projectId),
    });
};

// 보관한 프로젝트 목록 조회
export const getProjectIsStored = async () => {
    return await getAPIResponseData<ProjectsStoredResDto>({
        method: 'GET',
        url: API.PROJECT_STORED,
    });
};
