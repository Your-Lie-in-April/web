import { AllMemGetResDto, MemberEntity } from '@/types/memberType';
import styled from 'styled-components';
import MoreBtn from '../buttons/MoreBtn';

const LeaderProfile = ({
    toggleDeleteBtn,
    member,
    isCurrentUser,
    membersData,
}: {
    toggleDeleteBtn: () => void;
    member: MemberEntity;
    isCurrentUser: boolean;
    membersData: AllMemGetResDto | undefined;
}) => {
    return (
        <StyledLeaderProfileBox>
            <StyledLeaderProfileDiv>
                <LeaderImg>
                    <StyledImage src={member?.profileImageUrl} alt='Profile Image' />
                </LeaderImg>
                <StyledProfileInfo>
                    <StyledProfileText>
                        {member?.nickname}
                        {isCurrentUser ? ' (본인)' : ''}
                    </StyledProfileText>
                    <StyledProfileSubText>{member?.state}</StyledProfileSubText>
                </StyledProfileInfo>
                {isCurrentUser && member?.isPrivileged && membersData && membersData.length > 1 && (
                    <MoreBtn toggleDeleteBtn={toggleDeleteBtn} />
                )}
            </StyledLeaderProfileDiv>
        </StyledLeaderProfileBox>
    );
};
export default LeaderProfile;

const StyledLeaderProfileBox = styled.div`
    width: 100%;
    height: 52px;
    padding: 3px 4px;
    box-sizing: border-box;
    border-radius: 40px;
    background: #ffffff;
`;

const StyledLeaderProfileDiv = styled.div`
    width: 250px;
    display: flex;
    flex-direction: row;
    gap: 8px;
`;

const LeaderImg = styled.div`
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: #d9d9d9;
    border: 2px solid #633ae2;
    box-sizing: border-box;
    overflow: hidden;
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const StyledProfileInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 7px;
    justify-content: center;
`;

const CommonText = styled.div`
    color: #000000;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const StyledProfileText = styled(CommonText)`
    max-width: 158px;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const StyledProfileSubText = styled(CommonText)`
    font-size: 10px;
    font-weight: 400;
    max-width: 158px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;
