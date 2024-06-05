import styled from 'styled-components';
import { useUserContext } from '../MainPage';

const defaultImg = 'src/pics/default.png';
const LoginDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 218px;
    border-radius: 10px;
    background-color: #ffffff;
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

const Text = styled.div`
    font-family: 'pretendard';
    font-weight: 500;
    font-size: 14px;
    color: black;
    margin-top: 12px;
`;

const Profile: React.FC = () => {
    const { userData, setUserData } = useUserContext();

    return (
        <LoginDiv>
            <ImageDiv>
                <StyledImage src={userData?.profileImageUrl || defaultImg} alt="Profile Image" />
            </ImageDiv>
            <Text>{userData?.email}</Text>
            <Text>{userData ? userData.state : '로그인 되어 있지 않음'}</Text>
        </LoginDiv>
    );
};

export default Profile;
