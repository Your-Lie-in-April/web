import { useUserContext } from '@hooks/context/userContext';
import styled from 'styled-components';

const Profile: React.FC = () => {
    const { userData } = useUserContext();
    const isLoggedIn = !!userData;
    const hasStatus = isLoggedIn && !!userData.state;

    return (
        <LoginDiv>
            <ImageDiv>
                {userData?.profileImageUrl ? (
                    <StyledImage src={userData.profileImageUrl} alt='Profile Image' />
                ) : (
                    <StyledImage src={'../../../pics/defaultProfile.png'} alt='Default Image' />
                )}
            </ImageDiv>
            <CommonText>{userData?.email}</CommonText>
            <StatusContainer>
                <Text
                    $loggedIn={isLoggedIn}
                    $hasStatus={hasStatus}
                    style={{
                        marginLeft: '8px',
                        marginRight: '8px',
                    }}
                >
                    {isLoggedIn
                        ? hasStatus
                            ? userData.state
                            : '상태 메시지 등록이 되어있지 않습니다'
                        : '로그인 되어 있지 않음'}
                </Text>
            </StatusContainer>
        </LoginDiv>
    );
};
export default Profile;

const LoginDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 218px;
    border-radius: 10px;
    background-color: #ffffff;
    text-align: center;
`;

const ImageDiv = styled.div`
    width: 112px;
    height: 112px;
    margin-top: 16px;
    border-radius: 200px;
    overflow: hidden;
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
const CommonText = styled.div`
    font-family: 'pretendard';
    font-weight: 500;
    font-size: 14px;
    color: black;
    margin-top: 12px;
`;

const Text = styled.div<{ $loggedIn?: boolean; $hasStatus?: boolean }>`
    font-family: 'pretendard';
    font-weight: 500;
    font-size: 14px;
    color: ${({ $loggedIn, $hasStatus }) =>
        $loggedIn ? ($hasStatus ? 'black' : '#A4A4A4') : '#A4A4A4'};
    margin-top: 12px;
`;

const StatusContainer = styled.div`
    width: 100%;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
`;
