import {
    PinProjectResDto,
    ProjectCoverImgResDto,
    ProjectCreateUpate,
    ProjectDeleteMemberReqDto,
    ProjectDeleteMeReqDto,
    ProjectDeleteReqDto,
    ProjectGetResDto,
    ProjectInvitationMetaResDto,
    ProjectInviteLinkReqDto,
    ProjectInviteMemReqDto,
    ProjectMemberResDto,
    ProjectPostReqDto,
    ProjectPutReqDto,
    ProjectsStoredResDto,
    ProjectThumbnailResDto,
    ProjectTransferPrivilegeReqDto,
} from '@/types/projectType';
import { API } from '../constants/api';
import getAPIResponseData from '../utils/getAPIResponseData';

// 특정 프로젝트 정보 조회
export const getProjectInfo = async (projectId: number) => {
    return await getAPIResponseData<ProjectGetResDto>({
        method: 'GET',
        url: API.PROJECT_GET(projectId),
    });
};

// 멤버가 소속한 프로젝트 전체 조회
export const getProjectMain = async (memberId: number, page: number = 0, size: number = 6) => {
    return await getAPIResponseData<ProjectThumbnailResDto>({
        method: 'GET',
        url: API.PROJECT_MAIN(memberId, page, size),
    });
};

// 멤버가 핀 설정한 프로젝트 조회
export const getPinProject = async (memberId: number) => {
    return await getAPIResponseData<PinProjectResDto>({
        method: 'GET',
        url: API.PROJECT_PIN(memberId),
    });
};

// 프로젝트에 속해있는 멤버 전체 조회
export const getProjectMembers = async (projectId: number) => {
    return await getAPIResponseData<ProjectMemberResDto>({
        method: 'GET',
        url: API.PROJECT_IN_MEMBERS(projectId),
    });
};

// 새 프로젝트 생성
export const postNewProject = async (body: ProjectPostReqDto) => {
    return await getAPIResponseData<ProjectPostReqDto>({
        method: 'POST',
        url: API.PROJECT_POST,
        data: body,
    });
};

// 프로젝트 삭제
export const deleteProject = async (projectId: number) => {
    return await getAPIResponseData<ProjectDeleteReqDto>({
        method: 'DELETE',
        url: API.PROJECT_DELETE(projectId),
    });
};

// 프로젝트 수정
export const putProject = async (projectId: number, body: Partial<ProjectCreateUpate>) => {
    return await getAPIResponseData<ProjectPutReqDto>({
        method: 'PUT',
        url: API.PROJECT_PUT(projectId),
        data: body as ProjectCreateUpate,
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
export const deleteProjectMember = async (projectId: number, memberId: number) => {
    return await getAPIResponseData<ProjectDeleteMemberReqDto>({
        method: 'DELETE',
        url: API.PROJECT_DELETE_MEMBER(projectId, memberId),
    });
};

// 회원 초대 (추가)
export const postProjectInviteMember = async (url: string) => {
    return await getAPIResponseData<ProjectInviteMemReqDto>({
        method: 'POST',
        url: API.PROJECT_INVITATION_MEM(url),
    });
};

// 초대 프로젝트 메타 정보
export const getProjectInviteInfo = async (url: string) => {
    return await getAPIResponseData<ProjectInvitationMetaResDto>({
        method: 'GET',
        url: API.PROJECT_INVITATION_INFO(url),
    });
};

// 관리자 권한 양도
export const patchPojectPrevilege = async (projectId: number, toMemberId: number) => {
    return await getAPIResponseData<ProjectTransferPrivilegeReqDto>({
        method: 'PATCH',
        url: API.PROJECT_TRANSFER_PREVILEGE(projectId),
        data: { toMemberId },
    });
};

// 프로젝트 스스로 나가기
export const deleteProjectMemberSelf = async (projectId: number) => {
    return await getAPIResponseData<ProjectDeleteMeReqDto>({
        method: 'DELETE',
        url: API.PROJECT_DELETE_ME(projectId),
    });
};

// 보관한 프로젝트 목록 조회
export const getProjectIsStored = async (page: number = 0, size: number = 9) => {
    return await getAPIResponseData<ProjectsStoredResDto>({
        method: 'GET',
        url: API.PROJECT_STORED(page, size),
    });
};

//  커버 이미지 조회
export const getCoverImg = async (page: number = 0) => {
    return await getAPIResponseData<ProjectCoverImgResDto>({
        method: 'GET',
        url: API.COVER_IMG(page),
    });
};

// 프로젝트 검색
export const getProjectSearch = async (
    memberId: number,
    keyword: string,
    page : number = 0,
    size: number = 6,
    isStored: boolean = false
) => {
    return await getAPIResponseData<ProjectThumbnailResDto>({
        method: 'GET',
        url: API.SEARCH(memberId, keyword, page, size, isStored),
    });
};
