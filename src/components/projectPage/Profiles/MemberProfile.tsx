import { MemberEntity } from '@/types/memberType';
import DeleteMember from '@components/modal/projectModal/DeleteMember';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import defaultProfile from '@pics/default-profile.svg';
import { useState } from 'react';
import styled from 'styled-components';

const MemberProfile = ({
    showDeleteBtn,
    member,
    isCurrentUser,
}: {
    showDeleteBtn: boolean;
    member: MemberEntity;
    isCurrentUser: boolean;
}) => {
    const [deleteMemModal, SetDeleteMemModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState<MemberEntity | null>(null);

    const onSetDeleteMemModal = () => {
        SetDeleteMemModal((prev) => !prev);
        setSelectedMember(member);
    };

    return (
        <>
            <MemberProfileBox>
                <MemberProfileDiv>
                    <MemberImg>
                        {member?.profileImageUrl ? (
                            <StyledImage
                                src={member.profileImageUrl || defaultProfile}
                                alt='Profile Image'
                            />
                        ) : (
                            <StyledImage src={defaultProfile} alt='Default Image' />
                        )}
                    </MemberImg>
                    <TextContainer>
                        <NicknameText>
                            <CommonText> {member?.nickname}</CommonText>
                            <IsMeText>{isCurrentUser && '(본인)'}</IsMeText>
                        </NicknameText>
                        <StateText>{member?.state}</StateText>
                    </TextContainer>
                    <DeleteBtn
                        style={{
                            display: showDeleteBtn ? 'block' : 'none',
                        }}
                        onClick={onSetDeleteMemModal}
                    />
                </MemberProfileDiv>
            </MemberProfileBox>
            {selectedMember && (
                <DeleteMember
                    onSetDeleteMemModal={onSetDeleteMemModal}
                    deleteMemModal={deleteMemModal}
                    member={selectedMember}
                />
            )}
        </>
    );
};
export default MemberProfile;

const MemberProfileBox = styled.div`
    width: 100%;
    height: 52px;
    padding: 3px 4px;
    box-sizing: border-box;
    border-radius: 40px;
    background: #ffffff;
`;

const MemberProfileDiv = styled.div`
    width: 254px;
    display: flex;
    flex-direction: row;
    gap: 8px;
    position: relative;
`;

const MemberImg = styled.div`
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: #d9d9d9;
    box-sizing: border-box;
    overflow: hidden;
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const TextContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 7px;
    justify-content: center;
`;

const CommonText = styled.div`
    color: #000000;
    font-family: 'Pretendard';
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const IsMeText = styled(CommonText)`
    flex-shrink: 0;
    flex-grow: 1;
`;

const NicknameText = styled(CommonText)`
    max-width: 158px;
    color: #000000;
    display: flex;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const StateText = styled.div`
    max-width: 158px;
    color: #000000;
    font-family: 'Pretendard';
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const DeleteBtn = styled(RemoveCircleOutlineIcon)`
    width: 24px;
    height: 24px;
    color: #d9d9d9;
    align-self: center;
    position: absolute;
    right: 5px;

    &:hover {
        color: #eb5757;
        cursor: pointer;
    }
`;
