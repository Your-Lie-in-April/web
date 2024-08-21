export type MemberEntity = {
    memberId?: number;
    email?: string;
    nickname?: string;
    state?: string;
    profileImageUrl?: string;
    isPrivileged?: boolean;
};

/**
 * GET members/${memberId}
 */
export type MemberGetResDto = MemberEntity;


/**
 * GET projects/{projectId}/members
 */
export type AllMemGetResDto = MemberEntity[]

/**
 * PUT members/${status}
 */
export type MemberPutStatusReqDto = null;

/**
 * PUT projects/members/nickname
 */
export type MemberPutNickReqDto = null;

/**
 * PATCH /members/storage/${projectId}
 */
export type MemberPatchStoredReqDto = boolean;

/**
 * PATCH /members/pin/${projectId}
 */
export type MemberPatchPinReqDto = null;
