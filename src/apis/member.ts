import { API } from '#/constants/api';
import {
    MemberGetResDto,
    MemberPatchPinReqDto,
    MemberPatchStoredReqDto,
    MemberPutNickReqDto,
    MemberPutStatusReqDto,
} from '#/types/memberType';
import getAPIResponseData from '#/utils/getAPIResponseData';

//멤버 정보 조회
export const getMemberInfo = async (memberId: number) => {
    return await getAPIResponseData<MemberGetResDto>({
        method: 'GET',
        url: API.MEMBER_GET(memberId),
    });
};

// 상태메세지 설정
export const putMemberStatus = async (state: string): Promise<{ state: string } | null> => {
    return await getAPIResponseData<MemberPutStatusReqDto>({
        method: 'PUT',
        url: API.MEMBER_STATE(state),
    });
};

// 닉네임 재설정
export const putMemberNickname = async () => {
    return await getAPIResponseData<MemberPutNickReqDto>({
        method: 'PUT',
        url: API.MEMBER_NICKNAME,
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
