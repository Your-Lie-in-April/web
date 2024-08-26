import useAllMemberInfoQuery from '@hooks/apis/queries/member/useAllMemberInfoQuery';
import { useUserContext } from '@hooks/context/userContext';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import InviteBtn from '../buttons/InviteBtn';
import LeaderProfile from './LeaderProfile';
import MemberProfile from './MemberProfile';
import MyProfile from './MyProfile';

const ProfileList = () => {
    const [showDeleteBtn, setShowDeleteBtn] = useState(false);
    const { userData } = useUserContext();
    const myId = userData?.memberId;

    const { projectId } = useParams();
    const { data: membersData } = useAllMemberInfoQuery(Number(projectId));
    const privilegedMembers = membersData?.filter((member) => member.isPrivileged) ?? [];
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
                    {isMePrivileged && <InviteBtn />}
                </TextBtnWrapper>
                <MemberList>
                    {privilegedMembers.map((member) => (
                        <LeaderProfile
                            key={member.memberId}
                            member={member}
                            toggleDeleteBtn={toggleDeleteBtn}
                            isCurrentUser={member.memberId === myId}
                            membersData={membersData}
                            showDeleteBtn={showDeleteBtn}
                        />
                    ))}
                    {membersData
                        ?.filter((member) => !member.isPrivileged)
                        ?.map((member) => (
                            <MemberProfile
                                key={member.memberId}
                                member={member}
                                showDeleteBtn={showDeleteBtn}
                                isCurrentUser={member.memberId === myId}
                            />
                        ))}
                </MemberList>
            </MemberListBox>
            <MoreBtnPortalTarget id='leader-more-btn' />
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
    position: relative;
`;

const MoreBtnPortalTarget = styled.div`
    position: absolute;
    top: 214.5px;
    right: -32px;
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
    font-family: 'Pretendard';
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
