import { ProjectEntity } from './project';

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

/**
 * PUT projects/members/nickname
 */
export type MemberNicknameReqDto = {
    projectId: number;
    nickname: string;
};

/**
 * POST /members/storage/${projectId}
 */
export type ProjectStoreResDto = Pick<ProjectEntity, 'projcetId'>;

/**
 * DELETE /members/storage/${projectId}
 */
export type ProjectDeleteResDto = Pick<ProjectEntity, 'projcetId'>;
//
