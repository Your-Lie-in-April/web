export type MemberEntity = {
    id: number;
    email: string;
    nickname: string;
    state: string;
    profileImageUrl: string;
};
/**
 * GET members/all
 */
export type MemberResDto = MemberEntity;
/**
 * GET members/${memberId}
 */
export type MemberInfoResDto = Pick<MemberEntity, 'id'>;
/**
 * PUT members/${status}
 */
export type MemberStateResDto = Pick<MemberEntity, 'state'>;
