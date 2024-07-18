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
                    <DefaultImg />
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

const DefaultImg = () => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='112'
        height='112'
        viewBox='0 0 112 112'
        fill='none'
    >
        <circle cx='56' cy='56' r='56' fill='#A4A4A4' />
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M18.541 97.6281C23.7737 87.0211 33.3788 78.9576 45.0029 75.7913C37.0311 71.7668 31.5642 63.5037 31.5642 53.9636C31.5642 40.4678 42.5048 29.5273 56.0006 29.5273C69.4964 29.5273 80.4369 40.4678 80.4369 53.9636C80.4369 63.5035 74.9703 71.7666 66.9986 75.7911C78.6224 78.9572 88.2274 87.02 93.4603 97.6265C83.5378 106.562 70.4039 112 55.9998 112C41.5965 112 28.4633 106.562 18.541 97.6281Z'
            fill='#F2F2F2'
        />
    </svg>
);

const StatusContainer = styled.div`
    width: 100%;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
`;
