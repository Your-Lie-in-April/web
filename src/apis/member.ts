import { API } from '#/constants/api';
import getAPIResponseData from '#/utils/getAPIResponseData';
import { MemberInfoResDto, MemberResDto, MemberStateResDto } from '#/Types/member';

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

export const putMemberStatus = async (status: string) => {
    return await getAPIResponseData<MemberStateResDto>({
        method: 'PUT',
        url: API.MEMBER_STATUS(status),
    });
};
