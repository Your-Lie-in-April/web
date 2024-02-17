import { API } from '#/constants/api';
import getAPIResponseData from '#/utils/getAPIResponseData';
import {
    MemberInfoResDto,
    MemberResDto,
    MemberStateResDto,
    MemberNicknameReqDto,
    ProjectStoreResDto,
    ProjectDeleteResDto,
} from '#/Types/member';

export const getMemberList = async () => {
    return await getAPIResponseData<MemberResDto>({
        method: 'GET',
        url: API.MEMBER,
    });
};

export const getMemberInfo = async () => {
    return await getAPIResponseData<MemberInfoResDto>({
        method: 'GET',
        url: API.MEMBER_ID(),
    });
};

export const putMemberStatus = async (state: string) => {
    return await getAPIResponseData<MemberStateResDto>({
        method: 'PUT',
        url: API.MEMBER_STATE(state),
    });
};

export const putMemberNickname = async () => {
    return await getAPIResponseData<MemberNicknameReqDto>({
        method: 'PUT',
        url: API.MEMBER_NICKNAME,
    });
};

export const postProjectStore = async (projectId: number) => {
    return await getAPIResponseData<ProjectStoreResDto>({
        method: 'POST',
        url: API.MEMBER_STORAGE_PROJECT(projectId),
    });
};

export const deleteProjectStore = async (projectId: number) => {
    return await getAPIResponseData<ProjectDeleteResDto>({
        method: 'DELETE',
        url: API.MEMBER_STORAGE_PROJECT(projectId),
    });
};
