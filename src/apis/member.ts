import { API } from '#/constants/api';
import getAPIResponseData from '#/utils/getAPIResponseData';
import {
    MemberResDto,
    MemberInfoResDto,
    MemberStateResDto,
    MemberNicknameReqDto,
    ProjectStoreResDto,
    ProjectPinResDto,
} from '#/Types/membertype';

// 멤버 전체 조회
export const getMemberAll = async () => {
    return await getAPIResponseData<MemberResDto>({
        method: 'GET',
        url: API.MEMBER,
    });
};

// 멤버 정보 조회
export const getMemberInfo = async (memberId: number) => {
    return await getAPIResponseData<MemberInfoResDto>({
        method: 'GET',
        url: API.MEMBER_ID(memberId),
    });
};

// 상태메세지 설정
export const putMemberStatus = async (state: string) => {
    return await getAPIResponseData<MemberStateResDto>({
        method: 'PUT',
        url: API.MEMBER_STATE(state),
    });
};

// 닉네임 재설정
export const putMemberNickname = async () => {
    return await getAPIResponseData<MemberNicknameReqDto>({
        method: 'PUT',
        url: API.MEMBER_NICKNAME,
    });
};

// 프로젝트 보관-해제
export const patchProjectIsStored = async (projectId: number) => {
    return await getAPIResponseData<ProjectStoreResDto>({
        method: 'PATCH',
        url: API.MEMBER_STORAGE_PROJECT(projectId),
    });
};

// 프로젝트 핀 설정/해제
export const patchProjectIsPinned = async (projectId: number) => {
    return await getAPIResponseData<ProjectPinResDto>({
        method: 'PATCH',
        url: API.MEMBER_PIN_PROJECT(projectId),
    });
};
