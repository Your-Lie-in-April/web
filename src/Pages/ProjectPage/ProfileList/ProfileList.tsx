import { useState } from 'react';
import styled from 'styled-components';
import MyProfile from './MyProfile';
import MemberProfile from './MemberProfile';
import LeaderProfile from './LeaderProfile';
import InviteBtn from '../Buttons/InviteBtn';
import { useUserContext } from '#/Pages/MainPage/MainPage';
import { MemberEntity } from '#/Types/membertype';
import { ProjectEntity } from '#/Types/projecttype';

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

const CommonText = styled.div`
    color: #000000;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
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
interface ProfileListProps {
    projectId: string | undefined;
    members: MemberEntity[];
    projectData: ProjectEntity | null;
}

const ProfileList: React.FC<ProfileListProps> = ({ members, projectId, projectData }) => {
    const [showDeleteBtn, setShowDeleteBtn] = useState(false);
    const { userData, setUserData } = useUserContext();
    const privilegedMembers = members.filter((member) => member.isPrivileged);
    const toggleDeleteBtn = () => {
        setShowDeleteBtn((prev) => !prev);
    };

    return (
        <Box>
            <MyProfile />
            <MemberListBox>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '174px',
                        alignItems: 'center',
                        alignSelf: 'center',
                    }}
                >
                    <CommonText style={{ color: '#ffffff' }}>멤버</CommonText>
                    <InviteBtn projectId={projectId} projectData={projectData} />
                </div>
                <MemberList>
                    {privilegedMembers.map((member) => (
                        <LeaderProfile key={member.memberId} member={member} toggleDeleteBtn={toggleDeleteBtn} />
                    ))}
                    {members
                        .filter((member) => !member.isPrivileged)
                        .map((member) => (
                            <MemberProfile key={member.memberId} member={member} showDeleteBtn={showDeleteBtn} />
                        ))}
                </MemberList>
            </MemberListBox>
        </Box>
    );
};

export default ProfileList;
