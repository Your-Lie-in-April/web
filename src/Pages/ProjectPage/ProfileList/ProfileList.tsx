import { useUserContext } from '#/hooks/context/userContext';
import { MemberEntity } from '#/types/memberType';
import { ProjectEntity } from '#/types/projectType';
import { useState } from 'react';
import styled from 'styled-components';
import InviteBtn from '../Buttons/InviteBtn';
import LeaderProfile from './LeaderProfile';
import MemberProfile from './MemberProfile';
import MyProfile from './MyProfile';

interface ProfileListProps {
    projectId: string | undefined;
    members: MemberEntity[];
    projectData: ProjectEntity | null;
}

const ProfileList: React.FC<ProfileListProps> = ({ members, projectId, projectData }) => {
    const [showDeleteBtn, setShowDeleteBtn] = useState(false);
    const privilegedMembers = members.filter((member) => member.isPrivileged);
    const { userData } = useUserContext();
    const myId = userData?.memberId;
    const isMePrivileged = privilegedMembers.some((member) => member.memberId === myId);

    const toggleDeleteBtn = () => {
        setShowDeleteBtn((prev) => !prev);
    };

    return (
        <Box>
            <MyProfile />
            <MemberListBox>
                <TextBtnWrapper>
                    <CommonText>멤버</CommonText>
                    {isMePrivileged && (
                        <InviteBtn projectId={projectId} projectData={projectData} />
                    )}
                </TextBtnWrapper>
                <MemberList>
                    {privilegedMembers.map((member) => (
                        <LeaderProfile
                            key={member.memberId}
                            member={member}
                            toggleDeleteBtn={toggleDeleteBtn}
                            isCurrentUser={member.memberId === myId}
                        />
                    ))}
                    {members
                        .filter((member) => !member.isPrivileged)
                        .map((member) => (
                            <MemberProfile
                                key={member.memberId}
                                member={member}
                                showDeleteBtn={showDeleteBtn}
                                isCurrentUser={member.memberId === myId}
                            />
                        ))}
                </MemberList>
            </MemberListBox>
        </Box>
    );
};

export default ProfileList;

const Box = styled.div`
    width: 286px;
    height: 600px;
    display: flex;
    flex-direction: column;
    padding: 8px;
    gap: 36px;
    border-radius: 20px;
    background: #212121;
    justify-content: space-evenly;
    box-sizing: border-box;
`;

const MemberListBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const TextBtnWrapper = styled.div`
    display: flex;
    gap: 174px;
    align-items: center;
    margin-left: 10px;
`;

const CommonText = styled.div`
    color: #ffffff;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-align: center;
`;

const MemberList = styled.div`
    width: 100%;
    height: 412px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: transparent;
    }
`;
