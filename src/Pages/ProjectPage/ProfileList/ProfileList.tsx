import { useEffect, useState } from 'react';
import styled from 'styled-components';
import MyProfile from './MyProfile';
import MemberProfile from './MemberProfile';
import LeaderProfile from './LeaderProfile';
import InvitationModal from '../../Modal/InvitationModal';
import InviteBtn from '../Buttons/InviteBtn';
import { useUserContext } from '#/Pages/MainPage/MainPage';
import { Http } from '#/constants/backendURL';
import { MemberEntity } from '#/Types/membertype';

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
}

const ProfileList: React.FC<ProfileListProps> = ({ projectId }) => {
    const [showDeleteBtn, setShowDeleteBtn] = useState(false);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [members, setMembers] = useState<MemberEntity[]>([]);
    const { userData, setUserData } = useUserContext();
    const toggleDeleteBtn = () => {
        setShowDeleteBtn((prev) => !prev);
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        const fetchMember = async () => {
            try {
                const response = await fetch(`${Http}/v1/projects/${projectId}/members`, {
                    method: 'GET',
                    headers: {
                        Accept: '*/*',
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch pinned projects');
                }

                const data = await response.json();
                console.log('멤버', data.data);
                setMembers(data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMember();
    }, [projectId, userData]);

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
                    <InviteBtn />
                </div>
                <MemberList>
                    {members.map((member) =>
                        member.isPrivileged ? (
                            <LeaderProfile key={member.memberId} member={member} toggleDeleteBtn={toggleDeleteBtn} />
                        ) : (
                            <MemberProfile key={member.memberId} member={member} showDeleteBtn={showDeleteBtn} />
                        )
                    )}
                </MemberList>
            </MemberListBox>
        </Box>
    );
};

export default ProfileList;
