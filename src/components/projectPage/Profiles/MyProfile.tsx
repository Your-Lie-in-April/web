import ChangeNickName from '@components/modal/memberModal/ChangeNickname';
import useAllMemberInfoQuery from '@hooks/apis/queries/member/useAllMemberInfoQuery';
import { useUserContext } from '@hooks/context/userContext';
import defaultProfile from '@pics/default-profile.svg';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const MyProfile = () => {
    const [isEditModal, setIsEditModal] = useState(false);
    const { userData } = useUserContext();
    const myId = userData?.memberId;

    const { projectId } = useParams();
    const { data: membersData } = useAllMemberInfoQuery(Number(projectId));
    const myProjectNick = membersData?.find((mem) => Number(mem.memberId) === myId)?.nickname;

    const onSetIsEditModal = () => {
        setIsEditModal((prev) => !prev);
    };

    return (
        <>
            <StyledMyProfileBox>
                <StyledProfileContainer>
                    <StyledImageDiv>
                        <StyledImage
                            src={userData?.profileImageUrl || defaultProfile}
                            alt='Profile Image'
                        />
                    </StyledImageDiv>
                    <StyledProfileInfo>
                        <StyledProfileNick>
                            <StyledNickContainer>
                                <StyledCommonText>{myProjectNick}</StyledCommonText>
                                <StyledEditButton onClick={onSetIsEditModal}>
                                    <EditIcon />
                                </StyledEditButton>
                            </StyledNickContainer>
                        </StyledProfileNick>
                        <StyledEmailText>{userData?.email}</StyledEmailText>
                    </StyledProfileInfo>
                </StyledProfileContainer>
                <StyledStatusText $hasData={!!userData}>
                    {userData?.state || '상태 메시지 등록이 되어있지 않습니다'}
                </StyledStatusText>
            </StyledMyProfileBox>
            <ChangeNickName onSetIsEditModal={onSetIsEditModal} isEditModal={isEditModal} />
        </>
    );
};

export default MyProfile;

const StyledMyProfileBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
`;

const StyledProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 22px;
`;

const StyledImageDiv = styled.div`
    width: 68px;
    height: 68px;
    border-radius: 40px;
    background: #aeaeae;
    overflow: hidden;
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const StyledProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
`;

const StyledProfileNick = styled.div`
    display: flex;
    width: 168px;
    padding: 8px;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    box-sizing: border-box;
    border-radius: 10px;
    background: #633ae2;
    color: #ffffff;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const StyledNickContainer = styled.div`
    width: 144px;
    height: 22px;
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: flex-end;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const StyledCommonText = styled.div`
    width: 106px;
    font-size: 14px;
    color: #ffffff;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const StyledEditButton = styled.button.attrs({ type: 'button' })`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    text-align: center;
    display: flex;

    &:focus {
        border: none;
        outline: none;
    }
`;

const EditIcon = () => (
    <StyledSvg
        xmlns='http://www.w3.org/2000/svg'
        width='22'
        height='22'
        viewBox='0 0 22 22'
        fill='none'
    >
        <path
            d='M4.75617 16.8906C4.80527 16.8906 4.85438 16.8856 4.90349 16.8783L9.0334 16.1539C9.08251 16.1441 9.12916 16.122 9.16353 16.0852L19.5718 5.67694C19.5946 5.65422 19.6126 5.62724 19.6249 5.59754C19.6373 5.56784 19.6436 5.53599 19.6436 5.50384C19.6436 5.47168 19.6373 5.43984 19.6249 5.41013C19.6126 5.38043 19.5946 5.35345 19.5718 5.33073L15.491 1.24747C15.4443 1.20082 15.383 1.17627 15.3167 1.17627C15.2504 1.17627 15.189 1.20082 15.1423 1.24747L4.73407 11.6557C4.69724 11.6926 4.67514 11.7368 4.66532 11.7859L3.94099 15.9158C3.9171 16.0473 3.92564 16.1827 3.96585 16.3102C4.00607 16.4377 4.07676 16.5535 4.17179 16.6475C4.33385 16.8046 4.53764 16.8906 4.75617 16.8906ZM6.41108 12.6084L15.3167 3.70529L17.1164 5.50506L8.21085 14.4082L6.02804 14.7937L6.41108 12.6084ZM20.0359 18.9531H1.96443C1.52983 18.9531 1.17871 19.3042 1.17871 19.7388V20.6227C1.17871 20.7307 1.2671 20.8191 1.37514 20.8191H20.6251C20.7332 20.8191 20.8216 20.7307 20.8216 20.6227V19.7388C20.8216 19.3042 20.4705 18.9531 20.0359 18.9531Z'
            fill='#B79FFF'
        />
    </StyledSvg>
);

const StyledSvg = styled.svg`
    display: inline-block;
`;

const StyledEmailText = styled.div`
    width: 168px;
    color: #fff;
    font-family: 'Pretendard';
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const StyledStatusText = styled.div<{ $hasData: boolean }>`
    width: 100%;
    height: 30px;
    padding: 7px 13px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background: #ffffff;
    box-sizing: border-box;
    color: ${(props) => (props.$hasData ? '#000000' : '#7D7D7D')};
    text-align: center;
    font-family: 'Pretendard';
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;
