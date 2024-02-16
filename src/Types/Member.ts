export type MemberEntity = {
    id: number;
    email: string;
    nickname: string;
    state: string;
    profileImageUrl: string;
};

export type MemberResDto = MemberEntity;

export type MemberInfoResDto = Pick<MemberEntity, 'id'>;
