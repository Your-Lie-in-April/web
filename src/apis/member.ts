import { API } from '@constants/api';
import {
    AllMemGetResDto,
    MemberGetResDto,
    MemberPatchPinReqDto,
    MemberPatchStoredReqDto,
    MemberPutNickReqDto,
    MemberPutStatusReqDto,
} from '@/types/memberType';
import getAPIResponseData from '@utils/getAPIResponseData';

//멤버 정보 조회
export const getMemberInfo = async (memberId: number) => {
    return await getAPIResponseData<MemberGetResDto>({
        method: 'GET',
        url: API.MEMBER_GET(memberId),
    });
};

// 상태메세지 설정
export const putMemberStatus = async (state: string) => {
    return await getAPIResponseData<MemberPutStatusReqDto>({
        method: 'PUT',
        url: API.MEMBER_STATE(state),
    });
};

// 닉네임 재설정
export const putMemberNickname = async (projectId: number, nickname: string) => {
    return await getAPIResponseData<MemberPutNickReqDto>({
        method: 'PUT',
        url: API.MEMBER_NICKNAME(projectId, nickname),
    });
};

// 프로젝트 보관-해제
export const patchProjectIsStored = async (projectId: number) => {
    return await getAPIResponseData<MemberPatchStoredReqDto>({
        method: 'PATCH',
        url: API.MEMBER_STORAGE(projectId),
    });
};

// 프로젝트 핀 설정/해제
export const patchProjectIsPinned = async (projectId: number) => {
    return await getAPIResponseData<MemberPatchPinReqDto>({
        method: 'PATCH',
        url: API.MEMBER_PIN(projectId),
    });
};

// 프로젝트에 속해있는 유저 전체 조회
export const getAllMemberInfo = async (projectId: number) => {
    return await getAPIResponseData<AllMemGetResDto>({
        method: 'GET',
        url: API.PROJECT_IN_MEMBERS(projectId),
    });
};
